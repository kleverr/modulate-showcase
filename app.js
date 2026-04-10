// ── Unified App — Deepfake Detection + Transcription ──────────────────────────
(function () {
  'use strict';

  // ── Constants ───────────────────────────────────────────────────────────────
  const SPEED_FACTOR = 90;
  const MIN_PROGRESS_MS = 1500;

  const DEMO_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_STT_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":0,"end_time_ms":4000,"verdict":"synthetic","confidence":0.9848},{"start_time_ms":4000,"end_time_ms":8000,"verdict":"synthetic","confidence":0.9571},{"start_time_ms":8000,"end_time_ms":12000,"verdict":"non-synthetic","confidence":0.9398},{"start_time_ms":12000,"end_time_ms":16000,"verdict":"synthetic","confidence":0.9595},{"start_time_ms":16000,"end_time_ms":20000,"verdict":"non-synthetic","confidence":0.8176},{"start_time_ms":20000,"end_time_ms":24000,"verdict":"non-synthetic","confidence":0.9524},{"start_time_ms":24000,"end_time_ms":28000,"verdict":"synthetic","confidence":0.9089},{"start_time_ms":28000,"end_time_ms":32000,"verdict":"synthetic","confidence":0.9696},{"start_time_ms":32000,"end_time_ms":36000,"verdict":"synthetic","confidence":0.972},{"start_time_ms":36000,"end_time_ms":40000,"verdict":"non-synthetic","confidence":0.9173},{"start_time_ms":40000,"end_time_ms":44000,"verdict":"synthetic","confidence":0.9785},{"start_time_ms":44000,"end_time_ms":48000,"verdict":"non-synthetic","confidence":0.9094},{"start_time_ms":48000,"end_time_ms":52000,"verdict":"non-synthetic","confidence":0.6542},{"start_time_ms":52000,"end_time_ms":56000,"verdict":"synthetic","confidence":0.9671},{"start_time_ms":56000,"end_time_ms":60000,"verdict":"non-synthetic","confidence":0.9443},{"start_time_ms":60000,"end_time_ms":64000,"verdict":"synthetic","confidence":0.9611},{"start_time_ms":64000,"end_time_ms":68000,"verdict":"non-synthetic","confidence":0.9418},{"start_time_ms":68000,"end_time_ms":72000,"verdict":"synthetic","confidence":0.984},{"start_time_ms":72000,"end_time_ms":76000,"verdict":"non-synthetic","confidence":0.9723},{"start_time_ms":76000,"end_time_ms":80000,"verdict":"synthetic","confidence":0.9755},{"start_time_ms":80000,"end_time_ms":84000,"verdict":"non-synthetic","confidence":0.5998},{"start_time_ms":84000,"end_time_ms":88000,"verdict":"synthetic","confidence":0.9757},{"start_time_ms":88000,"end_time_ms":92000,"verdict":"synthetic","confidence":0.9563},{"start_time_ms":92000,"end_time_ms":96000,"verdict":"non-synthetic","confidence":0.9242},{"start_time_ms":96000,"end_time_ms":97698,"verdict":"synthetic","confidence":0.9821}],"duration_ms":97698};

  const DEMO_STT_DATA = {"filename":"AIAgentFrustration.mp3","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today? Track an order. Thank you. Can you provide the account ID number or the name on the account? 02738917. Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today? No, track an order. Thank you. Please provide the item number to place an order. No, no, track an existing order. I'm sorry, I didn't quite catch that. Did you say you'd like to place an order? No. Okay. Can you describe in a few words your reason for calling today? Track an order. Thank you. Did you say you'd like to place an order over the phone? No, track, tracking. I'm sorry, I didn't quite catch that. Can you answer yes or no? No, back, undo. I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today? Track package. Thank you. Did you say you'd like to place an order?","duration_ms":97320,"utterances":[{"utterance_uuid":"59578ed0-acb4-4941-9c4d-b792c9a3760b","text":"Welcome to Northwest Warehouse's automated customer service system. In a few words, can you describe your reason for calling today?","start_ms":240,"duration_ms":7260,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9810000000000001},{"utterance_uuid":"0e0d034a-aef3-44a4-9ea8-9de1eca2af2b","text":"Track an order.","start_ms":9420,"duration_ms":660,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.5392},{"utterance_uuid":"2282571c-b16c-49cc-ac67-1253ddc99ff9","text":"Thank you. Can you provide the account ID number or the name on the account?","start_ms":12300,"duration_ms":4680,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9783999999999999},{"utterance_uuid":"02b1d2d1-c057-455a-ab1e-6750ee5e5f4c","text":"02738917.","start_ms":19320,"duration_ms":4620,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.2754},{"utterance_uuid":"517e8e3b-8555-419a-af55-60f112763e5b","text":"Thank you. Let me find your account in our system. Hello, <pii:firstname>Roger</pii:firstname>. Would you like to place an order over the phone today?","start_ms":25560,"duration_ms":8820,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723333333333333},{"utterance_uuid":"46c11e6d-7ffa-44a4-bf75-21ed6482ae95","text":"No, track an order.","start_ms":36720,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08640000000000003},{"utterance_uuid":"36ecffcb-834f-43a0-b822-606eddb9efeb","text":"Thank you. Please provide the item number to place an order.","start_ms":40620,"duration_ms":3660,"speaker":1,"language":"en","emotion":"Calm","accent":"American","deepfake_score":0.9796},{"utterance_uuid":"47d3b3ba-71f5-48f9-ba46-c0bdf44f2900","text":"No, no, track an existing order.","start_ms":46080,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.08150000000000002},{"utterance_uuid":"4ddc44b8-e4ab-4024-875c-5be369a43654","text":"I'm sorry, I didn't quite catch that. Did you say you'd like to place an order?","start_ms":50520,"duration_ms":4620,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9727},{"utterance_uuid":"00c4dfe6-ac97-4e74-809c-564937cc718a","text":"No.","start_ms":56280,"duration_ms":60,"speaker":2,"language":"en","emotion":"Amused","accent":"American","deepfake_score":null},{"utterance_uuid":"00be4745-849b-4814-94a0-7768aac15c82","text":"Okay. Can you describe in a few words your reason for calling today?","start_ms":59040,"duration_ms":5340,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.78235},{"utterance_uuid":"e9bec06b-a77f-4713-b0e2-17ce89a03dbc","text":"Track an order.","start_ms":66600,"duration_ms":1080,"speaker":2,"language":"en","emotion":"Confident","accent":"American","deepfake_score":0.08599999999999997},{"utterance_uuid":"135317de-c976-497f-918e-9ccfd1dbc0fd","text":"Thank you. Did you say you'd like to place an order over the phone?","start_ms":69180,"duration_ms":3120,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9778},{"utterance_uuid":"66bc4b5f-3be1-44dd-9f0c-8aae8589e5a8","text":"No, track, tracking.","start_ms":73560,"duration_ms":2160,"speaker":2,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":null},{"utterance_uuid":"c8093216-16b3-44ca-b30d-ff8274196cde","text":"I'm sorry, I didn't quite catch that. Can you answer yes or no?","start_ms":77280,"duration_ms":4320,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9766},{"utterance_uuid":"3de81bf7-a453-4618-a265-962e902c4d50","text":"No, back, undo.","start_ms":82320,"duration_ms":1560,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American","deepfake_score":0.07579999999999998},{"utterance_uuid":"1415b904-e949-4fb2-a3a3-629df8e6610a","text":"I'm sorry, I didn't quite catch that. Can you describe in a few words your reason for calling today?","start_ms":85260,"duration_ms":5640,"speaker":1,"language":"en","emotion":"Neutral","accent":"American","deepfake_score":0.9788},{"utterance_uuid":"ec69b9e7-0fac-4b3e-a4da-ea9773d56aed","text":"Track package.","start_ms":91620,"duration_ms":960,"speaker":2,"language":"en","emotion":"Excited","accent":"American","deepfake_score":0.10909999999999997},{"utterance_uuid":"4003694d-b15d-46b1-9276-80366dc178fc","text":"Thank you. Did you say you'd like to place an order?","start_ms":94320,"duration_ms":3000,"speaker":1,"language":"en","emotion":"Interested","accent":"American","deepfake_score":0.9723}]};

  // ── Verdict helpers ─────────────────────────────────────────────────────────
  function isSyntheticFrame(f) { return f.verdict === 'synthetic'; }

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

  // ── Mode State ──────────────────────────────────────────────────────────────
  let currentMode = 'transcription'; // 'deepfake' | 'transcription'

  // ── DOM refs ────────────────────────────────────────────────────────────────
  const overlay       = document.getElementById('analysis-overlay');
  const progressFill  = document.getElementById('progress-fill');
  const analysisTitle = document.getElementById('analysis-title');
  const analysisStatus = document.getElementById('analysis-status');
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
  const histoTooltip  = document.getElementById('histo-tooltip');
  const sttChart      = document.getElementById('stt-chart');

  // Mode toggle
  const modeRadios    = document.querySelectorAll('input[name="mode"]');
  const deepfakeContent = document.getElementById('deepfake-content');
  const transcriptContainer = document.getElementById('transcript-container');
  const transcriptList = document.getElementById('transcript-list');
  const resultsVerdict = document.getElementById('results-verdict');
  const resultsSidebar = document.getElementById('results-sidebar');
  const sttOptions    = document.getElementById('stt-options');

  // Modals
  const statsModal    = document.getElementById('stats-modal');
  const statsModalTitle = document.getElementById('stats-modal-title');
  const statsGrid     = document.getElementById('stats-grid');
  const jsonModal     = document.getElementById('json-modal');
  const jsonPre       = document.getElementById('json-pre');
  const jsonCopyBtn   = document.getElementById('json-copy-btn');

  // ── State ───────────────────────────────────────────────────────────────────
  let audioObjectUrl = null;
  let progressTimer = null;
  let currentData = null;
  let currentMeta = {};
  let currentFrames = [];
  let playbackTracker = null;

  // Persist last deepfake/STT results so mode-switching doesn't lose them
  let lastDeepfakeData = null;
  let lastDeepfakeAudioUrl = null;
  let lastDeepfakeMeta = null;
  let lastSttData = null;
  let lastSttAudioUrl = null;
  let lastSttMeta = null;
  let isAnalyzing = false;
  let sttChartTracker = null;

  // Transcription state
  let sttUtterances = [];
  let sttPartial = null;
  let sttData = null;

  // ── Mobile layout ───────────────────────────────────────────────────────────
  const resultsLayout   = document.querySelector('.results-layout');
  const resultsMain     = document.querySelector('.results-main');
  const histogramSection = document.querySelector('.histogram-section');

  function applyMobileLayout(isMobile) {
    if (!resultsVerdict || !resultsLayout || !resultsMain || !histogramSection) return;
    if (currentMode !== 'deepfake') return;
    if (isMobile) {
      resultsMain.insertBefore(resultsVerdict, histogramSection);
    } else {
      resultsLayout.appendChild(resultsVerdict);
    }
  }

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  applyMobileLayout(mobileQuery.matches);
  mobileQuery.addEventListener('change', e => applyMobileLayout(e.matches));

  // ── Mode Switching ──────────────────────────────────────────────────────────
  function switchMode(mode, pushUrl) {
    currentMode = mode;
    const isDeepfake = mode === 'deepfake';

    // Update URL
    const targetPath = isDeepfake ? '/deepfake' : '/transcription';
    if (pushUrl !== false && location.pathname !== targetPath) {
      history.pushState({ mode: mode }, '', targetPath + location.search);
    }

    deepfakeContent.style.display = isDeepfake ? '' : 'none';
    resultsVerdict.style.display = isDeepfake ? '' : 'none';
    transcriptContainer.classList.toggle('visible', !isDeepfake);
    resultsSidebar.classList.toggle('visible', !isDeepfake);
    sttOptions.classList.toggle('visible', !isDeepfake);

    // Stop any running animation frame trackers
    if (playbackTracker) { cancelAnimationFrame(playbackTracker); playbackTracker = null; }
    if (sttChartTracker) { cancelAnimationFrame(sttChartTracker); sttChartTracker = null; }

    if (recordAction) {
      recordAction.classList.remove('disabled-soon');
      const span = recordAction.querySelector('span');
      span.textContent = 'Start streaming';
    }

    if (isRecording) stopRecording();

    if (isDeepfake) {
      const dfData = lastDeepfakeData || DEMO_DATA;
      const dfAudio = lastDeepfakeAudioUrl || DEMO_AUDIO_URL;
      currentMeta = lastDeepfakeMeta || {
        fileSize: 1.87 * 1024 * 1024,
        fileType: 'audio/mpeg',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: 4.2 * 1024,
        processingMs: 2660,
      };
      renderDeepfakeResults(dfData, dfAudio);
      applyMobileLayout(mobileQuery.matches);
    } else {
      const sData = lastSttData || DEMO_STT_DATA;
      const sAudio = lastSttAudioUrl || DEMO_STT_AUDIO_URL;
      sttData = sData;
      currentData = sData;
      sttUtterances = sData.utterances || [];
      sttPartial = null;
      currentMeta = lastSttMeta || {
        fileSize: 1.87 * 1024 * 1024,
        fileType: 'audio/mpeg',
        httpStatus: 200,
        httpStatusText: 'OK',
        responseSize: JSON.stringify(DEMO_STT_DATA).length,
        processingMs: 2660,
      };
      resultsFilename.textContent = sData.filename || 'Irate_Caller_Final.mp3';
      resultsAudio.src = sAudio;
      renderTranscript();
    }
  }

  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) switchMode(radio.value);
    });
  });

  // ── STT Options Helper ──────────────────────────────────────────────────────
  const optFast = document.getElementById('opt-fast');
  const optDiarization = document.getElementById('opt-diarization');
  const optDeepfake = document.getElementById('opt-deepfake');
  const optEmotion = document.getElementById('opt-emotion');
  const optAccent = document.getElementById('opt-accent');
  const optPii = document.getElementById('opt-pii');
  const richOpts = [optDiarization, optDeepfake, optEmotion, optAccent, optPii];

  optFast.addEventListener('change', () => {
    if (optFast.checked) richOpts.forEach(cb => { cb.checked = false; });
  });
  richOpts.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) optFast.checked = false;
    });
  });

  function isFastMode() { return optFast.checked; }

  function getSttOptions() {
    return {
      speaker_diarization: optDiarization.checked,
      deepfake_signal: optDeepfake.checked,
      emotion_signal: optEmotion.checked,
      accent_signal: optAccent.checked,
      pii_phi_tagging: optPii.checked,
    };
  }

  // Speed factor for transcription: all 4 checked = 8x, just diarization = 20x, any 3 = 15x
  function getSttSpeedFactor() {
    if (isFastMode()) return 60; // vfast model is ~60x realtime
    const opts = getSttOptions();
    const count = [opts.emotion_signal, opts.accent_signal, opts.pii_phi_tagging].filter(Boolean).length;
    if (count >= 3) return 8;
    if (count >= 2) return 15;
    if (count >= 1) return 15;
    return 20;
  }

  // ── Upload action: click + drag-and-drop ──────────────────────────────────
  if (uploadAction && fileInput) {
    uploadAction.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        if (currentMode === 'deepfake') {
          startDeepfakeAnalysis(fileInput.files[0]);
        } else {
          startTranscriptionBatch(fileInput.files[0]);
        }
        fileInput.value = '';
      }
    });

    let dragCtr = 0;
    uploadAction.addEventListener('dragenter', (e) => { e.preventDefault(); dragCtr++; uploadAction.classList.add('drag-over'); });
    uploadAction.addEventListener('dragleave', (e) => { e.preventDefault(); dragCtr--; if (dragCtr <= 0) { dragCtr = 0; uploadAction.classList.remove('drag-over'); } });
    uploadAction.addEventListener('dragover', (e) => e.preventDefault());
    uploadAction.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCtr = 0;
      uploadAction.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        if (currentMode === 'deepfake') startDeepfakeAnalysis(e.dataTransfer.files[0]);
        else startTranscriptionBatch(e.dataTransfer.files[0]);
      }
    });
  }

  // ── Live Recording State ───────────────────────────────────────────────────
  let isRecording = false;
  let mediaStream = null;
  let audioContext = null;
  let scriptProcessor = null;
  let recordingWs = null;
  let liveFrames = [];
  let recordingStartTime = 0;
  let mediaRecorder = null;
  let recordedChunks = [];

  if (recordAction) {
    recordAction.addEventListener('click', () => {
      if (recordAction.classList.contains('disabled-soon')) return;
      if (isRecording) {
        stopRecording();
      } else {
        if (currentMode === 'deepfake') startDeepfakeRecording();
        else startTranscriptionRecording();
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── DEEPFAKE MODE ─────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function startDeepfakeAnalysis(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Detecting synthetic voice across all segments');
    const estimatedMs = Math.max(MIN_PROGRESS_MS, (durationMs / SPEED_FACTOR));
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const { data, meta } = await uploadAndAnalyze(file, '/api/velma-2-synthetic-voice-detection-batch');
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();

      if (lastDeepfakeAudioUrl) URL.revokeObjectURL(lastDeepfakeAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs: processingMs,
      };

      lastDeepfakeData = data;
      lastDeepfakeAudioUrl = audioObjectUrl;
      lastDeepfakeMeta = { ...currentMeta };
      renderDeepfakeResults(data, audioObjectUrl);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Analysis failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function startDeepfakeRecording() {
    startRecordingCommon('/api/velma-2-synthetic-voice-detection-streaming?audio_format=s16le&sample_rate=16000&num_channels=1', (msg) => {
      if (msg?.type === 'frame' && msg.frame && typeof msg.frame.confidence === 'number') {
        liveFrames.push(msg.frame);
        renderDeepfakeLiveResults();
      } else if (msg?.type === 'done') {
        stopRecording();
      } else if (msg?.type === 'error') {
        showError('Streaming error: ' + (msg.error || 'Unknown'));
        if (liveFrames.length > 0) stopRecording();
        else cleanupRecording();
      }
    }, () => {
      resultsFilename.textContent = 'Live Recording';
      resultsAudio.removeAttribute('src');
      resultsAudio.load();
      if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
      currentData = null;

      verdictRing.className = 'verdict-ring pending';
      verdictIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>';
      verdictLabel.textContent = 'Listening';
      verdictCount.textContent = 'No segments';

      histogram.innerHTML = '';
      const placeholderBar = document.createElement('div');
      placeholderBar.className = 'histo-bar';
      placeholderBar.style.height = '40%';
      placeholderBar.style.background = 'var(--ui-border)';
      histogram.appendChild(placeholderBar);

      resultsTbody.innerHTML = '';
      const placeholderRow = document.createElement('tr');
      placeholderRow.style.color = 'var(--text-caption)';
      const tdTime = document.createElement('td');
      tdTime.textContent = '0:00 \u2013 \u2026';
      const tdVerdict = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'verdict-pill';
      pill.style.background = 'var(--ui-border)';
      pill.style.color = 'var(--text-caption)';
      pill.textContent = 'Pending';
      tdVerdict.appendChild(pill);
      const tdConf = document.createElement('td');
      tdConf.textContent = '\u2014';
      placeholderRow.appendChild(tdTime);
      placeholderRow.appendChild(tdVerdict);
      placeholderRow.appendChild(tdConf);
      resultsTbody.appendChild(placeholderRow);

      window.scrollTo(0, 0);
    });
  }

  function renderDeepfakeLiveResults() {
    if (!liveFrames.length) return;
    const durationMs = Date.now() - recordingStartTime;
    currentData = { filename: 'Live Recording', frames: liveFrames, duration_ms: durationMs };
    resultsFilename.textContent = 'Live Recording';
    currentFrames = liveFrames;

    const { isSynthetic, synFrames, reason } = computeVerdict(liveFrames);

    renderVerdict(isSynthetic, synFrames.length, liveFrames.length, reason);
    renderHistogram(liveFrames);
    renderTable(liveFrames);
  }

  function renderDeepfakeResults(data, audioSrc) {
    currentData = data;
    resultsFilename.textContent = data.filename || 'Audio file';
    resultsAudio.src = audioSrc;

    const frames = data.frames || [];
    currentFrames = frames;

    if (frames.length === 0) {
      verdictRing.className = 'verdict-ring authentic';
      verdictIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      verdictLabel.textContent = 'Insufficient data';
      verdictCount.textContent = 'Audio too short to analyze';
      renderHistogram(frames);
      renderTable(frames);
      return;
    }

    const { isSynthetic, synFrames, reason } = computeVerdict(frames);

    renderVerdict(isSynthetic, synFrames.length, frames.length, reason);
    renderHistogram(frames);
    renderTable(frames);
    setupPlaybackTracking(frames);
    window.scrollTo(0, 0);
  }

  function renderVerdict(isSynthetic, syntheticCount, totalCount, reason) {
    verdictRing.className = 'verdict-ring ' + (isSynthetic ? 'synthetic' : 'authentic');

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

    const squaresRow = document.createElement('div');
    squaresRow.className = 'histo-squares';

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'histo-bar ' + verdictClass(frame);
      const alpha = confidenceToOpacity(frame.confidence);
      const vc = verdictClass(frame);
      const rgb = vc === 'synthetic' ? '255,53,84' : vc === 'no-content' ? '220,220,230' : '21,207,135';
      bar.style.background = 'rgba(' + rgb + ',' + alpha + ')';

      const verdictWord = verdictText(frame);
      const verdictColor = vc === 'synthetic' ? 'rgb(255,53,84)' : vc === 'no-content' ? 'rgb(120,120,140)' : 'rgb(21,207,135)';
      const tooltipHtml =
        formatMs(frame.start_time_ms) + ' \u2013 ' + formatMs(frame.end_time_ms) +
        ' <span style="color:' + verdictColor + '">\u00B7 <span style="font-weight:700">' + verdictWord + '</span>' +
        ' \u00B7 ' + (frame.confidence * 100).toFixed(0) + '%</span>';

      bar.addEventListener('mouseenter', () => {
        const rect = bar.getBoundingClientRect();
        histoTooltip.innerHTML = tooltipHtml;
        histoTooltip.style.display = 'block';
        histoTooltip.style.top = (rect.top - 6) + 'px';
        histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
        histoTooltip.style.transform = 'translate(-50%, -100%)';
      });
      bar.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });
      bar.addEventListener('click', () => seekTo(frame.start_time_ms, i));
      squaresRow.appendChild(bar);
    });
    histogram.appendChild(squaresRow);

    const axisRow = document.createElement('div');
    axisRow.className = 'histo-axis';
    frames.forEach((frame, i) => {
      const tick = document.createElement('div');
      tick.className = 'histo-tick';
      if (i % 5 === 0) tick.textContent = formatSecCompact(frame.start_time_ms);
      axisRow.appendChild(tick);
    });
    histogram.appendChild(axisRow);
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
    histogram.querySelectorAll('.histo-bar').forEach((bar, i) => bar.classList.toggle('active', i === index));
    resultsTbody.querySelectorAll('tr').forEach((row, i) => row.classList.toggle('active', i === index));
  }

  function setupPlaybackTracking(frames) {
    if (playbackTracker) cancelAnimationFrame(playbackTracker);
    const bars = histogram.querySelectorAll('.histo-bar');
    const rows = resultsTbody.querySelectorAll('tr');

    function tick() {
      if (resultsAudio.paused) { playbackTracker = requestAnimationFrame(tick); return; }
      const currentMs = resultsAudio.currentTime * 1000;
      // Find the last frame whose start_time_ms <= currentMs (handles overlapping frames)
      let activeIdx = -1;
      for (let i = frames.length - 1; i >= 0; i--) {
        if (currentMs >= frames[i].start_time_ms && currentMs < frames[i].end_time_ms) { activeIdx = i; break; }
      }
      bars.forEach((bar, i) => bar.classList.toggle('active', i === activeIdx));
      rows.forEach((row, i) => row.classList.toggle('active', i === activeIdx));
      playbackTracker = requestAnimationFrame(tick);
    }
    playbackTracker = requestAnimationFrame(tick);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── TRANSCRIPTION MODE ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function startTranscriptionBatch(file) {
    if (isAnalyzing) return;
    isAnalyzing = true;
    const durationMs = await getAudioDuration(file);
    showOverlay(file.name, 'Analyzing audio');
    const speedFactor = getSttSpeedFactor();
    const estimatedMs = Math.max(MIN_PROGRESS_MS, (durationMs / speedFactor));
    startProgress(estimatedMs);

    try {
      const startedAt = Date.now();
      const fast = isFastMode();
      const endpoint = fast ? '/api/velma-2-stt-batch-english-vfast' : '/api/velma-2-stt-batch';
      const opts = fast ? {} : getSttOptions();
      const { data, meta } = await uploadAndAnalyze(file, endpoint, opts);
      const processingMs = Date.now() - startedAt;
      await finishProgress();
      hideOverlay();

      if (lastSttAudioUrl) URL.revokeObjectURL(lastSttAudioUrl);
      audioObjectUrl = URL.createObjectURL(file);

      currentMeta = {
        fileSize: file.size,
        fileType: file.type || file.name.split('.').pop().toUpperCase(),
        httpStatus: meta.httpStatus,
        httpStatusText: meta.httpStatusText,
        responseSize: meta.responseSize,
        processingMs: processingMs,
      };

      // vfast returns { text, duration_ms } — wrap into utterance format
      if (fast && !data.utterances && data.text) {
        data.utterances = [{ text: data.text, start_ms: 0, duration_ms: data.duration_ms || 0 }];
      }
      sttData = data;
      currentData = data;
      sttUtterances = data.utterances || [];
      sttPartial = null;

      lastSttData = data;
      lastSttAudioUrl = audioObjectUrl;
      lastSttMeta = { ...currentMeta };
      resultsFilename.textContent = data.filename || file.name || 'Audio file';
      resultsAudio.src = audioObjectUrl;
      renderTranscript();
      window.scrollTo(0, 0);
      updateRateLimit();
    } catch (err) {
      showOverlayError(err.message || 'Transcription failed. Please try again.', err.rawText);
      isAnalyzing = false;
    }
  }

  function startTranscriptionRecording() {
    const opts = getSttOptions();
    const params = new URLSearchParams();
    params.set('speaker_diarization', opts.speaker_diarization);
    params.set('emotion_signal', opts.emotion_signal);
    params.set('accent_signal', opts.accent_signal);
    params.set('pii_phi_tagging', opts.pii_phi_tagging);
    // Raw PCM format params — required so the server knows how to decode headerless audio
    params.set('audio_format', 's16le');
    params.set('sample_rate', '16000');
    params.set('num_channels', '1');
    // Enable partial results for real-time text preview
    params.set('partial_results', 'true');

    sttUtterances = [];
    sttPartial = null;
    sttData = null;
    currentData = null;

    startRecordingCommon('/api/velma-2-stt-streaming?' + params.toString(), (msg) => {
      if (msg?.type === 'utterance' && msg.utterance) {
        sttUtterances.push(msg.utterance);
        deduplicateUtterances();
        sttPartial = null;
        updateSttData();
        renderTranscript();
      } else if (msg?.type === 'partial_utterance' && msg.partial_utterance) {
        sttPartial = msg.partial_utterance;
        renderTranscript();
      } else if (msg?.type === 'done') {
        if (sttPartial) {
          sttUtterances.push({
            text: sttPartial.text,
            start_ms: sttPartial.start_ms || 0,
            duration_ms: 0,
            speaker: sttPartial.speaker || 1,
            language: null, emotion: null, accent: null,
          });
          deduplicateUtterances();
          sttPartial = null;
        }
        if (msg.duration_ms) {
          updateSttData();
          if (sttData) sttData.duration_ms = msg.duration_ms;
        }
        renderTranscript();
        stopRecording();
      } else if (msg?.type === 'error') {
        showError('Streaming error: ' + (msg.error || 'Unknown'));
        if (sttUtterances.length > 0) stopRecording();
        else cleanupRecording();
      }
    }, () => {
      resultsFilename.textContent = 'Live Recording';
      resultsAudio.removeAttribute('src');
      resultsAudio.load();
      if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = null; }
      renderTranscript();
      window.scrollTo(0, 0);
    });
  }

  // Cluster raw utterances by time proximity for display.
  // Groups consecutive utterances within 4s of each other (using the max start_ms
  // in each group for chaining), keeps only the longest text per group.
  // Operates on a copy — never mutates sttUtterances.
  function clusterUtterances(utterances) {
    if (utterances.length < 2) return utterances.slice();
    const sorted = utterances.slice().sort((a, b) => a.start_ms - b.start_ms);
    const groups = [[sorted[0]]];
    for (let i = 1; i < sorted.length; i++) {
      const lastGroup = groups[groups.length - 1];
      const groupMaxMs = Math.max(...lastGroup.map(u => u.start_ms));
      if (sorted[i].start_ms - groupMaxMs < 4000) {
        lastGroup.push(sorted[i]);
      } else {
        groups.push([sorted[i]]);
      }
    }
    return groups.map(group =>
      group.reduce((best, u) =>
        (u.text || '').length > (best.text || '').length ? u : best
      )
    );
  }

  function deduplicateUtterances() { /* no-op — dedup now happens in clusterUtterances at render time */ }

  function updateSttData() {
    const durationMs = Date.now() - recordingStartTime;
    sttData = { filename: 'Live Recording', utterances: clusterUtterances(sttUtterances), duration_ms: durationMs };
    currentData = sttData;
  }

  // Lightweight update: only replace/add the partial element at the bottom
  // without rebuilding the entire transcript list (avoids flicker)
  function renderStreamingPartial() {
    // Remove old partial and listening indicator
    const oldPartial = transcriptList.querySelector('[data-partial]');
    if (oldPartial) oldPartial.remove();
    const oldIndicator = transcriptList.querySelector('[data-listening]');
    if (oldIndicator) oldIndicator.remove();

    if (sttPartial) {
      const opts = getSttOptions();
      const el = buildUtteranceEl(sttPartial, opts, true, -1);
      el.setAttribute('data-partial', 'true');
      transcriptList.appendChild(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else if (isRecording) {
      const indicator = document.createElement('div');
      indicator.className = 'transcript-empty';
      indicator.textContent = 'Listening\u2026';
      indicator.style.opacity = '0.5';
      indicator.setAttribute('data-listening', 'true');
      transcriptList.appendChild(indicator);
    }
  }

  function renderTranscript() {
    transcriptList.innerHTML = '';

    if (sttUtterances.length === 0 && !sttPartial) {
      const empty = document.createElement('div');
      empty.className = 'transcript-empty';
      empty.textContent = isRecording ? 'Listening\u2026' : 'Upload an audio file or start recording to see the transcript.';
      if (isRecording) empty.setAttribute('data-listening', 'true');
      transcriptList.appendChild(empty);
      sttChart.innerHTML = '';
      sttChart.classList.remove('visible');
      return;
    }

    const opts = getSttOptions();
    // Only cluster during streaming to merge overlapping partials;
    // batch results are already clean so render them as-is.
    const displayUtterances = isRecording ? clusterUtterances(sttUtterances) : sttUtterances.slice();

    displayUtterances.forEach((u, i) => {
      transcriptList.appendChild(buildUtteranceEl(u, opts, false, i));
    });

    if (sttPartial) {
      const partialEl = buildUtteranceEl(sttPartial, opts, true, -1);
      partialEl.setAttribute('data-partial', 'true');
      transcriptList.appendChild(partialEl);
    }

    // Show a live "listening" indicator only when recording and no partial is active
    if (isRecording && !sttPartial) {
      const indicator = document.createElement('div');
      indicator.className = 'transcript-empty';
      indicator.textContent = 'Listening\u2026';
      indicator.style.opacity = '0.5';
      indicator.setAttribute('data-listening', 'true');
      transcriptList.appendChild(indicator);
    }

    if (isRecording && transcriptList.lastElementChild) {
      transcriptList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Render emotion chart
    const opts2 = getSttOptions();
    if (sttUtterances.length > 0 && !isRecording && opts2.speaker_diarization) {
      renderSttChart();
    } else {
      sttChart.innerHTML = '';
      sttChart.classList.remove('visible');
    }

    // Always track playback → bubble highlights
    if (!isRecording && sttUtterances.length > 0) {
      setupTranscriptPlaybackTracking();
    }
  }

  let sttPlaybackTracker = null;

  function setupTranscriptPlaybackTracking() {
    if (sttPlaybackTracker) cancelAnimationFrame(sttPlaybackTracker);

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      // Sticky: highlight the last utterance whose start_ms <= currentMs
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      transcriptList.querySelectorAll('.transcript-utterance').forEach((el, i) => {
        const wasActive = el.classList.contains('active');
        const nowActive = i === activeIdx;
        el.classList.toggle('active', nowActive);
        if (nowActive && !wasActive) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      sttPlaybackTracker = requestAnimationFrame(tick);
    }
    sttPlaybackTracker = requestAnimationFrame(tick);
  }

  function renderSttChart() {
    sttChart.innerHTML = '';
    if (!sttUtterances.length) { sttChart.classList.remove('visible'); return; }

    // Calculate total duration
    const lastU = sttUtterances[sttUtterances.length - 1];
    const totalMs = (sttData && sttData.duration_ms)
      ? sttData.duration_ms
      : (lastU.start_ms + (lastU.duration_ms || 4000));
    if (totalMs <= 0) return;

    // Group utterances by speaker
    const speakerMap = new Map();
    sttUtterances.forEach((u, i) => {
      const spk = u.speaker != null ? u.speaker : 0;
      if (!speakerMap.has(spk)) speakerMap.set(spk, []);
      speakerMap.get(spk).push({ u, i });
    });
    const speakers = Array.from(speakerMap.keys()).sort((a, b) => a - b);

    // Build rows
    speakers.forEach(spk => {
      const row = document.createElement('div');
      row.className = 'stt-chart-row';

      const label = document.createElement('div');
      label.className = 'stt-chart-label';
      label.textContent = 'Speaker ' + spk;
      row.appendChild(label);

      speakerMap.get(spk).forEach(({ u, i }) => {
        const bar = document.createElement('div');
        bar.className = 'stt-chart-bar';

        // Extend bar to the start of the next utterance from ANY speaker
        let nextStartMs = totalMs;
        for (let j = 0; j < sttUtterances.length; j++) {
          if (sttUtterances[j].start_ms > u.start_ms) {
            nextStartMs = sttUtterances[j].start_ms;
            break;
          }
        }
        const endMs = Math.max(nextStartMs, u.start_ms + (u.duration_ms || 2000));
        const leftPct = (u.start_ms / totalMs * 100).toFixed(3);
        const widthPct = ((endMs - u.start_ms) / totalMs * 100).toFixed(3);
        bar.style.left = leftPct + '%';
        bar.style.width = widthPct + '%';

        const ec = u.emotion ? (EMOTION_COLORS[u.emotion.toLowerCase()] || '#78909c') : '#78909c';
        bar.style.background = ec;

        // Tooltip
        const endTimeMs = u.start_ms + (u.duration_ms || 2000);
        let dfTooltip = '';
        if (u.deepfake_score != null) {
          const s = u.deepfake_score;
          if (s > 0.7) dfTooltip = ' · Deepfake (' + Math.round((s - 0.5) * 200) + '%)';
          else if (s < 0.3) dfTooltip = ' · Authentic (' + Math.round((0.5 - s) * 200) + '%)';
          else dfTooltip = ' · Uncertain authenticity';
        }
        const tooltipText = formatMs(u.start_ms) + ' \u2013 ' + formatMs(endTimeMs) +
          ' · Speaker ' + (u.speaker || 0) + (u.emotion ? ' · ' + u.emotion : '') + dfTooltip;
        bar.addEventListener('mouseenter', () => {
          const rect = bar.getBoundingClientRect();
          histoTooltip.textContent = tooltipText;
          histoTooltip.style.display = 'block';
          histoTooltip.style.top = (rect.top - 6) + 'px';
          histoTooltip.style.left = (rect.left + rect.width / 2) + 'px';
          histoTooltip.style.transform = 'translate(-50%, -100%)';
        });
        bar.addEventListener('mouseleave', () => { histoTooltip.style.display = 'none'; });

        // Click to seek and highlight transcript bubble
        bar.addEventListener('click', () => {
          if (resultsAudio) {
            resultsAudio.currentTime = u.start_ms / 1000;
            resultsAudio.play().catch(() => {});
          }
          const bubbles = transcriptList.querySelectorAll('.transcript-utterance');
          bubbles.forEach((el, j) => el.classList.toggle('active', j === i));
          if (bubbles[i]) bubbles[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        bar.dataset.uttIdx = i;
        row.appendChild(bar);
      });

      sttChart.appendChild(row);
    });

    sttChart.classList.add('visible');

    // Sync chart bars with playback
    setupSttChartPlaybackTracking();
  }

  function setupSttChartPlaybackTracking() {
    if (sttChartTracker) cancelAnimationFrame(sttChartTracker);
    const bars = sttChart.querySelectorAll('.stt-chart-bar');

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      bars.forEach(bar => {
        bar.classList.toggle('active', parseInt(bar.dataset.uttIdx) === activeIdx);
      });
      sttChartTracker = requestAnimationFrame(tick);
    }
    sttChartTracker = requestAnimationFrame(tick);
  }

  const LANGUAGE_FLAGS = {
    EN: '🇬🇧', ES: '🇪🇸', FR: '🇫🇷', DE: '🇩🇪', IT: '🇮🇹',
    PT: '🇵🇹', RU: '🇷🇺', ZH: '🇨🇳', JA: '🇯🇵', KO: '🇰🇷',
    AR: '🇸🇦', HI: '🇮🇳', NL: '🇳🇱', PL: '🇵🇱', SV: '🇸🇪',
    DA: '🇩🇰', NO: '🇳🇴', FI: '🇫🇮', TR: '🇹🇷', EL: '🇬🇷',
    HE: '🇮🇱', TH: '🇹🇭', VI: '🇻🇳', ID: '🇮🇩', MS: '🇲🇾',
    UK: '🇺🇦', CS: '🇨🇿', RO: '🇷🇴', HU: '🇭🇺', BG: '🇧🇬',
    HR: '🇭🇷', SK: '🇸🇰', SL: '🇸🇮', LT: '🇱🇹', LV: '🇱🇻',
    ET: '🇪🇪', CA: '🏳️', GL: '🏳️', EU: '🏳️', FA: '🇮🇷',
    UR: '🇵🇰', BN: '🇧🇩', TA: '🇮🇳', TE: '🇮🇳', MR: '🇮🇳',
    SW: '🇰🇪', AF: '🇿🇦', TL: '🇵🇭', CY: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  };

  const ACCENT_SHORT = {
    American: 'American', British: 'British', Australian: 'Australian',
    Southern: 'Southern US', Indian: 'Indian', Irish: 'Irish', Scottish: 'Scottish',
    Eastern_European: 'E. European', African: 'African', Asian: 'Asian',
    Latin_American: 'Latin Am.', Middle_Eastern: 'Middle Eastern', Unknown: 'Unknown',
  };

  const EMOTION_COLORS = {
    angry: '#e53935', contemptuous: '#c62828', disgusted: '#e91e63',
    afraid: '#ef5350', anxious: '#ff7043',
    stressed: '#8e24aa', surprised: '#7b1fa2', frustrated: '#6a1b9a',
    excited: '#ff5722', hopeful: '#ff9800', amused: '#ff9800',
    proud: '#ec407a', curious: '#ab47bc',
    sad: '#5c6bc0', disappointed: '#42a5f5', bored: '#5c6bc0', tired: '#7986cb',
    concerned: '#26a69a', confused: '#ff8a65',
    calm: '#42a5f5', confident: '#5c6bc0', interested: '#7986cb',
    neutral: '#78909c', unknown: '#546e7a', affectionate: '#ec407a',
  };

  function buildUtteranceEl(u, opts, isPartial, index) {
    const el = document.createElement('div');
    // Alternate bubble alignment by speaker (odd left, even right)
    const side = (u.speaker != null && u.speaker % 2 === 0) ? 'speaker-right' : 'speaker-left';
    el.className = 'transcript-utterance ' + side;

    // No emotion coloring on bubbles
    const emotionColor = (u.emotion && opts.emotion_signal)
      ? EMOTION_COLORS[u.emotion.toLowerCase()] || null : null;
    el.style.setProperty('--ec', emotionColor || '#78909c');

    if (u.start_ms != null && !isPartial) {
      el.addEventListener('click', () => {
        if (resultsAudio) {
          resultsAudio.currentTime = u.start_ms / 1000;
          resultsAudio.play().catch(() => {});
        }
      });
    }

    const header = document.createElement('div');
    header.className = 'transcript-utterance-header';

    // Timestamp (start only)
    if (u.start_ms != null) {
      const time = document.createElement('span');
      time.className = 'transcript-time';
      time.textContent = formatMs(u.start_ms);
      header.appendChild(time);
    }

    // Speaker name
    if (u.speaker != null && opts.speaker_diarization) {
      const sp = document.createElement('span');
      sp.className = 'transcript-speaker';
      sp.textContent = 'Speaker ' + u.speaker;
      header.appendChild(sp);
    }

    // Emotion inline
    if (u.emotion && opts.emotion_signal) {
      const em = document.createElement('span');
      em.className = 'transcript-emotion';
      if (emotionColor) em.style.color = emotionColor;
      em.textContent = u.emotion;
      header.appendChild(em);
    }

    // Language flag
    if (u.language) {
      const flag = LANGUAGE_FLAGS[u.language.toUpperCase()];
      if (flag) {
        const lf = document.createElement('span');
        lf.className = 'transcript-accent';
        lf.textContent = flag;
        lf.title = u.language.toUpperCase();
        header.appendChild(lf);
      }
    }

    // Accent (shortened text, bolded)
    if (u.accent && opts.accent_signal) {
      const la = document.createElement('span');
      la.className = 'transcript-accent';
      la.style.fontWeight = '700';
      la.textContent = (ACCENT_SHORT[u.accent] || u.accent) + ' accent';
      header.appendChild(la);
    }

    // Deepfake verdict pill
    if (opts.deepfake_signal && u.deepfake_score != null) {
      const score = u.deepfake_score;
      const df = document.createElement('span');
      df.className = 'verdict-pill sm';
      if (score > 0.7) {
        const conf = Math.round((score - 0.5) * 2 * 100);
        df.className += ' synthetic';
        df.textContent = 'Deepfake';
        df.title = 'Deepfake · ' + conf + '% confidence';
      } else if (score < 0.3) {
        const conf = Math.round((0.5 - score) * 2 * 100);
        df.className += ' authentic';
        df.textContent = 'Authentic';
        df.title = 'Authentic · ' + conf + '% confidence';
      } else {
        df.className += ' uncertain';
        df.textContent = 'Uncertain authenticity';
        if (score > 0.5) {
          const conf = Math.round((score - 0.5) * 2 * 100);
          df.title = 'Uncertain · leans Deepfake at ' + conf + '% confidence';
        } else if (score < 0.5) {
          const conf = Math.round((0.5 - score) * 2 * 100);
          df.title = 'Uncertain · leans Authentic at ' + conf + '% confidence';
        } else {
          df.title = 'Uncertain · 50/50';
        }
      }
      header.appendChild(df);
    }

    el.appendChild(header);

    const text = document.createElement('div');
    text.className = 'transcript-text' + (isPartial ? ' partial' : '');
    if (opts.pii_phi_tagging && u.text && /<pii:|<phi:/i.test(u.text)) {
      text.innerHTML = renderPiiText(u.text);
    } else {
      text.textContent = u.text || '';
    }
    el.appendChild(text);

    return el;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── SHARED RECORDING LOGIC ────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  function startRecordingCommon(wsPath, onMessage, onOpen) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaStream = stream;

      // MediaRecorder for playback recording (saved locally, not sent over WS)
      const mimeCandidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus'];
      const mimeType = mimeCandidates.find(m => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m));
      mediaRecorder = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream);
      recordedChunks = [];
      mediaRecorder.addEventListener('dataavailable', (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      });
      mediaRecorder.start(200);

      const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = proto + '//' + location.host + wsPath;
      recordingWs = new WebSocket(wsUrl);
      recordingWs.binaryType = 'arraybuffer';

      recordingWs.onopen = () => {
        isRecording = true;
        liveFrames = [];
        recordingStartTime = Date.now();
        updateRecordButton();

        // Stream raw PCM 16-bit little-endian 16kHz mono over WebSocket
        audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        const source = audioContext.createMediaStreamSource(mediaStream);
        scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
        const silencer = audioContext.createGain();
        silencer.gain.value = 0;

        scriptProcessor.onaudioprocess = (e) => {
          if (!isRecording || !recordingWs || recordingWs.readyState !== WebSocket.OPEN) return;
          const float32 = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(float32.length);
          for (let i = 0; i < float32.length; i++) {
            int16[i] = Math.max(-32768, Math.min(32767, Math.round(float32[i] * 32767)));
          }
          recordingWs.send(int16.buffer);
        };

        source.connect(scriptProcessor);
        scriptProcessor.connect(silencer);
        silencer.connect(audioContext.destination);

        if (onOpen) onOpen();
      };

      recordingWs.addEventListener('message', async (event) => {
        let text = '';
        try {
          if (typeof event.data === 'string') text = event.data;
          else if (event.data instanceof Blob) text = await event.data.text();
          else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
        } catch { return; }
        if (!text) return;

        let msg;
        try { msg = JSON.parse(text); } catch { return; }
        onMessage(msg);
      });

      recordingWs.onerror = () => { console.error('WebSocket error'); cleanupRecording(); };

      recordingWs.onclose = (event) => {
        if (isRecording) {
          const hasData = currentMode === 'deepfake' ? liveFrames.length > 0 : sttUtterances.length > 0;
          if (hasData) {
            stopRecording();
          } else {
            cleanupRecording();
            const reason = event.reason || '';
            let msg;
            if (event.code === 1006) msg = 'Could not connect to the server. You may have reached the rate limit \u2014 please wait a minute and try again.';
            else if (event.code === 1011) msg = 'Upstream server error: ' + (reason || 'the service is temporarily unavailable.');
            else if (event.code === 1000 && reason === 'Timeout') msg = 'Recording timed out after 5 minutes.';
            else msg = 'Connection closed' + (reason ? ': ' + reason : '') + ' (code ' + event.code + ').';
            showError(msg);
          }
        }
      };
    }).catch(() => {
      showError('Microphone access denied. Please allow microphone access and try again.');
    });
  }

  function stopRecording() {
    if (scriptProcessor) { scriptProcessor.disconnect(); scriptProcessor = null; }

    if (recordingWs && recordingWs.readyState === WebSocket.OPEN) {
      recordingWs.send('');
      // Don't close immediately — let the server send back final results
      // The connection will close after we receive the 'done' message
    }

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.addEventListener('stop', () => {
        const mt = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(recordedChunks, { type: mt });
        if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
        audioObjectUrl = URL.createObjectURL(blob);
        resultsAudio.src = audioObjectUrl;
        recordedChunks = [];
        mediaRecorder = null;
      });
      mediaRecorder.stop();
    }

    cleanupRecording();

    if (currentMode === 'deepfake' && liveFrames.length > 0) {
      const durationMs = Date.now() - recordingStartTime;
      const data = { filename: 'Live Recording', frames: liveFrames, duration_ms: durationMs };
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: JSON.stringify(data).length, processingMs: durationMs,
      };
      currentData = data;
      currentFrames = liveFrames;

      const { isSynthetic, synFrames, reason } = computeVerdict(liveFrames);

      renderVerdict(isSynthetic, synFrames.length, liveFrames.length, reason);
      renderHistogram(liveFrames);
      renderTable(liveFrames);
    } else if (currentMode === 'transcription') {
      const durationMs = Date.now() - recordingStartTime;
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: sttData ? JSON.stringify(sttData).length : 0, processingMs: durationMs,
      };
      // Keep sttPartial visible until finals arrive from the server.
      // The 'done' handler will promote any lingering partial to a final utterance.
      updateSttData();
      renderTranscript();
    }
  }

  function cleanupRecording() {
    isRecording = false;
    updateRecordButton();
    if (scriptProcessor) { scriptProcessor.disconnect(); scriptProcessor = null; }
    if (audioContext) { audioContext.close().catch(() => {}); audioContext = null; }
    if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
  }

  function updateRecordButton() {
    if (!recordAction) return;
    const span = recordAction.querySelector('span');
    if (isRecording) { recordAction.classList.add('recording'); span.textContent = 'Stop streaming'; }
    else { recordAction.classList.remove('recording'); span.textContent = 'Start streaming'; }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── MODALS ────────────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  document.getElementById('btn-show-stats').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json').addEventListener('click', () => showJsonModal());
  document.getElementById('btn-show-stats-stt').addEventListener('click', () => showStatsModal());
  document.getElementById('btn-show-json-stt').addEventListener('click', () => showJsonModal());

  document.getElementById('stats-modal-close').addEventListener('click', () => statsModal.classList.remove('visible'));
  document.getElementById('json-modal-close').addEventListener('click', () => jsonModal.classList.remove('visible'));
  statsModal.addEventListener('click', (e) => { if (e.target === statsModal) statsModal.classList.remove('visible'); });
  jsonModal.addEventListener('click', (e) => { if (e.target === jsonModal) jsonModal.classList.remove('visible'); });

  jsonCopyBtn.addEventListener('click', () => {
    const text = JSON.stringify(currentData, null, 2);
    const onSuccess = () => {
      jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
      }, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
    } else {
      fallbackCopy(text, onSuccess);
    }
  });

  // ── HubSpot Access Modal ─────────────────────────────────────────────
  const hsModal = document.getElementById('hs-modal');
  const hsClose = document.getElementById('hs-modal-close');
  const ctaBtn = document.getElementById('cta-access-btn');
  if (ctaBtn && hsModal) {
    ctaBtn.addEventListener('click', () => hsModal.classList.add('visible'));
    hsClose.addEventListener('click', () => hsModal.classList.remove('visible'));
    hsModal.addEventListener('click', (e) => { if (e.target === hsModal) hsModal.classList.remove('visible'); });
  }

  function fallbackCopy(text, onSuccess) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand('copy');
      if (ok) onSuccess();
    } catch {}
    document.body.removeChild(ta);
  }

  function showStatsModal() {
    if (!currentData) return;
    const m = currentMeta;
    let groups;

    if (currentMode === 'deepfake') {
      statsModalTitle.textContent = 'Detection Statistics';
      const frames = currentData.frames || [];
      const { isSynthetic: isSyn, synFrames } = computeVerdict(frames);
      const avgSynConf = synFrames.length ? synFrames.reduce((s, f) => s + f.confidence, 0) / synFrames.length : 0;
      const maxSynConf = synFrames.length ? Math.max(...synFrames.map(f => f.confidence)) : 0;
      const durationMs = currentData.duration_ms || 0;
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const costVal = durationMs ? '$' + (durationMs / 3600000 * 0.25).toFixed(4) : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');

      groups = [
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
    } else {
      statsModalTitle.textContent = 'Transcription Statistics';
      const utterances = currentData.utterances || [];
      const durationMs = currentData.duration_ms || 0;
      const languages = [...new Set(utterances.map(u => u.language).filter(Boolean))];
      const speakers = [...new Set(utterances.map(u => u.speaker).filter(s => s != null))];
      const procTimeStr = m.processingMs ? formatDuration(m.processingMs) : 'N/A';
      const procFactor = m.processingMs && durationMs ? (durationMs / m.processingMs).toFixed(1) + 'x real-time' : 'N/A';
      const httpStr = m.httpStatus ? m.httpStatus + (m.httpStatusText ? ' ' + m.httpStatusText : '') : 'N/A';
      const fileType = m.fileType || (currentData.filename ? currentData.filename.split('.').pop().toUpperCase() : 'N/A');

      const dfUtterances = utterances.filter(u => u.deepfake_score != null);
      const dfAvg = dfUtterances.length ? (dfUtterances.reduce((s, u) => s + u.deepfake_score, 0) / dfUtterances.length) : null;
      const dfMax = dfUtterances.length ? Math.max(...dfUtterances.map(u => u.deepfake_score)) : null;

      groups = [
        { group: 'Transcription', rows: [
          ['Model', 'velma-2-stt'],
          ['Utterances', String(utterances.length)],
          ['Speakers', speakers.length ? speakers.length.toString() : 'N/A'],
          ['Languages', languages.length ? languages.join(', ') : 'N/A'],
          ['Deepfake analyzed', dfUtterances.length ? dfUtterances.length + ' / ' + utterances.length + ' utterances' : 'N/A'],
          ['Avg deepfake score', dfAvg != null ? dfAvg.toFixed(4) : 'N/A'],
          ['Max deepfake score', dfMax != null ? dfMax.toFixed(4) : 'N/A'],
        ]},
        { group: 'Audio', rows: [
          ['File Name', currentData.filename || 'N/A'],
          ['File Size', m.fileSize ? formatBytes(m.fileSize) : 'N/A'],
          ['File Type', fileType],
          ['Audio Duration', formatDuration(durationMs)],
        ]},
        { group: 'Performance', rows: [
          ['Processing Time', procTimeStr],
          ['Processing Factor', procFactor],
        ]},
        { group: 'Request', rows: [
          ['HTTP', httpStr],
          ['Endpoint', m.httpStatus === 101 ? '/api/velma-2-stt-streaming' : '/api/velma-2-stt-batch'],
          ['Response Size', m.responseSize ? formatBytes(m.responseSize) : 'N/A'],
        ]},
      ];
    }

    let html = '<table class="stats-table">';
    groups.forEach(g => {
      html += '<tr class="stats-group-row"><td colspan="2">' + g.group + '</td></tr>';
      g.rows.forEach(([label, value]) => {
        html += '<tr><td class="stats-label">' + escapeHtml(String(label)) + '</td><td class="stats-value">' + escapeHtml(String(value)) + '</td></tr>';
      });
    });
    html += '</table>';
    statsGrid.innerHTML = html;
    statsModal.classList.add('visible');
  }

  function showJsonModal() {
    if (!currentData) return;
    jsonPre.innerHTML = syntaxHighlightJson(JSON.stringify(currentData, null, 2));
    jsonModal.classList.add('visible');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ── SHARED UTILITIES ──────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════════

  async function uploadAndAnalyze(file, endpoint, extraFields) {
    const formData = new FormData();
    formData.append('upload_file', file);
    if (extraFields) {
      for (const [key, value] of Object.entries(extraFields)) {
        formData.append(key, String(value));
      }
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && analysisStatus) {
          const pct = Math.round(e.loaded / e.total * 100);
          analysisStatus.textContent = pct < 100
            ? 'Uploading\u2026 ' + pct + '%'
            : 'Processing on server\u2026';
        }
      });

      xhr.upload.addEventListener('load', () => {
        if (analysisStatus) analysisStatus.textContent = 'Processing on server\u2026';
      });

      xhr.addEventListener('load', () => {
        const responseText = xhr.responseText;
        if (xhr.status < 200 || xhr.status >= 300) {
          let body = {};
          try { body = JSON.parse(responseText); } catch {}
          const msg = body.detail || body.message || body.error || ('Server error (' + xhr.status + ')');
          const err = new Error(msg);
          err.rawText = responseText;
          err.httpStatus = xhr.status;
          reject(err);
          return;
        }
        let data;
        try { data = JSON.parse(responseText); } catch {
          const err = new Error('Invalid response from server');
          err.rawText = responseText;
          reject(err);
          return;
        }
        resolve({
          data,
          meta: { httpStatus: xhr.status, httpStatusText: xhr.statusText, responseSize: responseText.length },
        });
      });

      xhr.addEventListener('error', () => {
        const err = new Error('Network error — could not reach server');
        err.rawText = '';
        reject(err);
      });

      xhr.addEventListener('timeout', () => {
        const err = new Error('Request timed out');
        err.rawText = '';
        reject(err);
      });

      xhr.open('POST', endpoint);
      xhr.timeout = 300000; // 5 min
      xhr.send(formData);
    });
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
      audio.addEventListener('error', () => { URL.revokeObjectURL(url); resolve(10000); });
      audio.src = url;
    });
  }

  function startProgress(estimatedMs) {
    const start = Date.now();
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    void progressFill.offsetWidth;

    const tick = () => {
      const elapsed = Date.now() - start;
      const rawPct = Math.min(elapsed / estimatedMs, 1);
      progressFill.style.transition = 'width 0.3s linear';
      progressFill.style.width = (rawPct * 90) + '%';
      if (rawPct < 1) progressTimer = requestAnimationFrame(tick);
    };
    progressTimer = requestAnimationFrame(tick);
  }

  function finishProgress() {
    return new Promise((resolve) => {
      if (progressTimer) cancelAnimationFrame(progressTimer);
      progressFill.style.transition = 'width 0.4s ease-out';
      progressFill.style.width = '100%';
      setTimeout(resolve, 500);
    });
  }

  function stopProgress() { if (progressTimer) cancelAnimationFrame(progressTimer); }

  function showOverlay(filename, statusText) {
    if (analysisTitle) analysisTitle.textContent = 'Analyzing \u201c' + truncate(filename, 30) + '\u201d';
    if (analysisStatus) analysisStatus.textContent = statusText || 'Processing audio';
    progressFill.style.width = '0%';
    overlay.classList.remove('error');
    overlay.classList.add('visible');
  }

  function hideOverlay() {
    overlay.classList.remove('visible', 'error');
  }

  function showOverlayError(msg, rawText) {
    stopProgress();
    overlay.classList.add('error');
    document.getElementById('overlay-error-msg').textContent = msg;
    const pre = document.getElementById('overlay-error-json');
    if (rawText) {
      try { pre.textContent = JSON.stringify(JSON.parse(rawText), null, 2); }
      catch { pre.textContent = rawText; }
    } else {
      pre.textContent = '(no response body)';
    }
  }

  document.getElementById('overlay-dismiss-btn').addEventListener('click', () => {
    hideOverlay();
    isAnalyzing = false;
  });

  function showError(msg) {
    errorToast.textContent = msg;
    errorToast.classList.add('visible');
    setTimeout(() => errorToast.classList.remove('visible'), 5000);
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

  // Render PII/PHI tagged text with blurred spans
  function renderPiiText(rawText) {
    // Match <pii:type>content</pii:type> and <phi:type>content</phi:type>
    const piiRegex = /<(pii|phi):(\w+)>([\s\S]*?)<\/\1:\2>/gi;
    let result = '';
    let lastIdx = 0;
    let match;
    while ((match = piiRegex.exec(rawText)) !== null) {
      // Escape and add text before the match
      result += escapeHtml(rawText.slice(lastIdx, match.index));
      const tagType = match[1].toUpperCase();
      const tagName = match[2].replace(/_/g, ' ');
      const content = match[3];
      result += '<span class="pii-blur" title="' + tagType + ': ' + escapeHtml(tagName) + '">' + escapeHtml(content) + '</span>';
      lastIdx = match.index + match[0].length;
    }
    result += escapeHtml(rawText.slice(lastIdx));
    return result;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatMs(ms) {
    const totalSec = Math.floor(ms / 1000);
    return Math.floor(totalSec / 60) + ':' + String(totalSec % 60).padStart(2, '0');
  }

  function formatSecCompact(ms) {
    const sec = Math.round(ms / 1000);
    if (sec < 60) return sec + 's';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + 'm' + (s > 0 ? s + 's' : '');
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
    return m + 'm ' + (sec % 60).toFixed(1) + 's';
  }

  function truncate(str, n) { return str.length > n ? str.slice(0, n - 1) + '\u2026' : str; }

  function confidenceToOpacity(c) {
    const t = Math.max(0, (c - 0.5) / 0.5);
    return Math.max(0.3, Math.pow(t, 1.8)).toFixed(2);
  }

  // ── URL Routing ──────────────────────────────────────────────────────────
  window.addEventListener('popstate', (e) => {
    const mode = (e.state && e.state.mode) || getModeFromPath();
    document.getElementById('mode-' + mode).checked = true;
    switchMode(mode, false);
  });

  function getModeFromPath() {
    const path = location.pathname.replace(/\/$/, '');
    if (path === '/deepfake') return 'deepfake';
    return 'transcription';
  }

  // ── Scrollbar: show only while scrolling ──────────────────────────────
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    document.documentElement.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => document.documentElement.classList.remove('is-scrolling'), 1200);
  }, { passive: true });

  // ── Rate limit display ───────────────────────────────────────────────
  const rateLimitBar = document.getElementById('rate-limit-bar');
  function updateRateLimit() {
    fetch('/api/usage').then(r => r.json()).then(d => {
      rateLimitBar.textContent = d.remaining + '/' + d.limit + ' requests available';
      rateLimitBar.style.color = d.remaining <= 2 ? 'var(--deepfake)' : '';
    }).catch(() => {});
  }
  updateRateLimit();

  // ── Init ────────────────────────────────────────────────────────────────
  const initMode = getModeFromPath();
  currentMode = initMode;
  document.getElementById('mode-' + initMode).checked = true;

  if (initMode === 'deepfake') {
    // Deepfake init
    transcriptContainer.classList.remove('visible');
    resultsSidebar.classList.remove('visible');
    currentMeta = {
      fileSize: 1.87 * 1024 * 1024, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: 4.2 * 1024, processingMs: 2660,
    };
    renderDeepfakeResults(DEMO_DATA, DEMO_AUDIO_URL);
  } else {
    // Transcription init (default)
    deepfakeContent.style.display = 'none';
    resultsVerdict.style.display = 'none';
    transcriptContainer.classList.add('visible');
    resultsSidebar.classList.add('visible');
    sttOptions.classList.add('visible');
    if (recordAction) {
      recordAction.classList.remove('disabled-soon');
      recordAction.querySelector('span').textContent = 'Start streaming';
    }

    sttData = DEMO_STT_DATA;
    currentData = DEMO_STT_DATA;
    sttUtterances = DEMO_STT_DATA.utterances || [];
    sttPartial = null;
    currentMeta = {
      fileSize: 1958055, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_STT_DATA).length, processingMs: 2660,
    };
    resultsFilename.textContent = DEMO_STT_DATA.filename || 'AIAgentFrustration.mp3';
    resultsAudio.src = DEMO_STT_AUDIO_URL;
    renderTranscript();
  }

  // Replace initial state so back button works
  history.replaceState({ mode: initMode }, '', (initMode === 'deepfake' ? '/deepfake' : '/transcription') + location.search);
})();
