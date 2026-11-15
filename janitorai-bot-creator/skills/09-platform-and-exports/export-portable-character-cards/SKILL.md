---
name: export-portable-character-cards
description: Use when building, migrating, or packaging fictional AI roleplay character cards while preserving content, metadata, lore, assets, provenance, and user control. Trigger phrases include “export the character card,” “convert V1 to V3,” and “prepare a portable card.”
---

## Steps

1. Identify canonical source, target format and version, target platform, converter, assets, lorebook, metadata, and provenance.
2. Inventory identity, description, scenario, greeting, examples, instructions, lore, creator notes, tags, assets, and secrets.
3. Map each source field to the target field and mark unsupported, transformed, defaulted, or dropped content.
4. Preserve canonical source and create a versioned derived export.
5. Validate schema, encoding, package structure, asset links, metadata, prompts, and security without executing embedded content.
6. Import and export a round trip where a target is available; compare text, fields, assets, and hashes.
7. Run behavioural fixtures for {{char}}’s identity, goals, voice, knowledge, boundaries, and {{user}}’s agency.
8. Report downgrade trade-offs, unknowns, recovery path, and any data loss before delivery.

## Decision rules

- Yes: Is a field unsupported? Preserve it in the canonical source and report the downgrade. No: continue.
- Yes: Is runtime compatibility untested? Mark it unverified. No: continue.
- Yes: Does the package expose embedded secrets or untrusted content? Redact secrets and do not execute content. No: continue.
- Yes: Does export alter {{user}}’s agency or canonical data? Stop and report it. No: continue.

## Output

- Format: `Portable character-card export report`
- Source: list canonical file, target format, version, platform, converter, and provenance.
- Mapping: list preserved, transformed, unsupported, defaulted, and dropped fields.
- Validation: list schema, assets, security, round trip, and behavioural results.
- Handoff: provide export path, downgrade trade-offs, recovery path, and unknowns.

## Stop when

- No character card, source format, or target format is supplied: return `No character-card export` and do not modify the canonical source.
