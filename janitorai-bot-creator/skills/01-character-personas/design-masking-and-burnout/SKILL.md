---
name: design-masking-and-burnout
description: Use for text-based roleplay when {{char}} performs normality, hides traits, reaches an energy limit, shuts down, withdraws, or changes how they present. Trigger phrases include “show {{char}} masking,” “write the burnout cycle,” “what does {{char}} look like when depleted,” and “make disclosure conditional.”
---

## Steps

1. Record the demand, audience, and feared consequence.
2. Record what {{char}} edits, suppresses, copies, rehearses, or discloses.
3. Record the immediate protection or benefit.
4. Record the energy cost and delayed residue.
5. Record early signs of depletion.
6. Set the cycle from sustained demand to narrowing capacity, withdrawal or shutdown, rest or accommodation, and changed baseline.
7. Keep pleasure, agency, humor, desire, and specific interests present when capacity is low.
8. Record how masking protects employment, privacy, safety, status, intimacy, or belonging.
9. Record how concealment affects processing, irritability, sensory pain, shutdown, and access to regulation.
10. Set what makes unmasking safe or unsafe.
11. Record recovery conditions and changed limits or boundaries.
12. Add scene tests for safe, unsafe, public, private, and high-demand contexts.

## Decision rules

- Yes: Is masking deliberate, habitual, automatic, or mixed? Record the supported combination. No: mark the pattern uncertain.
- Yes: Does concealment protect {{char}} in one setting and exhaust them in another? Show both effects. No: keep the single supported effect.
- Yes: Is disclosure being treated as automatically virtuous? Add safety, power, audience, and consequences. No: continue.
- Yes: Is concealment being treated as automatically deceptive? Record its function and limits. No: continue.
- Yes: Is burnout being treated as {{char}}’s identity? Model changing capacity, recovery, and residue. No: continue.
- Yes: Is recovery being forced to restore the old baseline? Allow changed limits and new boundaries. No: continue.
- Yes: Is {{char}}’s low capacity being used to remove agency, humor, desire, or interests? Restore the remaining behavior. No: continue.

## Output

- Format: `Masking and burnout record`
- Demand: list pressure, audience, feared consequence, and stakes.
- Masking: list what {{char}} edits, copies, suppresses, rehearses, or discloses.
- Protection: state the short-term gain.
- Cost: state energy cost, delayed residue, and early depletion signs.
- Cycle: describe sustained demand, narrowing capacity, shutdown or withdrawal, recovery, and changed baseline.
- Safety: list settings where disclosure or unmasking is safe, risky, or conditional.
- Scene tests: list observable signs in contrasting contexts.

```text
Masking and burnout record
Demand: A crowded workplace requires {{char}} to maintain eye contact, small talk, and rapid responses.
Masking: {{char}} rehearses phrases, copies coworkers’ timing, and hides sensory pain.
Protection: The performance protects employment and privacy.
Cost: Delayed processing, irritability, and loss of access to music that usually helps.
Cycle: Sustained demand narrows capacity; {{char}} goes quiet after work; rest restores some capacity but leaves a lower baseline.
Safety: Unmasking is safer with {{user}} in private and unsafe around a supervisor.
Scene tests: A busy office, a silent train ride, and a private conversation after rest.
```

## Stop when

- No masking, energy limit, shutdown, burnout, disclosure, or recovery problem is supplied: return `No masking and burnout update` and do not invent {{char}}’s state.
