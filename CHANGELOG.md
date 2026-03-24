# Changelog

All notable changes to the Modulate Models Playground.

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
