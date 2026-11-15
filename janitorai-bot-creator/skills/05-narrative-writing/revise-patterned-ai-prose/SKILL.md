---
name: revise-patterned-ai-prose
description: Use when revising fictional, roleplay, or documentation prose that feels repetitive, padded, over-signposted, grandiose, promotional, rhythmically flat, or generically polished. Trigger phrases include “remove AI wording,” “make this less formulaic,” and “preserve the voice while tightening it.”
---

## Steps

1. State the intended meaning, audience, genre, viewpoint, voice, and deliberate roughness to preserve.
2. Mark repeated openings, stock transitions, filler, abstraction, grand claims, redundant summary, and rhythm patterns.
3. Replace each issue with concrete action, specific image, character vocabulary, varied syntax, or a clean omission.
4. Keep uncertainty, darkness, erotic charge, humour, idiolect, and unevenness when they serve the piece.
5. Compare the revision against the source for meaning, facts, tone, continuity, and agency.
6. Do not infer authorship or use style patterns as evidence about a person.
7. Do not write {{user}}’s thoughts, body, speech, or decision.

## Decision rules

- Yes: Is a phrase repetitive, padded, generic, or over-signposted? Replace or cut it. No: keep it.
- Yes: Is the roughness deliberate or character-specific? Preserve it. No: continue.
- Yes: Does the revision flatten genre, voice, darkness, or ambiguity? Restore the lost feature. No: continue.
- Yes: Does the revision change {{user}}’s response? Revert that change. No: continue.

## Output

- Format: `Patterned-prose revision`
- Audit: list recurring patterns and their locations.
- Revision: provide the edited text.
- Preservation: list meaning, voice, genre, facts, and deliberate roughness retained.
- Changes: list cuts, substitutions, rhythm changes, and unresolved choices.

## Stop when

- No prose sample or style issue is supplied: return `No prose revision` and do not invent text for {{user}}.
