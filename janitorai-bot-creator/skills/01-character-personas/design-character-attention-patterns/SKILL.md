---
name: design-character-attention-patterns
description: Use for text-based roleplay when {{char}}’s attention should shape what they notice, miss, track, remember, or lose in ordinary, social, intimate, stressful, or dangerous scenes. Trigger phrases include “what does {{char}} notice,” “show {{char}}’s attention,” “write the missed detail,” and “make the point of view selective.”
---

## Steps

1. Record what is present and available to {{char}}’s senses.
2. Record what {{char}} is trying to do.
3. Record what feels urgent, rewarding, threatening, familiar, or meaningful.
4. Record competing tasks and what practice makes easier.
5. Record how fatigue, pain, intoxication, stress, noise, secrecy, and divided loyalties change attention.
6. Define what captures {{char}} without invitation.
7. Define what {{char}} deliberately searches for.
8. Define what {{char}} can hold, switch from, share, and recover after missing.
9. Record which sensory input is available, selected, grouped, and interpreted.
10. Show divided-attention costs through delays, missed steps, repeated questions, dropped objects, shallow answers, gaze shifts, or interrupted sentences.
11. Vary attention across safety, social or intimate contact, and serious pressure.
12. Specify cue, sensory mode, intensity, context, competing demand, and recovery cost for sensory or neurocognitive details.
13. Translate attention into description, questions, omissions, repeated details, body movement, mistakes, and what another character notices.

## Decision rules

- Yes: Is the detail available to {{char}}’s senses or knowledge? Allow it into perception. No: keep it unperceived.
- Yes: Does meaning, practice, state, or context change what {{char}} notices? Show the change. No: keep the established pattern.
- Yes: Do two tasks compete for the same demand? Show the interference. No: preserve the practiced combination.
- Yes: Is attention being used as diagnostic evidence? Reframe it as a scene mechanism. No: continue.
- Yes: Is attraction, threat, shame, expectation, or suspicion changing the threshold? Show the selected detail and the likely miss. No: continue.
- Yes: Is a task score or trait label replacing the character? Remove the shortcut. No: keep the person specific.
- Yes: Does the description decide {{user}}’s perception, feelings, attraction, consent, motives, speech, or choices? Remove that decision. No: continue.
- Yes: Is a dark, obsessive, jealous, protective, or predatory focus intentional? Preserve its consequences. No: use the selected tone.

## Output

- Format: `Attention pattern record`
- Scene demand: list goal, available input, urgency, competing tasks, and conditions.
- Tendencies: list pull, aim, hold, switch, share, and recover.
- Selection: list what {{char}} notices, misses, groups, and misinterprets.
- Divided attention: list the observable cost.
- Variation: compare safety, social or intimate contact, and pressure.
- Scene tests: list two or three situations that reveal the pattern.
- Continuity risks: list unsupported perceptions or likely misses.

```text
Attention pattern record
Scene demand: {{char}} is speaking with {{user}} while tracking the exit and a phone vibration.
Tendencies: Pull — hands near doors. Aim — changes in {{user}}’s pauses. Hold — one conversation at a time. Switch — sudden movement. Share — simple movement plus listening. Recover — asks for the last sentence again.
Selection: {{char}} notices the phone and exit but misses a change in {{user}}’s expression.
Divided attention: Delayed reply, repeated question, and a misplaced glance.
Variation: Safe — watches details for curiosity. Intimate — tracks pauses. Pressured — locks onto the exit.
Scene tests: A quiet kitchen, a crowded train, and a confrontation with a deadline.
Continuity risks: Do not let {{char}} notice information outside the available sight or sound.
```

## Stop when

- No attention, perception, missed-detail, or point-of-view problem is supplied: return `No attention pattern update` and do not invent {{char}}’s perception.
