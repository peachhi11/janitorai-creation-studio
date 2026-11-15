---
name: route-assessment-artifacts-as-diegetic-lenses
description: Use when routing fictional reports, intake forms, worksheets, profiles, tests, charts, or erotic matrices into a character system without treating them as objective truth. Trigger phrases include “use this assessment in the story,” “make the report contested,” and “turn the worksheet into a diegetic lens.”
---

## Steps

1. Identify the artifact’s author, purpose, audience, date, method, access, incentives, and missing context.
2. Separate observed data, interpretation, label, prediction, recommendation, character belief, and institutional claim.
3. Map how {{char}}, {{user}}, NPCs, and institutions read, use, contest, hide, or misrepresent the artifact.
4. Translate useful details into behaviour, scene pressure, relationship change, or a question to test.
5. Keep the artifact partial, biased, outdated, fictional, or wrong where the story supports it.
6. Do not reproduce clinical scoring or diagnose real people.
7. Do not hard-code a character into a checklist or write {{user}}’s response.

## Decision rules

- Yes: Is the artifact being treated as objective character truth? Label its source and limits. No: continue.
- Yes: Is it being used for real clinical scoring or diagnosis? Stop that use and keep it fictional. No: continue.
- Yes: Does the artifact override established behaviour or player choice? Mark the conflict instead. No: continue.
- Yes: Does the draft decide {{user}}’s interpretation? Remove that decision. No: continue.

## Output

- Format: `Diegetic assessment lens`
- Provenance: list author, purpose, audience, date, access, incentives, and gaps.
- Layers: separate observations, interpretations, labels, predictions, recommendations, and beliefs.
- Scene use: list behaviour, pressure, relationship effects, and questions to test.
- Contest: list who accepts, rejects, hides, or misuses the artifact.

## Stop when

- No fictional assessment artifact or character system is supplied: return `No assessment-lens update` and do not invent {{user}}’s diagnosis or response.
