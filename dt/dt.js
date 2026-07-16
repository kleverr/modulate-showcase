/* Velma call report — Deeptalk-style internal demo.
   Self-contained: talks to the showcase server's /api/velma-2-batch (POST)
   and /api/velma-2-streaming (WebSocket) proxies. */
(() => {
'use strict';

// ── Demo fixture ─────────────────────────────────────────────────────────────
const DEMO_AUDIO_URL = '/deepfake/irate-caller-demo.mp3';
const DEMO_REPORT_URL = '/dt/velma-report.json';
const DEMO_REPORT_FALLBACK_URL = '/velma-demo-data.json';

// ── Analysis config ──────────────────────────────────────────────────────────
// Always-explicit BatchConfig (no config UI on this page). Same object is sent
// as the batch `config` field and as the first streaming frame.
const VELMA_CONFIG = {
  conversation_types: [
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111001',
      name: 'Customer Service Call',
      short_description: 'A phone call between a customer and a service representative.',
      detailed_description: 'An inbound or outbound voice call where one participant (the Customer Service Representative) is acting on behalf of a company to assist or resolve issues raised by another participant (the Customer). Typically includes greeting and identification, issue identification, troubleshooting or resolution attempt, and closure.',
    },
    {
      conversation_type_uuid: '11111111-1111-4111-8111-111111111002',
      name: 'Sales Call',
      short_description: 'A sales conversation between a representative and a prospect.',
      detailed_description: 'An outbound or inbound voice call where a sales representative presents, discusses, or attempts to close a transaction with a prospect or potential customer. Typically includes discovery, presentation, objection handling, and a call-to-action.',
    },
  ],
  participant_roles: [
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222001',
      name: 'Customer',
      short_description: 'The caller reaching out for assistance.',
      detailed_description: 'The party seeking help. Customers describe an issue, ask questions, share account or order details on request, and seek resolution. They are not acting on behalf of a company or following a service script.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222002',
      name: 'Customer Service Representative',
      short_description: 'The company-side agent assisting the caller.',
      detailed_description: 'The company representative handling the call. CSRs greet the caller, verify identity, gather details, follow scripts and processes, troubleshoot, and attempt to resolve the customer\'s issue.',
    },
    {
      participant_role_uuid: '22222222-2222-4222-8222-222222222003',
      name: 'Sales Representative',
      short_description: 'The seller-side participant on a sales call.',
      detailed_description: 'The participant attempting to advance or close a sale. Sales reps qualify, present features and benefits, handle objections, and ask for the close.',
    },
  ],
  behaviors: [
    'preset:coercion_manipulation',
    'preset:inappropriate_speech',
    'preset:threat_based_harassment',
    'preset:issue_not_resolved',
    'preset:issue_resolved',
    'preset:refund_or_credit_issued',
    'preset:refund_demand',
    'preset:escalation_to_supervisor_request',
    'preset:legal_threat_litigation',
    'preset:customer_gratitude',
  ],
  stt: {
    speaker_diarization: true,
    emotion_signal: true,
    accent_signal: false,
    deepfake_signal: false,
    pii_phi_tagging: false,
  },
  produce_topics: true,
  produce_topic_sentiments: true,
  produce_summary: true,
};

// Pretty names for the configured presets (for the "checked for" line before
// per-behavior results exist).
const CONFIGURED_BEHAVIOR_NAMES = [
  'Coercion Manipulation', 'Inappropriate Speech', 'Threat-based harassment',
  'Issue Not Resolved', 'Issue Resolved', 'Refund or Credit Issued',
  'Refund Demand', 'Escalation to Supervisor Request', 'Legal Threat - Litigation',
  'Customer Gratitude',
];

// ── Custom behavior set (uploaded JSON) ──────────────────────────────────────
// null → default config. Otherwise { mode, entries, fullConfig, names }:
//   mode 'add'      → default behaviors + entries
//   mode 'replace'  → entries only; when fullConfig is set, the whole uploaded
//                     BatchConfig (types, roles, stt, produce_*) is used verbatim.
// Persists until Reset or page reload.
let behaviorSet = null;

function behaviorEntryKey(entry) {
  if (typeof entry === 'string') return 'p:' + entry.slice('preset:'.length).toLowerCase();
  return 'n:' + String(entry.name || '').toLowerCase();
}

function getActiveConfig() {
  if (!behaviorSet) return VELMA_CONFIG;
  if (behaviorSet.mode === 'replace' && behaviorSet.fullConfig) return behaviorSet.fullConfig;
  if (behaviorSet.mode === 'replace') return { ...VELMA_CONFIG, behaviors: behaviorSet.entries };
  // add: default behaviors + uploaded ones (deduped, uploads win nothing — defaults first)
  const seen = new Set(VELMA_CONFIG.behaviors.map(behaviorEntryKey));
  const merged = [...VELMA_CONFIG.behaviors];
  for (const e of behaviorSet.entries) {
    const k = behaviorEntryKey(e);
    if (!seen.has(k)) { seen.add(k); merged.push(e); }
  }
  return { ...VELMA_CONFIG, behaviors: merged };
}

function prettifyPresetId(id) {
  return id.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function activeBehaviorNames() {
  if (!behaviorSet) return CONFIGURED_BEHAVIOR_NAMES;
  const cfg = getActiveConfig();
  return (cfg.behaviors || []).map(e => {
    if (typeof e === 'string') {
      const id = e.slice('preset:'.length);
      return (presetCatalog && presetCatalog.get(id)) || prettifyPresetId(id);
    }
    return e.name;
  }).filter(Boolean);
}

// Live preset catalog (identifier → display name) for validating preset refs.
let presetCatalog = null;
let presetCatalogPromise = null;
function loadPresetCatalog() {
  if (!presetCatalogPromise) {
    presetCatalogPromise = fetch('/api/velma-2-batch/list-presets')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && Array.isArray(d.presets)) {
          presetCatalog = new Map(d.presets.map(p => [p.identifier, p.name]));
        }
        return presetCatalog;
      })
      .catch(() => null);
  }
  return presetCatalogPromise;
}

function newUuid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16));
}

// Parse an uploaded behaviors JSON. Accepts (auto-detected):
//   • a bare array of "preset:<id>" strings and/or BehaviorDef objects
//   • { behaviors: [...] }
//   • a full BatchConfig (any of conversation_types / participant_roles / stt / produce_*)
// Returns { kind, entries, fullConfig, names, problems: [{level, text}] }.
function parseBehaviorsJson(data) {
  const problems = [];
  const CONFIG_KEYS = ['conversation_types', 'participant_roles', 'stt', 'produce_topics', 'produce_topic_sentiments', 'produce_summary'];
  let kind = null;
  let rawList = null;
  let fullConfig = null;

  if (Array.isArray(data)) {
    kind = 'list';
    rawList = data;
  } else if (data && typeof data === 'object') {
    const hasConfigKeys = CONFIG_KEYS.some(k => k in data);
    if (hasConfigKeys) {
      kind = 'full';
      rawList = Array.isArray(data.behaviors) ? data.behaviors : [];
    } else if (Array.isArray(data.behaviors)) {
      kind = 'list';
      rawList = data.behaviors;
    }
  }
  if (!kind) {
    problems.push({ level: 'error', text: 'Unrecognized JSON shape — expected an array of behaviors, an object with a "behaviors" array, or a full BatchConfig.' });
    return { kind: null, entries: [], fullConfig: null, names: [], problems };
  }

  const entries = [];
  const names = [];
  const droppedFields = new Set();
  rawList.forEach((raw, i) => {
    if (typeof raw === 'string') {
      const s = raw.trim();
      const m = s.match(/^preset:([A-Za-z0-9_-]+)$/);
      if (!m) {
        problems.push({ level: 'error', text: `Entry ${i + 1}: string entries must look like "preset:<identifier>" (got ${JSON.stringify(s.slice(0, 40))}).` });
        return;
      }
      if (presetCatalog && !presetCatalog.has(m[1])) {
        problems.push({ level: 'error', text: `Entry ${i + 1}: unknown preset "${m[1]}" — the API would reject the config (422).` });
        return;
      }
      entries.push(s);
      names.push((presetCatalog && presetCatalog.get(m[1])) || prettifyPresetId(m[1]));
      return;
    }
    if (!raw || typeof raw !== 'object') {
      problems.push({ level: 'error', text: `Entry ${i + 1}: not a behavior definition or preset reference.` });
      return;
    }
    // Keep only the documented BehaviorDef fields — internal-tool exports carry
    // extras (saved_ts, updated_ts, …) the API may reject.
    const DEF_FIELDS = ['behavior_uuid', 'name', 'short_description', 'detailed_description',
      'applies_to_conversation_type_uuids', 'applies_to_participant_role_uuids'];
    const def = {};
    for (const k of DEF_FIELDS) { if (raw[k] !== undefined) def[k] = raw[k]; }
    Object.keys(raw).forEach(k => { if (!DEF_FIELDS.includes(k)) droppedFields.add(k); });
    if (!def.name || !String(def.name).trim()) {
      problems.push({ level: 'error', text: `Entry ${i + 1}: behavior definition is missing "name".` });
      return;
    }
    if (!def.behavior_uuid) {
      def.behavior_uuid = newUuid();
    }
    const shortD = String(def.short_description || '').trim();
    const longD = String(def.detailed_description || '').trim();
    if (!shortD && !longD) {
      problems.push({ level: 'error', text: `"${def.name}": needs short_description and detailed_description (both required by the API).` });
      return;
    }
    if (!shortD) { def.short_description = longD; problems.push({ level: 'warn', text: `"${def.name}": short_description was missing — copied from detailed_description.` }); }
    if (!longD) { def.detailed_description = shortD; problems.push({ level: 'warn', text: `"${def.name}": detailed_description was missing — copied from short_description.` }); }
    entries.push(def);
    names.push(String(def.name));
  });

  if (droppedFields.size) {
    problems.push({ level: 'warn', text: 'Ignored non-schema fields: ' + [...droppedFields].join(', ') + '.' });
  }
  if (kind === 'full') {
    // Same whitelisting at the BatchConfig level.
    fullConfig = { behaviors: entries };
    for (const k of CONFIG_KEYS) { if (data[k] !== undefined) fullConfig[k] = data[k]; }
    const droppedTop = Object.keys(data).filter(k => k !== 'behaviors' && !CONFIG_KEYS.includes(k));
    if (droppedTop.length) {
      problems.push({ level: 'warn', text: 'Ignored non-schema config fields: ' + droppedTop.join(', ') + '.' });
    }
    const hasTypes = Array.isArray(fullConfig.conversation_types) && fullConfig.conversation_types.length > 0;
    const hasRoles = Array.isArray(fullConfig.participant_roles) && fullConfig.participant_roles.length > 0;
    if (entries.length && (!hasTypes || !hasRoles)) {
      problems.push({ level: 'warn', text: 'This config has behaviors but no conversation types and/or participant roles — the API silently skips behaviors in that case. In Replace mode they will not run.' });
    }
  }
  if (!entries.length && !problems.some(p => p.level === 'error')) {
    problems.push({ level: 'error', text: 'No behaviors found in the file.' });
  }
  return { kind, entries, fullConfig, names, problems };
}

// ── Emotion groups (Deeptalk palette) ────────────────────────────────────────
const EMOTION_GROUP = {
  angry: 'attack', contemptuous: 'attack', disgusted: 'attack',
  afraid: 'threat', anxious: 'threat', stressed: 'threat', surprised: 'threat',
  ashamed: 'threat', frustrated: 'threat', fear: 'threat',
  affectionate: 'excited', amused: 'excited', excited: 'excited', happy: 'excited',
  hopeful: 'excited', proud: 'excited', relieved: 'excited', curious: 'excited',
  disappointed: 'low', bored: 'low', tired: 'low', concerned: 'low',
  confused: 'low', sad: 'low',
  calm: 'calm', confident: 'calm', interested: 'calm',
  neutral: 'neutral', unknown: 'neutral',
};
const GROUP_COLOR = {
  attack: '#ff3554', threat: '#c850a0', excited: '#ff7850',
  low: '#0078c8', calm: '#6e8cbe', neutral: '#5a5a6e',
};
function emotionColor(emotion) {
  const g = EMOTION_GROUP[String(emotion || 'neutral').toLowerCase()] || 'neutral';
  return GROUP_COLOR[g];
}

// ── DOM ──────────────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const statusDot = $('status-dot');
const statusText = $('status-text');
const btnStop = $('btn-stop');
const btnUpload = $('btn-upload');
const btnStream = $('btn-stream');
const fileInputBatch = $('file-input-batch');
const fileInputStream = $('file-input-stream');
const audio = $('audio');
const playerPort = $('player-port');
const mediaContainer = $('media-container');
const playerViz = $('player-viz');
const speakerLabels = $('speaker-labels');
const behaviourIndicators = $('behaviour-indicators');
const playerLine = $('player-line');
const playerHoverLine = $('player-hover-line');
const playerHoverCaption = $('player-hover-caption');
const btnPlay = $('btn-play');
const playIconUse = $('play-icon-use');
const timeCurrent = $('time-current');
const timeTotal = $('time-total');
const summaryText = $('summary-text');
const conversationMeta = $('conversation-meta');
const speakersTbody = $('speakers-tbody');
const behaviorsTbody = $('behaviors-tbody');
const behaviorsChecked = $('behaviors-checked');
const transcriptList = $('transcript-list');
const processing = $('processing');
const processingFile = $('processing-file');
const processingStatus = $('processing-status');
const processingCancel = $('processing-cancel');
const errorBanner = $('error-banner');
const errorText = $('error-text');
const errorClose = $('error-close');
const btnBehaviors = $('btn-behaviors');
const behaviorsModal = $('behaviors-modal');
const behaviorsCurrent = $('behaviors-current');
const behaviorsDrop = $('behaviors-drop');
const behaviorsExampleLink = $('behaviors-example-link');
const behaviorsPreview = $('behaviors-preview');
const behaviorsPreviewTitle = $('behaviors-preview-title');
const behaviorsChips = $('behaviors-chips');
const behaviorsProblems = $('behaviors-problems');
const behaviorsApply = $('behaviors-apply');
const behaviorsReset = $('behaviors-reset');
const behaviorsCloseBtn = $('behaviors-close');
const modeReplaceNote = $('mode-replace-note');
const fileInputBehaviors = $('file-input-behaviors');

// ── State ────────────────────────────────────────────────────────────────────
let report = null;
let reportFilename = '';
let isLive = false;        // streaming in progress
let isBatch = false;       // batch request in flight
let batchXhr = null;
let ws = null;
let chunkTimer = null;
let renderPending = false;
let currentObjectUrl = null;
let laneOrder = [];        // stable speaker→lane assignment for the session
let clipEls = new Map();   // clip_uuid → transcript <li>
let playerClipEls = [];    // [{el, start, end}] for playback highlight
let transcriptRows = [];   // [{el, start, end}] in order
let processingTimer = null;
let processingStartedAt = 0;

// ── Utils ────────────────────────────────────────────────────────────────────
function fmtTime(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  return m + ':' + String(s % 60).padStart(2, '0');
}
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function svgUse(symbolId) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', symbolId);
  svg.appendChild(use);
  return svg;
}
function showError(msg) {
  errorText.textContent = msg;
  errorBanner.hidden = false;
}
errorClose.addEventListener('click', () => { errorBanner.hidden = true; });

function setStatus(kind, text, stoppable) {
  statusDot.classList.remove('live', 'busy');
  if (kind === 'live') statusDot.classList.add('live');
  if (kind === 'busy') statusDot.classList.add('busy');
  statusText.textContent = text;
  btnStop.hidden = !stoppable;
}

function setAudioSource(url, isObjectUrl) {
  if (currentObjectUrl) { URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = null; }
  if (isObjectUrl) currentObjectUrl = url;
  audio.src = url;
}

function reportDurationMs() {
  let d = (report && report.duration_ms) || 0;
  if (report && report.clips) {
    for (const c of report.clips) {
      const end = (c.start_ms || 0) + (c.duration_ms || 0);
      if (end > d) d = end;
    }
  }
  if (audio.duration && isFinite(audio.duration)) d = Math.max(d, audio.duration * 1000);
  return d;
}

// Role picks → display names
function speakerRoleMap(data) {
  const map = {};
  (data.participant_role_picks || []).forEach(p => {
    if (p && p.speaker_label != null) map[p.speaker_label] = p.name;
  });
  return map;
}
function displayName(label, roles) {
  return roles[label] || ('Speaker ' + label);
}

// Stable lane order: first appearance in the clip stream.
function updateLaneOrder(clips) {
  for (const c of clips) {
    const k = c.speaker_label == null ? '—' : String(c.speaker_label);
    if (!laneOrder.includes(k)) laneOrder.push(k);
  }
}

// ── Render: player ───────────────────────────────────────────────────────────
function renderPlayer(data) {
  const clips = data.clips || [];
  updateLaneOrder(clips);
  const durationMs = reportDurationMs();
  const roles = speakerRoleMap(data);

  playerViz.textContent = '';
  speakerLabels.textContent = '';
  behaviourIndicators.textContent = '';
  playerClipEls = [];

  timeTotal.textContent = fmtTime(durationMs);
  btnPlay.disabled = !audio.src;

  if (!clips.length || !durationMs) return;

  const lanes = laneOrder.length;
  // Few speakers → thin, vertically centered lanes (Deeptalk look); many → fill.
  let rowH = 100 / lanes;
  let topOffset = 0;
  const CAP = 27;
  if (rowH > CAP) { rowH = CAP; topOffset = (100 - lanes * CAP) / 2; }
  const rowPad = Math.min(rowH * 0.18, 4);
  const rowTop = (idx) => topOffset + idx * rowH + rowPad;
  const laneIdx = (label) => laneOrder.indexOf(label == null ? '—' : String(label));

  for (const c of clips) {
    const idx = laneIdx(c.speaker_label);
    if (idx < 0) continue;
    const left = (c.start_ms || 0) / durationMs * 100;
    const width = Math.max((c.duration_ms || 0) / durationMs * 100, 0.18);
    const btn = el('button', 'transcript-clip');
    btn.type = 'button';
    btn.style.left = left + '%';
    btn.style.width = width + '%';
    btn.style.setProperty('--row-top', rowTop(idx) + '%');
    btn.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
    btn.style.setProperty('--clip-color', emotionColor(c.emotion));
    btn.title = fmtTime(c.start_ms || 0) + (c.emotion ? ' · ' + c.emotion : '') + '\n' + (c.text || '');
    const viz = el('span', 'clip-visualization');
    btn.appendChild(viz);
    btn.addEventListener('click', () => seekTo(c.start_ms || 0, true));
    playerViz.appendChild(btn);
    playerClipEls.push({ el: btn, start: c.start_ms || 0, end: (c.start_ms || 0) + (c.duration_ms || 0) });
  }

  laneOrder.forEach((label, idx) => {
    const lab = el('div', 'speaker-label');
    lab.style.setProperty('--row-top', rowTop(idx) + '%');
    lab.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
    lab.appendChild(el('span', null, displayName(label, roles)));
    speakerLabels.appendChild(lab);
  });

  // Behavior stars: one indicator per (detected behavior × evidence clip).
  const clipByUuid = new Map(clips.map(c => [c.clip_uuid, c]));
  (data.behaviors || []).forEach(b => {
    if (!b || !b.detected) return;
    const uuids = new Set(b.evidence_clip_uuids || []);
    if (b.definitive_clip_uuid) uuids.add(b.definitive_clip_uuid);
    uuids.forEach(uuid => {
      const c = clipByUuid.get(uuid);
      if (!c) return;
      const idx = laneIdx(b.speaker_label != null ? b.speaker_label : c.speaker_label);
      if (idx < 0) return;
      const ind = el('div', 'behaviour-indicator');
      ind.style.left = ((c.start_ms || 0) / durationMs * 100) + '%';
      ind.style.setProperty('--row-top', rowTop(idx) + '%');
      ind.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
      const icon = el('span', 'behaviour-icon');
      icon.appendChild(svgUse('#icon-star'));
      ind.appendChild(icon);
      ind.appendChild(el('span', 'behaviour-label-text', b.behavior_name || ''));
      ind.addEventListener('click', () => jumpToClip(uuid));
      behaviourIndicators.appendChild(ind);
    });
  });
}

// ── Render: summary + meta ───────────────────────────────────────────────────
function renderSummary(data) {
  summaryText.textContent = data.summary || '';

  conversationMeta.textContent = '';
  const items = [];
  if (data.conversation_type_pick && data.conversation_type_pick.name) {
    items.push(['Conversation type', data.conversation_type_pick.name, data.conversation_type_pick.confidence]);
  }
  (data.participant_role_picks || []).forEach(p => {
    if (p && p.name) items.push(['Speaker ' + p.speaker_label, p.name, p.confidence]);
  });
  if (reportFilename) items.push(['File', reportFilename, null]);
  const dur = reportDurationMs();
  if (dur) items.push(['Duration', fmtTime(dur), null]);

  items.forEach(([label, value, conf]) => {
    const item = el('div', 'meta-item');
    item.appendChild(el('span', 'meta-label', label));
    const v = el('span', 'meta-value', value + ' ');
    if (conf != null) v.appendChild(el('span', 'conf', Math.round(conf * 100) + '%'));
    item.appendChild(v);
    conversationMeta.appendChild(item);
  });
}

// ── Render: speakers table ───────────────────────────────────────────────────
function computeSpeakerStats(clips) {
  const map = new Map();
  for (const label of laneOrder) map.set(label, { label, totalMs: 0, segments: [], emotions: [] });
  for (const c of clips) {
    const k = c.speaker_label == null ? '—' : String(c.speaker_label);
    const s = map.get(k);
    if (!s) continue;
    const dur = c.duration_ms || 0;
    s.totalMs += dur;
    s.segments.push({ emotion: (c.emotion || 'neutral').toLowerCase(), ms: dur, start: c.start_ms || 0, text: c.text || '' });
    const em = c.emotion ? c.emotion.toLowerCase() : null;
    if (em && !s.emotions.includes(em)) s.emotions.push(em);
  }
  return [...map.values()];
}

function renderSpeakers(data) {
  const roles = speakerRoleMap(data);
  const stats = computeSpeakerStats(data.clips || []);
  const total = stats.reduce((a, s) => a + s.totalMs, 0) || 1;

  // Per-speaker topic sentiments
  const topicsBySpeaker = new Map();
  (data.topic_sentiments || []).forEach(t => {
    const k = t.speaker_label == null ? '—' : String(t.speaker_label);
    if (!topicsBySpeaker.has(k)) topicsBySpeaker.set(k, []);
    topicsBySpeaker.get(k).push(t);
  });

  speakersTbody.textContent = '';
  stats.forEach(s => {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    const roleName = roles[s.label];
    tdName.appendChild(el('span', 'speaker-name', roleName || ('Speaker ' + s.label)));
    if (roleName) tdName.appendChild(el('span', 'speaker-sub', 'Speaker ' + s.label));
    tr.appendChild(tdName);

    const tdPattern = document.createElement('td');
    const pattern = el('div', 'emotion-pattern');
    const bar = el('div', 'emotion-bar');
    const segTotal = s.segments.reduce((a, x) => a + x.ms, 0) || 1;
    s.segments.forEach(seg => {
      const segBtn = el('button', 'emotion-segment');
      segBtn.type = 'button';
      segBtn.style.setProperty('--w', String(seg.ms / segTotal));
      segBtn.style.setProperty('--seg-color', emotionColor(seg.emotion));
      segBtn.title = seg.emotion + ' · ' + fmtTime(seg.start);
      segBtn.addEventListener('click', () => seekTo(seg.start, true));
      bar.appendChild(segBtn);
    });
    pattern.appendChild(bar);
    if (s.emotions.length) {
      const legend = el('div', 'emotion-legend');
      s.emotions.forEach((em, i) => {
        if (i) legend.appendChild(document.createTextNode(', '));
        const w = el('span', null, em.charAt(0).toUpperCase() + em.slice(1));
        w.style.setProperty('--tone', emotionColor(em));
        legend.appendChild(w);
      });
      pattern.appendChild(legend);
    }
    tdPattern.appendChild(pattern);
    tr.appendChild(tdPattern);

    const tdTopics = document.createElement('td');
    const sents = topicsBySpeaker.get(s.label) || [];
    if (sents.length) {
      const list = el('div', 'topic-chip-list');
      sents.forEach(t => {
        const chip = el('span', 'topic-chip');
        let tone = 'neutral';
        if (typeof t.sentiment_score === 'number') {
          if (t.sentiment_score > 0.1) tone = 'positive';
          else if (t.sentiment_score < -0.1) tone = 'negative';
        }
        chip.dataset.tone = tone;
        chip.appendChild(document.createTextNode(t.topic));
        if (typeof t.sentiment_score === 'number') {
          const score = el('span', 'score', (t.sentiment_score > 0 ? '+' : '') + t.sentiment_score.toFixed(2));
          chip.appendChild(score);
          chip.title = t.sentiment_label || '';
        }
        list.appendChild(chip);
      });
      tdTopics.appendChild(list);
    } else {
      tdTopics.appendChild(el('span', 'cell-placeholder', '—'));
    }
    tr.appendChild(tdTopics);

    const tdTime = el('td', 'num', Math.round(s.totalMs / total * 100) + '%');
    tr.appendChild(tdTime);

    speakersTbody.appendChild(tr);
  });
}

// ── Render: behaviors ────────────────────────────────────────────────────────
function renderBehaviors(data, isFinal) {
  const roles = speakerRoleMap(data);
  const behaviors = data.behaviors || [];
  const clipByUuid = new Map((data.clips || []).map(c => [c.clip_uuid, c]));

  const detected = behaviors.filter(b => b && b.detected);
  // Group by speaker, in lane order; sort within group by confidence desc.
  const groups = new Map();
  detected.forEach(b => {
    const k = b.speaker_label == null ? '—' : String(b.speaker_label);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(b);
  });
  const orderedLabels = [...laneOrder.filter(l => groups.has(l)), ...[...groups.keys()].filter(k => !laneOrder.includes(k))];

  behaviorsTbody.textContent = '';
  orderedLabels.forEach(label => {
    const list = groups.get(label).sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
    list.forEach((b, i) => {
      const tr = document.createElement('tr');

      const tdSpeaker = document.createElement('td');
      if (i === 0) {
        tdSpeaker.className = 'speaker-group-cell';
        tdSpeaker.textContent = displayName(label, roles);
      }
      tr.appendChild(tdSpeaker);

      const tdName = document.createElement('td');
      const nameBtn = el('button', 'behavior-name');
      nameBtn.type = 'button';
      const icon = el('span', 'behavior-icon');
      icon.appendChild(svgUse('#icon-star'));
      nameBtn.appendChild(icon);
      nameBtn.appendChild(el('span', null, b.behavior_name || 'Behavior'));
      const target = b.definitive_clip_uuid || (b.evidence_clip_uuids || [])[0];
      if (target) nameBtn.addEventListener('click', () => jumpToClip(target));
      tdName.appendChild(nameBtn);
      tr.appendChild(tdName);

      const tdReason = document.createElement('td');
      if (b.reasoning) tdReason.appendChild(el('p', 'reasoning-text', b.reasoning));
      const evidence = (b.evidence_clip_uuids || []).filter(u => clipByUuid.has(u));
      if (evidence.length) {
        const listEl = el('div', 'evidence-list');
        evidence.forEach(uuid => {
          const c = clipByUuid.get(uuid);
          const quote = el('button', 'evidence-link');
          quote.type = 'button';
          quote.appendChild(el('span', 't', fmtTime(c.start_ms || 0)));
          const text = (c.text || '').length > 160 ? (c.text || '').slice(0, 157) + '…' : (c.text || '');
          quote.appendChild(document.createTextNode('“' + text + '”'));
          quote.addEventListener('click', () => jumpToClip(uuid));
          listEl.appendChild(quote);
        });
        tdReason.appendChild(listEl);
      }
      tr.appendChild(tdReason);

      const tdConf = el('td', 'num', b.confidence != null ? Math.round(b.confidence * 100) + '%' : '—');
      tr.appendChild(tdConf);

      behaviorsTbody.appendChild(tr);
    });
  });

  if (!detected.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.className = 'behaviors-empty';
    td.textContent = isFinal
      ? 'No configured behaviors were detected on this call.'
      : 'Listening for behaviors…';
    tr.appendChild(td);
    behaviorsTbody.appendChild(tr);
  }

  // "Also checked" line: names that came back undetected (final only).
  const undetectedNames = [...new Set(behaviors.filter(b => b && !b.detected).map(b => b.behavior_name).filter(Boolean))];
  const detectedNames = new Set(detected.map(b => b.behavior_name));
  const alsoChecked = undetectedNames.filter(n => !detectedNames.has(n));
  if (isFinal) {
    const names = alsoChecked.length ? alsoChecked
      : activeBehaviorNames().filter(n => !detectedNames.has(n));
    behaviorsChecked.textContent = names.length ? 'Also checked, not detected: ' + names.join(' · ') : '';
    behaviorsChecked.hidden = !names.length;
  } else {
    behaviorsChecked.hidden = true;
  }
}

// ── Render: transcript ───────────────────────────────────────────────────────
function renderTranscript(data) {
  const roles = speakerRoleMap(data);
  const clips = data.clips || [];

  // definitive evidence markers
  const starredClips = new Map(); // uuid → [behavior names]
  (data.behaviors || []).forEach(b => {
    if (!b || !b.detected || !b.definitive_clip_uuid) return;
    if (!starredClips.has(b.definitive_clip_uuid)) starredClips.set(b.definitive_clip_uuid, []);
    starredClips.get(b.definitive_clip_uuid).push(b.behavior_name);
  });

  transcriptList.textContent = '';
  clipEls = new Map();
  transcriptRows = [];
  let prevSpeaker = null;

  clips.forEach(c => {
    const li = el('li', 'report-transcript');
    if (prevSpeaker !== null && c.speaker_label !== prevSpeaker) li.classList.add('new-speaker');
    prevSpeaker = c.speaker_label;
    if (c.clip_uuid) li.dataset.clipUuid = c.clip_uuid;

    const btn = el('button', 'report-transcript-trigger');
    btn.type = 'button';
    btn.appendChild(el('span', 'report-item-time', fmtTime(c.start_ms || 0)));

    const body = el('span', 'report-transcript-body');
    const meta = el('span', 'report-transcript-meta');
    meta.appendChild(el('span', 'report-transcript-from', displayName(c.speaker_label, roles)));
    if (c.emotion && String(c.emotion).toLowerCase() !== 'neutral') {
      const pill = el('span', 'emotion-pill', c.emotion.charAt(0).toUpperCase() + c.emotion.slice(1).toLowerCase());
      pill.style.setProperty('--tone', emotionColor(c.emotion));
      meta.appendChild(pill);
    }
    if (c.clip_uuid && starredClips.has(c.clip_uuid)) {
      const star = el('span', 'transcript-star');
      star.appendChild(svgUse('#icon-star'));
      star.title = starredClips.get(c.clip_uuid).join(', ');
      meta.appendChild(star);
    }
    body.appendChild(meta);
    body.appendChild(el('span', 'report-transcript-text', c.text || ''));
    btn.appendChild(body);
    btn.addEventListener('click', () => seekTo(c.start_ms || 0, true));
    li.appendChild(btn);
    transcriptList.appendChild(li);

    if (c.clip_uuid) clipEls.set(c.clip_uuid, li);
    transcriptRows.push({ el: li, start: c.start_ms || 0, end: (c.start_ms || 0) + (c.duration_ms || 0) });
  });
}

// ── Render orchestrator ──────────────────────────────────────────────────────
function renderReport(data, isFinal) {
  report = data;
  updateLaneOrder(data.clips || []);
  renderPlayer(data);
  renderSummary(data);
  renderSpeakers(data);
  renderBehaviors(data, isFinal);
  renderTranscript(data);
}

function scheduleRender() {
  if (renderPending) return;
  renderPending = true;
  setTimeout(() => {
    renderPending = false;
    if (isLive && streamData) renderReport(streamData, false);
  }, 150);
}

// ── Audio / playback sync ────────────────────────────────────────────────────
function seekTo(ms, play) {
  if (!audio.src) return;
  try { audio.currentTime = ms / 1000; } catch {}
  if (play) audio.play().catch(() => {});
}

function jumpToClip(uuid) {
  const li = clipEls.get(uuid);
  const c = report && (report.clips || []).find(x => x.clip_uuid === uuid);
  if (c) seekTo(c.start_ms || 0, !audio.paused);
  if (li) {
    li.scrollIntoView({ behavior: 'smooth', block: 'center' });
    li.classList.remove('flash');
    void li.offsetWidth; // restart animation
    li.classList.add('flash');
  }
}

btnPlay.addEventListener('click', () => {
  if (!audio.src) return;
  if (audio.paused) audio.play().catch(() => {}); else audio.pause();
});
audio.addEventListener('play', () => { playIconUse.setAttribute('href', '#icon-pause'); btnPlay.setAttribute('aria-label', 'Pause'); });
audio.addEventListener('pause', () => { playIconUse.setAttribute('href', '#icon-play'); btnPlay.setAttribute('aria-label', 'Play'); });
audio.addEventListener('loadedmetadata', () => {
  btnPlay.disabled = false;
  timeTotal.textContent = fmtTime(reportDurationMs());
});

// rAF playback tracker: playhead line, current time, active clip + transcript row.
let lastActiveRow = null;
let lastActiveClip = null;
function tick() {
  const dur = reportDurationMs();
  const t = audio.currentTime * 1000;
  if (dur && audio.src) {
    timeCurrent.textContent = fmtTime(t);
    if (!audio.paused || t > 0) {
      playerLine.hidden = false;
      playerLine.style.left = Math.min(t / dur * 100, 100) + '%';
    }
  }
  // Highlight current transcript row + player clip while playing
  if (!audio.paused && transcriptRows.length) {
    let active = null;
    for (const r of transcriptRows) {
      if (r.start <= t) active = r; else break;
    }
    if (active && active.end < t) { /* between clips — keep last */ }
    if (active !== lastActiveRow) {
      if (lastActiveRow) lastActiveRow.el.classList.remove('playing');
      if (active) active.el.classList.add('playing');
      lastActiveRow = active;
    }
    let activeClip = null;
    for (const r of playerClipEls) {
      if (r.start <= t && t < r.end) { activeClip = r; break; }
    }
    if (activeClip !== lastActiveClip) {
      if (lastActiveClip) lastActiveClip.el.classList.remove('playing');
      if (activeClip) activeClip.el.classList.add('playing');
      lastActiveClip = activeClip;
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// Click-to-seek + hover time on the visualization
playerViz.addEventListener('click', (e) => {
  if (e.target !== playerViz) return; // clips handle their own clicks
  const rect = playerViz.getBoundingClientRect();
  const frac = (e.clientX - rect.left) / rect.width;
  const dur = reportDurationMs();
  if (dur) seekTo(frac * dur, !audio.paused);
});
playerViz.addEventListener('mousemove', (e) => {
  const rect = playerViz.getBoundingClientRect();
  const frac = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
  const dur = reportDurationMs();
  if (!dur) return;
  playerHoverLine.hidden = false;
  playerHoverLine.style.left = (frac * 100) + '%';
  playerHoverCaption.hidden = false;
  playerHoverCaption.style.left = (frac * 100) + '%';
  playerHoverCaption.textContent = fmtTime(frac * dur);
});
playerViz.addEventListener('mouseleave', () => {
  playerHoverLine.hidden = true;
  playerHoverCaption.hidden = true;
});

// ── Sticky player ────────────────────────────────────────────────────────────
function updateStuck() {
  const portTop = playerPort.offsetTop;
  const shouldStick = window.scrollY > portTop + 8;
  if (shouldStick && !playerPort.classList.contains('stuck')) {
    const rect = playerPort.getBoundingClientRect();
    playerPort.style.setProperty('--fixed-left', rect.left + 'px');
    playerPort.style.setProperty('--fixed-width', rect.width + 'px');
    playerPort.classList.add('stuck');
  } else if (!shouldStick && playerPort.classList.contains('stuck')) {
    playerPort.classList.remove('stuck');
  } else if (shouldStick) {
    // keep width in sync (resize while stuck)
    const rect = playerPort.getBoundingClientRect();
    playerPort.style.setProperty('--fixed-left', rect.left + 'px');
    playerPort.style.setProperty('--fixed-width', rect.width + 'px');
  }
}
window.addEventListener('scroll', updateStuck, { passive: true });
window.addEventListener('resize', updateStuck);

// ── Processing overlay ───────────────────────────────────────────────────────
function showProcessing(filename) {
  processingFile.textContent = filename;
  processingStatus.textContent = 'Uploading… 0%';
  processing.hidden = false;
  processingStartedAt = Date.now();
  processingTimer = setInterval(() => {
    if (processingStatus.dataset.phase === 'server') {
      const s = Math.round((Date.now() - processingStartedAt) / 1000);
      processingStatus.textContent = 'Processing on server… ' + s + 's';
    }
  }, 1000);
}
function hideProcessing() {
  processing.hidden = true;
  if (processingTimer) { clearInterval(processingTimer); processingTimer = null; }
  delete processingStatus.dataset.phase;
}
processingCancel.addEventListener('click', () => {
  if (batchXhr) batchXhr.abort();
  hideProcessing();
  isBatch = false;
  setStatus('ready', 'Analysis cancelled — previous report shown.');
});

// ── Batch flow ───────────────────────────────────────────────────────────────
function startBatch(file) {
  if (isLive || isBatch) return;
  isBatch = true;
  errorBanner.hidden = true;
  showProcessing(file.name);

  const formData = new FormData();
  formData.append('upload_file', file);
  formData.append('config', JSON.stringify(getActiveConfig()));

  batchXhr = new XMLHttpRequest();
  batchXhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const pct = Math.round(e.loaded / e.total * 100);
      if (pct < 100) {
        processingStatus.textContent = 'Uploading… ' + pct + '%';
      } else {
        processingStatus.dataset.phase = 'server';
        processingStartedAt = Date.now();
      }
    }
  });
  batchXhr.upload.addEventListener('load', () => {
    processingStatus.dataset.phase = 'server';
    processingStartedAt = Date.now();
  });
  batchXhr.addEventListener('load', () => {
    isBatch = false;
    const text = batchXhr.responseText;
    if (batchXhr.status < 200 || batchXhr.status >= 300) {
      let body = {};
      try { body = JSON.parse(text); } catch {}
      hideProcessing();
      showError(body.detail || body.message || body.error || ('Server error (' + batchXhr.status + ')'));
      setStatus('ready', 'Analysis failed — previous report shown.');
      return;
    }
    let data;
    try { data = JSON.parse(text); } catch {
      hideProcessing();
      showError('Invalid response from server');
      return;
    }
    // Fresh report state
    laneOrder = [];
    reportFilename = data.filename || file.name;
    setAudioSource(URL.createObjectURL(file), true);
    renderReport(data, true);
    hideProcessing();
    const secs = Math.round((Date.now() - processingStartedAt) / 1000);
    setStatus('ready', 'Report ready — ' + reportFilename + ' · analyzed in ' + secs + 's');
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  batchXhr.addEventListener('error', () => {
    isBatch = false;
    hideProcessing();
    showError('Network error — could not reach server');
  });
  batchXhr.addEventListener('timeout', () => {
    isBatch = false;
    hideProcessing();
    showError('Request timed out — try a shorter file');
  });
  batchXhr.open('POST', '/api/velma-2-batch');
  batchXhr.timeout = 300000;
  batchXhr.send(formData);
}

// ── Streaming flow ───────────────────────────────────────────────────────────
let streamData = null;

function newStreamData() {
  return {
    clips: [], behaviors: [], participant_role_picks: [],
    conversation_type_pick: null, topics: [], topic_sentiments: [],
    summary: null, duration_ms: 0,
  };
}

function handleStreamMessage(msg) {
  if (!msg || !streamData) return;
  switch (msg.type) {
    case 'clip':
      if (msg.clip) streamData.clips.push(msg.clip);
      break;
    case 'conversation_type':
      if (msg.pick) streamData.conversation_type_pick = msg.pick;
      break;
    case 'participant_role':
      if (msg.pick) {
        const i = streamData.participant_role_picks.findIndex(p => p.speaker_label === msg.pick.speaker_label);
        if (i >= 0) streamData.participant_role_picks[i] = msg.pick;
        else streamData.participant_role_picks.push(msg.pick);
      }
      break;
    case 'behavior_detection':
      if (msg.detection) streamData.behaviors.push(msg.detection);
      break;
    case 'topics':
      if (Array.isArray(msg.topics)) streamData.topics = msg.topics;
      break;
    case 'topic_sentiment':
      if (msg.topic_sentiment) streamData.topic_sentiments.push(msg.topic_sentiment);
      break;
    case 'summary':
      if (typeof msg.text === 'string') streamData.summary = msg.text;
      break;
    case 'error':
      showError('Streaming error: ' + (msg.error || 'Unknown error'));
      return;
    case 'done':
      if (typeof msg.duration_ms === 'number') streamData.duration_ms = msg.duration_ms;
      finalizeStream();
      return;
    default:
      return;
  }
  scheduleRender();
}

function finalizeStream() {
  isLive = false;
  if (chunkTimer) { clearTimeout(chunkTimer); chunkTimer = null; }
  renderReport(streamData, true);
  setStatus('ready', 'Report ready — ' + reportFilename + ' · streamed live');
}

function stopStream(userInitiated) {
  if (chunkTimer) { clearTimeout(chunkTimer); chunkTimer = null; }
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    try { ws.close(); } catch {}
  }
  ws = null;
  if (isLive) {
    isLive = false;
    if (userInitiated) {
      audio.pause();
      renderReport(streamData || newStreamData(), true);
      setStatus('ready', 'Streaming stopped — partial report for ' + reportFilename);
    }
  }
}
btnStop.addEventListener('click', () => stopStream(true));

async function startStream(file) {
  if (isLive || isBatch) return;
  errorBanner.hidden = true;

  // Reset report state to an empty live report
  isLive = true;
  streamData = newStreamData();
  laneOrder = [];
  reportFilename = file.name;
  setAudioSource(URL.createObjectURL(file), true);
  renderReport(streamData, false);
  setStatus('busy', 'Preparing audio…', true);
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Decode to 16 kHz mono s16le PCM before opening the socket.
  let int16;
  try {
    const arr = await file.arrayBuffer();
    const actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    const decoded = await actx.decodeAudioData(arr);
    const ch = decoded.getChannelData(0);
    int16 = new Int16Array(ch.length);
    for (let i = 0; i < ch.length; i++) {
      int16[i] = Math.max(-32768, Math.min(32767, Math.round(ch[i] * 32767)));
    }
    actx.close().catch(() => {});
  } catch (err) {
    isLive = false;
    setStatus('ready', 'Could not decode audio.');
    showError('Failed to decode audio: ' + (err && err.message ? err.message : err));
    return;
  }
  if (!isLive) return; // stopped while decoding

  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(proto + '//' + location.host + '/api/velma-2-streaming?audio_format=s16le&sample_rate=16000&num_channels=1');
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    if (!isLive) { try { ws.close(); } catch {} return; }
    setStatus('live', 'Analysis in progress — this report updates live', true);

    // Protocol step 1: config frame.
    try { ws.send(JSON.stringify(getActiveConfig())); } catch {}

    // Play the audio alongside the stream.
    try { audio.currentTime = 0; } catch {}
    audio.play().catch(() => {});

    // Protocol step 2: paced PCM chunks (4096 samples = 256 ms @ 16 kHz).
    const CHUNK = 4096;
    let offset = 0;
    const sendNext = () => {
      if (!isLive || !ws || ws.readyState !== WebSocket.OPEN) return;
      if (offset >= int16.length) {
        try { ws.send(''); } catch {} // Protocol step 3: end-of-audio frame.
        return;
      }
      const end = Math.min(offset + CHUNK, int16.length);
      const slice = int16.subarray(offset, end);
      const ab = new ArrayBuffer(slice.byteLength);
      new Int16Array(ab).set(slice);
      ws.send(ab);
      offset = end;
      chunkTimer = setTimeout(sendNext, 256);
    };
    sendNext();
  };

  ws.addEventListener('message', async (event) => {
    let text = '';
    try {
      if (typeof event.data === 'string') text = event.data;
      else if (event.data instanceof Blob) text = await event.data.text();
      else if (event.data instanceof ArrayBuffer) text = new TextDecoder().decode(event.data);
    } catch { return; }
    if (!text) return;
    let msg;
    try { msg = JSON.parse(text); } catch { return; }
    handleStreamMessage(msg);
  });

  ws.onerror = () => {
    if (chunkTimer) { clearTimeout(chunkTimer); chunkTimer = null; }
  };

  ws.onclose = (event) => {
    if (chunkTimer) { clearTimeout(chunkTimer); chunkTimer = null; }
    const wasLive = isLive;
    isLive = false;
    btnStop.hidden = true;
    if (event.code !== 1000 && wasLive && !(streamData && streamData.duration_ms)) {
      let m;
      const reason = event.reason || '';
      if (event.code === 4029) m = 'Insufficient credits to complete the request.';
      else if (event.code === 4003) m = 'This request is not permitted.';
      else if (event.code === 1003) m = 'Protocol error: ' + (reason || 'invalid config or unsupported audio format.');
      else if (event.code === 1011) m = 'Upstream server error: ' + (reason || 'the service is temporarily unavailable.');
      else if (event.code === 1006) m = 'Could not connect to the server. You may have hit the rate limit — wait a minute and try again.';
      else m = 'Connection closed' + (reason ? ': ' + reason : '') + ' (code ' + event.code + ').';
      showError(m);
      renderReport(streamData || newStreamData(), true);
      setStatus('ready', 'Streaming interrupted — partial report for ' + reportFilename);
    }
  };
}

// ── Behavior set modal ───────────────────────────────────────────────────────
let pendingParse = null; // last parsed upload, not yet applied

function describeActiveSet() {
  if (!behaviorSet) return 'Default · ' + VELMA_CONFIG.behaviors.length + ' presets';
  const n = (getActiveConfig().behaviors || []).length;
  if (behaviorSet.mode === 'replace' && behaviorSet.fullConfig) return 'Custom BatchConfig · ' + n + ' behaviors';
  if (behaviorSet.mode === 'replace') return 'Custom · ' + n + ' behaviors (replaced default)';
  return 'Custom · ' + n + ' behaviors (default + ' + behaviorSet.entries.length + ' added)';
}

function updateBehaviorSetUi() {
  behaviorsCurrent.textContent = describeActiveSet();
  if (behaviorSet) {
    const n = (getActiveConfig().behaviors || []).length;
    btnBehaviors.textContent = 'Behaviors · ' + n;
    btnBehaviors.classList.add('solid');
  } else {
    btnBehaviors.textContent = 'Behaviors';
    btnBehaviors.classList.remove('solid');
  }
  behaviorsReset.disabled = !behaviorSet;
}

function selectedMode() {
  const checked = behaviorsModal.querySelector('input[name="behaviors-mode"]:checked');
  return checked ? checked.value : 'add';
}

function renderBehaviorsPreview() {
  if (!pendingParse) { behaviorsPreview.hidden = true; behaviorsApply.disabled = true; return; }
  const { kind, entries, names, problems } = pendingParse;
  behaviorsPreview.hidden = false;

  const mode = selectedMode();
  const errors = problems.filter(p => p.level === 'error');
  behaviorsPreviewTitle.textContent =
    (kind === 'full' ? 'Full BatchConfig' : 'Behavior list') + ' — ' + entries.length + ' behavior' + (entries.length === 1 ? '' : 's') +
    (kind === 'full' && mode === 'add' ? ' (Add mode uses only the file\'s behaviors — its types/roles/settings are ignored)' : '');

  behaviorsChips.textContent = '';
  entries.forEach((e, i) => {
    const isPreset = typeof e === 'string';
    const chip = el('span', 'behavior-chip' + (isPreset ? ' preset' : ''));
    const star = el('span', 'behavior-chip-star');
    star.appendChild(svgUse('#icon-star'));
    chip.appendChild(star);
    chip.appendChild(document.createTextNode(names[i] || '?'));
    if (isPreset) chip.title = e;
    behaviorsChips.appendChild(chip);
  });

  behaviorsProblems.textContent = '';
  problems.forEach(p => {
    const li = el('li', p.level === 'warn' ? 'warn' : null, p.text);
    behaviorsProblems.appendChild(li);
  });

  behaviorsApply.disabled = errors.length > 0 || entries.length === 0;
}

function openBehaviorsModal() {
  loadPresetCatalog().then(() => {
    // Re-validate a pending file against the catalog once it arrives.
    if (pendingParse && pendingParse.raw != null) {
      pendingParse = { ...parseBehaviorsJson(pendingParse.raw), raw: pendingParse.raw };
      renderBehaviorsPreview();
    }
  });
  updateBehaviorSetUi();
  renderBehaviorsPreview();
  behaviorsModal.hidden = false;
}
function closeBehaviorsModal() {
  behaviorsModal.hidden = true;
}

async function handleBehaviorsFile(file) {
  const text = await file.text();
  let data;
  let repaired = false;
  try {
    data = JSON.parse(text);
  } catch (e) {
    // Common copy-paste fragment: `"behaviors": [...]` without the surrounding
    // braces. Try re-wrapping before giving up.
    const trimmed = text.trim();
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
      try { data = JSON.parse('{' + trimmed + '}'); repaired = true; } catch {}
      if (!repaired) { try { data = JSON.parse('{' + trimmed); repaired = true; } catch {} }
    }
    if (!repaired) {
      pendingParse = { kind: null, entries: [], fullConfig: null, names: [], raw: null,
        problems: [{ level: 'error', text: 'Not valid JSON: ' + (e && e.message ? e.message : e) + ' — the file must start with { or [ (a copied fragment like "behaviors": [...] is missing its opening brace).' }] };
      renderBehaviorsPreview();
      return;
    }
  }
  await loadPresetCatalog().catch(() => {});
  pendingParse = { ...parseBehaviorsJson(data), raw: data };
  if (repaired) {
    pendingParse.problems.unshift({ level: 'warn', text: 'File was a JSON fragment missing its opening { — auto-repaired and parsed.' });
  }
  renderBehaviorsPreview();
}

btnBehaviors.addEventListener('click', openBehaviorsModal);
behaviorsCloseBtn.addEventListener('click', closeBehaviorsModal);
behaviorsModal.addEventListener('click', (e) => { if (e.target === behaviorsModal) closeBehaviorsModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !behaviorsModal.hidden) closeBehaviorsModal(); });

behaviorsDrop.addEventListener('click', (e) => {
  if (e.target === behaviorsExampleLink) return; // let the example download through
  fileInputBehaviors.click();
});
behaviorsDrop.addEventListener('dragover', (e) => { e.preventDefault(); behaviorsDrop.classList.add('dragover'); });
behaviorsDrop.addEventListener('dragleave', () => behaviorsDrop.classList.remove('dragover'));
behaviorsDrop.addEventListener('drop', (e) => {
  e.preventDefault();
  behaviorsDrop.classList.remove('dragover');
  const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) handleBehaviorsFile(f);
});
fileInputBehaviors.addEventListener('change', () => {
  const f = fileInputBehaviors.files && fileInputBehaviors.files[0];
  fileInputBehaviors.value = '';
  if (f) handleBehaviorsFile(f);
});
behaviorsModal.querySelectorAll('input[name="behaviors-mode"]').forEach(r => {
  r.addEventListener('change', () => {
    modeReplaceNote.textContent = (pendingParse && pendingParse.kind === 'full' && selectedMode() === 'replace')
      ? ' — the file\'s conversation types, roles, and STT settings replace the page\'s too'
      : '';
    renderBehaviorsPreview();
  });
});

behaviorsApply.addEventListener('click', () => {
  if (!pendingParse || behaviorsApply.disabled) return;
  const mode = selectedMode();
  behaviorSet = {
    mode,
    entries: pendingParse.entries,
    fullConfig: (mode === 'replace' && pendingParse.kind === 'full') ? pendingParse.fullConfig : null,
    names: pendingParse.names,
  };
  updateBehaviorSetUi();
  closeBehaviorsModal();
  setStatus('ready', describeActiveSet() + ' — applies to the next upload or stream.');
});

behaviorsReset.addEventListener('click', () => {
  behaviorSet = null;
  pendingParse = null;
  updateBehaviorSetUi();
  renderBehaviorsPreview();
  setStatus('ready', 'Behavior set reset to default (' + VELMA_CONFIG.behaviors.length + ' presets).');
});

// ── File pickers ─────────────────────────────────────────────────────────────
btnUpload.addEventListener('click', () => {
  if (isLive) { stopStream(true); }
  fileInputBatch.click();
});
btnStream.addEventListener('click', () => {
  if (isLive) { stopStream(true); }
  fileInputStream.click();
});
fileInputBatch.addEventListener('change', () => {
  const f = fileInputBatch.files && fileInputBatch.files[0];
  fileInputBatch.value = '';
  if (f) startBatch(f);
});
fileInputStream.addEventListener('change', () => {
  const f = fileInputStream.files && fileInputStream.files[0];
  fileInputStream.value = '';
  if (f) startStream(f);
});

// ── Init: preloaded report ───────────────────────────────────────────────────
async function init() {
  setStatus('busy', 'Loading report…');
  let data = null;
  try {
    const res = await fetch(DEMO_REPORT_URL);
    if (res.ok) data = await res.json();
  } catch {}
  if (!data) {
    try {
      const res = await fetch(DEMO_REPORT_FALLBACK_URL);
      if (res.ok) data = await res.json();
    } catch {}
  }
  if (!data) {
    setStatus('ready', 'No preloaded report — upload or stream a call to begin.');
    return;
  }
  reportFilename = data.filename || 'Irate_Caller_Final.mp3';
  setAudioSource(DEMO_AUDIO_URL, false);
  renderReport(data, true);
  setStatus('ready', 'Report ready — ' + reportFilename + ' · preprocessed with Velma');
}
init();

})();
