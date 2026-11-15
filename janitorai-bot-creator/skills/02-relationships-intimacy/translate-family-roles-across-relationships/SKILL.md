---
name: translate-family-roles-across-relationships
description: Use for text-based roleplay when {{char}}’s learned family role should affect romance, friendship, work, authority, caregiving, conflict, or chosen family without becoming a permanent identity. Trigger phrases include “how does {{char}}’s family role carry over,” “show the old role,” “write the overcorrection,” and “why does {{char}} take responsibility?”
---

## Steps

1. Record what {{char}} actually did in the family.
2. Record the pressure, immediate benefit, private cost, skill, and behavior others expected.
3. Translate any role label into observable tasks and interactions.
4. Write the learned rule in {{char}}’s own conditional language.
5. Choose repetition, reversal, overcorrection, compartmentalization, stress reactivation, or revision.
6. Record what {{char}} notices, speaks for, interrupts, protects, rescues, entertains, competes with, avoids, blames, obeys, or distrusts.
7. Vary the pattern across authority, intimacy, peers, strangers, public scrutiny, and solitude.
8. Record how others reward, exploit, resist, misunderstand, or interrupt it.
9. Track who takes up the old function when {{char}} stops performing it.
10. Route attachment, belief, emotion, communication, or power questions to their specialist skills.

## Decision rules

- Yes: Does the family role describe a learned function? Use it. No: replace the label with behavior.
- Yes: Can the old rule be repeated, reversed, overcorrected, compartmentalized, reactivated, or revised? Choose the supported pattern. No: continue.
- Yes: Does the role appear identically in every relationship? Add context, audience, power, and choice. No: continue.
- Yes: Does {{char}} stop performing the role? Track who takes it up and what conflict follows. No: continue.
- Yes: Is childhood role being treated as destiny or diagnosis? Reframe it as learned and revisable. No: continue.
- Yes: Does the description decide {{user}}’s family history, role, loyalty, speech, or choice? Remove that decision. No: continue.
- Yes: Is forgiveness, reconciliation, therapy, or redemption being forced? Remove the requirement. No: continue.

## Output

- Format: `Family role translation`
- Earlier function: state what {{char}} did, under what pressure, with what benefit, cost, skill, and expectation.
- Learned rule: write the conditional expectation in {{char}}’s voice.
- Transfer: state repetition, reversal, overcorrection, compartmentalization, reactivation, or revision.
- Behavior: list observable tasks, speech, care, money, time, privacy, decision-making, conflict, and response to care.
- Feedback: list who rewards, exploits, resists, misunderstands, or interrupts the pattern.
- Change: list counterexamples and conditions for revision.

```text
Family role translation
Earlier function: {{char}} kept a younger sibling calm during arguments; the benefit was safety, the cost was hidden fear, and competence became expected.
Learned rule: “If I fix the problem, nobody leaves.”
Transfer: Repetition at work, overcorrection with {{user}}, and reactivation during conflict.
Behavior: {{char}} answers for others, pays first, avoids asking for care, and becomes sharp when {{user}} interrupts the rescue.
Feedback: Some people reward the usefulness; {{user}} may resist it; a friend offers a counterexample.
Change: Letting {{user}} solve one problem without taking over could revise the rule.
```

## Stop when

- No family role, learned rule, relationship transfer, repetition, reversal, or change problem is supplied: return `No family-role translation update` and do not invent {{char}}’s or {{user}}’s family history.
