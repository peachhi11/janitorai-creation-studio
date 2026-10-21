# ADR 0002: Centralise the filesystem safety seam

- Status: Accepted
- Date: 2026-10-21

## Context

Character persistence and reference retrieval each implemented their own lexical path checks. The checks used string-prefix comparison, which can mistake a sibling path for a child path. Character IDs were also interpolated directly into filenames, and JSON writes were not atomic.

## Decision

Introduce `lib/file-store.mjs` as the scoped file module. It owns path resolution, containment checks using `path.relative`, safe identifier validation, JSON read/write helpers, and atomic write-then-rename behaviour. Character storage and reference retrieval depend on this module rather than duplicating path logic.

## Consequences

Positive:
- One seam protects both persistence and reference retrieval.
- Unsafe IDs and path escapes are rejected before filesystem access.
- Atomic replacement reduces partially written JSON records.
- The existing storage and reference interfaces remain stable.

Trade-offs:
- Filesystem remains the only concrete adapter; no speculative database interface is added.
- Symlink policy and malformed-record recovery remain later operational decisions.
