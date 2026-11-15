---
name: design-character-communication-patterns
description: Use for text-based roleplay when {{char}} sounds interchangeable, says feelings too directly, or needs a distinct pattern across speech, silence, listening, disclosure, humor, subtext, or messages. Trigger phrases include “give {{char}} a communication style,” “make the dialogue sound like {{char}},” “show what {{char}} won’t say,” and “write the subtext.”
---

## Steps

1. Choose {{char}}’s preferred channels, such as direct speech, questions, stories, jokes, practical acts, text, touch, silence, or notes.
2. Record what {{char}} notices and ignores.
3. Record sentence length, rhythm, vocabulary, interruptions, hedging, certainty, and repair language.
4. Record what {{char}} discloses freely, protects, performs, or reveals under pressure.
5. Record how {{char}} listens, misunderstands, accommodates, mirrors, resists, or changes register.
6. Record what {{char}} asks for directly and what they make {{user}} infer.
7. Define public, private, conflict, flirtation, and aftermath voices.
8. Separate spoken words, private aim, feared implication, and listener interpretation.
9. Connect voice to identity, culture, power, setting, and history.
10. Track register, address, code-switching, translation work, status, audience, and the cost of misunderstanding.
11. Leave {{user}} room to respond.

## Decision rules

- Yes: Does the channel fit {{char}}’s audience, history, power, and purpose? Keep it. No: choose a supported channel.
- Yes: Can the spoken line, private aim, feared implication, and listener interpretation differ? Preserve the gap. No: keep them aligned only when the scene supports it.
- Yes: Does the gesture or tone have one fixed meaning? Add context. No: continue.
- Yes: Are “I-statements,” eye contact, mirroring, or calm tone being treated as proof of health or sincerity? Remove that assumption. No: continue.
- Yes: Is {{char}} being made to sound like a therapist, communication guide, or universal dictionary? Rewrite in {{char}}’s own voice. No: continue.
- Yes: Does the line decide {{user}}’s thoughts, feelings, consent, speech, or choice? Remove that decision. No: leave room to respond.
- Yes: Is misunderstanding reciprocal, strategic, affectionate, cruel, or unresolved by design? Preserve it. No: record the supported repair.

## Output

- Format: `Communication pattern record`
- Channels: list preferred channels and when {{char}} uses them.
- Voice: list rhythm, vocabulary, interruption, certainty, register, and repair style.
- Disclosure: list what {{char}} says freely, protects, performs, or reveals under pressure.
- Listening: list what {{char}} notices, misses, misunderstands, accommodates, or resists.
- Subtext: list spoken line, private aim, feared implication, and listener interpretation.
- Failure mode: list how communication breaks down and what it costs.
- Sample: write a short exchange that leaves {{user}} room to respond.

```text
Communication pattern record
Channels: {{char}} uses practical help when asking directly feels risky; texts are brief; silence lasts longer after conflict.
Voice: Precise vocabulary, clipped rhythm, softening jokes, and formal wording when afraid.
Disclosure: {{char}} offers facts freely but hides need and asks questions instead of making requests.
Listening: Notices changes in {{user}}’s timing but misses indirect reassurance.
Subtext: “You could stay, if the weather is inconvenient” means “I want you to come back”; {{char}} fears {{user}} will hear dependence.
Failure mode: A joke lands as dismissal, so {{user}} withdraws and {{char}} interprets the silence as rejection.
Sample: {{char}}: “You could stay, if the weather is inconvenient.” {{user}} has room to answer.
```

## Stop when

- No dialogue, voice, disclosure, listening, subtext, or communication problem is supplied: return `No communication pattern update` and do not write {{user}}’s response.
