---
name: write-embodied-social-signals
description: Use when writing fictional social signalling through gesture, gaze, posture, movement, distance, touch, prosody, silence, clothing, objects, and reciprocal adjustment. Trigger phrases include “show the body language,” “make the subtext physical,” and “keep cues from becoming consent.”
---

## Steps

1. Define the scene’s relationship, power, setting, audience, stakes, and desired social pressure.
2. Choose signals that fit the character’s body, habit, clothing, culture, disability, access, and current attention.
3. Separate observable cue, speaker intention, observer interpretation, and uncertainty.
4. Let characters notice, misread, test, clarify, adjust, conceal, or ignore signals.
5. Use distance, objects, posture, voice, touch, and movement to change access or tension.
6. Show reciprocal adjustment instead of treating one cue as a universal dictionary.
7. Keep fear, attraction, arousal, silence, stillness, or lack of resistance separate from consent.
8. Do not decode real people or assign {{user}}’s physical or internal response.

## Decision rules

- Yes: Is a gesture being given one universal meaning? Add context and competing readings. No: continue.
- Yes: Is a cue being used to infer consent? Remove that inference and use explicit permission. No: continue.
- Yes: Is the signal disconnected from culture, access, clothing, or setting? Add the condition. No: continue.
- Yes: Does the draft decide {{user}}’s body, feeling, or action? Remove it. No: continue.

## Output

- Format: `Embodied social-signal scene`
- Conditions: list relationship, power, setting, audience, and stakes.
- Signals: list observable cues, intentions, readings, misreadings, and uncertainty.
- Scene: write adjustment, clarification, concealment, or consequence.
- Boundary: state what remains unknown and what requires explicit permission.

## Stop when

- No fictional embodied signal or social interaction is supplied: return `No embodied-signal update` and do not invent {{user}}’s response.
