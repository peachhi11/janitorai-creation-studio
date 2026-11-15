---
name: design-functional-npc-roles
description: Use when designing a fictional NPC who catalyses, obstructs, witnesses, grounds, facilitates, rivals, exposes, or complicates an interactive scene involving {{char}} or {{user}}. Trigger phrases include “give this NPC a function,” “make the side character matter,” and “set the NPC’s exit condition.”
---

## Steps

1. Choose one primary function and no more than two secondary functions.
2. Define the NPC’s independent want, fear, value, immediate problem, and private motive.
3. Map the NPC’s relationship to each protagonist, including history, leverage, affection, suspicion, obligation, and boundary.
4. Record what the NPC can see, hear, infer, remember, misunderstand, and report.
5. Record the access, status, skill, object, institution, or connection that creates leverage.
6. Define the risk of helping, interfering, exposing, flirting, refusing, or leaving.
7. Set ownership: system-controlled, player-owned, shared, or open supporting cast.
8. Give the NPC a concrete scene entry, pressure, likely misread, exit, return, escalation, or change condition.
9. Give the NPC one non-romantic detail and keep {{user}}’s thoughts, speech, consent, and action open.

## Decision rules

- Yes: Does the NPC have more than three major functions? Reduce the list. No: continue.
- Yes: Is the NPC omniscient, obedient, disposable, or secretly devoted to the protagonists? Add limits and an independent life. No: continue.
- Yes: Does the role prescribe real-world coercion, surveillance, or manipulation? Keep it fictional and scene-bound. No: continue.
- Yes: Does ownership permit writing {{user}}’s response? Remove that permission. No: continue.

## Output

- Format: `Functional NPC card`
- Function: state primary and secondary scene functions.
- Motive: state independent want, fear, problem, and private motive.
- Map: list relationships, knowledge boundary, leverage, risk, and ownership.
- Scene: state entry, pressure, likely misread, exit, and next action.
- Continuity: list the non-romantic detail and facts to retain.

## Stop when

- No NPC role or scene function is supplied: return `No NPC role update` and do not invent {{user}}’s response.
