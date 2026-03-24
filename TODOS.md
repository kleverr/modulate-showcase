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

## Use API's synthetic_voice boolean for verdict logic
**What:** Explore replacing the custom threshold-based verdict logic with the `synthetic_voice` boolean returned per-frame by the Velma-2 API.
**Why:** The API now returns a `synthetic_voice: true/false` per frame alongside `confidence`. The current UI computes its own verdict via threshold logic on confidence scores (≥2 frames >95% OR ≥3 >92% OR ≥5 >90%). Using the API's classification could simplify this and stay in sync with model improvements.
**Pros:** Single source of truth for deepfake verdict, simpler code, automatically benefits from model calibration updates.
**Cons:** Less control over verdict sensitivity, may need to validate that the API's boolean aligns with desired UX behavior.
**Context:** Verdict logic is in `renderDetectionPreview()` in app.js (~line 1215). The new API response schema returns `frames[].synthetic_voice` (boolean) + `frames[].confidence` (float). Could count `synthetic_voice: true` frames vs total to derive an overall verdict.
**Depends on:** Understanding how the model sets the `synthetic_voice` boolean threshold internally (ask Modulate).
