// ── Unified App — Deepfake Detection + Transcription ──────────────────────────
(function () {
  'use strict';

  // ── Constants ───────────────────────────────────────────────────────────────
  const SPEED_FACTOR = 90;
  const MIN_PROGRESS_MS = 1500;

  const DEMO_AUDIO_URL = '/deepfake/demo.mp3';
  const DEMO_STT_AUDIO_URL = '/demo-stt.mp3';
  const DEMO_DATA = {"filename":"AIAgentFrustration.mp3","frames":[{"start_time_ms":128,"end_time_ms":4128,"synthetic_voice":true,"confidence":0.9138},{"start_time_ms":2128,"end_time_ms":6128,"synthetic_voice":true,"confidence":0.8433},{"start_time_ms":4128,"end_time_ms":8128,"synthetic_voice":false,"confidence":0.9556},{"start_time_ms":6128,"end_time_ms":10128,"synthetic_voice":false,"confidence":0.9817},{"start_time_ms":8128,"end_time_ms":12128,"synthetic_voice":false,"confidence":0.9716},{"start_time_ms":10128,"end_time_ms":14128,"synthetic_voice":false,"confidence":0.9586},{"start_time_ms":12128,"end_time_ms":16128,"synthetic_voice":false,"confidence":0.9471},{"start_time_ms":14128,"end_time_ms":18128,"synthetic_voice":false,"confidence":0.7827},{"start_time_ms":16128,"end_time_ms":20128,"synthetic_voice":false,"confidence":0.9744},{"start_time_ms":18128,"end_time_ms":22128,"synthetic_voice":false,"confidence":0.9902},{"start_time_ms":20128,"end_time_ms":24128,"synthetic_voice":false,"confidence":0.9877},{"start_time_ms":22128,"end_time_ms":26128,"synthetic_voice":false,"confidence":0.9385},{"start_time_ms":24128,"end_time_ms":28128,"synthetic_voice":true,"confidence":0.8605},{"start_time_ms":26128,"end_time_ms":30128,"synthetic_voice":false,"confidence":0.9087},{"start_time_ms":28128,"end_time_ms":32128,"synthetic_voice":true,"confidence":0.893},{"start_time_ms":30128,"end_time_ms":34128,"synthetic_voice":true,"confidence":0.8789},{"start_time_ms":32128,"end_time_ms":36128,"synthetic_voice":false,"confidence":0.9579},{"start_time_ms":34128,"end_time_ms":38128,"synthetic_voice":false,"confidence":0.9877},{"start_time_ms":36128,"end_time_ms":40128,"synthetic_voice":false,"confidence":0.9809},{"start_time_ms":38128,"end_time_ms":42128,"synthetic_voice":false,"confidence":0.8412},{"start_time_ms":40128,"end_time_ms":44128,"synthetic_voice":true,"confidence":0.9087},{"start_time_ms":42128,"end_time_ms":46128,"synthetic_voice":true,"confidence":0.7459},{"start_time_ms":44128,"end_time_ms":48128,"synthetic_voice":false,"confidence":0.9698},{"start_time_ms":46128,"end_time_ms":50128,"synthetic_voice":false,"confidence":0.9736},{"start_time_ms":48128,"end_time_ms":52128,"synthetic_voice":false,"confidence":0.886},{"start_time_ms":50128,"end_time_ms":54128,"synthetic_voice":false,"confidence":0.8334},{"start_time_ms":52128,"end_time_ms":56128,"synthetic_voice":true,"confidence":0.6924},{"start_time_ms":54128,"end_time_ms":58128,"synthetic_voice":true,"confidence":0.8332},{"start_time_ms":56128,"end_time_ms":60128,"synthetic_voice":false,"confidence":0.9713},{"start_time_ms":58128,"end_time_ms":62128,"synthetic_voice":false,"confidence":0.9679},{"start_time_ms":60128,"end_time_ms":64128,"synthetic_voice":false,"confidence":0.7557},{"start_time_ms":62128,"end_time_ms":66128,"synthetic_voice":false,"confidence":0.9603},{"start_time_ms":64128,"end_time_ms":68128,"synthetic_voice":false,"confidence":0.987},{"start_time_ms":66128,"end_time_ms":70128,"synthetic_voice":false,"confidence":0.9654},{"start_time_ms":68128,"end_time_ms":72128,"synthetic_voice":true,"confidence":0.6191},{"start_time_ms":70128,"end_time_ms":74128,"synthetic_voice":false,"confidence":0.9001},{"start_time_ms":72128,"end_time_ms":76128,"synthetic_voice":false,"confidence":0.9887},{"start_time_ms":74128,"end_time_ms":78128,"synthetic_voice":false,"confidence":0.9793},{"start_time_ms":76128,"end_time_ms":80128,"synthetic_voice":false,"confidence":0.8836},{"start_time_ms":78128,"end_time_ms":82128,"synthetic_voice":true,"confidence":0.85},{"start_time_ms":80128,"end_time_ms":84128,"synthetic_voice":false,"confidence":0.9704},{"start_time_ms":82128,"end_time_ms":86128,"synthetic_voice":false,"confidence":0.9747},{"start_time_ms":84128,"end_time_ms":88128,"synthetic_voice":false,"confidence":0.607},{"start_time_ms":86128,"end_time_ms":90128,"synthetic_voice":true,"confidence":0.924},{"start_time_ms":88128,"end_time_ms":92128,"synthetic_voice":false,"confidence":0.9397},{"start_time_ms":90128,"end_time_ms":94128,"synthetic_voice":false,"confidence":0.9882},{"start_time_ms":92128,"end_time_ms":96128,"synthetic_voice":false,"confidence":0.9757},{"start_time_ms":94128,"end_time_ms":97568,"synthetic_voice":false,"confidence":0.935}],"duration_ms":97698};

  const DEMO_STT_DATA = {"duration_ms":268680,"utterances":[{"text":"You've reached home-supply-plus.com customer support. Can you provide your name and account email?","start_ms":900,"duration_ms":4260,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"You better be a real person because I'm sick and tired of you people passing me off.","start_ms":5820,"duration_ms":3720,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American"},{"text":"I am a real person, sir. Can I have your name and account email?","start_ms":10200,"duration_ms":2880,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"My name's <pii:firstname>John</pii:firstname> <pii:lastname>Sampson</pii:lastname>, and my account email is <pii:username>jsampson, J-S-A-M-S-O-N</pii:username> at yahoo.com.","start_ms":13560,"duration_ms":8040,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"Thank you, <pii:firstname>John</pii:firstname>. What can I assist you with today?","start_ms":23220,"duration_ms":2880,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Listen to me? Let me tell you something. You better be helpful, 'cause there's a lot riding on this for me and your people who have wasted my time. Do you know how long I've been waiting for this order? I mean, my backyard trawler was a total nightmare because of you people.","start_ms":27060,"duration_ms":13020,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American"},{"text":"I'm sorry to hear that, sir. Can you give me the order number for the sofa?","start_ms":40380,"duration_ms":3480,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"I might as well have it memorized by now, but it's tattooed on me somewhere, the number <pii:phone>002-257-8938</pii:phone>. I was supposed to have those extra chairs from you guys a week ago\u2014no one had anywhere to sit. I mean, what are you guys doing over there? A circus? A clown show? Come on.","start_ms":45240,"duration_ms":18540,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American"},{"text":"I'm sorry, sir. Let me check on that order for you.","start_ms":65520,"duration_ms":2220,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Check on it? You better get me those chairs as soon as humanly possible, or I'm going to sue your company for false advertising. I mean, it's been a week and a half already. Two-day delivery my ass. Those chairs have been stolen by pirates and sank to the bottom of the <pii:country>Atlantic Ocean</pii:country> at this point. Come on.","start_ms":69000,"duration_ms":16500,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"I'm sorry, sir, it looks like they're still on their way for you, but it's been delayed.","start_ms":87600,"duration_ms":3900,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Where from where? Seriously, from <pii:workplace_address>Siberia</pii:workplace_address>? What kind of scam operations are you guys running here? I mean, are you smuggling them across international borders? Do you find them with a treasure map? Where are those chairs?","start_ms":91740,"duration_ms":13140,"speaker":2,"language":"en","emotion":"Frustrated","accent":"American"},{"text":"I'm sorry, sir, it looks like intense rains have caused some roads to flood, so we have had a delay with many packages.","start_ms":105840,"duration_ms":6960,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Christ, if I wanted them shipped from the rainforest, I would've ordered them from Amazon, you nitwit! How much time does it take to load up some chairs, drive a fucking truck, and put them on my porch? Isn't your warehouse down the street? I paid for expedited delivery. Is that a complete fucking scam, or is that part of your problem?","start_ms":115080,"duration_ms":16260,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"No, sir. Usually, they deliver these things on time. It's just we've had some extreme weather in your area.","start_ms":133020,"duration_ms":5820,"speaker":1,"language":"en","emotion":"Concerned","accent":"British"},{"text":"What kind of fucking hurricane was it? I didn't say hurricane fuck up my chairs in the news, did you? You need to be giving me my chairs today, or I'm suing your company and tagging your name in the lawsuit. What's your name?","start_ms":139260,"duration_ms":12180,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"I'm sorry, sir. My name is <pii:firstname>Fred</pii:firstname>.","start_ms":152460,"duration_ms":1920,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Well, <pii:firstname>Alfred</pii:firstname>, that's the name I'm writing the complaint when I rip your company a goddamn new asshole in court. What a fucking joke. Two-day shipping, all-day customer service, total fucking scam.","start_ms":155580,"duration_ms":11580,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"I'm sorry, sir. Is there any information I can give to help you give you some assurance?","start_ms":168900,"duration_ms":5880,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Fuck insurance, fuck this, and fuck you. You can give me my fucking chairs, or you can sue me in court after I get my refund.","start_ms":175500,"duration_ms":7260,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"I understand this has been frustrating, sir, and I'm hoping we can resolve this issue for you as soon as possible. It would be helpful if you could calm down so that we can.","start_ms":184380,"duration_ms":8520,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"What the fuck do you mean calm down? I've been so compliant with you people and now you want me to calm down? What a terrible fucking attitude from a complete fucking shit-brained idiot of a person. In what world do you think it's only okay to imply I'm overreacting? You people made this problem when you didn't deliver my fucking chairs and now you're blaming me for it?","start_ms":193020,"duration_ms":19140,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"It was out of our control, sir.","start_ms":214260,"duration_ms":1740,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Yeah, right. Out of your control, my ass. Apparently, people have always been lazy good-for-nothing shit-brained fuck-wits on idiot sandwich time right from the goddamn beginning.","start_ms":218220,"duration_ms":11760,"speaker":2,"language":"en","emotion":"Angry","accent":"American"},{"text":"I'm sorry, sir. I can issue you a credit on your account for the inconvenience.","start_ms":231600,"duration_ms":5100,"speaker":1,"language":"en","emotion":"Concerned","accent":"American"},{"text":"Are you even fucking listening to me, you ham-headed fart mouth? I swear this court citation is gonna be so fucking satisfying. What the fuck do you think a \"credit on my account\" is gonna do for me, <pii:firstname>Fred</pii:firstname>? Is it gonna get me my fucking chairs on my fucking porch? Absolutely not. Your ass is grass, <pii:firstname>Fred</pii:firstname>, and I'm the lawnmower. You know what? This is fucking useless. You're fucking useless, and I'm sick and fucking tired of it. See you in court, motherfucker. Goodbye.","start_ms":236820,"duration_ms":31860,"speaker":2,"language":"en","emotion":"Angry","accent":"American"}]};

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
      history.pushState({ mode: mode }, '', targetPath);
    }

    deepfakeContent.style.display = isDeepfake ? '' : 'none';
    resultsVerdict.style.display = isDeepfake ? '' : 'none';
    transcriptContainer.classList.toggle('visible', !isDeepfake);
    resultsSidebar.classList.toggle('visible', !isDeepfake);
    sttOptions.classList.toggle('visible', !isDeepfake);

    // Streaming not available for transcription yet
    if (recordAction) {
      recordAction.classList.toggle('disabled-soon', !isDeepfake);
      const span = recordAction.querySelector('span');
      span.textContent = isDeepfake ? 'Start streaming' : 'Start streaming (Soon)';
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
  const optEmotion = document.getElementById('opt-emotion');
  const optAccent = document.getElementById('opt-accent');
  const optPii = document.getElementById('opt-pii');
  const richOpts = [optDiarization, optEmotion, optAccent, optPii];

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

      lastDeepfakeData = data;
      lastDeepfakeAudioUrl = audioObjectUrl;
      lastDeepfakeMeta = { ...currentMeta };
      renderDeepfakeResults(data, audioObjectUrl);
    } catch (err) {
      stopProgress();
      hideOverlay();
      showError(err.message || 'Analysis failed. Please try again.');
    }
  }

  function startDeepfakeRecording() {
    startRecordingCommon('/api/velma-2-synthetic-voice-detection-streaming', (msg) => {
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

    const synFrames = liveFrames.filter(f => f.synthetic_voice);
    const highConf99 = synFrames.filter(f => f.confidence > 0.99).length;
    const highConf90 = synFrames.filter(f => f.confidence > 0.90).length;
    const isSynthetic = highConf99 >= 1 || highConf90 >= 2;

    renderVerdict(isSynthetic, synFrames.length, liveFrames.length);
    renderHistogram(liveFrames);
    renderTable(liveFrames);
  }

  function renderDeepfakeResults(data, audioSrc) {
    currentData = data;
    resultsFilename.textContent = data.filename || 'Audio file';
    resultsAudio.src = audioSrc;

    const frames = data.frames || [];
    currentFrames = frames;

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
    verdictRing.className = 'verdict-ring ' + (isSynthetic ? 'synthetic' : 'authentic');

    verdictIcon.innerHTML = isSynthetic
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="4" x2="12" y2="8"/><circle cx="12" cy="3" r="1"/><line x1="2" y1="13" x2="4" y2="13"/><line x1="20" y1="13" x2="22" y2="13"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

    verdictLabel.textContent = isSynthetic ? 'Deepfake' : 'Authentic';
    verdictCount.textContent = syntheticCount + '/' + totalCount + ' deepfake segments';
  }

  function renderHistogram(frames) {
    histogram.innerHTML = '';
    if (!frames.length) return;

    const squaresRow = document.createElement('div');
    squaresRow.className = 'histo-squares';

    frames.forEach((frame, i) => {
      const bar = document.createElement('div');
      bar.className = 'histo-bar ' + (frame.synthetic_voice ? 'synthetic' : 'authentic');
      const alpha = confidenceToOpacity(frame.confidence);
      const rgb = frame.synthetic_voice ? '255,53,84' : '21,207,135';
      bar.style.background = 'rgba(' + rgb + ',' + alpha + ')';

      const verdictWord = frame.synthetic_voice ? 'Deepfake' : 'Authentic';
      const verdictColor = frame.synthetic_voice ? 'rgb(255,53,84)' : 'rgb(21,207,135)';
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
    } catch (err) {
      stopProgress();
      hideOverlay();
      showError(err.message || 'Transcription failed. Please try again.');
    }
  }

  function startTranscriptionRecording() {
    const opts = getSttOptions();
    const params = new URLSearchParams();
    params.set('speaker_diarization', opts.speaker_diarization);
    params.set('emotion_signal', opts.emotion_signal);
    params.set('accent_signal', opts.accent_signal);
    params.set('pii_phi_tagging', opts.pii_phi_tagging);
    params.set('partial_results', 'true');

    sttUtterances = [];
    sttPartial = null;
    sttData = null;
    currentData = null;

    startRecordingCommon('/api/velma-2-stt-streaming?' + params.toString(), (msg) => {
      if (msg?.type === 'utterance' && msg.utterance) {
        sttUtterances.push(msg.utterance);
        sttPartial = null;
        updateSttData();
        renderTranscript();
      } else if (msg?.type === 'partial_utterance' && msg.partial_utterance) {
        sttPartial = msg.partial_utterance;
        renderTranscript();
      } else if (msg?.type === 'done') {
        sttPartial = null;
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

  function updateSttData() {
    const durationMs = Date.now() - recordingStartTime;
    sttData = { filename: 'Live Recording', utterances: sttUtterances, duration_ms: durationMs };
    currentData = sttData;
  }

  function renderTranscript() {
    transcriptList.innerHTML = '';

    if (sttUtterances.length === 0 && !sttPartial) {
      const empty = document.createElement('div');
      empty.className = 'transcript-empty';
      empty.textContent = isRecording ? 'Listening\u2026' : 'Upload an audio file or start recording to see the transcript.';
      transcriptList.appendChild(empty);
      return;
    }

    const opts = getSttOptions();

    sttUtterances.forEach((u, i) => {
      transcriptList.appendChild(buildUtteranceEl(u, opts, false, i));
    });

    if (sttPartial) {
      transcriptList.appendChild(buildUtteranceEl(sttPartial, opts, true, -1));
    }

    if (isRecording && transcriptList.lastElementChild) {
      transcriptList.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Render emotion chart (includes its own playback tracking for both bars and bubbles)
    const opts2 = getSttOptions();
    if (sttUtterances.length > 0 && !isRecording && opts2.speaker_diarization) {
      renderSttChart();
    } else {
      sttChart.innerHTML = '';
      sttChart.classList.remove('visible');
    }
  }

  let sttPlaybackTracker = null;

  function setupTranscriptPlaybackTracking() {
    if (sttPlaybackTracker) cancelAnimationFrame(sttPlaybackTracker);
    const utteranceEls = transcriptList.querySelectorAll('.transcript-utterance');

    function tick() {
      if (resultsAudio.paused) { sttPlaybackTracker = requestAnimationFrame(tick); return; }
      const currentMs = resultsAudio.currentTime * 1000;
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        const u = sttUtterances[i];
        const endMs = u.start_ms + (u.duration_ms || 0);
        if (currentMs >= u.start_ms && currentMs < endMs) { activeIdx = i; break; }
      }
      utteranceEls.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
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
        const tooltipText = formatMs(u.start_ms) + ' \u2013 ' + formatMs(endTimeMs) +
          ' · Speaker ' + (u.speaker || 0) + (u.emotion ? ' · ' + u.emotion : '');
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

  let sttChartTracker = null;

  function setupSttChartPlaybackTracking() {
    if (sttChartTracker) cancelAnimationFrame(sttChartTracker);
    const bars = sttChart.querySelectorAll('.stt-chart-bar');
    const bubbles = transcriptList.querySelectorAll('.transcript-utterance');

    function tick() {
      const currentMs = resultsAudio.currentTime * 1000;
      // Find the last utterance whose start_ms <= currentMs (keeps highlighted until next starts)
      let activeIdx = -1;
      for (let i = sttUtterances.length - 1; i >= 0; i--) {
        if (currentMs >= sttUtterances[i].start_ms) { activeIdx = i; break; }
      }
      bars.forEach(bar => {
        bar.classList.toggle('active', parseInt(bar.dataset.uttIdx) === activeIdx);
      });
      bubbles.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
      sttChartTracker = requestAnimationFrame(tick);
    }
    sttChartTracker = requestAnimationFrame(tick);
  }

  const LANGUAGE_NAMES = {
    EN: 'English', ES: 'Spanish', FR: 'French', DE: 'German', IT: 'Italian',
    PT: 'Portuguese', RU: 'Russian', ZH: 'Chinese', JA: 'Japanese', KO: 'Korean',
    AR: 'Arabic', HI: 'Hindi', NL: 'Dutch', PL: 'Polish', SV: 'Swedish',
    DA: 'Danish', NO: 'Norwegian', FI: 'Finnish', TR: 'Turkish', EL: 'Greek',
    HE: 'Hebrew', TH: 'Thai', VI: 'Vietnamese', ID: 'Indonesian', MS: 'Malay',
    UK: 'Ukrainian', CS: 'Czech', RO: 'Romanian', HU: 'Hungarian', BG: 'Bulgarian',
    HR: 'Croatian', SK: 'Slovak', SL: 'Slovenian', LT: 'Lithuanian', LV: 'Latvian',
    ET: 'Estonian', CA: 'Catalan', GL: 'Galician', EU: 'Basque', FA: 'Persian',
    UR: 'Urdu', BN: 'Bengali', TA: 'Tamil', TE: 'Telugu', MR: 'Marathi',
    SW: 'Swahili', AF: 'Afrikaans', TL: 'Filipino', CY: 'Welsh',
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

    // Full bubble tint with emotion color
    const emotionColor = (u.emotion && opts.emotion_signal)
      ? EMOTION_COLORS[u.emotion.toLowerCase()] || null : null;
    if (emotionColor) {
      el.style.background = emotionColor + '18';
      el.style.setProperty('--ec', emotionColor);
    } else {
      el.style.setProperty('--ec', '#78909c');
    }

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

    // Language + Accent inline
    const langAccentParts = [];
    if (u.language) langAccentParts.push(LANGUAGE_NAMES[u.language.toUpperCase()] || u.language);
    if (u.accent && opts.accent_signal) langAccentParts.push(u.accent + ' accent');
    if (langAccentParts.length) {
      const la = document.createElement('span');
      la.className = 'transcript-accent';
      la.textContent = langAccentParts.join(' with ');
      header.appendChild(la);
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
      recordingWs.close();
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

      const synFrames = liveFrames.filter(f => f.synthetic_voice);
      const highConf99 = synFrames.filter(f => f.confidence > 0.99).length;
      const highConf90 = synFrames.filter(f => f.confidence > 0.90).length;
      const isSynthetic = highConf99 >= 1 || highConf90 >= 2;

      renderVerdict(isSynthetic, synFrames.length, liveFrames.length);
      renderHistogram(liveFrames);
      renderTable(liveFrames);
    } else if (currentMode === 'transcription') {
      const durationMs = Date.now() - recordingStartTime;
      currentMeta = {
        fileSize: 0, fileType: 'PCM 16kHz', httpStatus: 101, httpStatusText: 'Switching Protocols',
        responseSize: sttData ? JSON.stringify(sttData).length : 0, processingMs: durationMs,
      };
      sttPartial = null;
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
    navigator.clipboard.writeText(JSON.stringify(currentData, null, 2)).then(() => {
      jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        jsonCopyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
      }, 2000);
    });
  });

  function showStatsModal() {
    if (!currentData) return;
    const m = currentMeta;
    let groups;

    if (currentMode === 'deepfake') {
      statsModalTitle.textContent = 'Detection Statistics';
      const frames = currentData.frames || [];
      const synFrames = frames.filter(f => f.synthetic_voice);
      const avgSynConf = synFrames.length ? synFrames.reduce((s, f) => s + f.confidence, 0) / synFrames.length : 0;
      const maxSynConf = synFrames.length ? Math.max(...synFrames.map(f => f.confidence)) : 0;
      const durationMs = currentData.duration_ms || 0;
      const highConf99 = synFrames.filter(f => f.confidence > 0.99).length;
      const highConf90 = synFrames.filter(f => f.confidence > 0.90).length;
      const isSyn = highConf99 >= 1 || highConf90 >= 2;
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

      groups = [
        { group: 'Transcription', rows: [
          ['Model', 'velma-2-stt'],
          ['Utterances', String(utterances.length)],
          ['Speakers', speakers.length ? speakers.length.toString() : 'N/A'],
          ['Languages', languages.length ? languages.join(', ') : 'N/A'],
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
        html += '<tr><td class="stats-label">' + label + '</td><td class="stats-value">' + value + '</td></tr>';
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
    const res = await fetch(endpoint, { method: 'POST', body: formData });
    const responseText = await res.text();
    if (!res.ok) {
      let body = {};
      try { body = JSON.parse(responseText); } catch {}
      throw new Error(body.detail || body.message || body.error || 'Server error (' + res.status + ')');
    }
    return {
      data: JSON.parse(responseText),
      meta: { httpStatus: res.status, httpStatusText: res.statusText, responseSize: responseText.length },
    };
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
    overlay.classList.add('visible');
  }

  function hideOverlay() { overlay.classList.remove('visible'); }

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
      recordAction.classList.add('disabled-soon');
      recordAction.querySelector('span').textContent = 'Start streaming (Soon)';
    }

    sttData = DEMO_STT_DATA;
    currentData = DEMO_STT_DATA;
    sttUtterances = DEMO_STT_DATA.utterances || [];
    sttPartial = null;
    currentMeta = {
      fileSize: 1.87 * 1024 * 1024, fileType: 'audio/mpeg',
      httpStatus: 200, httpStatusText: 'OK',
      responseSize: JSON.stringify(DEMO_STT_DATA).length, processingMs: 2660,
    };
    resultsFilename.textContent = 'Irate_Caller_Final.mp3';
    resultsAudio.src = DEMO_STT_AUDIO_URL;
    renderTranscript();
  }

  // Replace initial state so back button works
  history.replaceState({ mode: initMode }, '', initMode === 'deepfake' ? '/deepfake' : '/transcription');
})();
