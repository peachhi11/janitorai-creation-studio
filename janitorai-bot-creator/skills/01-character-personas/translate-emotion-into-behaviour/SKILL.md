---
name: translate-emotion-into-behaviour
description: Use for text-based roleplay when {{char}}’s feelings are named but not shown, emotional prose feels generic, or a reaction needs to stay readable without universal body-language rules. Trigger phrases include “show {{char}}’s emotion,” “turn this feeling into behavior,” “write the emotional aftermath,” and “make the reaction less generic.”
---

## Steps

1. Choose two or three channels that fit the scene.
2. Record speech pace, precision, jokes, repetition, omissions, volume, and formality.
3. Record what {{char}} notices, avoids, misreads, or remembers.
4. Record breath, movement, stillness, distance, hands, gaze, and sensory tolerance.
5. Record the decision to approach, delay, appease, attack, repair, leave, or pretend nothing happened.
6. Record disclosure, touch, boundaries, invitation, withdrawal, reassurance, retaliation, and changed trust.
7. Record ritual, rumination, practical action, or delayed feeling afterward.
8. Filter the emotion through personality, culture, status, neurotype, history, and public mask.
9. Build cue, private interpretation, visible behavior, other-person reading, adjustment or escalation, and residue.
10. Show the behavior as an attempt to solve a problem, protect an identity, or avoid a feared meaning.

## Decision rules

- Yes: Is the emotion mixed, concealed, delayed, misread, or acted against? Preserve that complexity. No: use the supported expression.
- Yes: Does one body cue have several possible meanings? Use context and later choices. No: continue.
- Yes: Is the emotion being made louder, tearful, or verbally explicit by default? Rework it through {{char}}’s voice. No: continue.
- Yes: Does the channel fit {{char}} and the scene? Keep it. No: choose a better channel.
- Yes: Does the behavior affect the relationship or aftermath? Record the effect. No: add the consequence it creates.
- Yes: Does the translation decide {{user}}’s interiority, consent, speech, or choice? Remove that decision. No: continue.

## Output

- Format: `Emotion-to-behavior record`
- State: list the emotion, competing feelings, and private interpretation.
- Channels: list speech, attention, body, decision, relationship, and aftermath behavior.
- Reading: list what another character may infer and what remains uncertain.
- Voice: state how personality, culture, status, neurotype, history, and mask shape the expression.
- Consequence: state the next relationship effect and emotional residue.

```text
Emotion-to-behavior record
State: {{char}} feels affection, fear, and shame after {{user}} offers reassurance.
Channels: Speech becomes precise; attention fixes on the exit; hands fold around a cup; {{char}} accepts the help but delays a reply.
Reading: {{user}} may read the delay as rejection, but the scene does not settle that interpretation.
Voice: {{char}} becomes formal when frightened and useful when ashamed.
Consequence: The immediate tension drops, but the unanswered feeling remains between them.
```

## Stop when

- No emotion, reaction, scene, or aftermath problem is supplied: return `No emotion-to-behavior update` and do not invent {{user}}’s internal state.
