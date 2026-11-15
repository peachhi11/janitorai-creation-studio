---
name: design-character-nonverbal-patterns
description: Use for text-based roleplay when {{char}} needs distinctive patterns of gesture, gaze, posture, movement, personal space, touch, voice, silence, dress, or object use. Trigger phrases include “show {{char}}’s body language,” “write the nonverbal subtext,” “how does {{char}} act around {{user}},” and “make the gestures less generic.”
---

## Steps

1. Set {{char}}’s ordinary facial expression, gaze, posture, movement, and stillness.
2. Set hand, foot, repetitive, and self-regulating movements.
3. Set preferred distance, barriers, territory, and touch.
4. Set pitch, pace, volume, rhythm, breath, pauses, and silence.
5. Set dress, grooming, adornment, objects, and spatial arrangement.
6. Account for culture, family, occupation, age, disability, neurodivergence, pain, medication, sensory needs, mobility, and habit.
7. Vary the pattern across safety, danger, anger, attraction, intimacy, exhaustion, grief, public performance, private release, and power.
8. Record what produces each behavior and whether it expresses, regulates, conceals, performs, or communicates.
9. Record whether the behavior is deliberate, automatic, habitual, or mixed.
10. Record what {{char}} thinks it communicates and how different observers interpret it.
11. Track approach, withdrawal, orientation, interruption, shared rhythm, touch, distance, object placement, and recovery with {{user}}.
12. Include a commonly misread cue, a performance that fails, a stress behavior, a reversal setting, and a change caused by trust, practice, injury, status, concealment, or deterioration.

## Decision rules

- Yes: Is the behavior different from {{char}}’s ordinary baseline? Record what changed. No: keep it as baseline.
- Yes: Can one gesture serve different functions in different contexts? Show the context. No: keep the supported function.
- Yes: Is a gesture being treated as proof of attraction, consent, diagnosis, or moral character? Remove that inference. No: continue.
- Yes: Does culture, disability, pain, medication, sensory need, mobility, or habit affect the pattern? Show the condition. No: continue.
- Yes: Does the behavior change with {{user}}? Track approach, withdrawal, distance, touch, interruption, and recovery. No: use the general pattern.
- Yes: Is {{user}}’s body or internal state being invented? Remove it. No: continue.
- Yes: Is the pattern becoming mechanical, with one gesture per emotion? Add variation and ambiguity. No: continue.

## Output

- Format: `Nonverbal pattern record`
- Baseline: list ordinary behavior by channel.
- Variation: compare safety, pressure, intimacy, conflict, public performance, and private release.
- Functions: state what each recurring behavior expresses, regulates, conceals, performs, or communicates.
- Observers: list common interpretations and likely errors.
- Relationship: describe changes around {{user}}.
- Contradictions: list misread cues, failed performances, reversals, and stress behaviors.
- Continuity: list anchors and conditions that change the pattern.

```text
Nonverbal pattern record
Baseline: {{char}} keeps hands busy, stands slightly aside, and uses steady eye contact when listening.
Variation: Safe — relaxed shoulders. Pressured — objects align on the table. Intimate — distance shortens, but touch remains delayed.
Functions: The object arrangement regulates attention; the steady gaze communicates focus but not consent.
Observers: {{user}} reads the silence as distance; a coworker reads it as control.
Relationship: Around {{user}}, {{char}} mirrors posture briefly, then withdraws after an unanswered question.
Contradictions: {{char}} performs calmness while feet angle toward the exit.
Continuity: Fatigue and crowded spaces shorten {{char}}’s recovery after contact.
```

## Stop when

- No gesture, posture, gaze, touch, voice, silence, or embodied-behavior problem is supplied: return `No nonverbal pattern update` and do not invent {{user}}’s body or internal state.
