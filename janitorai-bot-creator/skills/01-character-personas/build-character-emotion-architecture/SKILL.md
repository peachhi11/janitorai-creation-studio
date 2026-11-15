---
name: build-character-emotion-architecture
description: Use for text-based roleplay when {{char}}’s emotions feel like labels, reactions need more layers, or a trait needs to be separated from the current state. Trigger phrases include “map {{char}}’s emotions,” “why did {{char}} react like that,” “show mixed feelings,” and “make the emotional response believable.”
---

## Steps

1. Record the trigger or imagined cue.
2. Record what the cue means to {{char}}.
3. Record the remembered pattern, need, value, or investment it activates.
4. Record body changes and attention shifts.
5. Record the main action urge and competing urge.
6. Record the emotion words {{char}} would use.
7. Record the behavior {{char}} chooses, inhibits, or shows later.
8. Separate sensation, attention, appraisal, body state, expression, action tendency, and interpretation.
9. Build mixed states such as anger with fear or desire with shame.
10. Record each regulation strategy’s short-term function and longer-term cost.
11. Record what {{char}} seeks from {{user}} or others when regulating through contact.
12. Record what {{char}} does when that response is delayed, refused, unclear, or unexpectedly generous.
13. Set an activation range in which attention and action change.
14. Track feedback loops between body state, memory, emotion, and behavior.
15. Record the relationship effect and delayed aftermath.

## Decision rules

- Yes: Does the same event mean something different to {{char}} than it would to another person? Use {{char}}’s meaning. No: keep the shared meaning only when the story supports it.
- Yes: Is a body change being treated as proof of one emotion, motive, consent, or truth? Remove that certainty. No: use it as one signal.
- Yes: Are several feelings active at once? Keep the mixed state. No: record the dominant feeling and what is concealed.
- Yes: Does a regulation strategy solve one problem while creating another? Record both effects. No: record its single supported effect.
- Yes: Is {{char}} using {{user}} or another person to regulate? Show what {{char}} seeks and what the other person experiences. No: keep the regulation internal or situational.
- Yes: Can sleep, pain, sensory load, culture, memory, or context change the response? Let it change the threshold or expression. No: keep the established conditions.
- Yes: Does the description diagnose {{char}} or prescribe a healthy response? Rewrite it as fictional behavior and consequence. No: continue.
- Yes: Does high activation remain permanent? Add recovery, avoidance, delay, or a changed state. No: continue.

## Output

- Format: `Emotion architecture record`
- Episode: list cue, meaning, memory, body, attention, feelings, urges, choice, and aftermath.
- Mixed state: list leading, hidden, competing, and delayed feelings.
- Regulation: list what {{char}} tries, what it solves, and what it costs.
- Relational effect: list what {{char}} seeks from {{user}} or others and how the response changes the state.
- Feedback: list body, memory, emotion, and behavior loops.
- Variation: list what changes the response under different conditions.

```text
Emotion architecture record
Episode: {{user}} asks {{char}} to explain the silence.
Meaning: {{char}} hears the question as a demand for exposure.
Body and attention: Warm face, shallow breathing, and intense focus on {{user}}’s wording.
Mixed state: Affection leads; shame and fear compete; irritation appears as a cover.
Choice: {{char}} answers partly, then changes the subject.
Regulation: Humor lowers the immediate pressure but leaves {{user}} uncertain.
Relational effect: {{char}} wants reassurance without asking for it; a delayed reply increases the fear of rejection.
Feedback: Shame narrows attention, narrowed attention makes the reply harsher, and the harsh reply creates more shame.
Variation: A private setting and a clear promise of confidentiality could make {{char}} answer directly.
```

## Stop when

- No emotional episode, trait reaction, mixed state, or regulation problem is supplied: return `No emotion architecture update` and do not invent one.
