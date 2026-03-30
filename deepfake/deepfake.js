// ── Deepfake Detection Page — Batch Analysis ────────────────────────────────
(function () {
  'use strict';

  // Speed factor: API processes ~90x real-time
  const SPEED_FACTOR = 90;
  const MIN_PROGRESS_MS = 1500;

  // ── Cached demo data (pre-computed so the page loads instantly) ────────
  const DEMO_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":128,"end_time_ms":4128,"synthetic_voice":true,"confidence":0.9827},{"start_time_ms":4128,"end_time_ms":8128,"synthetic_voice":true,"confidence":0.9181},{"start_time_ms":8128,"end_time_ms":12128,"synthetic_voice":false,"confidence":0.9623},{"start_time_ms":12128,"end_time_ms":16128,"synthetic_voice":true,"confidence":0.9334},{"start_time_ms":16128,"end_time_ms":20128,"synthetic_voice":false,"confidence":0.8104},{"start_time_ms":20128,"end_time_ms":24128,"synthetic_voice":false,"confidence":0.9545},{"start_time_ms":24128,"end_time_ms":28128,"synthetic_voice":true,"confidence":0.7519},{"start_time_ms":28128,"end_time_ms":32128,"synthetic_voice":true,"confidence":0.9618},{"start_time_ms":32128,"end_time_ms":36128,"synthetic_voice":true,"confidence":0.5571},{"start_time_ms":36128,"end_time_ms":40128,"synthetic_voice":false,"confidence":0.9657},{"start_time_ms":40128,"end_time_ms":44128,"synthetic_voice":true,"confidence":0.9766},{"start_time_ms":44128,"end_time_ms":48128,"synthetic_voice":false,"confidence":0.8975},{"start_time_ms":48128,"end_time_ms":52128,"synthetic_voice":true,"confidence":0.7688},{"start_time_ms":52128,"end_time_ms":56128,"synthetic_voice":true,"confidence":0.8945},{"start_time_ms":56128,"end_time_ms":60128,"synthetic_voice":false,"confidence":0.9509},{"start_time_ms":60128,"end_time_ms":64128,"synthetic_voice":true,"confidence":0.9489},{"start_time_ms":64128,"end_time_ms":68128,"synthetic_voice":false,"confidence":0.9722},{"start_time_ms":68128,"end_time_ms":72128,"synthetic_voice":true,"confidence":0.9224},{"start_time_ms":72128,"end_time_ms":76128,"synthetic_voice":false,"confidence":0.9814},{"start_time_ms":76128,"end_time_ms":80128,"synthetic_voice":true,"confidence":0.8336},{"start_time_ms":80128,"end_time_ms":84128,"synthetic_voice":false,"confidence":0.6863},{"start_time_ms":84128,"end_time_ms":88128,"synthetic_voice":true,"confidence":0.8183},{"start_time_ms":88128,"end_time_ms":92128,"synthetic_voice":true,"confidence":0.9485},{"start_time_ms":92128,"end_time_ms":96128,"synthetic_voice":false,"confidence":0.9355},{"start_time_ms":96128,"end_time_ms":97568,"synthetic_voice":true,"confidence":0.9856}],"duration_ms":97698};

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const overlay       = document.getElementById('analysis-overlay');
  const progressFill  = document.getElementById('progress-fill');
  const analysisTitle = document.getElementById('analysis-title');
  const analysisEta   = document.getElementById('analysis-eta');
  const errorToast    = document.getElementById('error-toast');

  const resultsFilename = document.getElementById('results-filename');
  const resultsAudio  = document.getElementById('results-audio');
  const histogram     = document.getElementById('histogram');
  const resultsTbody  = document.getElementById('results-tbody');
  const verdictRing   = document.getElementById('verdict-ring');
  const verdictIcon   = document.getElementById('verdict-icon');
  const verdictLabel  = document.getElementById('verdict-label');
  const verdictCount  = document.getElementById('verdict-count');

  const uploadAction  = document.getElementById('results-upload-action');
  const fileInput     = document.getElementById('results-file-input');
  const recordAction  = document.getElementById('results-record-action');

  // Modals
  const statsModal    = document.getElementById('stats-modal');
  const statsGrid     = document.getElementById('stats-grid');
  const jsonModal     = document.getElementById('json-modal');
  const jsonPre       = document.getElementById('json-pre');
  const jsonCopyBtn   = document.getElementById('json-copy-btn');

  // ── State ─────────────────────────────────────────────────────────────────
  let audioObjectUrl = null;
  let progressTimer = null;
  let currentData = null;      // store for modals
  let currentMeta = {};        // file/request metadata for stats
  let currentFrames = [];      // for playback tracking
  let playbackTracker = null;

  // ── Upload action: click + drag-and-drop ──────────────────────────────────
  if (uploadAction && fileInput) {
    // Click anywhere on the action widget (not just the hidden input) to open picker
    uploadAction.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        startAnalysis(fileInput.files[0]);
        fileInput.value = '';
      }
    });

    let dragCtr = 0;

    uploadAction.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCtr++;
      uploadAction.classList.add('drag-over');
    });

    uploadAction.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCtr--;
      if (dragCtr <= 0) { dragCtr = 0; uploadAction.classList.remove('drag-over'); }
    });

    uploadAction.addEventListener('dragover', (e) => e.preventDefault());

    uploadAction.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCtr = 0;
      uploadAction.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) startAnalysis(e.dataTransfer.files[0]);
    });
  }

  if (recordAction) {
    recordAction.addEventListener('click', () => {
      // Phase 2: start streaming
    });
  }

  // ── Modal controls ────────────────────────────────────────────────────────
  document.getElementById('btn-show-stats').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json').addEventListener('click', () => showJsonModal());
  document.getElementById('stats-modal-close').addEventListener('click', () => statsModal.classList.remove('visible'));
  document.getElementById('json-modal-close').addEventListener('click', () => jsonModal.classList.remove('visible'));
  statsModal.addEventListener('click', (e) => { if (e.target === statsModal) statsModal.classList.remove('visible'); });
  jsonModal.addEventListener('click', (e) => { if (e.target === jsonModal) jsonModal.classList.remove('visible'); });

  jsonCopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(currentData, null, 2)).then(() => {
      jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
      }, 2000);
    });
  });

  // ── Load demo on page init ────────────────────────────────────────────────
  currentMeta = {
    fileSize: 1.87 * 1024 * 1024, // 1.87 MB
    fileType: 'audio/mpeg',
    httpStatus: 200,
    httpStatusText: 'OK',
    responseSize: 4.2 * 1024, // 4.2 KB
    processingMs: 2660, // 2.66s
  };
  renderResults(DEMO_DATA, DEMO_AUDIO_URL);

  // ── Analysis Flow ─────────────────────────────────────────────────────────

  async function startAnalysis(file) {
    const durationMs = await getAudioDuration(file);

    showOverlay(file.name);

    const estimatedMs = Math.max(MIN_PROGRESS_MS, (durationMs / SPEED_FACTOR));
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file);
      const processingMs = Date.now() - startedAt;

      await finishProgress();
      hideOverlay();

      // Create object URL for the uploaded file
      if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs: processingMs,
      };

      renderResults(data, audioObjectUrl);
    } catch (err) {
      stopProgress();
      hideOverlay();
      showError(err.message || 'Analysis failed. Please try again.');
    }
  }

  function getAudioDuration(file) {
    return new Promise((resolve) => {
      const audio = new Audio();
      const url = URL.createObjectURL(file);
      audio.addEventListener('loadedmetadata', () => {
        const dur = audio.duration;
        URL.revokeObjectURL(url);
        resolve(isFinite(dur) ? dur * 1000 : 10000);
      });
      audio.addEventListener('error', () => {
        URL.revokeObjectURL(url);
        resolve(10000);
      });
      audio.src = url;
    });
  }

  async function uploadAndAnalyze(file) {
    const formData = new FormData();
    formData.append('upload_file', file);

    const res = await fetch('/api/velma-2-synthetic-voice-detection-batch', {
      method: 'POST',
      body: formData,
    });

    const responseText = await res.text();

    if (!res.ok) {
      let body = {};
      try { body = JSON.parse(responseText); } catch {}
      throw new Error(body.detail || body.message || body.error || `Server error (${res.status})`);
    }

    return {
      data: JSON.parse(responseText),
      meta: {
        httpStatus: res.status,
        httpStatusText: res.statusText,
        responseSize: responseText.length,
      },
    };
  }

  // ── Progress Bar ──────────────────────────────────────────────────────────

  function startProgress(estimatedMs) {
    const start = Date.now();
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    void progressFill.offsetWidth;

    const tick = () => {
      const elapsed = Date.now() - start;
      const rawPct = Math.min(elapsed / estimatedMs, 1);
      const pct = rawPct * 90;
      progressFill.style.transition = 'width 0.3s linear';
      progressFill.style.width = pct + '%';

      const remaining = Math.max(0, Math.ceil((estimatedMs - elapsed) / 1000));
      if (analysisEta) {
        analysisEta.textContent = remaining > 0 ? '~' + remaining + 's remaining' : 'Almost done\u2026';
      }

      if (rawPct < 1) progressTimer = requestAnimationFrame(tick);
    };

    progressTimer = requestAnimationFrame(tick);
  }

  function finishProgress() {
    return new Promise((resolve) => {
      if (progressTimer) cancelAnimationFrame(progressTimer);
      progressFill.style.transition = 'width 0.4s ease-out';
      progressFill.style.width = '100%';
      if (analysisEta) analysisEta.textContent = 'Complete';
      setTimeout(resolve, 500);
    });
  }

  function stopProgress() {
    if (progressTimer) cancelAnimationFrame(progressTimer);
  }

  // ── Overlay ───────────────────────────────────────────────────────────────

  function showOverlay(filename) {
    if (analysisTitle) analysisTitle.textContent = 'Analyzing \u201c' + truncate(filename, 30) + '\u201d';
    progressFill.style.width = '0%';
    overlay.classList.add('visible');
  }

  function hideOverlay() {
    overlay.classList.remove('visible');
  }

  // ── Render Results ────────────────────────────────────────────────────────

  function renderResults(data, audioSrc) {
    currentData = data;
    resultsFilename.textContent = data.filename || 'Audio file';
    resultsAudio.src = audioSrc;

    const frames = data.frames || [];
    currentFrames = frames;

    // Verdict algorithm:
    // Deepfake if >=1 frame synthetic with >99% confidence,
    // OR >=2 frames synthetic with each >90% confidence.
    const synFrames = frames.filter(f => f.synthetic_voice);
    const highConf99 = synFrames.filter(f => f.confidence > 0.99).length;
    const highConf90 = synFrames.filter(f => f.confidence > 0.90).length;
    const isSynthetic = highConf99 >= 1 || highConf90 >= 2;

    renderVerdict(isSynthetic, synFrames.length, frames.length);
    renderHistogram(frames);
    renderTable(frames);
    setupPlaybackTracking(frames);

    window.scrollTo(0, 0);
  }

  function renderVerdict(isSynthetic, syntheticCount, totalCount) {
    const cls = isSynthetic ? 'synthetic' : 'authentic';
    verdictRing.className = 'verdict-ring ' + cls;

    verdictIcon.innerHTML = isSynthetic
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="4" x2="12" y2="8"/><circle cx="12" cy="3" r="1"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

    verdictLabel.textContent = isSynthetic ? 'Deepfake' : 'Authentic';
    verdictCount.textContent = syntheticCount + '/' + totalCount + ' deepfake segments';
  }

  function renderHistogram(frames) {
    histogram.innerHTML = '';
    if (!frames.length) return;

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'histo-bar ' + (frame.synthetic_voice ? 'synthetic' : 'authentic');
      bar.style.height = Math.max(8, frame.confidence * 100) + '%';
      bar.style.opacity = confidenceToOpacity(frame.confidence);

      const tooltip = document.createElement('div');
      tooltip.className = 'histo-bar-tooltip';
      tooltip.textContent = formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms) +
        ' \u00B7 ' + (frame.confidence * 100).toFixed(0) + '%';
      bar.appendChild(tooltip);

      bar.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      histogram.appendChild(bar);
    });
  }

  function renderTable(frames) {
    resultsTbody.innerHTML = '';

    frames.forEach((frame, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;

      const tdTime = document.createElement('td');
      tdTime.textContent = formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms);

      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'verdict-pill ' + (frame.synthetic_voice ? 'synthetic' : 'authentic');
      pill.textContent = frame.synthetic_voice ? 'Deepfake' : 'Authentic';
      tdVerdict.appendChild(pill);

      const tdConf = document.createElement('td');
      const confWrap = document.createElement('div');
      confWrap.className = 'confidence-cell';

      const confTrack = document.createElement('div');
      confTrack.className = 'confidence-bar-track';
      const confFill = document.createElement('div');
      confFill.className = 'confidence-bar-fill ' + (frame.synthetic_voice ? 'synthetic' : 'authentic');
      confFill.style.width = (frame.confidence * 100) + '%';
      confTrack.appendChild(confFill);

      const confText = document.createElement('span');
      confText.textContent = (frame.confidence * 100).toFixed(1) + '%';

      confWrap.appendChild(confTrack);
      confWrap.appendChild(confText);
      tdConf.appendChild(confWrap);

      tr.appendChild(tdTime);
      tr.appendChild(tdVerdict);
      tr.appendChild(tdConf);

      tr.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      resultsTbody.appendChild(tr);
    });
  }

  function seekTo(startMs, index) {
    if (resultsAudio) {
      resultsAudio.currentTime = startMs / 1000;
      resultsAudio.play().catch(() => {});
    }

    histogram.querySelectorAll('.histo-bar').forEach((bar, i) => {
      bar.classList.toggle('active', i === index);
    });

    resultsTbody.querySelectorAll('tr').forEach((row, i) => {
      row.classList.toggle('active', i === index);
    });
  }

  // ── Playback Tracking ──────────────────────────────────────────────────────

  function setupPlaybackTracking(frames) {
    // Clear previous tracker
    if (playbackTracker) cancelAnimationFrame(playbackTracker);

    const bars = histogram.querySelectorAll('.histo-bar');
    const rows = resultsTbody.querySelectorAll('tr');

    function tick() {
      if (resultsAudio.paused) {
        playbackTracker = requestAnimationFrame(tick);
        return;
      }

      const currentMs = resultsAudio.currentTime * 1000;

      // Find which frame we're in
      let activeIdx = -1;
      for (let i = 0; i < frames.length; i++) {
        if (currentMs >= frames[i].start_time_ms && currentMs < frames[i].end_time_ms) {
          activeIdx = i;
          break;
        }
      }

      bars.forEach((bar, i) => bar.classList.toggle('active', i === activeIdx));
      rows.forEach((row, i) => row.classList.toggle('active', i === activeIdx));

      playbackTracker = requestAnimationFrame(tick);
    }

    playbackTracker = requestAnimationFrame(tick);
  }

  // ── Stats Modal ───────────────────────────────────────────────────────────

  function showStatsModal() {
    if (!currentData) return;

    const frames = currentData.frames || [];
    const synFrames = frames.filter(f => f.synthetic_voice);
    const avgSynConf = synFrames.length ? synFrames.reduce((s, f) => s + f.confidence, 0) / synFrames.length : 0;
    const maxSynConf = synFrames.length ? Math.max(...synFrames.map(f => f.confidence)) : 0;
    const durationMs = currentData.duration_ms || 0;
    const m = currentMeta;

    // Verdict
    const highConf99 = synFrames.filter(f => f.confidence > 0.99).length;
    const highConf90 = synFrames.filter(f => f.confidence > 0.90).length;
    const isSyn = highConf99 >= 1 || highConf90 >= 2;

    // Processing
    const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
    const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
    const costVal = durationMs ? '$' + (durationMs / 3600000 * 0.25).toFixed(4) : 'N/A';

    // HTTP
    const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';

    // File type: derive from filename extension if not from File object
    const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');

    const groups = [
      { group: 'Detection', rows: [
        ['Model', 'velma-2-synthetic-voice-detection'],
        ['Verdict', isSyn ? 'Deepfake detected' : 'Authentic'],
        ['Deepfake segments', synFrames.length + ' / ' + frames.length],
        ['Avg deepfake confidence', synFrames.length ? (avgSynConf * 100).toFixed(1) + '%' : 'N/A'],
        ['Max deepfake confidence', synFrames.length ? (maxSynConf * 100).toFixed(1) + '%' : 'N/A'],
      ]},
      { group: 'Audio', rows: [
        ['File Name', currentData.filename || 'N/A'],
        ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
        ['File Type', fileType],
        ['Audio Duration', formatDuration(durationMs)],
        ['Total segments', String(frames.length)],
      ]},
      { group: 'Performance', rows: [
        ['Processing Time', procTimeStr],
        ['Processing Factor', procFactor],
        ['Cost', costVal],
        ['Rate', '$0.25/hr'],
      ]},
      { group: 'Request', rows: [
        ['HTTP', httpStr],
        ['Endpoint', '/api/velma-2-synthetic-voice-detection-batch'],
        ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
      ]},
    ];

    let html = '<table class="stats-table">';
    groups.forEach(g => {
      html += '<tr class="stats-group-row"><td colspan="2">' + g.group + '</td></tr>';
      g.rows.forEach(([label, value]) => {
        html += '<tr><td class="stats-label">' + label + '</td><td class="stats-value">' + value + '</td></tr>';
      });
    });
    html += '</table>';

    statsGrid.innerHTML = html;
    statsModal.classList.add('visible');
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function formatDuration(ms) {
    if (ms < 1000) return ms.toFixed(0) + 'ms';
    const sec = ms / 1000;
    if (sec < 60) return sec.toFixed(2) + 's';
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toFixed(1);
    return m + 'm ' + s + 's';
  }

  // ── JSON Modal ────────────────────────────────────────────────────────────

  function showJsonModal() {
    if (!currentData) return;
    jsonPre.innerHTML = syntaxHighlightJson(JSON.stringify(currentData, null, 2));
    jsonModal.classList.add('visible');
  }

  function syntaxHighlightJson(json) {
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/:\s*("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")/g, ': <span class="json-string">$1</span>')
      .replace(/:\s*(-?\d+\.?\d*([eE][+-]?\d+)?)/g, ': <span class="json-number">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
      .replace(/([{}[\]])/g, '<span class="json-brace">$1</span>');
  }

  // ── Error Toast ───────────────────────────────────────────────────────────

  function showError(msg) {
    errorToast.textContent = msg;
    errorToast.classList.add('visible');
    setTimeout(() => errorToast.classList.remove('visible'), 5000);
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  function formatMs(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '\u2026' : str;
  }

  // Maps confidence (0.5–1.0) to opacity for histogram bars only.
  // 100% → 1.0, 90% → 0.72, 80% → 0.48, 75% → 0.38, 60% → 0.30
  function confidenceToOpacity(c) {
    const t = Math.max(0, (c - 0.5) / 0.5); // 0..1 where 1=100%, 0=50%
    return Math.max(0.3, Math.pow(t, 1.8)).toFixed(2);
  }
})();
