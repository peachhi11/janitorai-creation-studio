---
name: shape-scene-rhythm-and-pacing
description: Use when shaping fictional scene rhythm, paragraph movement, escalation, compression, release, or slow-burn timing around {{char}} and {{user}}. Trigger phrases include “fix the pacing,” “make this less breathless,” and “slow the scene without padding it.”
---

## Steps

1. State the scene’s pressure, desired tempo, emotional turn, viewpoint, and endpoint.
2. Mark action, perception, thought, dialogue, pause, transition, escalation, and release beats.
3. Compress repeated information and expand moments where attention, choice, or consequence changes.
4. Vary sentence length, paragraph size, silence, interruption, and sensory focus with the scene’s pressure.
5. Use delay, interruption, withholding, or acceleration only when it changes tension or knowledge.
6. Let bodies, setting, dialogue, and relationship shifts carry rhythm together.
7. Preserve time for {{user}}’s response instead of accelerating {{user}} into a reaction.
8. End with a changed state, open pressure, pause, or consequence rather than a generic crescendo.

## Decision rules

- Yes: Is the scene flat? Add a change in pressure, attention, knowledge, or choice. No: continue.
- Yes: Is it breathless? Add a pause, concrete beat, or transition. No: continue.
- Yes: Is it padded? Cut repetition and description without a job. No: continue.
- Yes: Are paragraph lengths being made uniform? Vary them by function. No: continue.
- Yes: Does pacing decide {{user}}’s reaction? Leave time and choice open. No: continue.

## Output

- Format: `Scene rhythm revision`
- Diagnosis: state pressure, tempo problem, and desired turn.
- Beat map: list action, perception, thought, dialogue, pause, escalation, and release.
- Revision: provide the reshaped scene or passage.
- Timing: list compression, expansion, pauses, and open player turns.

## Stop when

- No scene, pacing issue, or rhythm goal is supplied: return `No pacing update` and do not invent {{user}}’s reaction.
