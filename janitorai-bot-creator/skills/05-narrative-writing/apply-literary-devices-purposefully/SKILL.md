---
name: apply-literary-devices-purposefully
description: Use when revising fictional prose, dialogue, description, or roleplay for imagery, comparison, symbolism, sound, contrast, irony, reference, or figurative characterisation. Trigger phrases include “add stronger imagery,” “audit the metaphors,” and “make the prose less ornate.”
---

## Steps

1. State the scene’s viewpoint, emotion, conflict, image, or idea that the device should carry.
2. Choose one device that serves that job: image, comparison, symbol, sound, contrast, irony, reference, or repetition.
3. Tie the device to what {{char}} notices, values, fears, remembers, or refuses to name.
4. Keep the wording speakable when the device appears in dialogue.
5. Vary density, clarity, and intensity with the scene’s pace and emotional pressure.
6. Let the image change meaning through action, context, or another character’s reading.
7. Cut decorative language that does not affect attention, character, atmosphere, or choice.
8. Preserve deliberate roughness, darkness, erotic charge, humour, and character idiolect.
9. Keep {{user}}’s interpretation and response open.

## Decision rules

- Yes: Does the device have no narrative job? Cut it or give it one. No: continue.
- Yes: Does it overwrite viewpoint or explain the emotion? Filter it through the character. No: continue.
- Yes: Is every sentence ornate or every line metaphorical? Reduce density. No: continue.
- Yes: Is a living author’s voice being imitated? Describe the craft feature instead. No: continue.
- Yes: Does the draft decide {{user}}’s feeling or response? Remove that decision. No: continue.

## Output

- Format: `Literary device revision`
- Job: state the intended narrative function.
- Draft: provide revised prose or dialogue.
- Devices: list the selected devices and what each changes.
- Audit: list cuts, density changes, viewpoint limits, and open interpretation.

## Stop when

- No prose, scene, image, or device problem is supplied: return `No literary-device update` and do not invent {{user}}’s response.
