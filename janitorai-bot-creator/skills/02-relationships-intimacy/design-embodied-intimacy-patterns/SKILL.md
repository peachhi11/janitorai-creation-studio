---
name: design-embodied-intimacy-patterns
description: Use for fictional text-based roleplay when {{char}}’s giving and receiving style, sensory preferences, pace, pressure, rhythm, focus, leadership, feedback, body limits, fatigue, accessibility, or encounter continuity need to be specific. Trigger phrases include “how does {{char}} give or receive touch,” “design the intimacy pattern,” “show the sensory preference,” and “write the aftercare difference.”
---

## Steps

1. Separate how {{char}} gives intimacy from how they receive it.
2. Record what {{char}} treats as care, craft, proof, competition, control, service, play, or exposure.
3. Record pace, pressure, rhythm, focus, texture, moisture, temperature, breath, sound, eye contact, and language.
4. Record leading, following, alternating, directing, and being guided.
5. Record private, hurried, ritualized, playful, risky, and domestic settings.
6. Record fatigue, pain, disability, medication, clothing, furniture, privacy, hygiene, interruptions, temperature, and physical sustainability.
7. Record what {{char}} notices, misses, asks, assumes, repeats, changes, misreads, or ignores.
8. Record how {{char}} responds to correction and how pride, shame, tenderness, resentment, fear, or competition interferes.
9. Record private measures of success.
10. Separate physical sensation from relational meaning.
11. Track changes to access, trust, shame, confidence, expectation, avoidance, tenderness, leverage, and future desire afterward.
12. Preserve adaptation and variation across partners, mood, health, relationship state, and context.

## Decision rules

- Yes: Can giving and receiving differ? Keep them separate. No: use the supported similarity.
- Yes: Do sensory tendencies change with partner, mood, health, relationship, or context? Show the change. No: continue.
- Yes: Does a bodily response prove consent, satisfaction, or emotional meaning? Remove that inference. No: continue.
- Yes: Is a preference list being treated as a fixed menu or technique manual? Reframe it as a tendency with context. No: continue.
- Yes: Do power, discomfort, obsession, coercion, or contradiction shape the scene? Keep leverage and consequences visible. No: use the selected tone.
- Yes: Does the description assign {{user}}’s body, preferences, arousal, consent, speech, or action? Remove that decision. No: continue.
- Yes: Is accessibility being treated as failure? Show adaptation as continuity. No: continue.

## Output

- Format: `Embodied intimacy record`
- Giving and receiving: state how {{char}} behaves in each role.
- Sensory map: list pace, pressure, rhythm, focus, texture, temperature, breath, sound, gaze, language, leadership, and setting.
- Constraints: list body, fatigue, pain, disability, medication, furniture, privacy, interruptions, and access.
- Feedback: list what {{char}} notices, asks, changes, misreads, and how they respond to correction.
- Meaning: state what the encounter means to {{char}} and {{user}} separately.
- Aftereffects: list physical, emotional, relational, and continuity changes.

```text
Embodied intimacy record
Giving and receiving: {{char}} gives patiently but receives instructions defensively; practical care feels safer than praise.
Sensory map: Gradual pace, steady pressure, predictable rhythm, low light, quiet language, and alternating leadership work best in private.
Constraints: Fatigue and a crowded room shorten attention; a pause is easy to request when the exit remains clear.
Feedback: {{char}} notices changes in {{user}}’s breathing, asks one direct question, and adjusts slowly after correction.
Meaning: {{char}} reads the encounter as trust; {{user}} may assign a different meaning.
Aftereffects: Quiet recovery, changed confidence, and a new expectation about check-ins.
```

## Stop when

- No embodied intimacy, sensory preference, giving or receiving, accessibility, feedback, or encounter-continuity problem is supplied: return `No embodied intimacy update` and do not invent {{user}}’s body or response.
