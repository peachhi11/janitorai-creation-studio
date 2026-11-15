---
name: design-character-memory-and-recall
description: Use for text-based roleplay when {{char}}’s memories, knowledge gaps, unreliable recall, expertise, habits, testimony, secrets, or relationship history need a clear shape. Trigger phrases include “design {{char}}’s memory,” “what does {{char}} remember,” “make this recollection unreliable,” and “separate what happened from what {{char}} recalls.”
---

## Steps

1. Record what actually happened.
2. Record what {{char}} could perceive.
3. Record what received enough attention to be encoded.
4. Record the meaning {{char}} gave the event at the time.
5. Record what was repeated, retold, avoided, or revised.
6. Record the cue that prompts the current recollection.
7. Record what {{char}} retrieves now and how confident they feel.
8. Record how the recollection changes current action.
9. Choose whether the story needs working, episodic, semantic, procedural, or association memory.
10. Define whether {{char}} keeps gist, sensory detail, sequence, emotional peak, faces, names, places, words, movement, or spatial relations.
11. Choose a traceable failure mode such as omission, gist compression, blended episodes, misplaced source, inserted expectation, wrong timing, false familiarity, or blocked retrieval.
12. Connect memory to promises, injuries, rituals, preferences, debts, touch, status, and prior conflict.
13. Show recall through changed anecdotes, withheld names, rushed details, old routes, and indirect speech.

## Decision rules

- Yes: Are event, encoded detail, and present claim different? Keep them separate. No: align them only when the story supports it.
- Yes: Does the memory change through attention, delay, interference, retelling, later information, expectation, mood, source confusion, or a cue? Show that mechanism. No: do not add convenient fog.
- Yes: Is confidence being treated as proof? Remove that certainty. No: continue.
- Yes: Does a vivid sensory fragment lack a clean timeline? Show what {{char}} infers without declaring a clinical mechanism. No: preserve the available sequence.
- Yes: Do two characters remember different slices of the encounter? Keep both accounts without calling one automatically deceitful. No: use the shared account.
- Yes: Is ordinary forgetting, distraction, inconsistent testimony, or unusual skill being used as a diagnosis? Remove the diagnosis. No: continue.
- Yes: Does the memory design decide {{user}}’s memories, feelings, consent, motives, speech, or choices? Remove that decision. No: continue.
- Yes: Is manipulation, obsession, coercion, grief, dissociation, or unreliable testimony part of the fiction? Preserve it with clear rules and consequences. No: use the selected tone.

## Output

- Format: `Memory and recall record`
- Event chain: list event, perception, encoding, meaning, rehearsal, cue, retrieval, confidence, and consequence.
- Memory type: state the forms of memory involved.
- Recall shape: list what {{char}} preserves and loses.
- Failure mode: state how recall changes and what evidence supports it.
- Relationship memory: list promises, injuries, rituals, preferences, debts, touch, status, and conflict recalled.
- Scene tests: list two or three cues or situations that reveal the pattern.
- Unknowns: list contradictions and unconfirmed memories.

```text
Memory and recall record
Event chain: {{char}} heard {{user}} promise to return; low attention captured the words but not the time; the promise was rehearsed during the wait; a train announcement triggers the memory now.
Memory type: Episodic feeling with weak sequence and strong procedural knowledge of the route.
Recall shape: {{char}} keeps {{user}}’s tone and the station layout but loses the exact wording.
Failure mode: Later retelling blends two promises; confidence rises because the version feels familiar.
Relationship memory: {{char}} remembers the promise as tender, while {{user}} remembers it as conditional.
Scene tests: The same train announcement, a photo of the station, and a direct question about the time.
Unknowns: Whether the blended detail was ever spoken.
```

## Stop when

- No memory, recall, testimony, knowledge gap, or relationship-history problem is supplied: return `No memory and recall update` and do not invent {{char}}’s memories.
