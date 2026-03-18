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
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10', 10);
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
  '/api/velma-2-synthetic-voice-detection',
]);

// Per-endpoint upstream base URL overrides (defaults to API_BASE_URL)
const ENDPOINT_BASE_URL = {
  '/api/velma-2-synthetic-voice-detection': 'http://54.147.23.177:8080',
};

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
    const upstreamRes = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

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
    res.status(502).json({ error: 'Upstream request failed', message: err.message });
  }
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

  if (url.pathname !== '/api/velma-2-stt-streaming') {
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
  insertRequest(ip, '/api/velma-2-stt-streaming', null, null);

  wss.handleUpgrade(req, socket, head, (clientWs) => {
    // Build upstream URL with API key and client's params
    const upstreamParams = new URLSearchParams(url.searchParams);
    upstreamParams.set('api_key', API_KEY);
    const upstreamUrl = `${API_WS_BASE_URL}/api/velma-2-stt-streaming?${upstreamParams.toString()}`;

    const upstreamWs = new WebSocket(upstreamUrl);

    upstreamWs.on('open', () => {
      clientWs.on('message', (data) => {
        if (upstreamWs.readyState === WebSocket.OPEN) {
          upstreamWs.send(data);
        }
      });
    });

    upstreamWs.on('message', (data) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(data);
      }
    });

    upstreamWs.on('close', (code, reason) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(code, reason);
      }
    });

    upstreamWs.on('error', (err) => {
      console.error('Upstream WS error:', err.message);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(1011, 'Upstream error');
      }
    });

    clientWs.on('close', () => {
      if (upstreamWs.readyState === WebSocket.OPEN) {
        upstreamWs.close();
      }
    });

    clientWs.on('error', (err) => {
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
