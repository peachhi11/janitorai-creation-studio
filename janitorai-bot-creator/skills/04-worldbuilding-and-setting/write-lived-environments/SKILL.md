---
name: write-lived-environments
description: Use when turning fictional geographic or ecological notes into character-filtered scenes with sensory detail, movement, work, danger, weather, and habit. Trigger phrases include “make the setting feel lived in,” “show the environment through {{char}},” and “stop the scenery dump.”
---

## Steps

1. Choose the environment’s immediate job: orient movement, block a route, change risk, provide a resource, reveal work, or record change.
2. Filter the place through the viewpoint character’s work, upbringing, body, clothing, load, injury, memory, fear, and purpose.
3. Choose a few connected details from sight, sound, smell, touch, temperature, balance, effort, and taste.
4. Connect sensation to action, judgement, route, relationship, or expectation.
5. Show residents adapting through work, storage, repair, clothing, tools, timing, routes, warnings, and local knowledge.
6. Add information as the character moves, waits, searches, works, rests, fights, or talks.
7. Track marks left by action: scent, noise, tracks, smoke, waste, damage, spent supplies, displaced animals, or changed access.
8. Give explanation a motive and let local characters speak from practical knowledge rather than lecture.
9. Keep {{user}}’s fear, awe, disgust, attachment, and action open.

## Decision rules

- Yes: Is description decorative or disconnected from action? Cut it or give it a job. No: continue.
- Yes: Are locals ignorant only so {{user}} can discover ordinary conditions? Add local competence. No: continue.
- Yes: Is urgent action interrupted by an ecology lecture? Move the explanation into action or dialogue. No: continue.
- Yes: Does the setting dictate {{user}}’s emotion or choice? Remove that decision. No: continue.

## Output

- Format: `Lived environment scene`
- Job: state what the setting changes in the scene.
- Viewpoint: list what the character notices, knows, ignores, and misreads.
- Scene: write sensory evidence, movement, routine, work, danger, and interaction.
- Consequences: list environmental traces, changed access, and continuity facts.
- Player space: list visible facts without choosing {{user}}’s response.

## Stop when

- No environment, place, weather, or ecological scene is supplied: return `No lived-environment update` and do not invent {{user}}’s response.
