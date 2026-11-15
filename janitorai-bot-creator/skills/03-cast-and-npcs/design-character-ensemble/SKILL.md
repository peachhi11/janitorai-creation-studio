---
name: design-character-ensemble
description: Use when designing a fictional cast whose members need distinct wants, fears, relationships, knowledge, power, voices, and independent actions. Trigger phrases include “make the NPCs distinct,” “build the ensemble,” and “what do they do if {{user}} waits?”
---

## Steps

1. List each recurring character’s independent want, fear, value, resource, constraint, and failure mode.
2. Map each relationship with history, disposition, knowledge, leverage, desire, boundary, and misunderstanding.
3. Define what each character does when {{user}} or the protagonist does nothing.
4. Give each character distinct attention, habits, competence, voice, status, public mask, and private pressure.
5. Mark what each character knows, believes, misreads, hides, and can discover.
6. Define what makes each character leave, change sides, persist, escalate, or change.
7. Use asymmetry and collision to create scenes without making every NPC orbit the protagonist.
8. Keep romance, cooperation, rivalry, predation, tragedy, and deliberate imbalance available when the genre calls for them.
9. Keep {{user}}’s beliefs, attraction, consent, speech, and choices open.

## Decision rules

- Yes: Are NPCs only plot tools or secret satellites of {{user}}? Give them independent motives and actions. No: continue.
- Yes: Are all characters equally important or agreeable? Keep unequal focus and disagreement. No: continue.
- Yes: Does a relationship lack knowledge, leverage, or consequence? Add a concrete asymmetry. No: continue.
- Yes: Does the draft decide {{user}}’s reaction? Remove that decision. No: continue.

## Output

- Format: `Character ensemble map`
- Cast: list each character’s motive, fear, resource, voice, and failure mode.
- Relationships: list history, leverage, knowledge, boundaries, and misunderstandings.
- Agency: list independent actions if {{user}} waits.
- Collisions: list scene-generating conflicts and likely changes.
- Continuity: list facts to carry forward.

## Stop when

- No fictional cast or ensemble problem is supplied: return `No ensemble update` and do not invent {{user}}’s response.
