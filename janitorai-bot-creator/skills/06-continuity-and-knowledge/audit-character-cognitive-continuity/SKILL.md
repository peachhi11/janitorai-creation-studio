---
name: audit-character-cognitive-continuity
description: Use when auditing fictional character perception, attention, memory, inference, knowledge, or claims across scenes and roleplay turns. Trigger phrases include “could {{char}} know this?”, “check the memory continuity,” and “separate inference from observation.”
---

## Steps

1. List what {{char}} could perceive, attend to, remember, infer, forget, misunderstand, and claim at each point.
2. Trace each fact to an observation, conversation, record, ability, memory, rumour, or fictional rule.
3. Separate direct observation, inference, belief, report, narrator fact, and player knowledge.
4. Check whether attention, memory, cognitive style, and behaviour changed without a stated cause.
5. Mark deliberate unreliability, deception, supernatural access, amnesia, or contradiction as explicit story conditions.
6. Identify premature secrets, impossible details, convenient forgetting, and unsupported certainty.
7. Repair the sequence by adding access, uncertainty, a cause, a correction, or an open question.
8. Keep {{user}}’s knowledge, memory, interiority, and response open.

## Decision rules

- Yes: Is knowledge unsupported by access or a stated fictional rule? Remove it or mark it as inference. No: continue.
- Yes: Is deliberate unreliability being erased as an error? Preserve it and label the layer. No: continue.
- Yes: Is a character being diagnosed from a continuity issue? Describe the observable pattern instead. No: continue.
- Yes: Does the audit decide {{user}}’s memory or knowledge? Remove that decision. No: continue.

## Output

- Format: `Cognitive continuity audit`
- Timeline: list scene, observation, memory, inference, belief, and claim.
- Findings: list supported access, gaps, leaks, contradictions, and intentional uncertainty.
- Repairs: list added evidence, limits, causes, corrections, or open questions.
- Player boundary: list what remains unknown to {{user}}.

## Stop when

- No cognitive continuity question or scene sequence is supplied: return `No cognitive-continuity update` and do not invent {{user}}’s knowledge.
