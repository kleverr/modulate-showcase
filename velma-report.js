/* Velma "Design 2" — the dt Call report renderer, ported from dt/dt.js.
   Render-only: transport, config and demo loading stay in app.js. All DOM ids
   and classes are vr-prefixed (the main page already uses the unprefixed
   Deeptalk names for its own player). Exposes window.VelmaReport. */
(function () {
  'use strict';

  // ── Emotion groups (Deeptalk palette) ──────────────────────────────────────
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

  // ── DOM ─────────────────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const root = $('velma-report-view');
  const audio = $('vr-audio');
  const playerPort = $('vr-player-port');
  const playerViz = $('vr-player-viz');
  const speakerLabels = $('vr-speaker-labels');
  const behaviourIndicators = $('vr-behaviour-indicators');
  const playerLine = $('vr-player-line');
  const playerHoverLine = $('vr-player-hover-line');
  const playerHoverCaption = $('vr-player-hover-caption');
  const btnPlay = $('vr-btn-play');
  const playIconUse = $('vr-play-icon-use');
  const timeCurrent = $('vr-time-current');
  const timeTotal = $('vr-time-total');
  const summaryText = $('vr-summary-text');
  const conversationMeta = $('vr-conversation-meta');
  const speakersTbody = $('vr-speakers-tbody');
  const behaviorsTbody = $('vr-behaviors-tbody');
  const behaviorsChecked = $('vr-behaviors-checked');
  const transcriptList = $('vr-transcript-list');
  if (!root || !audio) return; // markup not present — nothing to do

  // ── State ───────────────────────────────────────────────────────────────────
  let report = null;
  let reportFilename = '';
  let checkedNames = [];       // configured behavior names for the "also checked" line
  let laneOrder = [];          // stable speaker→lane assignment per analysis
  let clipEls = new Map();     // clip_uuid → transcript <li>
  let playerClipEls = [];      // [{el, start, end}] for playback highlight
  let transcriptRows = [];     // [{el, start, end}] in order

  function isVisible() { return !!root.offsetParent; }

  // ── Utils ───────────────────────────────────────────────────────────────────
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

  // ── PII/PHI (same tag grammar + .pii-blur treatment as the Modulate design)
  const PII_REGEX = /<(pii|phi)(?::(\w+))?>([\s\S]*?)<\/\1(?::\2)?>/gi;
  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function hasPiiTags(text) {
    PII_REGEX.lastIndex = 0;
    return PII_REGEX.test(text || '');
  }
  // Tagged raw text → HTML with blurred spans (everything else escaped).
  function renderPiiHtml(rawText) {
    const raw = String(rawText || '');
    PII_REGEX.lastIndex = 0;
    let result = '';
    let lastIdx = 0;
    let match;
    while ((match = PII_REGEX.exec(raw)) !== null) {
      result += escapeHtml(raw.slice(lastIdx, match.index));
      const tagType = match[1].toUpperCase();
      const tagName = match[2] ? match[2].replace(/_/g, ' ') : tagType;
      result += '<span class="pii-blur" title="' + tagType + ': ' + escapeHtml(tagName) + '">' + escapeHtml(match[3]) + '</span>';
      lastIdx = match.index + match[0].length;
    }
    result += escapeHtml(raw.slice(lastIdx));
    return result;
  }
  // For plain-text contexts (tooltips): drop the tags, keep the content.
  function stripPiiTags(rawText) {
    PII_REGEX.lastIndex = 0;
    return String(rawText || '').replace(PII_REGEX, '$3');
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

  function displayName(label) {
    return 'Speaker ' + label;
  }

  function updateLaneOrder(clips) {
    for (const c of clips) {
      const k = c.speaker_label == null ? '—' : String(c.speaker_label);
      if (!laneOrder.includes(k)) laneOrder.push(k);
    }
  }

  // ── Render: player ──────────────────────────────────────────────────────────
  function renderPlayer(data) {
    const clips = data.clips || [];
    updateLaneOrder(clips);
    const durationMs = reportDurationMs();

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
      const btn = el('button', 'vr-transcript-clip');
      btn.type = 'button';
      btn.style.left = left + '%';
      btn.style.width = width + '%';
      btn.style.setProperty('--row-top', rowTop(idx) + '%');
      btn.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
      btn.style.setProperty('--clip-color', emotionColor(c.emotion));
      btn.title = fmtTime(c.start_ms || 0) + (c.emotion ? ' · ' + c.emotion : '') + '\n' + stripPiiTags(c.text || '');
      const viz = el('span', 'vr-clip-visualization');
      btn.appendChild(viz);
      btn.addEventListener('click', () => seekTo(c.start_ms || 0, true));
      playerViz.appendChild(btn);
      playerClipEls.push({ el: btn, start: c.start_ms || 0, end: (c.start_ms || 0) + (c.duration_ms || 0) });
    }

    laneOrder.forEach((label, idx) => {
      const lab = el('div', 'vr-speaker-label');
      lab.style.setProperty('--row-top', rowTop(idx) + '%');
      lab.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
      lab.appendChild(el('span', null, displayName(label)));
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
        const ind = el('div', 'vr-behaviour-indicator');
        ind.style.left = ((c.start_ms || 0) / durationMs * 100) + '%';
        ind.style.setProperty('--row-top', rowTop(idx) + '%');
        ind.style.setProperty('--row-height', (rowH - rowPad * 2) + '%');
        const icon = el('span', 'vr-behaviour-icon');
        icon.appendChild(svgUse('#vr-icon-star'));
        ind.appendChild(icon);
        ind.appendChild(el('span', 'vr-behaviour-label-text', b.behavior_name || ''));
        ind.addEventListener('click', () => jumpToClip(uuid));
        behaviourIndicators.appendChild(ind);
      });
    });
  }

  // ── Render: summary + meta ──────────────────────────────────────────────────
  function renderSummary(data) {
    const summary = data.summary || '';
    if (hasPiiTags(summary)) summaryText.innerHTML = renderPiiHtml(summary);
    else summaryText.textContent = summary;

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
      const item = el('div', 'vr-meta-item');
      item.appendChild(el('span', 'vr-meta-label', label));
      const v = el('span', 'vr-meta-value', value + ' ');
      if (conf != null) v.appendChild(el('span', 'vr-conf', Math.round(conf * 100) + '%'));
      item.appendChild(v);
      conversationMeta.appendChild(item);
    });
  }

  // ── Render: speakers table ──────────────────────────────────────────────────
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
    const stats = computeSpeakerStats(data.clips || []);
    const total = stats.reduce((a, s) => a + s.totalMs, 0) || 1;

    speakersTbody.textContent = '';
    stats.forEach(s => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.appendChild(el('span', 'vr-speaker-name', displayName(s.label)));
      tr.appendChild(tdName);

      const tdPattern = document.createElement('td');
      const pattern = el('div', 'vr-emotion-pattern');
      const bar = el('div', 'vr-emotion-bar');
      const segTotal = s.segments.reduce((a, x) => a + x.ms, 0) || 1;
      s.segments.forEach(seg => {
        const segBtn = el('button', 'vr-emotion-segment');
        segBtn.type = 'button';
        segBtn.style.setProperty('--w', String(seg.ms / segTotal));
        segBtn.style.setProperty('--seg-color', emotionColor(seg.emotion));
        segBtn.title = seg.emotion + ' · ' + fmtTime(seg.start);
        segBtn.addEventListener('click', () => seekTo(seg.start, true));
        bar.appendChild(segBtn);
      });
      pattern.appendChild(bar);
      if (s.emotions.length) {
        const legend = el('div', 'vr-emotion-legend');
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

      const tdTime = el('td', 'vr-num', Math.round(s.totalMs / total * 100) + '%');
      tr.appendChild(tdTime);

      speakersTbody.appendChild(tr);
    });
  }

  // ── Render: behaviors ───────────────────────────────────────────────────────
  function renderBehaviors(data, isFinal) {
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
          tdSpeaker.className = 'vr-speaker-group-cell';
          tdSpeaker.textContent = displayName(label);
        }
        tr.appendChild(tdSpeaker);

        const tdName = document.createElement('td');
        const nameBtn = el('button', 'vr-behavior-name');
        nameBtn.type = 'button';
        const icon = el('span', 'vr-behavior-icon');
        icon.appendChild(svgUse('#vr-icon-star'));
        nameBtn.appendChild(icon);
        nameBtn.appendChild(el('span', null, b.behavior_name || 'Behavior'));
        const target = b.definitive_clip_uuid || (b.evidence_clip_uuids || [])[0];
        if (target) nameBtn.addEventListener('click', () => jumpToClip(target));
        tdName.appendChild(nameBtn);
        tr.appendChild(tdName);

        const tdReason = document.createElement('td');
        if (b.reasoning) tdReason.appendChild(el('p', 'vr-reasoning-text', b.reasoning));
        const evidence = (b.evidence_clip_uuids || []).filter(u => clipByUuid.has(u));
        if (evidence.length) {
          const listEl = el('div', 'vr-evidence-list');
          evidence.forEach(uuid => {
            const c = clipByUuid.get(uuid);
            const quote = el('button', 'vr-evidence-link');
            quote.type = 'button';
            quote.appendChild(el('span', 'vr-t', fmtTime(c.start_ms || 0)));
            const raw = c.text || '';
            const body = el('span');
            if (hasPiiTags(raw)) {
              // Tagged quotes render in full — truncating could split a tag open.
              body.innerHTML = '“' + renderPiiHtml(raw) + '”';
            } else {
              body.textContent = '“' + (raw.length > 160 ? raw.slice(0, 157) + '…' : raw) + '”';
            }
            quote.appendChild(body);
            quote.addEventListener('click', () => jumpToClip(uuid));
            listEl.appendChild(quote);
          });
          tdReason.appendChild(listEl);
        }
        tr.appendChild(tdReason);

        const tdConf = el('td', 'vr-num', b.confidence != null ? Math.round(b.confidence * 100) + '%' : '—');
        tr.appendChild(tdConf);

        behaviorsTbody.appendChild(tr);
      });
    });

    if (!detected.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 4;
      td.className = 'vr-behaviors-empty';
      td.textContent = isFinal
        ? 'No configured behaviors were detected on this call.'
        : 'Listening for behaviors…';
      tr.appendChild(td);
      behaviorsTbody.appendChild(tr);
    }

    // "Also checked" line: names that came back undetected, else the configured
    // set (passed in by the host page — this module doesn't know the config).
    // Matching is case-insensitive: configured names may be title-cased preset
    // ids ("Refund Or Credit Issued") while detections carry the catalog name
    // ("Refund or Credit Issued") — a detected behavior must never show here.
    const lc = (s) => String(s || '').toLowerCase();
    const undetectedNames = [...new Set(behaviors.filter(b => b && !b.detected).map(b => b.behavior_name).filter(Boolean))];
    const detectedNames = new Set(detected.map(b => lc(b.behavior_name)));
    const alsoChecked = undetectedNames.filter(n => !detectedNames.has(lc(n)));
    if (isFinal) {
      const names = alsoChecked.length ? alsoChecked
        : (checkedNames || []).filter(n => !detectedNames.has(lc(n)));
      behaviorsChecked.textContent = names.length ? 'Also checked, not detected: ' + names.join(' · ') : '';
      behaviorsChecked.hidden = !names.length;
    } else {
      behaviorsChecked.hidden = true;
    }
  }

  // ── Render: transcript ──────────────────────────────────────────────────────
  function renderTranscript(data) {
    const clips = data.clips || [];

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
      const li = el('li', 'vr-report-transcript');
      if (prevSpeaker !== null && c.speaker_label !== prevSpeaker) li.classList.add('new-speaker');
      prevSpeaker = c.speaker_label;
      if (c.clip_uuid) li.dataset.clipUuid = c.clip_uuid;

      const btn = el('button', 'vr-report-transcript-trigger');
      btn.type = 'button';
      btn.appendChild(el('span', 'vr-report-item-time', fmtTime(c.start_ms || 0)));

      const body = el('span', 'vr-report-transcript-body');
      const meta = el('span', 'vr-report-transcript-meta');
      meta.appendChild(el('span', 'vr-report-transcript-from', displayName(c.speaker_label)));
      if (c.emotion && String(c.emotion).toLowerCase() !== 'neutral') {
        const pill = el('span', 'vr-emotion-pill', c.emotion.charAt(0).toUpperCase() + c.emotion.slice(1).toLowerCase());
        pill.style.setProperty('--tone', emotionColor(c.emotion));
        meta.appendChild(pill);
      }
      if (c.clip_uuid && starredClips.has(c.clip_uuid)) {
        const star = el('span', 'vr-transcript-star');
        star.appendChild(svgUse('#vr-icon-star'));
        star.title = starredClips.get(c.clip_uuid).join(', ');
        meta.appendChild(star);
      }
      body.appendChild(meta);
      const textEl = el('span', 'vr-report-transcript-text');
      if (hasPiiTags(c.text)) textEl.innerHTML = renderPiiHtml(c.text);
      else textEl.textContent = c.text || '';
      body.appendChild(textEl);
      btn.appendChild(body);
      btn.addEventListener('click', () => seekTo(c.start_ms || 0, true));
      li.appendChild(btn);
      transcriptList.appendChild(li);

      if (c.clip_uuid) clipEls.set(c.clip_uuid, li);
      transcriptRows.push({ el: li, start: c.start_ms || 0, end: (c.start_ms || 0) + (c.duration_ms || 0) });
    });
  }

  // ── Audio / playback sync ───────────────────────────────────────────────────
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
  audio.addEventListener('play', () => { playIconUse.setAttribute('href', '#vr-icon-pause'); btnPlay.setAttribute('aria-label', 'Pause'); });
  audio.addEventListener('pause', () => { playIconUse.setAttribute('href', '#vr-icon-play'); btnPlay.setAttribute('aria-label', 'Play'); });
  audio.addEventListener('loadedmetadata', () => {
    btnPlay.disabled = false;
    timeTotal.textContent = fmtTime(reportDurationMs());
  });

  // rAF playback tracker: playhead line, current time, active clip + transcript row.
  let lastActiveRow = null;
  let lastActiveClip = null;
  function tick() {
    if (isVisible()) {
      const dur = reportDurationMs();
      const t = audio.currentTime * 1000;
      if (dur && audio.src) {
        timeCurrent.textContent = fmtTime(t);
        if (!audio.paused || t > 0) {
          playerLine.hidden = false;
          playerLine.style.left = Math.min(t / dur * 100, 100) + '%';
        }
      }
      if (!audio.paused && transcriptRows.length) {
        let active = null;
        for (const r of transcriptRows) {
          if (r.start <= t) active = r; else break;
        }
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

  // ── Sticky player ───────────────────────────────────────────────────────────
  function updateStuck() {
    if (!isVisible()) { playerPort.classList.remove('stuck'); return; }
    const portTop = playerPort.getBoundingClientRect().top + window.scrollY;
    const shouldStick = window.scrollY > portTop + 8;
    if (shouldStick && !playerPort.classList.contains('stuck')) {
      const rect = playerPort.getBoundingClientRect();
      playerPort.style.setProperty('--fixed-left', rect.left + 'px');
      playerPort.style.setProperty('--fixed-width', rect.width + 'px');
      playerPort.classList.add('stuck');
    } else if (!shouldStick && playerPort.classList.contains('stuck')) {
      playerPort.classList.remove('stuck');
    } else if (shouldStick) {
      const rect = playerPort.getBoundingClientRect();
      playerPort.style.setProperty('--fixed-left', rect.left + 'px');
      playerPort.style.setProperty('--fixed-width', rect.width + 'px');
    }
  }
  window.addEventListener('scroll', updateStuck, { passive: true });
  window.addEventListener('resize', updateStuck);

  // ── Public API ──────────────────────────────────────────────────────────────
  window.VelmaReport = {
    // Bind the audio source. The host owns object-URL lifecycle — never revoked here.
    setSource(url, filename) {
      reportFilename = filename || '';
      if (audio.src !== url) {
        audio.src = url || '';
        playerLine.hidden = true;
      }
    },
    // Full render. opts: { isFinal = true, checkedNames = [] }
    render(data, opts) {
      const o = opts || {};
      checkedNames = o.checkedNames || [];
      report = data;
      updateLaneOrder((data && data.clips) || []);
      renderPlayer(data);
      renderSummary(data);
      renderSpeakers(data);
      renderBehaviors(data, o.isFinal !== false);
      renderTranscript(data);
    },
    // Clear per-analysis state (lane assignments, playhead) before a new file.
    reset() {
      report = null;
      laneOrder = [];
      clipEls = new Map();
      playerClipEls = [];
      transcriptRows = [];
      lastActiveRow = null;
      lastActiveClip = null;
      playerLine.hidden = true;
      timeCurrent.textContent = '0:00';
    },
    pause() { audio.pause(); },
    getRenderedData() { return report; },
  };
})();
