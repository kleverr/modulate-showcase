# TODOS

## Refactor hardcoded model checks to use MODEL_CONFIG type field
**What:** Replace all `modelKey !== 'batch-fast'` and `config.endpoint !== '/api/...'` checks in app.js with `config.type` lookups.
**Why:** With 3+ models (and music/emotion models planned), string-based checks will multiply. The `type` field introduced in this PR only covers new code paths — existing checks still use hardcoded strings.
**Pros:** Single source of truth for model capabilities, new models just set a type.
**Cons:** Touches ~10 call sites across app.js, risk of regression in existing STT behavior.
**Context:** The deepfake model PR added `type: 'detection'` to MODEL_CONFIG. Existing models need `type: 'stt'` added and all conditionals updated. Search for `batch-fast` and `velma-2-stt-batch-english-vfast` in app.js to find all sites.
**Depends on:** Deepfake model PR must land first.

## Fine-tune deepfake verdict thresholds with Modulate
**What:** Validate the current verdict thresholds (≥2 segments >95% OR ≥3 >92% OR ≥5 >90% = deepfake) with the Modulate team.
**Why:** These thresholds were designed around the model's calibration behavior (scores snap to 0% or 100%). Real-world testing may require adjustment.
**Pros:** More accurate verdicts, fewer false positives/negatives.
**Cons:** May need to revisit if Modulate changes calibration approach.
**Context:** Verdict logic is in `renderDetectionPreview()` in app.js. Weighted triangle smoothing (window=5) is applied for the curve overlay. The gauge was replaced with a histogram chart + threshold-based verdict in v1.6.1.
**Depends on:** Feedback from Modulate engineering after testing with diverse audio samples.

## Switch deepfake API upstream to HTTPS
**What:** Replace `http://54.147.23.177:8080` with an HTTPS domain endpoint for the deepfake detection API.
**Why:** Audio files are currently sent unencrypted over the internet to a bare IP address. The STT models use HTTPS via `modulate-developer-apis.com`.
**Pros:** Security improvement — audio data encrypted in transit. Production-ready.
**Cons:** Blocked on Modulate providing the HTTPS endpoint.
**Context:** server.js line 67, `ENDPOINT_BASE_URL` map. The HTTP endpoint was provided by the Modulate engineering team for initial integration. Consider making this configurable via env var (`DEEPFAKE_API_BASE_URL`) as an interim step.
**Depends on:** Modulate providing HTTPS-enabled endpoint for velma-2-synthetic-voice-detection.
