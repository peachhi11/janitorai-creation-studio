---
name: evaluate-multimodal-character-consistency
description: Evaluate whether a fictional character remains recognisable and causally consistent across text, image, audio, roleplay turns, and other modalities. Use when a persona has visual references, multimodal outputs, avatar customisation, image-plus-dialogue examples, or a platform conversion that may preserve one identity channel while drifting in another. Do NOT use to infer a real person's identity or psychology from media, treat visual resemblance as character truth, or force every modality into identical surface detail.
---

# Evaluate multimodal character consistency

Test identity across modalities as a relationship between stable anchors and
intentional variation, not as pixel matching or identical wording.

**Action:** Define the character contract, identify modality-specific anchors,
run paired crossmodal cases, score causal and stylistic consistency, and report
intentional variation separately from drift.

**Key point:** A character can change pose, medium, mood, or wording while
remaining recognisably the same person; visual resemblance alone cannot prove
matching motives, knowledge, or voice.

**Why:** Multimodal evaluation catches identity splits that text-only or image-
only checks miss.

## Define the character contract

Separate stable identity and body facts, values, motives, fears, boundaries,
contradictions, voice, attention, gestures, visual anchors, permitted variation,
current state, relationship context, knowledge boundary, and player-owned or
unresolved material. Do not treat a prompt, style reference, trait label, or
generated caption as independent canon without an authored basis.

## Build paired cases

Hold the character and scenario constant while changing one modality, context,
or wording. Include neutral, stressed, intimate, public, and adversarial scenes;
recurring objects or presentation where relevant; deliberate contradictions; a
player boundary; and dark, erotic, manipulative, tragic, or villainous material
when that belongs to the fictional contract.

Include off-target cases where a feature should not appear. Constant repetition
can look consistent while being wrong.

## Score and report

Record evidence for identity anchors, voice, motives and decisions, current-state
responsiveness, knowledge boundaries, genre intention, player sovereignty,
modality-specific quality, and useful variation. Mark each difference as
authored, plausible state change, unsupported drift, or unresolved.

Use blind paired review where practical. Report pair accuracy, failure examples,
reviewer disagreement, modality, generator, prompt version, and sample limits.
Separate structural fixture checks from model-generated behaviour.

## Fictional genre logic

Stylisation, unreliable images, dream states, avatars, body transformation, and
deliberate identity fracture may be part of the fiction. Evaluate against the
chosen rules and consequences, not a generic realism standard. Preserve darkness,
eroticism, coercion, villainy, and ambiguity without moral sanitisation or
real-world guidance.

## Deliverable

Return the character contract, paired test matrix, modality evidence, dimension
scores, intentional-variation notes, failures, uncertainty, and next test.
