---
name: design-story-useful-geography
description: Use when designing fictional geography, routes, borders, settlements, terrain, resources, weather, or distance that should change scenes and choices. Trigger phrases include “make the map matter,” “design useful geography,” and “what does this route cost?”
---

## Steps

1. Define the story’s current routes, destinations, barriers, resources, hazards, seasons, and travel scale.
2. Map who controls access, who maintains infrastructure, who profits, and who bears travel cost or danger.
3. Connect terrain and climate to food, work, shelter, trade, migration, conflict, communication, and belief.
4. Give places distinct ordinary uses, local knowledge, names, memories, and social expectations.
5. Trace a route through time, effort, supplies, visibility, weather, witnesses, alternatives, and consequences.
6. Mark what {{char}}, {{user}}, locals, travellers, and authorities know or misread.
7. Let geography change relationships, opportunities, status, risk, and later scenes.
8. Keep unknown regions and contested maps when they create useful uncertainty.
9. Keep {{user}}’s destination, fear, attachment, and action open.

## Decision rules

- Yes: Is geography decorative and disconnected from movement or resources? Add a concrete constraint or opportunity. No: continue.
- Yes: Are travel times, supplies, weather, or barriers inconsistent? Recalculate the route. No: continue.
- Yes: Does one map represent every group’s knowledge? Add local, official, and contested versions. No: continue.
- Yes: Does the draft decide {{user}}’s travel choice? Remove that decision. No: continue.

## Output

- Format: `Story-useful geography map`
- Place: list terrain, climate, settlement, resources, barriers, and control.
- Route: list distance, time, supplies, hazards, witnesses, alternatives, and cost.
- Social use: list work, trade, migration, conflict, belief, and access effects.
- Knowledge: separate maps, local knowledge, rumours, and unknowns.
- Open route: list choices available to {{user}}.

## Stop when

- No geographic, route, settlement, or travel problem is supplied: return `No geography update` and do not invent {{user}}’s destination.
