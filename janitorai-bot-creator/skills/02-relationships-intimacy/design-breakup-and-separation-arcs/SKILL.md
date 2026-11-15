---
name: design-breakup-and-separation-arcs
description: Use for text-based roleplay when a relationship may end, separate, recur, or remain ambiguous. Trigger phrases include “write the breakup,” “design the separation,” “show the practical aftermath,” and “what remains between them?”
---

## Steps

1. Record who decided, who spoke, and who understood.
2. Record what each person believes ended and what remains.
3. Record stated, private, disputed, and previous reasons.
4. Classify the ending as mutual, unilateral, negotiated, ambiguous, cyclical, coerced, or imposed by circumstance.
5. Track changes to housing, money, property, children, pets, care, sex, work, friends, family, community, status, secrets, digital access, and public identity.
6. Mark what separates, remains shared, or becomes leverage.
7. Track each person’s feelings before, during, and after the spoken ending.
8. Give each person a separate emotional clock.
9. Use concrete turns such as a returned key, reassigned room, exposed lie, removed name, divided friend group, practical request, public announcement, uncollected object, or tested boundary.
10. Track how each turn changes access, meaning, leverage, or future possibility.
11. Record conditions for ambiguity, recurrence, transformation, or finality.

## Decision rules

- Yes: Does the person who speaks first also begin grieving first? Do not assume it. No: keep each emotional clock separate.
- Yes: Does visible distress measure love? Remove that inference. No: continue.
- Yes: Does the separation change housing, money, care, work, community, access, or status? Track the practical change. No: continue.
- Yes: Is the ending cyclical, coerced, ambiguous, or imposed by circumstance? Preserve that form. No: use the supported finality.
- Yes: Does the arc force closure, forgiveness, friendship, reconciliation, therapy, or clean recovery? Remove the requirement. No: continue.
- Yes: Does the description decide {{user}}’s feelings, speech, actions, or decision? Remove that decision. No: continue.

## Output

- Format: `Breakup and separation record`
- Ending: state who decided, what ended, each account, and the ending form.
- System changes: list practical, social, digital, financial, sexual, and care changes.
- Emotional clocks: list each person’s before, during, and after state.
- Scene turns: list concrete events that change access, meaning, leverage, or possibility.
- Aftermath: list immediate consequences, delayed consequences, ambiguity, recurrence, and finality conditions.
- Continuity: list facts later scenes must remember.

```text
Breakup and separation record
Ending: {{char}} says the relationship is over; {{user}} believes the shared future ended but the practical bond remains.
System changes: Keys and finances separate; a shared friend group remains; digital access becomes a boundary.
Emotional clocks: {{char}} grieved during the final month and feels relief now; {{user}} feels numb first and angry later.
Scene turns: A room is reassigned, a mutual friend chooses a side, and an uncollected object tests the new boundary.
Aftermath: Contact may recur through practical care; finality depends on whether access and meaning change.
Continuity: The old promise, shared property, and disputed reason remain relevant.
```

## Stop when

- No breakup, separation, ending, practical entanglement, or aftermath problem is supplied: return `No breakup and separation update` and do not invent {{char}}’s or {{user}}’s ending.
