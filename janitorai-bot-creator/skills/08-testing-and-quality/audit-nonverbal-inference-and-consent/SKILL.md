---
name: audit-nonverbal-inference-and-consent
description: Use when reviewing fictional scenes or roleplay for unsupported body-language inference, lie detection, attraction or consent claims, cultural universals, disability stereotypes, surveillance, or agency errors. Trigger phrases include “audit the body-language reading,” “stop cue-based consent,” and “keep the intimidation intentional.”
---

## Steps

1. List each observable cue, setting, body, access need, culture, intention, interpretation, evidence, and uncertainty.
2. Separate cue, meaning, feeling, motive, lie, attraction, permission, and consent.
3. Check micro-expression, gaze, posture, silence, touch, freezing, and stillness for universal or deterministic claims.
4. Check gender, cultural, disability, neurodivergence, covert-surveillance, target, and therapist-like framing.
5. Add competing interpretations, clarification, explicit permission, refusal, adjustment, and consequence.
6. Check whether the text writes {{user}}’s body, mind, consent, speech, or action.
7. Preserve predation, intimidation, manipulation, and ambiguity as fictional dynamics.

## Decision rules

- Yes: Is a cue treated as proof of consent, attraction, or truth? Reframe it as uncertain evidence. No: continue.
- Yes: Is a body-language rule universalized across gender, culture, disability, or neurodivergence? Add context. No: continue.
- Yes: Is covert surveillance being presented as reliable reading? Remove the operational claim. No: continue.
- Yes: Does the draft decide {{user}}’s response? Remove it. No: continue.

## Output

- Format: `Nonverbal inference and consent audit`
- Evidence: list cues, context, readings, uncertainty, and explicit permission.
- Findings: list universal, surveillance, stereotype, consent, and agency errors.
- Repairs: list competing readings, clarification, boundaries, and consequences.

## Stop when

- No fictional nonverbal cue or consent framing is supplied: return `No nonverbal-inference findings`.
