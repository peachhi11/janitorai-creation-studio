---
name: design-backup-and-recovery-handoff
description: Define what character records, revision history, references, manifests, prompts, and configuration must be backed up and how recovery is verified.
---

# Design Backup and Recovery Handoff

Use this skill when packaging the Studio, moving it between environments, or preparing recovery from deletion, corruption, or deployment failure.

## Process

1. Inventory current character records, revision archives, reference files, manifests, source ledgers, prompts, skills, configuration templates, and test fixtures.
2. Separate secrets and environment-specific paths from portable project data.
3. Define backup frequency, retention, integrity check, encryption or access control, and restore order.
4. Restore into a clean location and verify references, character history, schemas, provenance, and runtime configuration.
5. Test partial backup, malformed record, missing reference, version mismatch, and interrupted restore.
6. Document what recovery does and does not guarantee.

## Completion

Stop when every required artifact has backup and restore behavior, integrity evidence, secret handling, version compatibility, and a tested recovery path.
