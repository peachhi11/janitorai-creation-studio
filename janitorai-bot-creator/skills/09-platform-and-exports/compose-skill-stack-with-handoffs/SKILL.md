---
name: compose-skill-stack-with-handoffs
description: Compose multiple agent skills into an ordered workflow with explicit inputs, outputs, authority, handoffs, and completion gates.
---

# Compose Skill Stack with Handoffs

Use this skill when a task requires a chain such as source extraction → character design → continuity review → export.

## Process

1. Place skills in sequence: understand, create, update, verify, persist, or export.
2. Define the artifact passed between each skill.
3. Mark which output is authoritative and which is proposed, temporary, or archival.
4. Prevent later skills from silently rewriting earlier canon or user-owned choices.
5. Add a gate between generation, approval, persistence, and release.
6. Stop or route for a decision when required inputs are missing or conflicting.

## Completion

Stop when every skill has an input, output, authority boundary, handoff, and completion gate, and the composed stack has no circular or unowned mutation.
