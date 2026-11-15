---
name: audit-psychological-framing-in-fiction
description: Use when reviewing fictional character notes, scenes, assessments, biographies, or worldbuilding for unsupported diagnosis, theory-as-fact, biological or childhood determinism, stigma, victim-blaming, crime-mental-illness claims, or agency loss. Trigger phrases include “audit the psychology,” “remove the diagnosis,” and “keep the character from being reduced to a theory.”
---

## Steps

1. List observable behaviour, context, history, body, relationships, resources, beliefs, and character goals.
2. Separate description, interpretation, theory, diagnosis, institutional label, character belief, and narrator claim.
3. Check biological, evolutionary, childhood, trauma, personality, crime, gender, and culture determinism.
4. Check assessment misuse, stigma, victim-blaming, therapist-like dialogue, and unsupported certainty.
5. Replace total explanations with multiple causes, alternatives, context, contradiction, and evidence.
6. Preserve deliberate darkness, irrationality, instability, conflict, and fictional labels when the story supports them.
7. Check whether the text writes {{user}}’s thoughts, diagnosis, feeling, consent, speech, or action.

## Decision rules

- Yes: Is a theory or diagnosis presented as fact without evidence? Label it or remove it. No: continue.
- Yes: Is biology, childhood, trauma, or culture treated as destiny? Add variation and conditions. No: continue.
- Yes: Is mental illness equated with crime or harm? Separate the claims. No: continue.
- Yes: Does the draft decide {{user}}’s interiority or response? Remove it. No: continue.

## Output

- Format: `Psychological framing audit`
- Layers: separate behaviour, interpretation, theory, diagnosis, belief, and narrator claim.
- Findings: list determinism, stigma, unsupported claims, assessment misuse, blame, and agency errors.
- Repairs: provide evidence-based fictional alternatives without diagnosing real people.
- Preserve: list deliberate darkness, contradiction, and open player choices.

## Stop when

- No fictional psychological framing or character explanation is supplied: return `No psychological-framing findings`.
