---
name: design-agent-failure-recovery
description: Design recovery for failed retrieval, malformed generation, stale state, tool errors, timeouts, partial streams, and persistence conflicts without fabricating success.
---

# Design Agent Failure Recovery

Use this skill when a Studio agent or capability can fail after reading, generating, mutating, streaming, or exporting.

## Process

1. Classify failure as input, authorization, retrieval, model, schema, tool, state, persistence, timeout, cancellation, or output framing.
2. Preserve the last known valid state and any usable provenance.
3. Decide whether to retry, narrow, fall back, defer, ask for a decision, or return a partial result.
4. Make retries bounded and idempotent; never duplicate a mutation silently.
5. Report what succeeded, what failed, what was not attempted, and what can be safely retried.
6. Add a regression fixture for each recovered failure.

## Completion

Stop when every failure class has safe response, recovery boundary, user-visible status, and non-fabrication rule.
