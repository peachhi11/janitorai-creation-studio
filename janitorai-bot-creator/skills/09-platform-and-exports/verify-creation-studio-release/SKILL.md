---
name: verify-creation-studio-release
description: Verify a Studio release across character generation, reference retrieval, persistence, revision history, exports, prompts, security, and documentation before handoff.
---

# Verify Creation Studio Release

Use this skill before declaring a Creation Studio slice complete or handing a new skill-backed capability to the user.

## Process

1. Check changed public seams, configuration, prompts, skills, source references, and documentation.
2. Run focused tests for the changed behavior and the full test suite when runtime code changed.
3. Check reference provenance, character schema, state boundaries, player agency, genre framing, and revision reversibility.
4. Exercise normal, empty, malformed, oversized, unauthorized, conflicting, and long-context inputs where applicable.
5. Record failures with reproduction, scope, severity, and whether they block release.
6. Report changed files, verification results, unresolved risks, and the next safe handoff.

## Completion

Stop when every changed seam has evidence, every failure is dispositioned, documentation links resolve, and the handoff distinguishes verified behavior from assumptions or deferred work.
