---
name: romance-route-design
description: Use for text-based roleplay when the author wants a romantic route, trope, pacing choice, or relationship setup. Trigger phrases include “choose a romance route,” “use this trope,” “make it slow burn,” “keep the relationship open,” and “plan the ending.”
---

## Steps

1. Choose the genre flavor.
2. Choose the relationship setup for {{char}} and {{user}}.
3. Choose the pacing.
4. Choose the conflict level.
5. Choose the possible ending range.
6. Record themes, dynamics, outcomes, or disclosures the author does not want.
7. Treat each trope as a pressure pattern rather than a script.
8. Record why the trope fits {{char}} and {{user}}.
9. Record the practical pressure the trope creates.
10. Record what each person wants from the trope.
11. Record what each person misunderstands.
12. Record the boundaries and knowledge limits that matter.
13. Record how the trope can resolve, invert, or fail.
14. Keep each relationship independent when more than two focal characters are present.
15. Update intimacy when events change trust, desire, affection, compatibility, commitment, availability, or knowledge.

## Decision rules

- Yes: Has the author chosen a relationship setup? Preserve it. No: do not assume a triangle, harem, polycule, or non-monogamous arrangement.
- Yes: Has the author chosen non-monogamy? Preserve each person’s boundaries, knowledge, consent, availability, and choices. No: keep the route unspecified or exclusive as selected.
- Yes: Does the trope create specific pressure for these characters? Use it. No: remove it or choose another trope.
- Yes: Are several tropes being added only to increase intensity? Remove the extras. No: keep the selected tropes.
- Yes: Is slow burn selected? Let it control pacing. No: do not delay an established or author-selected fast route.
- Yes: Has the author selected conflict? Use that level. No: do not add conflict automatically.
- Yes: Has the author selected redemption, mutual repair, therapy, or a happy ending? Include it. No: leave the ending open to the selected route.
- Yes: Is message count the only evidence of intimacy? Do not use it as proof. No: update intimacy from events and changed relationship values.

## Output

- Format: `Romance route record`
- Route: list genre flavor, relationship setup, pacing, conflict level, ending range, and exclusions.
- Trope: state each selected trope and the pressure it creates.
- Wants: list what {{char}} and {{user}} want and misunderstand.
- Boundaries: list relevant consent, knowledge, availability, and relationship limits.
- Pacing: state what changes intimacy and when.
- Branches: list possible resolutions, inversions, failures, or endings.

```text
Romance route record
Route: Gothic; exclusive; gradual; high conflict; ambiguity or separation; no forced redemption.
Trope: Mutual attraction under family pressure; it limits where {{char}} and {{user}} can meet and what they can reveal.
Wants: {{char}} wants secrecy and control; {{user}} wants honesty and a choice. Both misunderstand the other’s silence.
Boundaries: Neither person may decide for the other; each keeps private information until they choose to disclose it.
Pacing: Trust changes through disclosures and consequences, not message count.
Branches: The trope can resolve through disclosure, invert through betrayal, fail through exposure, or end in separation.
```

## Stop when

- No romantic route, trope, pacing choice, or relationship setup is supplied: return `No romance route update` and do not invent one.
