---
name: design-tool-using-agent-loop
description: Design a bounded agent loop that decides when to retrieve, read, update state, call a tool, or answer without creating uncontrolled recursion.
---

# Design Tool-Using Agent Loop

Use this skill when a Studio capability needs retrieval, persistence, validation, rendering, or another tool call during one task.

## Process

1. Define the user goal, available tools, input schema, authority, and stop condition.
2. Decide whether the next action is answer, retrieve, inspect, mutate, validate, or ask for a required decision.
3. Call only the smallest tool that can resolve the current uncertainty.
4. Store observations separately from canon and working memory.
5. Reassess after each tool result; cap iterations, depth, tokens, and mutation count.
6. Return the result, evidence, mutations, unresolved questions, and completion status.

## Completion

Stop when the goal is satisfied with evidence, the iteration and context budgets remain within bounds, and no unreviewed mutation or pending tool result remains.
