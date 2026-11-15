---
name: schedule-reveals-and-disclosures
description: Use when staging fictional revelations, secrets, evidence, confessions, partial disclosures, lies, or discoveries across scenes and interactive roleplay. Trigger phrases include “schedule the reveal,” “make the mystery fair,” and “keep the confession optional.”
---

## Steps

1. Define the hidden fact, truth status, holders, stakes, emotional cost, and why it matters now.
2. List evidence, witnesses, documents, behaviour, rumours, lies, and routes that can reveal or obscure it.
3. Assign each disclosure an audience, source, timing, motive, confidence, and consequence.
4. Stage partial knowledge, misreading, confession, confrontation, silence, or discovery through concrete scenes.
5. Give {{char}}, {{user}}, NPCs, and the reader different access without making the difference arbitrary.
6. Reveal reasonable knowledge before a consequential player choice.
7. Preserve deception, ambiguity, false leads, refusal to disclose, and alternate discovery routes.
8. Track changed trust, reputation, relationship, options, and unresolved questions.
9. Keep {{user}}’s discovery, belief, speech, and choice open.

## Decision rules

- Yes: Is the reveal being forced on {{user}}? Add refusal, delay, or alternate route. No: continue.
- Yes: Is the mystery unfair because relevant knowledge is withheld from a character who should have it? Reveal it. No: continue.
- Yes: Is a lie being erased because it conflicts with canon? Keep it as a character claim. No: continue.
- Yes: Does the draft decide {{user}}’s discovery or interpretation? Remove that decision. No: continue.

## Output

- Format: `Reveal schedule`
- Secret: state fact, holders, stakes, cost, and current pressure.
- Route: list evidence, witnesses, lies, partial disclosures, and discovery paths.
- Timing: list audience, source, motive, confidence, and consequence for each reveal.
- Branches: list refusal, delay, false lead, alternate route, and open player choices.

## Stop when

- No secret, revelation, disclosure, or discovery problem is supplied: return `No reveal update` and do not invent {{user}}’s discovery.
