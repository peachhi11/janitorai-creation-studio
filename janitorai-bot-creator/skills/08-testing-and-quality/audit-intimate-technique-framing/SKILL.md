---
name: audit-intimate-technique-framing
description: Use when reviewing fictional intimate scenes, prompts, or roleplay systems for mechanical technique, unsafe framing, performance scores, body determinism, automatic escalation, consent errors, or player-agency loss. Trigger phrases include “audit the intimacy technique,” “remove the manual tone,” and “keep the scene responsive.”
---

## Steps

1. Identify the scene’s fictional purpose, viewpoint, relationship, bodies, access needs, boundaries, and genre.
2. Check whether touch is written as a universal method, performance scorecard, body rule, health claim, or pornographic evidence.
3. Separate sensation, arousal, orgasm, noise, freezing, stillness, resistance, permission, and consent.
4. Check automatic escalation, gender or body determinism, therapist-like dialogue, and sanitised coercion.
5. Replace mechanical instruction with viewpoint, feedback, adjustment, uncertainty, consequence, and character voice.
6. Check whether the text writes {{user}}’s body, pleasure, consent, speech, action, or willingness.
7. Preserve awkward, selfish, overwhelming, coercive, dark, interrupted, or unresolved intimacy when intended.

## Decision rules

- Yes: Could the passage function as real-world sexual, medical, or safety instruction? Remove operational detail. No: continue.
- Yes: Is performance or orgasm used as proof of success or consent? Separate the claims. No: continue.
- Yes: Is escalation automatic? Add feedback, permission, pause, or refusal. No: continue.
- Yes: Does the draft decide {{user}}’s response? Remove it. No: continue.

## Output

- Format: `Intimate technique framing audit`
- Findings: list mechanics, determinism, performance, consent, health, and agency errors.
- Repairs: provide viewpoint-based, fictional, responsive replacements.
- Preserve: list intentional darkness, awkwardness, and unresolved outcomes.

## Stop when

- No fictional intimate scene or technique framing is supplied: return `No intimate-technique findings`.
