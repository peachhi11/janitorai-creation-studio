---
name: migrate-character-card-schema
description: Migrate character cards between schema versions while preserving unknown fields, canon, provenance, platform intent, and reversible history.
---

# Migrate Character Card Schema

Use this skill when a card format, field name, platform contract, or Studio schema changes.

## Process

1. Identify source and target schemas, required fields, optional fields, deprecated fields, and unknown-field policy.
2. Snapshot the original card and record its schema version.
3. Map fields explicitly, preserving values and provenance; do not infer missing canon from defaults.
4. Convert platform syntax through an adapter rather than mixing it into portable character data.
5. Validate identity, voice, scenario, knowledge, boundaries, examples, and export behavior.
6. Produce a migration report with warnings, dropped fields, transformed fields, and restore path.

## Completion

Stop when the target card validates, original data remains recoverable, every transformation is reported, and no unknown or author-owned field was silently discarded.
