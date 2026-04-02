// ── Deepfake Detection Page — Batch Analysis ────────────────────────────────
(function () {
  'use strict';

  // Speed factor: API processes ~90x real-time
  const SPEED_FACTOR = 90;
  const MIN_PROGRESS_MS = 1500;

  // ── Cached demo data (pre-computed so the page loads instantly) ────────
  const DEMO_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":0,"end_time_ms":4000,"verdict":"synthetic","confidence":0.9848},{"start_time_ms":4000,"end_time_ms":8000,"verdict":"synthetic","confidence":0.9571},{"start_time_ms":8000,"end_time_ms":12000,"verdict":"non-synthetic","confidence":0.9398},{"start_time_ms":12000,"end_time_ms":16000,"verdict":"synthetic","confidence":0.9595},{"start_time_ms":16000,"end_time_ms":20000,"verdict":"non-synthetic","confidence":0.8176},{"start_time_ms":20000,"end_time_ms":24000,"verdict":"non-synthetic","confidence":0.9524},{"start_time_ms":24000,"end_time_ms":28000,"verdict":"synthetic","confidence":0.9089},{"start_time_ms":28000,"end_time_ms":32000,"verdict":"synthetic","confidence":0.9696},{"start_time_ms":32000,"end_time_ms":36000,"verdict":"synthetic","confidence":0.972},{"start_time_ms":36000,"end_time_ms":40000,"verdict":"non-synthetic","confidence":0.9173},{"start_time_ms":40000,"end_time_ms":44000,"verdict":"synthetic","confidence":0.9785},{"start_time_ms":44000,"end_time_ms":48000,"verdict":"non-synthetic","confidence":0.9094},{"start_time_ms":48000,"end_time_ms":52000,"verdict":"non-synthetic","confidence":0.6542},{"start_time_ms":52000,"end_time_ms":56000,"verdict":"synthetic","confidence":0.9671},{"start_time_ms":56000,"end_time_ms":60000,"verdict":"non-synthetic","confidence":0.9443},{"start_time_ms":60000,"end_time_ms":64000,"verdict":"synthetic","confidence":0.9611},{"start_time_ms":64000,"end_time_ms":68000,"verdict":"non-synthetic","confidence":0.9418},{"start_time_ms":68000,"end_time_ms":72000,"verdict":"synthetic","confidence":0.984},{"start_time_ms":72000,"end_time_ms":76000,"verdict":"non-synthetic","confidence":0.9723},{"start_time_ms":76000,"end_time_ms":80000,"verdict":"synthetic","confidence":0.9755},{"start_time_ms":80000,"end_time_ms":84000,"verdict":"non-synthetic","confidence":0.5998},{"start_time_ms":84000,"end_time_ms":88000,"verdict":"synthetic","confidence":0.9757},{"start_time_ms":88000,"end_time_ms":92000,"verdict":"synthetic","confidence":0.9563},{"start_time_ms":92000,"end_time_ms":96000,"verdict":"non-synthetic","confidence":0.9242},{"start_time_ms":96000,"end_time_ms":97698,"verdict":"synthetic","confidence":0.9821}],"duration_ms":97698};

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

  // ── Verdict helpers ───────────────────────────────────────────────────────
  function isSyntheticFrame(f) { return f.verdict === 'synthetic'; }
  function isNoContent(f) { return f.verdict === 'no-content'; }

  function computeVerdict(frames) {
    const synFrames = frames.filter(isSyntheticFrame);
    const c98 = synFrames.filter(f => f.confidence > 0.98).length;
    const c95 = synFrames.filter(f => f.confidence > 0.95).length;
    const c90 = synFrames.filter(f => f.confidence > 0.90).length;
    const c85 = synFrames.filter(f => f.confidence > 0.85).length;
    const pct = frames.length > 0 ? synFrames.length / frames.length : 0;
    let reason = '';
    if (c98 >= 1) reason = c98 + ' segment' + (c98 > 1 ? 's' : '') + ' with >98% conf.';
    else if (c95 >= 2) reason = c95 + ' segments with >95% conf.';
    else if (c90 >= 3) reason = c90 + ' segments with >90% conf.';
    else if (c85 >= 5) reason = c85 + ' segments with >85% conf.';
    else if (frames.length >= 7 && pct > 0.3) reason = Math.round(pct * 100) + '% of segments flagged as deepfake';
    const isSynthetic = reason !== '';
    return { isSynthetic, synFrames, reason };
  }
  function verdictClass(f) {
    if (f.verdict === 'synthetic') return 'synthetic';
    if (f.verdict === 'no-content') return 'no-content';
    return 'authentic';
  }
  function verdictText(f) {
    if (f.verdict === 'synthetic') return 'Deepfake';
    if (f.verdict === 'no-content') return 'No Content';
    return 'Authentic';
  }

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

    const { isSynthetic, synFrames, reason } = computeVerdict(frames);

    renderVerdict(isSynthetic, synFrames.length, frames.length, reason);
    renderHistogram(frames);
    renderTable(frames);
    setupPlaybackTracking(frames);

    window.scrollTo(0, 0);
  }

  function renderVerdict(isSynthetic, syntheticCount, totalCount, reason) {
    const cls = isSynthetic ? 'synthetic' : 'authentic';
    verdictRing.className = 'verdict-ring ' + cls;

    verdictIcon.innerHTML = isSynthetic
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="4" x2="12" y2="8"/><circle cx="12" cy="3" r="1"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

    verdictLabel.textContent = isSynthetic ? 'Deepfake' : 'Authentic';
    verdictCount.textContent = syntheticCount + '/' + totalCount + ' deepfake segments';

    let reasonEl = verdictCount.parentElement.querySelector('.verdict-reason');
    if (isSynthetic && reason) {
      if (!reasonEl) {
        reasonEl = document.createElement('div');
        reasonEl.className = 'verdict-reason';
        reasonEl.style.cssText = 'font-size:0.7rem;opacity:0.55;margin-top:2px;';
        verdictCount.parentElement.appendChild(reasonEl);
      }
      reasonEl.textContent = reason;
      reasonEl.hidden = false;
    } else if (reasonEl) {
      reasonEl.hidden = true;
    }
  }

  function renderHistogram(frames) {
    histogram.innerHTML = '';
    if (!frames.length) return;

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'histo-bar ' + verdictClass(frame);
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
      pill.className = 'verdict-pill ' + verdictClass(frame);
      pill.textContent = verdictText(frame);
      tdVerdict.appendChild(pill);

      const tdConf = document.createElement('td');
      const confWrap = document.createElement('div');
      confWrap.className = 'confidence-cell';

      const confTrack = document.createElement('div');
      confTrack.className = 'confidence-bar-track';
      const confFill = document.createElement('div');
      confFill.className = 'confidence-bar-fill ' + verdictClass(frame);
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
    const { isSynthetic: isSyn, synFrames } = computeVerdict(frames);
    const avgSynConf = synFrames.length ? synFrames.reduce((s, f) => s + f.confidence, 0) / synFrames.length : 0;
    const maxSynConf = synFrames.length ? Math.max(...synFrames.map(f => f.confidence)) : 0;
    const durationMs = currentData.duration_ms || 0;
    const m = currentMeta;

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
        ['Model', 'velma-2-synthetic-voice-detection-batch'],
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
