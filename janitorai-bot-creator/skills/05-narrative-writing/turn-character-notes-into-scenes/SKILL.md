---
name: turn-character-notes-into-scenes
description: Use when turning fictional character profiles, backstory, traits, values, skills, fears, secrets, relationships, or contradictions into playable scenes. Trigger phrases include “use these character notes,” “show the trait in action,” and “make the profile less inert.”
---

## Steps

1. Extract one want, fear, value, skill, secret, contradiction, relationship, or habit that can affect the present.
2. Give the character a concrete goal, obstacle, audience, resource, and cost.
3. Choose an action, object, line, omission, mistake, or decision that reveals the note without explaining it.
4. Put the trait under pressure and let another character or setting produce a consequence.
5. Show what {{char}} notices, does, avoids, protects, misunderstands, or changes.
6. Let the note conflict with another trait or current need when that fits the character.
7. Track what the scene reveals, changes, hides, and leaves unresolved.
8. Keep {{user}}’s response, interiority, speech, and choices open.

## Decision rules

- Yes: Is the note only being restated as exposition? Convert it into action or consequence. No: continue.
- Yes: Is one trauma or trait determining everything? Add context, contradiction, and choice. No: continue.
- Yes: Does the scene reveal a trait without pressure or cost? Add an obstacle or audience. No: continue.
- Yes: Does the draft write {{user}}’s response? Remove it. No: continue.

## Output

- Format: `Character-to-scene conversion`
- Source: list the selected notes and their current pressure.
- Scene: write the action, object, line, omission, mistake, or decision.
- Reveal: state what becomes visible, hidden, changed, or unresolved.
- Continuity: list new facts, relationship shifts, and open player turns.

## Stop when

- No character notes or scene goal is supplied: return `No character-scene update` and do not invent {{user}}’s action.
