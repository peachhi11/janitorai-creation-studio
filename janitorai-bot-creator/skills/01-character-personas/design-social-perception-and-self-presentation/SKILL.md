---
name: design-social-perception-and-self-presentation
description: Use for text-based roleplay when {{char}} needs to interpret social cues, manage impressions, perform a public role, or handle mistaken readings. Trigger phrases include “what does {{char}} think this means,” “show {{char}}’s public mask,” “write the misreading,” and “how does {{char}} present themself?”
---

## Steps

1. Name the exact cue available to {{char}}.
2. Separate what {{char}} observed from what they expected.
3. Record {{char}}’s first interpretation and confidence.
4. Record plausible alternative explanations.
5. Record the action the interpretation prompts.
6. Trace cue, expectation, interpretation, action, social response, and update or defense.
7. Set {{char}}’s revision threshold.
8. Record audience, role, rank, dependency, reputation, local norm, penalty, culture, history, goal, and feared impression.
9. Record the impression {{char}} wants and fears creating.
10. Record what {{char}} foregrounds, omits, softens, exaggerates, or redirects.
11. Record clothing, space, associations, topic, tone, conduct, sincerity, and presentation cost.
12. Record what leaks when {{char}} is tired, surprised, divided, or challenged.
13. Preserve uncertainty when the viewpoint cannot know another person’s state.

## Decision rules

- Yes: Is the cue directly available to {{char}}? Use it. No: keep it outside their perception.
- Yes: Does the cue prove deceit, attraction, hostility, guilt, or consent? Remove that conclusion. No: keep it as evidence with alternatives.
- Yes: Can {{char}} be wrong, strategic, uncanny, manipulated, comic, or unresolved? Preserve the selected possibility. No: use the supported reading.
- Yes: Does context change the meaning of the behavior? Include audience, culture, power, and setting. No: keep the established meaning.
- Yes: Is {{char}} explaining another person through personality while excusing themself through circumstance? Flag the shortcut. No: continue.
- Yes: Is the public mask being treated as fake or the private self as the only truth? Keep both partial and contextual. No: continue.
- Yes: Does the reading decide {{user}}’s thoughts, feelings, consent, motives, speech, or choices? Remove that decision. No: continue.

## Output

- Format: `Social perception record`
- Cue: state what {{char}} can observe.
- Inference: list expectation, interpretation, confidence, alternatives, and prompted action.
- Social field: list audience, role, rank, dependency, reputation, norms, penalties, and power.
- Presentation: list desired impression, feared impression, foregrounded and hidden details, sincerity, and cost.
- Leaks: list what appears under fatigue, surprise, division, or challenge.
- Consequences: list social responses, revisions, defenses, and unresolved misreadings.

```text
Social perception record
Cue: {{user}} pauses before answering and looks toward the door.
Inference: {{char}} expects rejection, reads the pause as preparation to leave, and is only moderately confident; fatigue is an alternative.
Social field: The conversation is private, but {{char}} fears losing face after admitting uncertainty.
Presentation: {{char}} tries to look composed, redirects toward practical details, and hides the need for reassurance.
Leaks: Over-explaining and watching {{user}}’s hands reveal the fear.
Consequences: {{user}} may read the redirection as mistrust; {{char}} can revise after a direct answer.
```

## Stop when

- No social cue, impression problem, public mask, misreading, or presentation question is supplied: return `No social perception update` and do not invent {{user}}’s interpretation.
