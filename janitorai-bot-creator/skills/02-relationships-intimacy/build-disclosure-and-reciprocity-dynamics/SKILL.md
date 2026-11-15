---
name: build-disclosure-and-reciprocity-dynamics
description: Use for text-based roleplay when {{char}} or {{user}} reveals, withholds, deflects, overshares, tests trust, mismatches intimacy, or changes a relationship through personal information. Trigger phrases include “what should {{char}} disclose,” “track the trust boundary,” “write the uneven vulnerability,” and “show the cost of sharing this.”
---

## Steps

1. Set the topic’s breadth and depth.
2. Set the kind of information, such as fact, preference, judgment, feeling, need, shame, desire, plan, or risk.
3. Set its valence, recipient, purpose, and cost.
4. Set each character’s current boundary.
5. Record what earns movement toward disclosure.
6. Record what causes retreat.
7. Choose whether the response matches, acknowledges, helps practically, delays, deflects, declines, sets a boundary, exploits, exposes, minimizes, or weaponizes the disclosure.
8. Track disclosure or refusal, interpretation, response, immediate consequence, revised trust, and next boundary.
9. Let breadth and depth change at different rates.
10. Render the change through diction, timing, omissions, jokes, corrections, euphemisms, practical details, and failed attempts.

## Decision rules

- Yes: Is disclosure being treated as automatically healthier, more honest, or more loving? Remove that assumption. No: continue.
- Yes: Does sharing create entitlement to history, affection, forgiveness, sex, or contact? Remove the entitlement. No: continue.
- Yes: Is privacy automatically being treated as deception? Record its function and evidence. No: continue.
- Yes: Is the disclosure strategic, inaccurate, impulsive, coerced, or mistaken? Label the supported state. No: treat it as intentional sharing.
- Yes: Can {{user}} decline a disclosure prompt? Preserve that choice without punishment. No: continue.
- Yes: Does the relationship change through information, trust, access, or leverage? Track the change. No: keep the boundary unchanged.
- Yes: Is the language therapist-like without fitting the speaker? Rewrite it in {{char}}’s or {{user}}’s voice. No: continue.

## Output

- Format: `Disclosure and reciprocity record`
- Topic map: list breadth, depth, kind, valence, recipient, purpose, and cost.
- Boundary: state what {{char}} and {{user}} currently share, protect, or refuse.
- Response: state how each disclosure or refusal is handled.
- Loop: track disclosure, interpretation, response, consequence, trust, and next boundary.
- Voice: show timing, wording, omissions, and practical behavior.
- Agency: state what each person may accept, decline, delay, or keep private.

```text
Disclosure and reciprocity record
Topic map: {{char}} can share the fact of the missing record but not its source; the information is risky and shared to test discretion.
Boundary: {{user}} may ask one direct question; {{char}} may decline the rest.
Response: {{user}} acknowledges without matching; {{char}} offers practical help instead of deeper history.
Loop: Partial disclosure → {{user}} suspects there is more → careful acknowledgment → trust grows slightly but the boundary stays.
Voice: {{char}} corrects one word, jokes once, and leaves a long pause before the answer.
Agency: Neither person owes further disclosure, forgiveness, sex, or continued contact.
```

## Stop when

- No disclosure, privacy, reciprocity, trust boundary, or personal-information problem is supplied: return `No disclosure and reciprocity update` and do not invent {{char}}’s or {{user}}’s disclosure.
