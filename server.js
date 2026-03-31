require('dotenv').config();
const express = require('express');
const http = require('http');
const multer = require('multer');
const { WebSocket, WebSocketServer } = require('ws');
const path = require('path');
const { countRecentByIp, insertRequest } = require('./db');

// ── Config ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const API_BASE_URL = process.env.API_BASE_URL || 'https://modulate-developer-apis.com';
const API_WS_BASE_URL = API_BASE_URL.replace(/^https:\/\//i, 'wss://').replace(/^http:\/\//i, 'ws://');
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '50', 10);
const RATE_LIMIT_WINDOW_MINUTES = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '60', 10);
const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '100', 10);

if (!API_KEY) {
  console.error('ERROR: API_KEY environment variable is required');
  process.exit(1);
}

// ── Express setup ────────────────────────────────────────────────────────────
const app = express();
const server = http.createServer(app);

app.set('trust proxy', true);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
});

// Only trust fly-client-ip when running on Fly.io (FLY_APP_NAME is set by the platform).
// Without this check, anyone can send a fake fly-client-ip header to bypass rate limits.
const IS_FLY = !!process.env.FLY_APP_NAME;

function getClientIp(req) {
  if (IS_FLY) {
    return req.headers['fly-client-ip'] || req.ip;
  }
  return req.ip;
}

function getClientIpFromSocket(req) {
  if (IS_FLY) {
    return req.headers['fly-client-ip'] || req.socket.remoteAddress;
  }
  return req.socket.remoteAddress;
}

// Sanitize filenames to prevent header injection in upstream multipart requests.
function sanitizeFilename(name) {
  if (!name) return 'upload';
  return name.replace(/["\r\n\\]/g, '_').slice(0, 255);
}

// ── Allowed proxy targets (prevent open proxy) ──────────────────────────────
const ALLOWED_ENDPOINTS = new Set([
  '/api/velma-2-stt-batch',
  '/api/velma-2-stt-batch-english-vfast',
  '/api/velma-2-synthetic-voice-detection-batch',
]);

// Per-endpoint upstream base URL overrides (defaults to API_BASE_URL)
const ENDPOINT_BASE_URL = {};

// ── Usage endpoint ───────────────────────────────────────────────────────────
app.get('/api/usage', (req, res) => {
  const ip = getClientIp(req);
  const recentCount = countRecentByIp(ip, RATE_LIMIT_WINDOW_MINUTES);
  res.json({
    remaining: Math.max(0, RATE_LIMIT_MAX - recentCount),
    limit: RATE_LIMIT_MAX,
    windowMinutes: RATE_LIMIT_WINDOW_MINUTES,
  });
});

// ── Batch proxy ──────────────────────────────────────────────────────────────
// ── Multer error handler (clean message instead of stack trace) ──────────
function handleUpload(req, res, next) {
  upload.single('upload_file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          error: 'File too large',
          message: `Maximum file size is ${MAX_FILE_SIZE_MB} MB.`,
        });
      }
      return res.status(400).json({ error: 'Upload failed', message: err.message });
    }
    next();
  });
}

app.post('/api/:path(*)', handleUpload, async (req, res) => {
  const endpoint = req.path;
  if (!ALLOWED_ENDPOINTS.has(endpoint)) {
    return res.status(404).json({ error: 'Unknown endpoint' });
  }

  const ip = getClientIp(req);
  const recentCount = countRecentByIp(ip, RATE_LIMIT_WINDOW_MINUTES);
  if (recentCount >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Limit of ${RATE_LIMIT_MAX} transcriptions per ${RATE_LIMIT_WINDOW_MINUTES} minutes reached.`,
      remaining: 0,
      limit: RATE_LIMIT_MAX,
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Record the request before proxying to prevent concurrent bypass
  const safeFilename = sanitizeFilename(req.file.originalname);
  insertRequest(ip, endpoint, safeFilename, req.file.size);

  try {
    // Rebuild FormData for upstream
    const boundary = '----ModulateProxy' + Date.now();
    const parts = [];

    // File part
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="upload_file"; filename="${safeFilename}"\r\n` +
      `Content-Type: ${req.file.mimetype || 'application/octet-stream'}\r\n\r\n`
    );
    parts.push(req.file.buffer);
    parts.push('\r\n');

    // Forward other form fields
    if (req.body) {
      for (const [key, value] of Object.entries(req.body)) {
        parts.push(
          `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="${key}"\r\n\r\n` +
          `${value}\r\n`
        );
      }
    }

    parts.push(`--${boundary}--\r\n`);

    // Combine into a single buffer
    const bodyParts = parts.map(p => typeof p === 'string' ? Buffer.from(p) : p);
    const body = Buffer.concat(bodyParts);

    const baseUrl = ENDPOINT_BASE_URL[endpoint] || API_BASE_URL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120_000); // 2 min timeout
    const upstreamRes = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const responseText = await upstreamRes.text();

    // Forward status and response
    res.status(upstreamRes.status);
    const contentType = upstreamRes.headers.get('content-type');
    if (contentType) res.set('Content-Type', contentType);

    const remaining = Math.max(0, RATE_LIMIT_MAX - recentCount - 1);
    res.set('X-Rate-Limit-Remaining', String(remaining));
    res.send(responseText);
  } catch (err) {
    console.error('Proxy error:', err.message);
    if (err.name === 'AbortError') {
      res.status(504).json({ error: 'Request timed out', message: 'The analysis took too long. Please try a shorter audio file.' });
    } else {
      res.status(502).json({ error: 'Upstream request failed', message: err.message });
    }
  }
});

// ── SPA routes (before static so /deepfake serves main page, not deepfake/) ──
app.get('/transcription', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/deepfake', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Redirect standalone deepfake page to the SPA
app.get('/deepfake/index.html', (req, res) => {
  res.redirect(301, '/deepfake');
});

// ── Static files ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  setHeaders(res, filePath) {
    // No aggressive caching — files don't have cache-busting hashes
    res.setHeader('Cache-Control', 'no-cache');
  },
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── WebSocket proxy ──────────────────────────────────────────────────────────
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const ALLOWED_WS_PATHS = new Set([
    '/api/velma-2-stt-streaming',
    '/api/velma-2-synthetic-voice-detection-streaming',
  ]);

  if (!ALLOWED_WS_PATHS.has(url.pathname)) {
    socket.destroy();
    return;
  }

  // Rate limit check
  const ip = getClientIpFromSocket(req);
  const recentCount = countRecentByIp(ip, RATE_LIMIT_WINDOW_MINUTES);
  if (recentCount >= RATE_LIMIT_MAX) {
    socket.write(
      'HTTP/1.1 429 Too Many Requests\r\n' +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify({ error: 'Rate limit exceeded' })
    );
    socket.destroy();
    return;
  }

  // Record request before proxying
  insertRequest(ip, url.pathname, null, null);

  wss.handleUpgrade(req, socket, head, (clientWs) => {
    // Build upstream URL with API key and client's params
    const upstreamParams = new URLSearchParams(url.searchParams);
    upstreamParams.set('api_key', API_KEY);
    const wsBaseOverride = ENDPOINT_BASE_URL[url.pathname]
      ? ENDPOINT_BASE_URL[url.pathname].replace(/^https:\/\//i, 'wss://').replace(/^http:\/\//i, 'ws://')
      : API_WS_BASE_URL;
    const upstreamUrl = `${wsBaseOverride}${url.pathname}?${upstreamParams.toString()}`;
    console.log('WS proxy connecting to:', upstreamUrl.replace(/api_key=[^&]+/, 'api_key=***'));

    const upstreamWs = new WebSocket(upstreamUrl, {
      headers: { 'User-Agent': req.headers['user-agent'] || 'ModulateShowcase/1.0' },
    });
    const pendingMessages = [];

    // Hard timeout: close both sides after 5 minutes to prevent zombie connections
    const WS_PROXY_TIMEOUT_MS = 5 * 60 * 1000;
    const proxyTimeout = setTimeout(() => {
      if (clientWs.readyState === WebSocket.OPEN) clientWs.close(1000, 'Timeout');
      if (upstreamWs.readyState === WebSocket.OPEN) upstreamWs.close();
    }, WS_PROXY_TIMEOUT_MS);

    const clearProxyTimeout = () => clearTimeout(proxyTimeout);

    clientWs.on('message', (data) => {
      if (upstreamWs.readyState === WebSocket.OPEN) {
        upstreamWs.send(data);
      } else {
        pendingMessages.push(data);
      }
    });

    upstreamWs.on('open', () => {
      for (const msg of pendingMessages) {
        upstreamWs.send(msg);
      }
      pendingMessages.length = 0;
    });

    upstreamWs.on('message', (data, isBinary) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data, { binary: isBinary });
      }
    });

    upstreamWs.on('close', (code, reason) => {
      clearProxyTimeout();
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(code, reason);
      }
    });

    upstreamWs.on('error', (err) => {
      clearProxyTimeout();
      console.error('Upstream WS error:', err.message);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(1011, 'Upstream error');
      }
    });

    clientWs.on('close', () => {
      clearProxyTimeout();
      if (upstreamWs.readyState === WebSocket.OPEN) {
        upstreamWs.close();
      }
    });

    clientWs.on('error', (err) => {
      clearProxyTimeout();
      console.error('Client WS error:', err.message);
      if (upstreamWs.readyState === WebSocket.OPEN) {
        upstreamWs.close();
      }
    });
  });
});

// ── Start ────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Rate limit: ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW_MINUTES} minutes`);
  console.log(`Max file size: ${MAX_FILE_SIZE_MB} MB`);
});
