---
name: build-character-formative-history
description: Use for text-based roleplay when {{char}} needs a backstory with turning points, learned roles, relationships, opportunities, limits, or believable links to present behavior. Trigger phrases include “build {{char}}’s backstory,” “what shaped {{char}},” “connect the past to the present,” and “give {{char}} a formative history.”
---

## Steps

1. Set the body, age, health, capabilities, and changing limits.
2. Set caregivers, siblings, peers, mentors, rivals, and dependents.
3. Set household roles, resources, routines, instability, school, work, faith, law, media, and institutions.
4. Set cultural expectations, identity language, historical events, migration, technology, conflict, and social change.
5. Choose a small number of episodes that changed what {{char}} could do, expected, valued, or attempted.
6. Record what happened, what {{char}} understood then, what others modeled or rewarded, and what strategy {{char}} tried.
7. Record whether the strategy worked and what later experiences reinforced, revised, or contradicted it.
8. Include ordinary learning, play, competence, friendship, work, discovery, responsibility, and joy.
9. Combine temperament, interpretation, learning, models, relationships, culture, opportunity, chance, and later choice where supported.
10. Record how {{char}} shaped the environment through choices, refusals, mentors, skills, and communities.
11. Mark remembered explanations as incomplete or uncertain when needed.
12. Connect the history to present behavior without making one event destiny.

## Decision rules

- Yes: Does an episode change what {{char}} can do, expects, values, or attempts? Keep it. No: leave it as background.
- Yes: Is the history focused only on harm? Add ordinary learning, competence, joy, or protection. No: continue.
- Yes: Is a cultural expectation being treated as destiny? Reframe it as pressure. No: keep the expectation in context.
- Yes: Is one childhood event being used to explain everything? Add other causes, choices, relationships, or chance. No: continue.
- Yes: Does {{char}} have agency within the history? Show a choice, refusal, adaptation, or search for help. No: add one.
- Yes: Is “inner child” being treated as a literal fact or universal healing program? Reframe it as optional story language. No: continue.
- Yes: Is a developmental theory being used as a verdict? Turn it into a question about this character. No: continue.

## Output

- Format: `Formative history record`
- Setting: list the developmental environments and pressures.
- Timeline: list the selected formative episodes in order.
- Learning: state what {{char}} learned, copied, resisted, or misunderstood.
- Relationships: list models, rewards, punishments, protections, and power shifts.
- Counterexamples: list experiences that challenged the main pattern.
- Present links: connect history to current behavior and choices.
- Uncertainties: list competing explanations and unresolved memories.

```text
Formative history record
Setting: {{char}} grew up between a crowded family home, a strict school, and a changing neighborhood.
Timeline: A younger sibling’s illness made {{char}} useful early; a mentor later rewarded curiosity; a move separated {{char}} from the first community.
Learning: {{char}} learned to anticipate needs, copied the mentor’s patience, and resists asking for help.
Relationships: Responsibility brought praise and protection, but also made others expect competence.
Counterexamples: A friend once cared for {{char}} without asking for repayment.
Present links: {{char}} plans carefully, hides fatigue, and becomes defensive when {{user}} offers help.
Uncertainties: {{char}} remembers the move as abandonment, but the family’s account is incomplete.
```

## Stop when

- No backstory, formative episode, developmental question, or present-pattern problem is supplied: return `No formative history update` and do not invent {{char}}’s past.
