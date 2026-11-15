---
name: character-construction
description: Use for text-based roleplay when {{char}} needs more than a list of traits and their body, history, social world, psychology, motives, abilities, and story role need to work together. Trigger phrases include “build {{char}},” “make this character feel real,” “connect the character’s traits,” and “why does {{char}} act this way?”
---

## Steps

1. Record {{char}}’s body, appearance, health, senses, strengths, and physical limits.
2. Record {{char}}’s culture, class, family, education, work, status, institutions, community, and learned expectations.
3. Record {{char}}’s attention, interpretations, values, defenses, habits, emotional patterns, contradictions, and self-image.
4. Record {{char}}’s needs, goals, hopes, fears, stakes, obstacles, and current idea of what will solve the problem.
5. Record {{char}}’s aptitudes, learned skills, resources, relationships, and setting-specific abilities.
6. Connect each major detail to its cause, meaning, benefit, cost, and possible conflict.
7. Keep each layer separate when the evidence does not connect them.
8. For each active goal, record the goal, deeper need, stakes, obstacles, strategy, and cost.
9. Check whether the goal actually satisfies the deeper need.
10. Use story roles as functions, not personality labels.
11. Check what {{char}} chooses under different kinds of pressure.
12. Check how status, education, region, intimacy, and emotional control shape {{char}}’s voice.
13. Separate established canon, working hypotheses, and facts unknown to {{char}}.
14. Keep {{char}} capable of changing course when pressure, values, information, or consequences change.

## Decision rules

- Yes: Does a detail affect what {{char}} wants, knows, can do, fears, chooses, or risks? Keep it. No: remove it or mark it as background.
- Yes: Does the detail have a cause, meaning, benefit, cost, or conflict? Connect it to the character. No: do not treat it as established characterization.
- Yes: Is a capability changed by context, pressure, information, or resources? Show that change. No: do not make the capability automatic.
- Yes: Does {{char}}’s goal differ from the deeper need? Keep the mismatch and use it to shape choices. No: record how the goal meets the need.
- Yes: Is a role being used to label {{char}}’s personality? Reframe it as a story function. No: keep the role as a function.
- Yes: Could {{char}} choose differently for a stated reason? Record the reason. No: add a pressure, value, information gap, or consequence that explains the fixed choice.
- Yes: Is a fact unknown to {{char}}? Keep it out of {{char}}’s choices and speech. No: allow it to affect behavior only when the character can access it.
- Yes: Do the details prescribe redemption, approval, or a healthy relationship arc? Remove that prescription. No: preserve the selected tone and outcome.

## Output

- Format: `Character construction record`
- Core: summarize the body, social world, psychology, motives, and capabilities.
- Detail links: list each major detail with its cause, meaning, benefit, cost, and conflict.
- Motive pressure: list the active goal, deeper need, stakes, obstacles, strategy, and cost.
- Story function: state {{char}}’s current role without treating it as a personality label.
- Choice patterns: state how {{char}} acts when safe, rushed, ashamed, rewarded, threatened, or misunderstood.
- Voice: state how {{char}}’s background and emotional control affect speech.
- Knowledge: separate canon, hypotheses, and facts unknown to {{char}}.
- Open questions: list details that still need a decision.

```text
Character construction record
Core: {{char}} is physically capable but sensory-sensitive, socially observant, proud, and afraid of becoming dependent.
Detail links: Their sensory limits make crowded spaces harder; their observation skills help them read a room; both create conflict when they hide discomfort.
Motive pressure: Goal — keep control of the situation. Need — feel safe without relying on anyone. Stakes — losing privacy or trust. Obstacles — fatigue and incomplete information. Strategy — plan ahead and deflect questions. Cost — isolation and missed intimacy.
Story function: {{char}} is currently a guarded ally, not a personality type.
Choice patterns: Under pressure, {{char}} delays, gathers information, then chooses a narrow risk.
Voice: {{char}} uses precise wording and understatement when embarrassed.
Knowledge: The sensory history is canon; the fear of dependence is a working hypothesis; {{char}} does not know how {{user}} interprets the deflection.
Open questions: Decide what would make {{char}} ask for help.
```

## Stop when

- No character concept, revision, or behavior question is supplied: return `No character construction update` and do not invent a character.
