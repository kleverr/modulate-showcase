# Changelog

All notable changes to the Modulate Models Playground.

## [6.7.0] - 2026-08-06

### Changed
- **New AI Music demo song.** `big-mac-papelao.mp3` is replaced by
  `ashes-in-my-mouth.mp3` (eng-provided track, trimmed to the first 120s with
  a fade-out, 192 kbps MP3). Unlike the old track — whose instrumental lane
  sat at a flat clamp-floor 0.011 on every window — this one actually
  exercises the dual-lane UI: per-window instrumental AI spans 0.011 / 0.11 /
  0.99, the intro is instrumental-only (vocal lane abstains, showing lane
  independence), and vocal AI varies 0.51–0.97 with nulls in between.
  Canned fixture regenerated from the released endpoint against the exact
  shipped file (30 windows, `ai-vocal-music`, ~47% AI vocals / ~31% AI
  instrumentals).

## [6.6.0] - 2026-08-04

### Changed
- **AI Music Detection routes to the released endpoint.** Batch and streaming
  now go to `https://platform.modulate.ai` — the server given by the published
  GA specs — matching the Emotion/Accent/Multilingual-Fast routing. The
  `AIMUSIC_BATCH_UPSTREAM` eng-test-box override (100.56.104.180) is retired
  from `server.js`, `.env`, and the Fly secrets. Both endpoints verified
  against the released host with the demo file (dual-lane windows + clip
  verdict on batch; window/done messages and clean close on streaming).
- **Spec refresh (2026-08-04 YAMLs).** The updated batch + streaming specs
  only expand documentation — new 401/413 response examples, WS close codes
  4001/4004/4030/4031, reworded error strings and null-condition notes. No
  schema or field changes, so parsing and page copy needed no updates.

## [6.5.0] - 2026-07-31

### Added
- **Verifiable endpoint routing in stats.** The batch proxy now returns an
  `X-Upstream-Url` header carrying the exact upstream URL it forwarded the
  request to (prod gateway or per-endpoint override like
  `AIMUSIC_BATCH_UPSTREAM`). The AI Music stats "Endpoint" row displays it,
  so which box served a run is checkable straight from the browser instead
  of trusting a hardcoded label.
- **Live demo refresh on AI Music.** The canned demo still renders instantly
  on page load, but the same demo file is re-analyzed through the real batch
  endpoint once per session in the background, and the live numbers (and
  real endpoint in stats) swap in when they land. A user-initiated run
  always wins over the background refresh, and the canned result simply
  stays if the upstream is unreachable.

## [6.4.0] - 2026-07-30

### Changed
- **AI Music Detection goes dual-lane.** The updated model scores every
  window independently for AI vocals AND AI instrumentals instead of routing
  each window to a single detector. The player strip now shows two labeled
  lanes (Vocals / Instrumental) and the per-window table replaces the
  Type/Confidence columns with separate Vocal AI and Instrumental AI score
  columns. Null scores (the detector had nothing to evaluate) render as a
  hatched cell / "—", deliberately distinct from a low score ("checked,
  looks real").
- **Shape-tolerant window parsing.** The renamed per-window fields
  (`vocal_ai_percentage` 0-100 → `vocal_ai_probability` 0-1 | null, same for
  instrumental) are normalized alongside the previous shape, so the page
  works against prod's current model today and the updated model at release
  without a coordinated deploy. Streaming windows go through the same
  normalizer; the early-stop fallback summary now aggregates both lanes the
  way the batch spec does.
- **Demo fixture regenerated** from the updated model (test box) for
  big-mac-papelao.mp3; page caveat rewritten for the new failure profile.
- **Local testing hook:** `AIMUSIC_BATCH_UPSTREAM` env var (unset in prod)
  points the batch proxy at the eng test box serving the updated model.

## [6.3.0] - 2026-07-29

### Added
- **Ensemble toggle on Accent Detection.** The accent page's options row now
  carries an "Ensemble" toggle wired to the batch API's `use_ensemble` flag.
  It's on by default so demo runs get the strongest pass (the API itself
  defaults to false — the flag is only sent while the toggle is on). Per the
  published spec it runs a more thorough analysis that may change the
  returned labels and takes longer — the progress pacing stretches
  accordingly, and the stats modal's Detection card reports whether the run
  used it.

## [6.2.0] - 2026-07-27

### Added
- **Behavior sparks on the Modulate-design player.** Detected behaviors now
  mark their evidence clips on the player strip — one spark per clip on the
  speaker's lane, with a Deeptalk-style name plate on hover (solid themed
  background, wraps long name lists, opens leftward near the strip's right
  edge; black spark in the light theme, white in dark). Clicking a spark or
  its plate jumps to the evidence bubble.
- **Behavior chips in the Deeptalk transcript.** Rows now carry spark + name
  chips for every evidence clip (same mapping as the Modulate design) instead
  of a bare tooltip star on the definitive clip only; the definitive chip
  reads bold.

### Changed
- **One spark per clip in both players.** The Deeptalk player used to draw
  one star per behavior stacked at identical coordinates (shared clips looked
  like a single star); the designs now collapse to one indicator per evidence
  clip whose label lists every behavior on it — identical counts and
  positions in both designs.
- **Per-clip deepfake verdicts are calmer.** A chip only renders on a
  confident call: red "Deepfake" additionally requires the speaker's median
  scored clip ≥ 0.5, so an isolated spike on an otherwise-authentic speaker
  (the demo customer's 97.6% / 91% clips) no longer flags. The uncertain
  "Likely …" middle band is omitted entirely (chips and clip tooltips). The
  Transcription demo's synthetic IVR agent keeps all its red flags.
- **Playback no longer scrolls the page to the transcript.** The auto-follow
  during playback is gone in the Modulate design, and clicking a clip on the
  player strip seeks without jumping down (matching Deeptalk clips). Explicit
  evidence navigation — sparks, behavior links, evidence quotes — still
  scrolls; live streams still follow incoming utterances.
- **Topics & Sentiment hidden from the Modulate results view.** The data is
  still requested and visible in the raw JSON pane; the inferred
  conversation-type line moved under the Speech Summary.

## [6.1.0] - 2026-07-24

### Added
- **Tone-Based Detection package.** Seven paralinguistic behaviors where the
  voice contradicts the words — Sarcasm, Smile in the Voice, Unvoiced
  Disagreement, Reluctance, Tone Mismatch, Accusatory Question, Request or
  order — with the Customer Service / Sales context (2 types, 3 roles).
  Behaviors ship unscoped (tone signals are universal). Source defs from the
  team's authoring tool, non-schema export fields stripped; "Tone Missmatch"
  typo fixed in the display name.

### Changed
- **Topics & Sentiment redesigned around the per-speaker comparison.** The
  table pivots to topics-as-rows with one column per speaker under a group
  header ("How each speaker feels about the topic"). Chips now lead with the
  API's own worded labels on a five-step color scale (very negative → very
  positive, built from design-system error/success tokens); the raw score
  moved to the tooltip ("Very negative (−0.85 on a −1…+1 scale)"). A caption
  states the semantic: expressed attitude in tone and wording whenever the
  topic comes up — not the topic's own polarity. Sentiments-off runs degrade
  to plain topic chips; missing (topic × speaker) cells render as an em dash.
  The label taxonomy is undocumented upstream — reconstructed from live
  responses, with score-threshold fallback if `sentiment_label` is absent.

### Fixed
- The topics table no longer clips columns past the second off the viewport —
  the old two-column Speaker|Topics sizing (fixed 22%/78%) still applied to
  the new pivot layout.

## [6.0.0] - 2026-07-24

### Added
- **Behavior scoping (`applies_to`) is now first-class in the Velma config
  editor.** Expanding a behavior shows two "Applies to" chip pickers
  (conversation types + roles); roles get one for types. "All" = field omitted;
  deselecting the last chip returns to All (`[]` is never emitted — its server
  semantics are unverified). Scoping a preset materializes it into an editable
  copy, same as any other edit. Head chips ("2 types · 3 roles") render for
  roles too and update live; scope references to UUIDs outside the config show
  as dashed unknown-chips with an explanation.
- **"Never fires" prediction.** Verified against the live endpoint (2026-07-24):
  `applies_to` gates detection at runtime, and responses only carry
  `detected: true` rows — so a mis-scoped behavior fails silently. The editor
  now predicts inertness: a behavior (or role) scoped only to disabled entries
  gets a red "never fires" chip and a section-level count warning.
- **Deeptalk Design.** The hidden `/dt` Call report is consolidated into the
  main Velma tab as a second output design. A "Modulate Design / Deeptalk
  Design" switch in the page header (visible with results, persisted) swaps the
  analysis view for the dt report — its own sticky player with emotion-colored
  speaker lanes and behavior star-markers, Summary with type/role confidence,
  Speakers table, Behaviors card with reasoning + clickable evidence quotes,
  chat transcript. Same config, same upload, same run data; batch runs only
  (the toggle disables during streaming). PII/PHI renders with the same blur
  treatment as the Modulate design; the raw-JSON/stats tail is hidden in
  report view. Ported render-only into `velma-report.js`/`velma-report.css`
  (all ids/classes `vr-`-prefixed; dt's tokens reuse the showcase's `--m__*`
  names, so they're scoped to the view container). `/dt` itself is unchanged.
- Config summary now names the active detection package (matched by the same
  snapshot the package cards use): "Fraud Detection and Prevention (default)"
  instead of an anonymous "Default", package name after picking one, "Custom"
  only when the detection set really differs. Package bundles prefetch at boot
  so the plate summary is correct before the modal ever opens.

### Changed
- Corrected a disproven claim baked into the editor (tooltips, section warning,
  results note): behaviors do NOT require conversation types/roles. Verified
  live: with none sent, Velma classifies against its **built-in default
  catalog** (7 types / 13 roles) and behaviors still run. The warning is now an
  informational note about the fallback; the "requested behaviors but none came
  back" results note explains silent scope-outs instead.
- "Set up behaviors" on the upload plate is now "Configuration" (the modal
  configures signals and outputs too).

### Fixed
- JSON tab: server config exports key roles by `participant_uuid`, while the
  POST schema uses `participant_role_uuid` — imports now rename the field in
  place (keeping the UUID), so `applies_to_participant_role_uuids` references
  survive instead of orphaning into regenerated UUIDs.

## [5.5.0] - 2026-07-23

### Added
- Multilingual Fast transcription (`/api/velma-2-stt-batch-multilingual-vfast`,
  batch-only). New "Fast (Multilingual)" toggle on the transcription tab next
  to "Fast (English only)" — the two fast models and the enrichment options
  are mutually exclusive. Optional language selector (Auto-detect default +
  the model's full 99-language list, shown as "Name (code)"): declaring the
  spoken language takes the fastest upstream path, otherwise the language is
  detected automatically. A declared language is reflected on the transcript;
  auto-detect runs stay untagged (the API response carries no language field).
  Streaming controls gray out while the batch-only model is selected.
  Upstream host per the published spec (platform.modulate.ai).
- Transcription stats now report the exact endpoint used per run (e.g.
  `-english-vfast`, `-multilingual-vfast`) instead of a batch/streaming guess.

## [5.4.2] - 2026-07-23

### Fixed
- Streaming sessions no longer report stale batch metadata. Stopping a stream
  re-rendered the stats card *before* the per-mode finalizer wrote the
  streaming meta, so an STT stream-from-file session showed the pre-canned
  demo numbers — `/api/velma-2-stt-batch`, `200 OK`, 1.87 MB, 2.66s — even
  though the audio was streamed over the `/api/velma-2-stt-streaming`
  WebSocket the whole time. The panels now refresh after finalization
  (transcription, deepfake, music, AI-music; velma already did this right).
- STT streamed reports now name the real source — the streamed file's name,
  size and MIME type — instead of hardcoding "Live Recording" / "PCM 16kHz"
  for file/demo streams. Mic captures still report as Live Recording.
- STT file/demo streams that end without a server `done` (timeout/upstream
  error) now finalize from the utterances received instead of leaving the
  stale report on screen.

## [5.4.1] - 2026-07-22

### Changed
- Velma default demo replaced: `Order-status.mp3` (misdelivered-package support
  call, 4:31) instead of `Irate_Caller_Final.mp3`. New fixture run through the
  default config — 40 clips, 7 detected behaviors (incl. Return Fraud Attempt,
  Coercion Manipulation, Refund or Credit Issued). Batch/streaming demo re-runs
  now use and label the new file; `/dt` and the other model tabs keep their
  existing demo audio.

## [5.4.0] - 2026-07-22

### Changed
- Velma config editor fully redesigned. Two tabs over one config: **Editor**
  (friendly controls) and **JSON** (the raw BatchConfig) — always in sync.
  - Editor: Signals + Outputs as checkboxes; then Detection packages; then the
    "Detection set" — Conversation types, Participant roles and Behaviors as
    uniform compact grids of on/off switch rows (click a name to read/edit the
    definition in place). A filter box tames the ~150-preset catalog. Editing a
    preset silently turns it into an editable copy ("preset · edited" badge,
    one-click "Revert to preset") — the old "Expand to JSON" button is gone,
    as are the Language field and the "Edit raw JSON" checkbox.
  - JSON: edit, paste, upload (file picker or drag-drop), Copy, Download.
    DT-style validator gates Save — auto-repairs pasted fragments, accepts a
    full BatchConfig / {"behaviors": []} / bare array (the last two merge into
    the current config), whitelists fields, flags unknown presets (422),
    generates missing uuids. Saving jumps back to the Editor so the
    transformation is visible.
  - All explanatory copy moved to hover tooltips (ⓘ); inline warning remains
    for the one real trap: behaviors are silently skipped by the API unless
    the config defines at least one conversation type and one role (verified
    against the live endpoint — both with empty and omitted lists).
  - Custom configs persist across reloads (localStorage; the untouched default
    is never persisted so it always follows the shipped seed; Reset clears).

### Added
- Detection packages: the six use-case bundles from
  docs.modulate.ai/velma/detection-packages (Fraud Detection and Prevention,
  Agentic AI Guardrails, Trust and Safety, Customer Retention, Human Agent
  Welfare, Compliance and Risk Monitoring) vendored under /velma-packages/ and
  offered as one-click cards. Picking one replaces types/roles/behaviors
  (signals and outputs are kept); the matching card stays highlighted until
  the config diverges.
- The default Velma config is now the full **Fraud Detection and Prevention**
  package (25 types · 14 roles · 18 preset behaviors, every signal and output
  on) — an accurate out-of-the-box demo instead of the small starter set.

## [5.3.0] - 2026-07-22

### Changed
- Transcription: per-utterance deepfake chips always state the model's leaning
  instead of a vague "Uncertain authenticity" on mid-band scores — Deepfake
  (red, >0.7), Likely deepfake, Likely authentic, Authentic (<0.3). The chip
  shows the verdict only; the exact score lives in the hover tooltip
  ("Model deepfake score 0.54 (0 = authentic, 1 = deepfake)") and in the raw
  JSON.
- Transcription: accent chips are hidden when the model returns
  "Unknown"/"Other" (confirmed model-side output — the raw JSON still carries
  the true value) instead of rendering "Unknown accent" noise.
- Sidebar: Accent now sits right after Language; Emotions moved last.

### Removed
- Transcription: the Debug checkbox and the whole streaming debug panel
  (partials/finals columns, phase pill, copy-raw/reverse tools) — an internal
  diagnosis feature that is no longer needed. ~600 lines of app code and its
  CSS removed with it.

### Fixed
- The empty error toast no longer peeks above the bottom viewport edge as a
  red sliver on every page: hidden state now moves it a fixed distance
  off-screen and fades it out (a translateY(200%) of a padding-only box
  wasn't enough).
- Upload plate footer now matches what the API actually accepts (verified
  against the batch endpoint and docs): removed unsupported .m4a, added
  .aiff and .mov, and corrected the size limit from 50 MB to the real 100 MB.

## [5.2.0] - 2026-07-21

### Added
- Deepfake: "Stream demo" / "Stream from file" now actually stream — realtime
  WebSocket streaming with live frames and verdict, proper finalize on
  done/stop/close (previously the buttons silently did nothing in this mode).
- Deepfake: "How is this decided?" link under the verdict opens a popover
  explaining that the file-level call is a derived metric and listing the
  exact rules. Built into the shared verdict statement so other models can
  add their own.

### Fixed
- Deepfake verdict no longer reads "authentic" on short clips whose only
  segments are flagged (e.g. 1/1 deepfake @ 97.9%): corroboration thresholds
  scale with clip length, silence segments are excluded, and half-or-more
  flagged speech segments now always mean deepfake.
- Player: the hover timestamp and the playhead timestamp labels are now
  visible next to the red line (they were positioned outside the 3rem bar and
  clipped). Labels flip sides near the right edge; the static 0:00/total
  labels yield when a moving label would overlap them. All models.
- Player: total time after stopping a live mic recording is now correct
  (Chrome loads MediaRecorder blobs with duration=Infinity — forced once via
  seek-past-end). While recording, the total ticks with the elapsed length
  instead of showing the previous file's duration. All streaming modes.
- Verdict title is no longer a dead link — it toggles play/pause (and scrolls
  the player into view when off-screen). All models.
- Segment tables (deepfake, music, AI music, emotion, accent): rows highlight
  on hover to show they're clickable, and the currently-playing row stays
  highlighted. Uniform 60px rows pin the confidence bars to whole pixels so
  they no longer render at visibly different thicknesses.
- Player strips: removed the redundant active-segment highlight (black
  outline on deepfake bars, brightness bumps elsewhere) — the red playhead
  already marks the position. All models.

## [5.0.4] - 2026-07-19

### Changed
- /dt default behavior set is now just the 7 team-authored behaviors (Smile in
  the Voice, Unvoiced Disagreement, Request or order, Tone Mismatch, Reluctance,
  Accusatory Question, Sarcasm) — the 10 presets are no longer on by default
  (still available via upload as `preset:` refs).
- /dt Behaviors panel now lists the active set's behavior names as chips, not
  just a count — updates on apply/reset, preset entries shown muted.

## [5.0.3] - 2026-07-17

### Fixed
- Starting a new analysis now clears the previous run everywhere (report,
  verdict, player strip, audio, JSON/stats columns) instead of leaving the old
  results on screen for the whole wait — all modes. The page title switches to
  the new filename immediately. Tab-switch restore of prior results still works.
- The "Waiting for results…" spinner sits inline with its label (the design's
  loader is display:block by default).

## [5.0.2] - 2026-07-17

### Fixed
- Player: play/pause glyph now switches, and a red playhead line tracks the
  current position across the visualization + player bar (smooth rAF updates).
- Velma config: customizing any field no longer resets the rest. The default
  is now an explicit starter BatchConfig (2 conversation types, 3 roles, 17
  behaviors — shared with /dt) with **every STT signal on**, served from
  `velma-default-config.json`; Reset returns to it.
- Streaming from file/demo cleared nothing before: old transcript/strip/summary
  stayed on screen until `done`. Stream start now clears all shared surfaces,
  the plate enters the streaming state, and the emotion strip fills in live.
- Processing stages no longer pretend to finish: a trailing spinner stage
  ("Waiting for results…") runs until the response actually lands.
- The Deepfake label on transcript rows is red.

### Changed
- Velma demo re-cached with the all-signals config: colored emotion strip and
  bars, accents, deepfake scores, PII blurs, 12 detected behaviors.
- Streaming protocol coverage per the latest docs: `partial_clip` renders as a
  live in-progress row, `clip_update` refines finalized clips in place, and
  re-fired `behavior_detection`s replace instead of duplicate. Selection
  sources display prettified ("Auto-selected" instead of the raw enum).

## [5.0.1] - 2026-07-17

### Changed
- De-branded the demo: header reads "Models preview" (no logo), footer is just
  the version (no company links/emails/ToU/PP), neutral page title + favicon.
- Color scheme now defaults to the browser's `prefers-color-scheme`; the header
  toggle still persists an explicit choice.
- Tabs with a demo/result on screen now start with the collapsed "New analysis"
  plate instead of the full upload plate.

### Fixed
- Repeat uploads: batch success paths left the in-flight flag set, so the next
  drop after "New analysis" was silently ignored. The flag now resets at the
  shared completion point (and on error).

## [5.0.0] - 2026-07-17

### Changed
- **Full redesign on the Modulate design system.** The showcase now wears the
  Playground design from `modulate-design-system` (m-design-system.intuition.team)
  wholesale: design tokens (`styles.css` bundle), Inter + CoFo typography, the
  grouped models sidebar (Triage / Redaction / Transcription / Detection), the
  state-driven upload plate (drop / uploading / processing stages / streaming /
  collapsed "New analysis" / low-quota / exhausted), the custom audio player with
  per-mode visualization strips (emotion clips, deepfake segments, music/speech
  heatmap, AI-music windows, redaction ranges), verdict statements, design report
  tables, and always-visible Raw JSON + statistics bottom columns (the old
  stats/JSON modals are gone).
- **Dark theme by default** with a light/dark toggle in the header (persisted).
- Velma: role picks now live inside the Speakers table (with reasoning +
  "Inferred, N%" tags), the conversation-type pick leads the Topics & Sentiment
  section, behaviors render with evidence-quote links and a "Not detected"
  subhead, and the player's speaker lanes carry the inferred role names. The
  config editor moved onto the design-system modal.
- Redaction: original/redacted playback is now an A/B toggle on the player;
  redaction ranges render as a strip in the player visualization.
- Header: single "Get API Access" CTA (design-styled); footer per the design
  (wordmark, contact, terms) plus the version stamp.
- Rate limit surfaces as the plate's quota meter ("N / 50") with low-quota and
  exhausted states (429s from batch or a refused WS upgrade flip it live).

### Added
- The 4.10.0 Emotion + Accent Detection tabs are integrated into the new
  design: sidebar entries under Detection, verdict statements, 15s window
  strips in the player (emotion windows use the design's emotion tokens),
  window tables and legends.
- `compression` middleware (design CSS bundle ships ~50KB gzipped) and immutable
  caching for `/fonts/*`.

### Removed
- The entire legacy inline stylesheet (~2,800 lines), the analysis overlay, the
  stats/JSON modals, verdict rings, the music heatmap/detailed view toggle, and
  the JS emotion hex palette (emotion colors now come from the design tokens).
## [4.13.0] - 2026-07-16

### Changed
- **/dt default behavior set is now 17** — the 10 presets plus the team's 7
  authored prosody/tone behavior definitions (Smile in the Voice, Unvoiced
  Disagreement, Request or order, Tone Mismatch, Reluctance, Accusatory
  Question, Sarcasm), from the developer's test file ("Tone Missmatch" typo
  fixed to "Tone Mismatch"). Applies to batch, streaming, and the Add-mode
  merge base.
- Preloaded fixture regenerated with the 17-behavior default: 9 detections on
  the demo call, now including Smile in the Voice (CSR, 85%) and Accusatory
  Question (customer, 87%).

## [4.12.1] - 2026-07-16

### Fixed
- **/dt behaviors upload: tolerate real-world files.** A JSON fragment missing
  its opening brace (`"behaviors": [...]` copied without the surrounding
  `{ }`) is auto-repaired with a visible warning instead of failing with a
  raw parse error (this is exactly what a developer-exported test file
  looked like). Parse errors now hint at the missing-brace case.
- Non-schema fields are stripped before sending: BehaviorDef extras
  (`saved_ts`, `updated_ts`, …) and unknown top-level BatchConfig keys are
  dropped with an "Ignored non-schema fields" warning, so internal-tool
  exports can't trip a 422 upstream.

## [4.12.0] - 2026-07-16

### Added
- **/dt: custom behavior sets.** New "Behaviors" button opens a modal to upload
  a behaviors JSON (per the documented schema): a bare array of
  `"preset:<id>"` refs and/or BehaviorDef objects, an object with a
  `behaviors` key, or a full BatchConfig — auto-detected. Two modes: **Add**
  (merge into the default 10 presets, deduped) or **Replace** (a full
  BatchConfig replaces conversation types, roles, and STT settings too).
  Validation before Apply: preset identifiers checked against the live
  `list-presets` catalog (unknown → blocked, the API would 422),
  `behavior_uuid` auto-generated when missing, a missing one-of-two
  descriptions copied with a warning, both missing → blocked. The set
  persists for the session until "Reset to default" (indicator on the
  Behaviors pill), and applies to both batch uploads and streaming.
- `dt/behaviors-example.json` — downloadable example mixing 2 preset refs and
  2 custom behavior definitions tuned to fire on the demo call ("Profanity
  Directed at Agent", "Sarcasm or Mockery").

## [4.11.0] - 2026-07-16

### Added
- **`/dt` — Deeptalk-style Velma call report** (standalone internal demo page
  for the investor presentation). Faithful reproduction of the Deeptalk report
  design (Stratos / Proto Grotesk webfonts, `--m__*` design tokens, dark
  sticky "modulate player" timeline with emotion-colored per-speaker clip
  lanes and star behavior markers, speakers table with emotion speech-pattern
  bars and sentiment topic chips, signal-module behaviors card with reasoning +
  clickable evidence quotes + confidence, chat-style transcript with emotion
  pills). Self-contained under `dt/` (own HTML/CSS/JS), served at `GET /dt`.
- Page opens with a preprocessed Irate-Caller report (`dt/velma-report.json`,
  generated through the real `/api/velma-2-batch` with the page's exact
  config — emotion signal on, 10 behavior presets, example conv types/roles).
  **Upload file** → processing screen → batch report. **Stream file** → live
  progressive report over `/api/velma-2-streaming` (green pulsing status,
  audio plays along, Stop keeps the partial report).
- No config UI, no rate-limit chrome — deliberately minimal for the demo.

### Notes
- Batch `summary` came back `null` on one of two fixture-generation runs
  (transient upstream flakiness); the page shows a "Waiting for summary…"
  placeholder if that happens live.
- The batch response includes `accent` and `deepfake_score` per clip even when
  those STT signals are disabled in the config (upstream behavior, unused by
  this page).

## [4.10.0] - 2026-07-14

### Added
- **Emotion Detection tab** (`/emotion`) — batch emotion detection via
  `/api/velma-2-emotion-batch`. Hero card with the whole-file emotion label
  plus a clickable per-window (15 s) timeline colored by emotion, legend,
  playhead highlight, Full Statistics and JSON Response.
- **Accent Detection tab** (`/accent`) — same treatment for
  `/api/velma-2-accent-batch` (whole-file accent + per-window timeline).
- Both tabs open pre-loaded with a cached demo (irate-caller for emotion,
  call-center for accent) so they light up without an API call.
- The two new endpoints proxy to `https://platform.modulate.ai` — the server
  named in the published OpenAPI specs (the default gateway also serves them,
  but the demo exercises the documented host; it's also faster).

### Notes
- Live-endpoint verification against the published Emotion/Accent batch specs
  passed on every documented behavior: window math (15 s fixed windows,
  trailing remainder omitted), short-file handling (whole-file label +
  empty `time_series`), all error paths (400 empty/unsupported/corrupt,
  403 bad key, 422 missing key or file, exact `detail` strings), and the
  `use_ensemble` / `training_permitted` flags. Labels are non-deterministic
  across identical requests (docs make no determinism claim).

## [4.9.0] - 2026-06-08

### Added
- **AI Music streaming is live.** The streaming backend now emits per-window and
  `done` frames, so the three AI Music streaming buttons (mic record + stream
  demo + stream file) are fully enabled — removed the "Soon" treatment. Verified
  end-to-end: live windows render on the timeline with a clip-level verdict on
  completion.

## [4.8.0] - 2026-06-08

### Changed
- **AI Music Detection is GA — pointed at production.** Removed the
  `/api/preview/` upstream remaps so batch and streaming route to the released
  prod paths (`/api/velma-2-ai-music-detection-batch` and `…-streaming`); the
  preview paths now 404. Dropped the `(preview)` suffix from the Debug-panel
  model label.
- **AI Music promoted out of Preview.** Moved the AI Music Detection tab to sit
  right after Music Detection and removed the "Preview" pill divider and the
  "Preview model." caveat prefix.

### Added
- **AI Music streaming surfaced as "Soon".** The three streaming buttons (mic
  record + stream demo + stream file) now show on the AI Music tab, greyed and
  non-clickable with a "Soon" pill, since the streaming backend isn't live yet.
  Client + WebSocket proxy are fully wired to the GA streaming path — dropping
  the `streaming-soon` flag enables them with no other change.

### Fixed
- **Graceful streaming fallback.** If the streaming endpoint errors before any
  window arrives, the page restores the last (cached/batch) verdict instead of
  staying stuck on "Listening…" (guards the path for when streaming is enabled).

### Notes
- The AI Music **streaming** backend currently returns `Internal server error`
  with no frames (upstream issue); the **batch** path is fully functional. That's
  why streaming is shown as "Soon" rather than active. Flip off `streaming-soon`
  once the backend emits frames.

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
