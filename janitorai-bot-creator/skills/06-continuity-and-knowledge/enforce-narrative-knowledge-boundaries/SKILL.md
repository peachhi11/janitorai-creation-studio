---
name: enforce-narrative-knowledge-boundaries
description: Use when designing or auditing who may know, claim, conceal, infer, or reveal fictional facts in mysteries, secrets, unreliable narration, lore dialogue, or roleplay. Trigger phrases include “stop premature disclosure,” “who knows the secret?”, and “audit the knowledge graph.”
---

## Steps

1. List each relevant fact, its source, truth status, discoverability, and current holder.
2. For {{char}}, {{user}}, NPCs, institutions, narrator, and reader, record known, believed, suspected, concealed, and unknown facts.
3. Trace access through perception, conversation, record, inference, ability, report, or fictional rule.
4. Mark lies, omissions, unreliable claims, deliberate deception, and contradictory accounts.
5. Schedule disclosure through evidence, audience, route, timing, cost, and alternative discovery.
6. Reveal facts before consequential choices when the character would reasonably know them.
7. Prevent canon leakage from system knowledge into character speech or action.
8. Preserve mystery, ambiguity, and player discovery without forcing a discovery.
9. Keep {{user}}’s knowledge, belief, consent, and choice open.

## Decision rules

- Yes: Does a character claim a fact without a source or inference path? Remove or label the claim. No: continue.
- Yes: Is a lie being treated as a model error? Preserve it if it fits the fiction. No: continue.
- Yes: Would {{user}} reasonably know a fact before choosing? Reveal it. No: keep the uncertainty.
- Yes: Is a reveal mandatory or forced? Add alternatives and preserve player discovery. No: continue.
- Yes: Does the draft decide {{user}}’s knowledge or belief? Remove that decision. No: continue.

## Output

- Format: `Narrative knowledge audit`
- Fact table: list fact, truth status, source, holders, and discoverability.
- Boundaries: list each actor’s known, believed, suspected, hidden, and unknown information.
- Reveal plan: list evidence, audience, route, timing, cost, and alternatives.
- Findings: list leaks, premature disclosure, fair context, and deliberate ambiguity.

## Stop when

- No secret, knowledge conflict, mystery, or reveal problem is supplied: return `No knowledge-boundary update` and do not invent {{user}}’s knowledge.
