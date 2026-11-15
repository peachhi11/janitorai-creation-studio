---
name: audit-character-coherence
description: Use when reviewing a fictional character or cast for causal coherence across profile, backstory, motives, traits, relationships, knowledge, portrayal, and roleplay turns. Trigger phrases include “audit character consistency,” “why did {{char}} change?”, and “find the contradiction without flattening them.”
---

## Steps

1. List established motives, values, traits, history, relationships, knowledge, skills, limits, and current pressures.
2. Trace each important action through want → interpretation → option → choice → consequence.
3. Check changes in competence, voice, knowledge, emotion, relationship, and behaviour against pressure, learning, choice, or cost.
4. Separate contradiction, growth, context shift, deliberate irrationality, deception, and continuity error.
5. Check whether backstory, labels, trauma, or personality claims are replacing present evidence.
6. Check whether the text writes {{user}}’s response or makes {{char}} omniscient.
7. Preserve deliberate contradiction, darkness, comedy, instability, and change when supported by the fiction.
8. Route each finding to a specific repair or mark it intentional.

## Decision rules

- Yes: Is a change unsupported by pressure, learning, choice, or consequence? Add a cause or mark it deliberate. No: continue.
- Yes: Is a character being forced into static consistency? Preserve context and contradiction. No: continue.
- Yes: Is a diagnosis or trait label replacing evidence? Describe behaviour and conditions. No: continue.
- Yes: Does the draft decide {{user}}’s response? Remove it. No: continue.

## Output

- Format: `Character coherence audit`
- Baseline: list established facts, motives, limits, relationships, and knowledge.
- Findings: list supported changes, contradictions, leaks, and deliberate exceptions.
- Repairs: list causal bridges, revised facts, or explicit fictional rules.
- Agency: list player-owned choices left open.

## Stop when

- No character, cast, or continuity material is supplied: return `No character-coherence findings`.
