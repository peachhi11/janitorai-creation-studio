---
name: audit-character-card-interoperability
description: Use when checking whether a fictional AI roleplay character card imports, preserves, exports, and behaves predictably across applications. Trigger phrases include “audit this character card,” “check V1/V2/V3 compatibility,” and “find silent data loss.”
---

## Steps

1. Identify source format, version, package, target platform, converter, runtime, and canonical source.
2. Inspect JSON, PNG/APNG, CHARX, metadata, prompt fields, lorebook entries, assets, links, and embedded content without executing it.
3. Compare schema fields, required values, optional values, defaults, limits, encodings, and unsupported features.
4. Import into the target and record warnings, dropped fields, altered prompts, missing assets, security issues, and behaviour changes.
5. Export the result and compare source → import → export with hashes, field diffs, asset checks, and text review.
6. Test representative roleplay turns for identity, goals, knowledge, boundaries, voice, lore, {{user}}’s agency, and failure modes.
7. Record silent loss, conversion risk, runtime difference, and a recovery path.

## Decision rules

- Yes: Is compatibility inferred from one import? Run a round trip and behavioural test. No: continue.
- Yes: Is a field unsupported or silently dropped? Report it and preserve the canonical source. No: continue.
- Yes: Does the card contain executable or untrusted content? Do not execute it. No: continue.
- Yes: Does the export decide {{user}}’s response or remove canonical content? Flag it. No: continue.

## Output

- Format: `Character-card interoperability audit`
- Scope: list source, versions, platforms, converters, and canonical files.
- Structure: list schema, fields, prompts, lore, assets, security, and silent-loss findings.
- Round trip: list import, export, field diff, asset, and behavioural results.
- Verdict: list supported features, risks, recovery path, and unknowns.

## Stop when

- No character card, format, or target platform is supplied: return `No character-card findings` and do not modify the source.
