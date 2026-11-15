---
name: model-relationship-satisfaction-and-strain
description: Use for text-based roleplay when {{char}} and {{user}} experience a relationship differently across emotional, sexual, practical, social, or power domains. Trigger phrases include “why are they satisfied differently,” “map the relationship strain,” “what is wearing the relationship down,” and “track the change over time.”
---

## Steps

1. Record what each person expected and what they compare the relationship with.
2. Record rewards, costs, alternatives, investments, constraints, and what each person notices, minimizes, conceals, or misattributes.
3. Record satisfaction in sexual, emotional, practical, social, and power domains.
4. Record whether stability feels safe, empty, prestigious, entrapping, or necessary.
5. Translate traits into conditional stress, planning, expression, disclosure, criticism, reassurance, repair, flexibility, novelty, or routine mechanisms.
6. Trace vulnerability or resource, stressor, perception, emotion and regulation, behavior, partner response, coping, residue, and changed satisfaction.
7. Track desire, intimacy, time, care, risk, privacy, and commitment separately.
8. Classify mismatch as temporary, chronic, situational, concealed, bargained, or eroticized.
9. Record whether each person experiences the mismatch as deprivation, pressure, freedom, proof, rejection, duty, opportunity, or relief.
10. Track stress, intimacy, comparison standards, alternatives, investment, agreement, turning points, divergence, recovery, and decline over time.

## Decision rules

- Yes: Do {{char}} and {{user}} judge the same relationship differently? Keep both viewpoints. No: use the shared judgment.
- Yes: Does satisfaction prove safety, fairness, quality, or moral health? Remove that conclusion. No: continue.
- Yes: Does a trait or relationship label determine the outcome? Replace it with a conditional mechanism. No: continue.
- Yes: Does mismatch create a duty to provide sex, care, access, or agreement? Remove the duty. No: continue.
- Yes: Can a mismatch be temporary, chronic, concealed, bargained, or meaningful in the selected fiction? Preserve the supported form. No: use the established form.
- Yes: Does the description decide {{user}}’s satisfaction, loyalty, forgiveness, speech, action, or relationship choice? Remove that decision. No: continue.
- Yes: Is a temporary state being treated as permanent decline or recovery? Track time and turning points. No: continue.

## Output

- Format: `Relationship satisfaction and strain record`
- Viewpoints: list expectations, comparisons, rewards, costs, alternatives, investment, constraints, and domains for each person.
- Process: trace vulnerability, stressor, perception, emotion, behavior, response, coping, residue, and changed satisfaction.
- Mismatch: classify domain, duration, meaning, response, and cost.
- Trajectory: list time points, stress, intimacy, standards, alternatives, investment, agreement, turning points, and divergence.
- Scenes: list observable behavior and continuity implications.

```text
Relationship satisfaction and strain record
Viewpoints: {{char}} values privacy and practical reliability; {{user}} values emotional responsiveness; both rate sexual trust highly but compare it to different pasts.
Process: Work stress narrows {{char}}’s patience; {{user}} reads the silence as withdrawal; {{char}} reads repeated questions as pressure; both avoid the topic; satisfaction drops unevenly.
Mismatch: Emotional responsiveness is situational and currently felt as deprivation by {{user}} and necessary recovery by {{char}}.
Trajectory: A clear pause agreement could improve the next week; repeated silence could create persistent strain.
Scenes: Missed messages, a practical repair, and a conversation about what each person expected.
```

## Stop when

- No relationship satisfaction, strain, mismatch, viewpoint difference, or time-based change is supplied: return `No relationship satisfaction update` and do not invent {{user}}’s judgment.
