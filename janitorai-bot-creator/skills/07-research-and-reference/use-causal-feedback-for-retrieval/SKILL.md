---
name: use-causal-feedback-for-retrieval
description: Improve retrieval using downstream generation feedback, missed-consequence signals, contradiction reports, and user or evaluator corrections without corrupting source truth.
---

# Use Causal Feedback for Retrieval

Use this skill when retrieval repeatedly misses relevant state, surfaces irrelevant passages, or produces grounded answers that fail to use a known consequence.

## Process

1. Compare the query, retrieved bundle, generated result, and expected consequence.
2. Classify the failure as query formulation, chunking, metadata, ranking, source scope, context budget, reasoning, or state error.
3. Add feedback to retrieval features, aliases, links, or evaluation fixtures—not directly to canon unless independently verified.
4. Re-run the query with causal neighbors, source locality, temporal links, and relationship/world coupling.
5. Check that improvement does not increase irrelevant retrieval, stale state, privacy exposure, or unsupported certainty.
6. Record the updated retrieval rule and regression case.

## Completion

Stop when the original miss is reproducibly improved, trade-offs are measured, source truth remains unchanged, and a regression fixture protects the repair.
