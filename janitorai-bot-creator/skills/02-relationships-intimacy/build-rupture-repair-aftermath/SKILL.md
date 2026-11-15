---
name: build-rupture-repair-aftermath
description: Use for text-based roleplay when a rupture, apology, repair attempt, reconciliation, separation, or aftermath needs to change trust and access over time. Trigger phrases include “write the aftermath,” “make the apology cost something,” “can they repair this,” and “show the damage after the conflict.”
---

## Steps

1. Record the incident and each person’s state at the time.
2. Separate impact, intent, responsibility, and each person’s later account.
3. Record what is acknowledged, denied, minimized, or unknown.
4. Record cooling-off, avoidance, practical fallout, public consequences, and continued contact.
5. Record the repair attempt, including naming harm, listening, responsibility, changed behavior, restitution, boundaries, and time.
6. Record what the injured person wants and may refuse.
7. Record evidence that trust, desire, safety, knowledge, or access changed.
8. Record residue such as vigilance, tenderness, resentment, grief, relief, attraction, or a new rule.
9. Use specific apologies and changed conduct instead of therapeutic speeches.

## Decision rules

- Yes: Do the people experience the incident differently? Preserve both accounts. No: use the shared account.
- Yes: Does an apology include responsibility and changed behavior? Track both. No: mark repair as incomplete.
- Yes: Can repair fail, remain partial, or leave a scar? Preserve that outcome. No: record the supported repair.
- Yes: Does reconciliation require forgiveness, consent, or continued contact? Do not assume it. No: continue.
- Yes: Can attraction, dependence, resentment, or danger coexist with repair? Preserve the tension. No: use the supported relationship state.
- Yes: Does the description decide {{user}}’s forgiveness, consent, feelings, speech, or choice? Remove that decision. No: continue.
- Yes: Is the ending being forced to be healthy or therapeutic? Remove the forced ending. No: preserve the selected genre.

## Output

- Format: `Rupture and repair record`
- Incident: state what happened and each person’s experience.
- Responsibility: separate impact, intent, responsibility, accounts, and unknowns.
- Repair: list the attempt, response, changed conduct, restitution, boundary, and time.
- Access: state changes to trust, desire, safety, knowledge, contact, and practical reliance.
- Residue: list unresolved harm, vigilance, tenderness, resentment, grief, relief, attraction, or new rules.
- Next pressure: state what the next scene inherits.

```text
Rupture and repair record
Incident: {{char}} exposed a private detail during an argument; {{user}} experienced it as betrayal; {{char}} intended to force honesty.
Responsibility: The impact is acknowledged; the intent is disputed; the reason for the disclosure remains partly unknown.
Repair: {{char}} names the harm, accepts a boundary, and changes who can access the information; {{user}} may still refuse contact.
Access: Trust narrows, practical cooperation remains, and private disclosure pauses.
Residue: Vigilance and attraction coexist; the old promise is now a new rule.
Next pressure: A public event will test whether the changed conduct holds.
```

## Stop when

- No rupture, apology, repair, separation, aftermath, or relationship damage is supplied: return `No rupture and repair update` and do not invent {{char}}’s or {{user}}’s response.
