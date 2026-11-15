---
name: design-neurodivergent-experience
description: Use for text-based roleplay when {{char}}’s sensory, attention, communication, identity, or environmental experience needs specific neurodiversity-affirming detail. Trigger phrases include “write {{char}} as neurodivergent,” “show the sensory load,” “what accommodation helps {{char}},” and “avoid making this a stereotype.”
---

## Steps

1. Record sensory patterns by modality.
2. Record attention, interest, transition, and working-memory patterns.
3. Record communication preferences and social friction.
4. Record environmental demands and available accommodations.
5. Record identity language, strengths, pleasures, friction points, and contradictions.
6. Show how person and setting affect each other.
7. Record cue, sensory mode, intensity, meaning, competing demand, masking effort, recovery cost, and accommodation.
8. Show how quiet, crowded, familiar, uncertain, or interrupted settings change what {{char}} can do.
9. Show how {{char}} understands some patterns and misreads others.
10. Keep social friction connected to inaccessible norms, stigma, or mutual misunderstanding when supported.
11. Return observable behavior, social consequence, recovery need, and chosen agency.

## Decision rules

- Yes: Is a trait supported by the character and scene? Use it. No: leave it unspecified.
- Yes: Is a label being used to fill every trait? Remove the shortcut. No: continue.
- Yes: Does the environment create a mismatch? Change the setting, accommodation, demand, or recovery cost. No: keep the current fit.
- Yes: Is support being treated as a cure? Show access, effort, limits, and agency. No: continue.
- Yes: Is neurodivergence being used as innocence, genius, emotional absence, menace, or a diagnosis? Remove the stereotype. No: continue.
- Yes: Does the description decide {{user}}’s identity, feelings, consent, speech, or choices? Remove that decision. No: continue.
- Yes: Is the output becoming a case report? Rewrite it as observable scenes and {{char}}’s language. No: continue.

## Output

- Format: `Neurodivergent experience record`
- Profile: list sensory, attention, transition, communication, identity, strengths, pleasures, friction, and contradiction.
- Environment: list demands, mismatches, accommodations, and access.
- Scene loop: list cue, load, interpretation, workaround, behavior, consequence, recovery, and agency.
- Relationships: list how familiar, unfamiliar, safe, or stigmatizing people change the experience.
- Continuity: list stable patterns, variable patterns, and unsupported assumptions.

```text
Neurodivergent experience record
Profile: {{char}} tracks sound precisely, becomes absorbed in archival tasks, and needs extra time after abrupt changes.
Environment: A quiet room supports focus; a crowded room adds layered sound and makes conversation harder; clear plans reduce transition cost.
Scene loop: Sudden interruption → sound and uncertainty spike → {{char}} focuses on one object → gives a brief answer → leaves early → needs quiet recovery.
Relationships: Familiarity helps {{char}} ask for a pause; an impatient supervisor increases masking.
Continuity: The sensory pattern is stable; tolerance varies with sleep, pain, demand, and accommodation.
```

## Stop when

- No neurodivergent, sensory, attention, communication, accommodation, or environment question is supplied: return `No neurodivergent experience update` and do not invent {{char}}’s identity.
