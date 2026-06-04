# Changelog

All notable changes to the Modulate Models Playground.

## [4.7.0] - 2026-06-04

### Changed
- **AI Music Detection batch — full schema overhaul.** Rebuilt the AI Music tab
  around the updated preview API response: clip-level vocal / instrumental /
  silence content percentages plus separate vocal and instrumental AI scores and
  confidence, with the verdict taken straight from the server's `primary_verdict`
  (no more client-side thresholding). The hero shows both detection paths
  (AI % + confidence) and a content breakdown.
- **Per-window timeline + table.** Added a per-4s-window timeline bar that reads
  at a glance as AI-generated / Not AI / Silence, plus a Deepfake-style table
  (Window · Type · Verdict · AI confidence) with verdict pills, confidence bars,
  hover tooltips, click-to-seek, and playback highlighting.

### Fixed
- **AI Music batch upload field.** The proxy now forwards the upload as
  `upload_file` (the updated spec's field name) instead of `file`.

### Notes
- AI Music **streaming** is fully built behind the scenes (WebSocket proxy +
  preview remap, live timeline, 3 streaming buttons) but the buttons stay hidden
  until the upstream preview streaming endpoint emits results — flip three
  visibility conditions to re-enable.

## [4.6.3] - 2026-06-03

### Fixed
- **Config modal no longer closes when selecting text.** Dragging to highlight a
  field value (e.g. the autofilled "New behavior" title) and releasing the mouse
  over the dim backdrop synthesized a click whose target was the backdrop, which
  tripped click-outside-to-close and shut the whole modal mid-edit. Backdrop close
  now requires the press *and* release to both land on the backdrop (tracked via
  `mousedown`), so selection drags that start inside an input no longer close it.
  Applied to all backdrop-dismissable modals (Velma config, stats, JSON, access).

## [4.6.2] - 2026-06-03

### Added
- **Velma cached demo.** The Velma tab now opens pre-loaded with a cached
  analysis (like the Transcription/Music/Language tabs) instead of starting
  empty — instant, no live API call. Uses a dedicated irate-caller support call
  (`deepfake/irate-caller-demo.mp3`) whose `config=default` run surfaces a rich
  result: 6 behaviors (Threat-based harassment, Inappropriate Speech, Coercion
  Manipulation, Issue Not Resolved ×2, Refund or Credit Issued), 3 topics +
  sentiments, conversation type, roles, and summary. The "Stream demo" button
  uses the same file. Cached results live in `velma-demo-data.json`.

## [4.6.1] - 2026-06-03

### Changed
- **Velma is now the default landing tab** on the public site. Visiting `/` opens
  the Velma (ensemble) demo first; the mode selector lists Velma ahead of
  Transcription. (Ships the previously-merged `0bd3ac4` / `6cbb02d` work that had
  not yet been deployed to production.)

## [4.6.0] - 2026-06-02

### Added
- **Velma streaming demo** over WebSocket (`/api/velma-2-streaming`). The Velma
  tab now mirrors transcription's streaming trio — **Start streaming** (mic),
  **Stream demo**, and **Stream file…** — following the velma-2-streaming
  protocol (config text frame first, then PCM, then an empty end frame). Server
  events (`clip` / `conversation_type` / `participant_role` / `behavior_detection`
  / `topics` / `topic_sentiment` / `summary` / `done`) render progressively.
- **Live behavior presets**: the config editor loads the server preset catalog
  (`list-presets`) and adds selections as `preset:<id>` refs. Each preset can be
  **Expanded** into a full editable `BehaviorDef` (catalog text + generated UUID)
  and **Collapsed** back to a reference.

### Changed
- **Rebuilt the Velma config editor to be true to the API contract.** Removed the
  fabricated conversation-type / participant-role / behavior libraries and their
  default selections. The editor is now a single honest state: the `config` is the
  literal string `"default"` until you change something, then it becomes an explicit
  `BatchConfig` — shown live in the right pane exactly as it's sent. Conversation
  types and roles start empty with opt-in **Load example** buttons. Model options
  (STT signals incl. deepfake, language, and `produce_*` outputs) are surfaced in
  settings and moved above the long behaviors list.
- Velma starts empty on load (no pre-cached demo) — run batch or streaming to populate.

### Fixed
- Surface a long-standing API gotcha: behaviors are only evaluated when the config
  also defines conversation types **and** participant roles — otherwise the API
  returns an empty `behaviors` array with no error. The editor now warns before you
  run, and the results show a "behaviors requested but none returned" note after a run.

### Server
- Allowlist `/api/velma-2-streaming` for the WebSocket proxy and honor preview
  path remaps (`→ /api/preview/velma-2-streaming`). Grouped the velma-2 preview
  remaps (batch + list-presets + streaming) behind a clear "launch flip" comment so
  the GA cutover (dropping `/api/preview/`) is a single edit.

## [4.5.0] - 2026-05-29

### Changed
- **Language Detection** is now a **released** model. Moved its tab ahead of the
  "Preview" divider (Preview now holds only AI Music Detection + Velma) and routed
  it through the prod gateway — retired the temporary GPU-box override
  (`54.211.253.95`). Verified live against `/api/velma-2-language-detection-batch`.
- **Fast (vfast) streaming** now points at the correct released path
  `velma-2-stt-streaming-english-v2` and routes through the prod gateway — retired
  the EC2 "Preview Forwarding URL" override. The previous `velma-2-stt-streaming-v2`
  path (still listed in the public docs) does not route on the gateway.

### Fixed
- **Debug** option is now properly hidden in **Fast** streaming mode. It was meant
  to be hidden (the debug panel only understands the rich v1 stream) but a
  `.stt-option { display: flex }` rule overrode the `hidden` attribute, leaving the
  checkbox visible; added `.stt-option[hidden] { display: none !important; }`.

## [4.4.0] - 2026-05-26

### Added
- **Velma** preview tab is now visible on the public site (previously
  localhost-only). Removed the `hidden` attributes and the hostname-gating
  script so the model is selectable everywhere.

## [4.3.0] - 2026-05-22

### Added
- **Language Detection** preview tab is back on the public site, sharing a
  visual "Preview" group with AI Music Detection. Cached demo loads
  instantly using the same `AIAgentFrustration.mp3` clip as transcription
  (English · 99.6% confidence). Velma stays localhost-only.
- Shared **Preview divider** in the top menu: one `| PREVIEW` marker
  separates production tabs from preview models instead of a pill on
  every tab.

### Changed
- **AI Music Detection** result panel polished:
  - Two-path flow diagram (Vocal · Instrumental) replaces the duplicate
    `%` stat tiles, making the SVD + Fakeprint architecture transparent.
    Null `instrumental_ai_prob` now renders as "not evaluated" instead
    of a cryptic dash.
  - Robot icon on the "AI Detected" badge (was a warning triangle).
  - Removed the redundant path-level note — the hero sub-headline
    already explains the verdict.
  - Caveat panel uses subtle background tint instead of a nested border.
- "Music & Speech Detection" stays renamed to "Music Detection".

### Fixed
- AI Music + Language sidebars (Full Statistics, JSON Response) now
  render correctly. Sidebar visibility is fully JS-controlled instead of
  fighting a stale `display: none` CSS rule.
- HubSpot embed script is skipped on `localhost` so the preview sandbox
  no longer pops a "Link to js.hsforms.net was blocked" toast on every
  reload. Still loads normally on production.

## [4.2.0] - 2026-05-22

### Added
- New **AI Music Detection** mode (preview) at `/ai-music` — orchestrator
  ensemble that combines synthetic voice detection with a fakeprint
  instrumental model to detect AI-generated music. Clip-level verdict
  (`ai-vocal-music` / `ai-instrumental` / `not-ai-music`) plus
  `vocal_ai_pct` and `instrumental_ai_prob` breakdown. Single batch upload,
  no streaming. Pre-cached demo (Big Mac Papelão, a chirp-v3 sample) loads
  on first visit. Server proxy targets the preview gateway at
  `/api/preview/velma-2-ai-music-detection-batch`.
- Caveat panel surfaces the known limitations: weak on AI techno/metal and
  hip-hop beats, can false-positive on minimalist piano and heavily
  compressed rap vocals.

### Changed
- Top menu: "Music & Speech Detection" → "Music Detection" to make room for
  the new AI Music Detection tab next to it.

## [4.1.0] - 2026-05-22

### Changed
- **Music Detection** moved to the production gateway. Batch proxy now hits
  `https://modulate-developer-apis.com/api/velma-2-music-detection-batch`
  (was `/api/preview/velma-2-music-detection-batch`); WebSocket proxy routes
  streaming through the same production host instead of the dedicated GPU
  box at `http://3.88.52.192`. Matches the public quickstart docs.

### Removed
- Velma and Language tabs hidden from the top-of-page mode toggle. The
  pages, JS, config editor, and demo data are all still present — only the
  entry points are hidden. Direct navigation to `/velma` and `/language`
  still works.

## [4.0.0] - 2026-05-15

### Added
- New **Language Detection** mode (preview) at `/language` — flag / name /
  confidence hero with a low-confidence warning band, and a caption noting
  that only the first 30 seconds of audio are analyzed. Server proxy entry
  routes directly to the preview GPU host until the developer-apis gateway
  forwarding URL is wired up.
- STT debug panel surfaces the **active model** (e.g.
  `velma-2-stt-batch-english-vfast` vs `velma-2-stt-batch`) in a pill, in
  the raw-message dump header, and in the JSONL download filename.
- **Server-side + SPA page-view logging** — every tab switch beacons through
  `/api/track-view` and lands in the analytics table, including the new
  `/language` route.

### Changed
- Top menu refreshed: "Music Detection" → "Music", new "Language" tab with a
  Preview pill, tighter toggle spacing that wraps on narrow viewports.
- Music demo swapped to **A Case of Spring Fever** (1940 public-domain
  narration) and extended to 30 s.

### Removed
- Modulate logo and footer attribution.

## [3.9.0] - 2026-05-13

### Added
- New **Velma** mode (preview) at `/velma` — ensemble batch analysis combining
  STT, emotion/accent signals, behavior detection, topic extraction, topic
  sentiments, and conversation summarization in a single batch call.
  Pre-cached demo loads on first visit (no API call).
- **Config editor** with split layout — structured form on the left (4
  conversation types, 5 participant roles, 15 curated behaviors with full
  short/detailed descriptions, "Add custom" rows with auto-generated UUIDs);
  live `BatchConfig` JSON preview on the right with optional raw-JSON edit
  mode.
- **Per-speaker emotion stacked bar chart**, **topics grouped by speaker**
  with sentiment-colored chips (red/green/grey + raw score), and a
  **debug-friendly behaviors table** that surfaces raw API output: detected
  status pill (DETECTED/NOT DETECTED/SKIPPED/ERROR), raw confidence %, evidence
  clip count, and the model's reasoning. Behavior names link to the first
  evidence clip in the transcript — clicking scrolls + flashes the bubble and
  seeks audio to that clip.
- Surfaces `conversation_type_pick.reasoning`, `participant_role_pick.reasoning`,
  and `clips[].detection_model_results` inline (previously only in JSON).

### Changed
- Server proxy gains `ENDPOINT_UPSTREAM_PATH['/api/velma-2-batch']` →
  `/api/preview/velma-2-batch` so the preview model lives behind the same
  `/api/preview/` prefix as Music Detection. Client posts to the un-prefixed
  path.
- PII/PHI tags in the Velma summary are always blurred when present
  (regardless of the STT `pii_phi_tagging` option).

## [3.8.1] - 2026-05-11

### Changed
- Music Detection batch proxy now hits `/api/preview/velma-2-music-detection-batch` on the gateway — that's the GPU-backed route, ~40 ms server latency on a 15 s clip (~360× real-time). Public proxy path unchanged.
- Music Detection frame timestamps normalized: new batch model returns `start_time_ms`/`end_time_ms`, renderer expects `start_time_s`/`end_time_s`. Fixed silent breakage in the per-frame table + click-to-seek.
- Music Detection table now groups rows by 1 s (max-pooled music + speech) in Heatmap view; Detailed view keeps the raw ~192 ms rows. A 7 min clip drops from ~2,400 rows to ~470. Click-to-seek and playback tracking work in both views; row highlighting follows the underlying frame's containing group.

## [3.8.0] - 2026-05-11

### Added
- **Music Detection streaming** — three entry points, mirroring the streaming-transcription UX:
  - **Start streaming**: mic capture → PCM 16-bit LE 16kHz mono over WebSocket.
  - **Stream demo**: pipes the bundled `demo.opus` through the streaming endpoint, paced at realtime.
  - **Stream file…**: pick any audio file; decoded to PCM and streamed paced at realtime.
  - Frames render progressively into the heatmap + table; verdict / `music_pct` / `speech_pct` recompute client-side as frames arrive.
  - WebSocket proxy routes `/api/velma-2-music-detection-streaming` to the preview GPU box (`http://3.88.52.192`) until the gateway adds the route. Note: the model buffers in 20-second windows, so for clips under 20s all frames arrive in one batch at end-of-stream.

### Changed
- Music Detection now hits `/api/velma-2-music-detection-batch` (was `/api/velma-2-music-detection`). Preview switched to a GPU-accelerated batch model — a 3.5 min clip processes in ~5–6s (~35× real-time, up from ~1.5×). Progress estimate adjusted accordingly. Model/endpoint labels in the stats modal updated to match.

## [3.7.1] - 2026-05-06

### Changed
- Music Detection now goes through the developer-apis gateway at `/api/velma-2-music-detection` (was the dedicated host `34.228.138.241:8080/MusicDetection`). Per-endpoint base URL + upstream-path overrides removed; only the `file` form-field override remains.

## [3.7.0] - 2026-05-06

### Added
- New **Music Detection** mode (preview) at `/music` — frame-level music + speech classification.
  - Verdict ring shows primary label (Music / Speech / Neither) with dual `Music % · Speech %` split.
  - Stacked dual-row histogram (Music + Speech) with opacity scaled to per-frame probability.
  - **Heatmap / Detailed view toggle**: Heatmap (default) fits the full row width regardless of clip length, max-pools adjacent frames when there are more frames than pixels (down to ~2px min cell). Detailed shows the original 11px-per-frame scrolling row.
  - Adaptive time axis (1s/2s/5s/10s/30s/… ticks) keeps ~5–8 evenly-spaced labels regardless of duration.
  - Per-cell hover tooltip, click-to-seek, playback tracking across both views.
  - Per-frame table with Music + Speech probability bars.
  - Stats modal with avg/max music + speech probabilities, server latency, cost (@ $0.001/hr), endpoint.
- "Start streaming" button shown but ghosted (`disabled-soon`) in Music Detection mode — placeholder until streaming variant ships.

### Changed
- Server proxy now supports per-endpoint upstream base URL + path + form-field overrides. Music Detection routes `/api/preview/music-detection` → `http://34.228.138.241:8080/MusicDetection` with the `file` form field (per OpenAPI spec); other endpoints unchanged.

## [3.1.1] - 2026-04-10

### Fixed
- Proxy timeout bumped from 2 min to 5 min to handle longer audio files

## [3.1.0] - 2026-04-10

### Added
- Upload progress shown in overlay status line ("Uploading… 42%" → "Processing on server…") via XHR
- On error: overlay stays open with red error message + full raw response JSON in scrollable block + Dismiss button

### Changed
- Language now shown as flag emoji (🇬🇧, 🇫🇷, etc.) instead of text
- Accent label is now bold; long regional accents shortened (e.g. "E. European", "Latin Am.")
- Emotion label is now bold
- Bubble backgrounds uniform grey (removed gradient emotion coloring experiment)

### Fixed
- Errors no longer silently dismiss — full server response preserved for investigation

## [3.0.0] - 2026-04-10

### Added
- Deepfake detection in Transcription (batch) mode — new "Deepfake" checkbox (on by default) sends `deepfake_signal` to the API
- Per-utterance deepfake verdict pills: red "Deepfake" (score > 0.7), green "Authentic" (score < 0.3), grey "Uncertain authenticity" (0.3–0.7)
- Confidence shown on hover for all verdict pills, scaled from 0.5 anchor (e.g. score 0.85 → 70% confidence)
- Deepfake verdict and confidence appended to chart bar tooltips (after emotion)

### Changed
- "Deepfake" tab renamed to "Deepfake Standalone" to distinguish from in-transcript deepfake detection
- Default transcription demo updated to AIAgentFrustration.mp3 (same file as Deepfake Standalone demo)
- Demo STT data replaced with AIAgentFrustration transcript including deepfake scores, emotions, and accents
- Batch transcription results bypass clustering logic (was incorrectly dropping short utterances like "Track an order.")
- Playback sync fixed: transcript bubbles now always highlight and scroll into view during audio playback, even without diarization

### Fixed
- Short utterances dropped from transcript in batch mode due to streaming dedup logic being applied incorrectly
- Transcript bubble playback tracking was never started (dead code path) — now always initialized after batch results render

## [2.2.0] - 2026-04-02

### Fixed
- Deepfake streaming WebSocket now includes required `audio_format=s16le&sample_rate=16000&num_channels=1` query params (API change)
- UTM query parameters preserved in URL on initial load and tab switches

### Changed
- Verdict algorithm unified into single `computeVerdict()` function across all deepfake pages (was duplicated with inconsistent thresholds)
- Verdict rules updated: 1+ segment >98%, 2+ >95%, 3+ >90%, 5+ >85%, or ≥7 segments with >30% flagged
- Verdict ring now shows the triggering rule in small text below the segment count

## [2.1.0] - 2026-03-30

### Changed
- Deepfake detection API schema migrated from `synthetic_voice` boolean to `verdict` string (`"synthetic"`, `"non-synthetic"`, `"no-content"`)
- Deepfake endpoints now point to production API (`modulate-developer-apis.com`) instead of dev server
- Demo data updated with real production API response
- Overall verdict logic tuned: deepfake if >=1 frame >97% confidence or >=2 frames >95%

### Added
- `no-content` verdict support with grey styling for silent/empty audio segments
- Verdict helper functions (`isSyntheticFrame`, `verdictClass`, `verdictText`) in both SPA and standalone deepfake page

### Fixed
- WebSocket streaming proxy now forwards `User-Agent` header, fixing 403 from AWS ALB/WAF
- Removed hardcoded dev server IP overrides for deepfake endpoints

## [2.0.1] - 2026-03-30

### Fixed
- Deepfake mode init bug: uploading files on /deepfake now correctly hits the detection API instead of STT
- Analysis results preserved across mode switches instead of resetting to demo data
- Race condition guard prevents concurrent uploads from corrupting state
- Friendly error message on malformed API responses instead of raw JSON.parse errors
- Empty frames array shows "Insufficient data" instead of false "Authentic" verdict
- Animation frame trackers stopped on mode switch to prevent resource drain
- XSS protection: filenames sanitized in stats modal innerHTML
- JSON copy button now works on non-HTTPS contexts via execCommand fallback

### Added
- "Get API Access" CTA button in header with HubSpot form modal
- Rate limit indicator above footer showing remaining requests
- 2-minute fetch timeout on upstream API calls with friendly 504 message
- Scrollbar auto-hides when not scrolling
- Updated deepfake demo data to match new model output (25 non-overlapping 4s frames)

### Changed
- "Deep Fake" renamed to "Deepfake" in mode toggle
- Upload overlay text changed from "Transcribing" to "Analyzing"
- Standalone /deepfake/index.html redirects to SPA at /deepfake
- HubSpot form moved from inline embed to modal popup

## [2.0.0] - 2026-03-29

### Added
- Transcript chat bubbles: rounded bubble design with speaker-based left/right alignment
- Emotion color palette: full-color bubble tinting based on detected emotion (22 emotions mapped)
- Emotion timeline chart: per-speaker bar chart showing utterance emotions over time, clickable to seek audio
- Playback sync: active transcript bubble highlights during audio playback, stays highlighted until next utterance
- Tooltip on chart bars showing timestamp range, speaker, and emotion
- Fast transcription mode: checkbox to use vfast English-only batch endpoint
- Language dictionary: two-letter codes resolved to full names (e.g., EN → English)
- New demo audio: Irate Caller scenario with PII tagging, angry/frustrated emotions, and two speakers

### Changed
- Transcript header order: timestamp first, then speaker, emotion (colored), accent (with "accent" suffix)
- Language and accent displayed as "English with American accent" format
- Emotion label color matches the emotion palette color
- Start streaming button disabled for transcription mode (marked "Soon")
- Removed language-only display from transcript bubbles

### Removed
- Separate emotion/accent tags below transcript text (now inline in header)
- Time interval display in transcript (only start timestamp shown)
- Speaker color pill badges (replaced by bubble alignment)

## [1.7.3] - 2026-03-27

### Added
- Standalone deepfake detection demo page at `/deepfake` with batch analysis UI
- File upload with drag-and-drop, progress bar (estimated from audio duration / processing speed)
- Results view: audio player (sticky on scroll), confidence histogram, frame-by-frame table
- Overall verdict badge (Deepfake/Authentic) with robot icon and segment count
- Clickable histogram bars and table rows to seek audio player to that segment
- Playback tracking: active segment highlights in histogram and table during audio playback
- Desaturated histogram bar colors for lower-confidence segments
- Full Statistics modal with grouped detection, audio, performance, and request metadata
- JSON Response modal with syntax highlighting and copy button
- Pre-loaded demo file (AIAgentFrustration.mp3) with cached API response for instant page load
- Verdict algorithm: deepfake if ≥1 frame >99% confidence or ≥2 frames >90% confidence

## [1.7.0] - 2026-03-23

### Added
- Deepfake streaming detection model (velma-2-synthetic-voice-detection-streaming) with real-time analysis
- Live PCM streaming via Web Audio API: frames render every 4 seconds while recording
- Per-frame `synthetic_voice` boolean and `confidence` display with certainty-based labels
- Verdict tags (Synthetic/Real) with certainty percentage in segment table
- Stop recording button embedded in chart area during live detection
- `noindex, nofollow` meta tag to prevent search indexing

### Changed
- Renamed app to "Modulate Models Playground" (was "Modulate Developer API Demo")
- Deepfake batch endpoint updated to `/api/velma-2-synthetic-voice-detection-batch` with IP override
- Response field `synthetic_voice_prob` renamed to `confidence` throughout (new API schema)
- Detection score display reframed: shows "Real/Synthetic (N% certain)" instead of raw probability
- Verdict logic uses API's `synthetic_voice` boolean (≥2 frames = deepfake), with threshold fallback
- Segment table columns reordered: Time | Verdict | Certainty (removed confidence bar)
- Streaming detection UI: single record zone in main panel, no separate top widget
- WebSocket proxy preserves text/binary frame types (fixes browser receiving JSON as Blob)
- WebSocket proxy buffers client messages until upstream connects (fixes race condition)
- Cost updated to $0.25/hour for batch deepfake detection
- `isStreamingModel()` uses `config.mode` instead of hardcoded model key

### Fixed
- WebSocket streaming detection hangs: resolve on `done`/`error` message instead of waiting for close
- Live detection finalization: calls `updatePreview` to render final chart and populate stats
- Recording stop: sends end-of-stream signal before cleaning up media tracks

### Removed
- `avg_synthetic_voice_prob` field handling (removed from new API)
- HTTPS migration TODO (resolved: batch uses IP override, streaming uses IP override)

## [1.6.1.0] - 2026-03-19

### Changed
- Replaced detection gauge with Tufte-style histogram chart showing per-segment raw scores as colored bars with smoothed curve overlay
- Added threshold-based verdict title: "Deepfake Detected" (red) or "No Deepfake" (green) based on raw segment scores
- Added weighted triangle smoothing (window=5) to handle model calibration artifacts
- Added playhead sync with interpolated position and live data label showing time and score
- Added click-to-seek on chart bars and hover tooltips with raw/smoothed scores
- Per-segment table redesigned as compact inline rows with fixed-width confidence bars
- X-axis uses human-readable time format (1m 32s)
- Autoscroll toggle hidden when deepfake model is selected
- Chart and verdict positioned tight against audio player; segment table has breathing room below chart

### Removed
- Old avg_synthetic_voice_prob gauge and "Likely Synthetic/Real" labels
- Audio duration display from detection preview (player already shows it)

## [1.6.0.0] - 2026-03-18

### Added
- Deepfake Detection (Beta) model in model dropdown — powered by velma-2-synthetic-voice-detection
- Detection preview with avg_synthetic_voice_prob gauge and per-segment frame analysis table
- Per-model upstream routing in server proxy (deepfake API uses dedicated endpoint)
- Detection Score row in Stats panel for deepfake results
- CSS styles for detection gauge, score labels, and frame analysis table

### Changed
- Model dropdown options now include STT and detection model types
- Stats panel dynamically hides STT-only rows (Utterances, Speakers, etc.) for detection model
- Feature controls (Options) hidden when detection model is selected
- API Response tab shows raw model output without wrapper fields for detection model
- `formatRequestedOptions()` uses config pattern instead of hardcoded model key check
- Server proxy route generalized from `/api/velma-2-stt-batch*` to `/api/:path(*)` with allowlist
