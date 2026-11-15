---
name: catalogue-source-provenance-and-evidence
description: Use when cataloguing mixed research and reference sources with provenance, claim type, evidence tier, scope, limits, citation data, and creative use. Trigger phrases include “catalogue these sources,” “what can this source support?”, and “separate evidence from summary.”
---

## Steps

1. Record title, creator, date, format, origin, language, access, edition, and transformation history.
2. Classify each item as primary source, scholarship, report, popular guide, worksheet, screenshot, excerpt, generated note, or other.
3. Record the claims, evidence type, method, population, period, scope, and uncertainty.
4. Note omissions, funding, perspective, translation, editorial framing, and known limitations.
5. Link each claim to the source passage or location that supports it.
6. Separate direct evidence, interpretation, correlation, speculation, fiction, and creative prompt.
7. State what the source may support in character, setting, or prose work and what it cannot support.
8. Do not turn repeated summaries into independent evidence or correlation into character law.

## Decision rules

- Yes: Is provenance missing or unclear? Mark it unknown and lower confidence. No: continue.
- Yes: Is a claim supported only by repetition or summary? Do not count it as independent evidence. No: continue.
- Yes: Is correlation being turned into a rule about {{char}} or a population? Reframe it as limited evidence. No: continue.
- Yes: Is uncertainty hidden behind polished citation language? State the uncertainty. No: continue.

## Output

- Format: `Source evidence catalogue`
- Source: list provenance, type, edition, access, and transformation history.
- Claims: list claim, evidence tier, scope, support location, and uncertainty.
- Limits: list omissions, perspective, translation, bias, and unsupported uses.
- Creative use: state what the source can inform and what remains invented.

## Stop when

- No source, claim, or reference collection is supplied: return `No source-catalogue update` and do not invent provenance.
