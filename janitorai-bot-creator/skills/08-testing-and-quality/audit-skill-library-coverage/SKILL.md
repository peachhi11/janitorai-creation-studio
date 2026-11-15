---
name: audit-skill-library-coverage
description: Use when auditing a local narrative-skill library for taxonomy, duplicate triggers, missing boundaries, privacy leaks, coverage, and untested claims. Trigger phrases include “audit the skill library,” “check coverage,” and “find overlapping skills before release.”
---

## Steps

1. Inventory every skill’s path, name, description, line count, sections, references, and declared purpose.
2. Compare names, folders, counts, and taxonomy against the repository’s source list.
3. Extract positive triggers, negative boundaries, output formats, stop conditions, and cross-cutting agency or fictional-genre markers.
4. Find duplicate names, indistinguishable triggers, broad skills absorbing narrow jobs, missing workflow seams, and stale references.
5. Scan for private absolute paths, secrets, stale names, unsupported capabilities, and missing provenance.
6. Run structural validators, trigger fixtures, privacy scans, source checks, and available runtime tests.
7. Separate syntax pass, fixture pass, source-backed synthesis, model behaviour, unavailable checks, and untested claims.
8. Inspect representative new and old skills manually; do not call keyword coverage behavioural proof.
9. Report the smallest remediation and keep {{user}}’s creative choices outside the audit’s assumptions.

## Decision rules

- Yes: Do names, folders, and taxonomy disagree? Report the exact mismatch. No: continue.
- Yes: Are triggers overlapping but inputs or outputs differ? Add routing distinctions; do not merge mechanically. No: continue.
- Yes: Is a marker present only as a keyword? Require behavioural or fixture evidence. No: continue.
- Yes: Is a private path or secret exposed? Remove it from reports. No: continue.
- Yes: Is a known high-priority seam untested or structurally inconsistent? Do not call the library complete. No: continue.

## Output

- Format: `Skill library coverage audit`
- Inventory: list counts, taxonomy, sections, references, and purposes.
- Routing: list duplicate, overlapping, missing, and stale triggers.
- Privacy: list path, secret, and metadata results.
- Tests: list each command, fixture, representative review, result, and limitation.
- Remediation: list priority, file, evidence, fix, and remaining unknowns.

## Stop when

- No skill library or repository path is supplied: return `No skill-library findings` and do not invent coverage results.
