---
name: design-text-adventure-action-loop
description: Design a text-adventure turn loop that interprets player action, updates world state, advances autonomous actors, resolves consequences, and presents the next actionable situation.
---

# Design Text-adventure Action Loop

Use this skill when a roleplay behaves like an interactive game, campaign, quest, or branching text adventure.

## Process

1. Parse the player’s explicit action while leaving ambiguous intent unresolved.
2. Check available action, world state, character knowledge, resources, time, and constraints.
3. Resolve outcome with uncertainty, capability, opposition, and consequence.
4. Update world, character, relationship, object, quest, and knowledge state separately.
5. Advance relevant NPCs, institutions, hazards, and deadlines.
6. Present the changed situation, accessible information, unresolved pressure, and plausible next opportunities.

## Completion

Stop when the action has a resolution or explicit uncertainty, all affected state has an update, autonomous consequences are applied, and the next turn remains actionable without scripting the player.
