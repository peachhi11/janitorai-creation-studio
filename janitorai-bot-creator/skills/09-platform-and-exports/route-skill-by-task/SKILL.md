---
name: route-skill-by-task
description: Select the smallest set of Creation Studio skills for a requested task by matching task branches, authority, scope, and completion needs.
---

# Route Skill by Task

Use this skill when a request could invoke several character, relationship, world, continuity, research, evaluation, or export modules.

## Process

1. State the requested outcome and the task’s distinct branches.
2. Select one primary skill for the user’s main action.
3. Add only supporting skills whose outputs are required by that action.
4. Resolve overlap by authority, phase, and source of truth rather than loading every related module.
5. State the invocation order and each skill’s completion handoff.
6. Defer unrelated reference material until its branch fires.

## Completion

Stop when every selected skill has a distinct reason to run, every required branch has coverage, and no unnecessary skill adds competing instructions or context load.
