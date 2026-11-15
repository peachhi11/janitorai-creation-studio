---
name: preserve-creative-project-exports
description: Use when inspecting, backing up, redacting, migrating, restoring, or testing structured exports from creative-writing and character platforms. Trigger phrases include “preserve this project export,” “run a restore drill,” and “find which records are canonical.”
---

## Steps

1. Inventory export files, formats, versions, source platform, dates, privacy, checksums, and intended recovery scope.
2. Identify projects, versions, canon, metadata, codices, manuscripts, prompts, assets, links, records, and derived copies.
3. Mark canonical, duplicate, stale, derived, private, redacted, missing, and unsupported data.
4. Preserve the original and create a versioned backup before migration or redaction.
5. Inspect schema, references, encodings, assets, permissions, embedded content, and secrets without executing content.
6. Migrate with a field map, validation log, reversible output, and explicit loss report.
7. Restore into an isolated target and compare records, versions, canon, metadata, assets, and privacy settings.
8. Record failed recovery, missing data, ownership, and next action.

## Decision rules

- Yes: Is this the only export? Do not overwrite it. No: continue.
- Yes: Is a record canonical, duplicate, or derived unknown? Mark it for review. No: continue.
- Yes: Does an export contain executable or untrusted content? Inspect only. No: continue.
- Yes: Is restorability untested? Report it as unverified. No: continue.

## Output

- Format: `Creative project export report`
- Inventory: list files, versions, platforms, privacy, checksums, and scope.
- Canon: classify records, assets, metadata, versions, duplicates, and derived data.
- Migration: list field map, redactions, validation, loss, and rollback path.
- Restore: list isolated recovery results, differences, failures, and next actions.

## Stop when

- No project export, archive, migration, or restore question is supplied: return `No project-export update` and do not alter files.
