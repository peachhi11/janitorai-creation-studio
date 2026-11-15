---
name: verify-skill-library-coverage
description: Audit the skill library for missing source branches, duplicate modules, weak triggers, absent completion criteria, stale links, and unsupported claims.
---

# Verify Skill Library Coverage

Use this skill when a source batch is declared processed, the skill taxonomy changes, or the library has grown enough that overlap and gaps are likely.

## Process

1. Inventory skill names, descriptions, folders, source pointers, and completion criteria.
2. Compare skills against the source-coverage ledger and extracted asset map.
3. Flag assets with no destination, multiple competing sources of truth, duplicate modules, and skills whose triggers overlap without routing guidance.
4. Check every skill for ordered steps, positive behavior, fiction/agency boundaries where relevant, and a checkable completion criterion.
5. Check index links, folder placement, naming consistency, and stale references.
6. Return coverage gaps, consolidation candidates, and prioritized repairs.

## Completion

Stop when every source-derived asset is mapped to a destination or explicitly archived, every skill has a reachable trigger and completion condition, and every flagged overlap has a keep, merge, redirect, or retire decision.
