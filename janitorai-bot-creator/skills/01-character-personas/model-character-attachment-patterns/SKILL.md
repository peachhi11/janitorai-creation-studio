---
name: model-character-attachment-patterns
description: Use for text-based roleplay when closeness, distance, reassurance, trust, dependence, intimacy, or separation need a believable pattern for {{char}}. Trigger phrases include “how does {{char}} attach,” “why does {{char}} pull away,” “show {{char}}’s fear of closeness,” and “map the relationship pattern.”
---

## Steps

1. Record the closeness {{char}} wants.
2. Record the consequence {{char}} fears.
3. Record {{char}}’s working beliefs about self, others, and dependence.
4. Record the cue that activates the pattern.
5. Record the first body response and attention shift.
6. Record the strategy, such as approach, protest, testing, appeasement, disclosure, minimization, distraction, withdrawal, attack, or repair.
7. Record the short-term payoff and long-term cost.
8. Record what {{char}} knows about the pattern and what they misread.
9. Record exceptions involving safe people, different stakes, settings, exhaustion, or genuine incompatibility.
10. Show how stress, pain, sleep, reminders, caregiving, culture, and {{user}}’s responses change the pattern.
11. Translate the pattern into initiation, response time, disclosure, requests, boundaries, conflict, touch, intimacy, repair, and aftermath.
12. Keep the pattern capable of choice, concealment, tenderness, contradiction, and change.

## Decision rules

- Yes: Is attachment language being used as a fixed diagnosis or type? Reframe it as a provisional lens. No: continue.
- Yes: Does {{char}}’s pattern change with context or relationship? Show the change. No: keep the supported pattern.
- Yes: Does one cue prove a style? Add history, trigger, strategy, consequence, and exceptions. No: continue.
- Yes: Can a delayed reply mean self-protection, punishment, overload, or ordinary busyness? Preserve the supported possibilities. No: use the established meaning.
- Yes: Is a boundary being labeled abandonment without evidence? Keep the character’s interpretation separate from fact. No: continue.
- Yes: Does the pattern force secure behavior, reconciliation, or a healthy ending? Remove the force. No: preserve the selected dynamic.
- Yes: Does the description decide {{user}}’s feelings, consent, motives, speech, or choices? Remove that decision. No: continue.

## Output

- Format: `Attachment pattern record`
- Need: state desired closeness and feared consequence.
- Beliefs: list working beliefs about self, others, dependence, and safety.
- Trigger: identify the cue and first body or attention response.
- Strategy: list observable approach, protest, testing, appeasement, disclosure, withdrawal, attack, or repair.
- Payoff and cost: state what the strategy gives now and costs later.
- Exceptions: list safe people, settings, stakes, exhaustion, incompatibility, and change pressure.
- Relationship effect: state how the pattern affects {{user}} and what {{char}} misreads.

```text
Attachment pattern record
Need: {{char}} wants dependable closeness but fears becoming controlled or abandoned.
Beliefs: Asking directly risks rejection; usefulness may secure connection.
Trigger: {{user}} delays a reply; {{char}} checks the phone and imagines withdrawal.
Strategy: Sends a practical question instead of asking for reassurance, then withdraws if the answer is brief.
Payoff and cost: Control returns briefly; {{user}} receives less information and trust weakens.
Exceptions: In private after rest, {{char}} can name the fear; genuine incompatibility makes withdrawal protective rather than avoidant.
Relationship effect: {{user}} may read the practical question as distance; {{char}} misreads ordinary busyness as abandonment.
```

## Stop when

- No closeness, distance, reassurance, trust, dependence, intimacy, separation, or relationship-pattern problem is supplied: return `No attachment pattern update` and do not invent {{char}}’s pattern.
