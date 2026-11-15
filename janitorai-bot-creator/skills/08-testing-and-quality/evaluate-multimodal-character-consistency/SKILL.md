---
name: evaluate-multimodal-character-consistency
description: Use when evaluating whether a fictional character remains recognisable and causally consistent across text, image, audio, roleplay turns, avatars, and platform conversions. Trigger phrases include “check cross-modal consistency,” “compare the avatar and dialogue,” and “separate intentional variation from drift.”
---

## Steps

1. Define the character contract: stable anchors, values, motives, fears, boundaries, contradictions, voice, attention, gestures, visuals, variation, state, and knowledge.
2. Mark player-owned, unresolved, transformed, unreliable, dream, avatar, and genre-specific material.
3. Build paired cases that hold character and scenario constant while changing one modality, context, or wording.
4. Include neutral, stressed, intimate, public, adversarial, off-target, contradictory, and relevant dark or erotic cases.
5. Record identity anchors, voice, motives, decisions, state response, knowledge, genre intention, agency, modality quality, and useful variation.
6. Classify each difference as authored, plausible state change, unsupported drift, or unresolved.
7. Use blind paired review where possible and record prompt, generator, version, sample, disagreement, and failure evidence.
8. Do not infer a real person’s identity or psychology, treat visual resemblance as character truth, or force identical surface detail.

## Decision rules

- Yes: Is a difference an authored transformation or genre rule? Preserve it and record the condition. No: continue.
- Yes: Does a modality contradict stable motives, knowledge, or boundaries without cause? Flag drift. No: continue.
- Yes: Is pixel, voice, or wording similarity being treated as causal consistency? Add behavioural evidence. No: continue.
- Yes: Does the evaluation decide {{user}}’s response or character choice? Remove that claim. No: continue.

## Output

- Format: `Multimodal character consistency report`
- Contract: list stable anchors, permitted variation, current state, and open material.
- Matrix: list paired cases, modalities, prompts, generators, and evidence.
- Findings: classify authored variation, plausible change, drift, uncertainty, and agency impact.
- Next test: list failures, sample limits, disagreement, and the next discriminating case.

## Stop when

- No character contract, multimodal output, or paired test is supplied: return `No multimodal-consistency update` and do not invent a result.
