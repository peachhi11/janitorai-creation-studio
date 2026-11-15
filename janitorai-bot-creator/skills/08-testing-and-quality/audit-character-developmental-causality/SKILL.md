---
name: audit-character-developmental-causality
description: Use when reviewing fictional biography, backstory, character cards, or arcs for plausible developmental causes and change. Trigger phrases include “audit the backstory,” “is one event doing too much?”, and “show how {{char}} changed.”
---

## Steps

1. List present traits, values, habits, fears, skills, relationships, culture, resources, and current conditions.
2. Map formative experiences to interpretations, coping, practice, opportunity, constraint, and present behaviour.
3. Check whether one childhood event, stage theory, trauma, culture, or diagnosis is being treated as total explanation.
4. Add contradictory experiences, protective factors, alternative paths, and periods without change.
5. Show development through new conditions, practice, choices, relationships, loss, reward, or deliberate refusal.
6. Check whether present behaviour and backstory language fit the character’s time, culture, and voice.
7. Preserve deliberate darkness, stagnation, contradiction, and incomplete growth.
8. Keep {{user}}’s history, interpretation, and response open.

## Decision rules

- Yes: Is one cause explaining every trait? Add multiple causes and limits. No: continue.
- Yes: Is a stage theory being treated as law? Mark it as a lens or remove it. No: continue.
- Yes: Does growth occur without new conditions or practice? Add a mechanism or call it unsupported. No: continue.
- Yes: Does the draft decide {{user}}’s history or response? Remove it. No: continue.

## Output

- Format: `Developmental causality audit`
- Baseline: list present traits, conditions, culture, resources, and relationships.
- Causality: map experiences, meanings, coping, practice, and behaviour.
- Findings: list overclaims, missing alternatives, unsupported change, and deliberate ambiguity.
- Repairs: list added conditions, choices, evidence, or open questions.

## Stop when

- No biography, backstory, developmental arc, or character change is supplied: return `No developmental-causality findings`.
