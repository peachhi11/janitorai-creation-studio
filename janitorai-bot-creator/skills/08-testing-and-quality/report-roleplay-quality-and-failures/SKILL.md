---
name: report-roleplay-quality-and-failures
description: Produce an actionable roleplay quality report that separates retrieval, state, voice, narrative, agency, framing, and platform failures.
---

# Report Roleplay Quality and Failures

Use this skill after a roleplay evaluation, regression run, source-backed generation test, or user-reported continuity failure.

## Process

1. Summarize the task, model/preset, context bundle, state inputs, and expected behavior.
2. Quote the smallest output evidence needed for each finding.
3. Classify failures as retrieval, grounding, state update, knowledge boundary, persona drift, voice, narrative, agency, framing, tool, schema, or platform.
4. Distinguish blocking defects, quality degradation, intentional fictional behavior, and author preference.
5. State likely cause, reproduction steps, repair target, and regression test.
6. Report passed checks and uncertainty alongside failures.

## Completion

Stop when every finding is evidence-backed, classified, reproducible or explicitly non-reproducible, assigned a severity, and paired with a next action or intentionality decision.
