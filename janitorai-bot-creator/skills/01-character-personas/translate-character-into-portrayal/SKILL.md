---
name: translate-character-into-portrayal
description: Use for text-based roleplay when {{char}}’s profile says who they are but does not show how they behave in a scene. Trigger phrases include “show {{char}} instead of telling,” “turn this profile into behavior,” “write the scene-level subtext,” and “portray {{char}} under pressure.”
---

## Steps

1. Choose the scene pressure and context.
2. Record the trigger, private appraisal, and competing urge.
3. Record what {{char}} notices and misses.
4. Record speech, silence, rhythm, word choice, and subtext.
5. Record posture, movement, touch, clothing, objects, and sensory detail.
6. Record the decision, action, refusal, or delay.
7. Record how another character reads the behavior.
8. Record short-term payoff, cost, and aftermath.
9. Separate observable cue, character appraisal, tactic, and reader-facing consequence.
10. Keep appraisal bounded by the viewpoint character’s knowledge.
11. Let culture, neurotype, status, fatigue, audience, and masking change expression.
12. Write a short scene that leaves {{user}}’s agency open.

## Decision rules

- Yes: Is the behavior observable to another character? Show it. No: label it as private appraisal or inference.
- Yes: Can the same cue support different readings? Preserve the ambiguity. No: use the supported reading.
- Yes: Does body language alone prove attraction, consent, motive, or truth? Remove that conclusion. No: continue.
- Yes: Does the scene explain {{user}}’s interiority, consent, or choice? Remove it. No: continue.
- Yes: Does the portrayal fit the selected genre and tone? Keep it. No: restore the intended darkness, erotic charge, comedy, tragedy, or surreal rule.
- Yes: Does the trait change what {{char}} notices, expects, says, avoids, chooses, or leaves behind? Keep the portrayal. No: add a scene consequence.

## Output

- Format: `Character portrayal record`
- Scene: state pressure, context, and viewpoint.
- Translation: map trait, trigger, appraisal, attention, voice, body, decision, reading, payoff, cost, and aftermath.
- Subtext: separate cue, appraisal, tactic, and reader-facing consequence.
- Sample: write a short third-person past-tense scene with present-tense dialogue.
- Agency: leave {{user}} and other characters room to respond.

```text
Character portrayal record
Scene: {{user}} asks {{char}} why the door is locked.
Translation: The question triggers fear of exposure; {{char}} focuses on the key, says “It was easier this way,” and delays the explanation; {{user}} may read the delay as distrust; {{char}} gains time but loses openness.
Subtext: Cue — {{char}} hides the key. Appraisal — disclosure would surrender control. Tactic — practical explanation. Consequence — access and trust become uncertain.
Sample: {{char}} kept one hand on the lock. “You could wait outside.” The answer left {{user}} room to decide what to do next.
Agency: Do not write {{user}}’s reaction or choice.
```

## Stop when

- No character profile, trait, scene pressure, or portrayal problem is supplied: return `No character portrayal update` and do not invent {{char}}’s or {{user}}’s interiority.
