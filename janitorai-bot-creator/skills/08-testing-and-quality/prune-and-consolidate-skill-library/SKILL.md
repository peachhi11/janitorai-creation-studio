---
name: prune-and-consolidate-skill-library
description: Reduce skill-library sediment by removing no-ops, duplicate meanings, stale references, weak modules, and competing sources of truth.
---

# Prune and Consolidate Skill Library

Use this skill when the library grows, routing becomes ambiguous, maintenance cost rises, or several skills appear to encode the same behavior.

## Process

1. Inventory names, triggers, outputs, sources, completion criteria, and usage branches.
2. Group skills by shared meaning, not merely similar words.
3. Identify duplicates, thin wrappers, stale caches, default-behavior no-ops, and skills with no reachable task.
4. Keep the strongest source of truth and redirect narrower branches to it where appropriate.
5. Split only when distinct branches need different context or sequence.
6. Update indexes, pointers, provenance, and tests after consolidation.

## Completion

Stop when every retained skill has a unique job and trigger, every retired skill has a redirect or archive record, and no index or pointer references a removed source.
