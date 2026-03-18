# Changelog

All notable changes to the Modulate Developer API Demo.

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
