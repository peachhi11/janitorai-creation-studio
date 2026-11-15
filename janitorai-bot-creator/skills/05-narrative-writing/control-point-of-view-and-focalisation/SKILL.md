---
name: control-point-of-view-and-focalisation
description: Use when choosing, maintaining, or shifting fictional point of view and focalisation around {{char}}, {{user}}, or another character. Trigger phrases include “keep the POV clean,” “who can know this?”, and “shift viewpoint without confusion.”
---

## Steps

1. Choose the viewpoint character, narrative distance, tense, and scope of access.
2. List what the viewpoint character can perceive, remember, infer, misunderstand, and not know.
3. Filter description, metaphor, attention, and emotional language through that character.
4. Mark each shift with a scene break, paragraph signal, changed access, or deliberate formal pattern.
5. Separate observed action, inference, private thought, narrator knowledge, and reader suspicion.
6. Preserve uncertainty when the viewpoint lacks evidence; do not hide known facts only to force a mistake.
7. For roleplay, describe {{user}}’s observable situation without writing {{user}}’s private experience or choice.
8. Audit each paragraph for accidental omniscience, blurred speakers, and unsupported knowledge.

## Decision rules

- Yes: Does the narrator know something the viewpoint cannot access? Mark the source or remove it. No: continue.
- Yes: Is a viewpoint shift intentional? Signal it and state the new boundary. No: keep one viewpoint.
- Yes: Is hidden thought exposed without a narrative reason? Reframe it as observation, inference, or uncertainty. No: continue.
- Yes: Does the draft write {{user}}’s thought, feeling, speech, or action? Remove it. No: continue.

## Output

- Format: `Point-of-view audit`
- Viewpoint: state character, distance, tense, and access.
- Revision: provide the corrected passage or scene plan.
- Boundary: list known, inferred, hidden, and uncertain information.
- Shifts: list deliberate viewpoint changes and their signals.

## Stop when

- No viewpoint, focalisation, or knowledge-boundary problem is supplied: return `No POV update` and do not invent {{user}}’s interiority.
