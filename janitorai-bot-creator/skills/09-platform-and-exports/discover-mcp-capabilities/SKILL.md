---
name: discover-mcp-capabilities
description: Inspect available Creation Studio tools, schemas, and read/write behavior before selecting a capability or composing a workflow.
---

# Discover MCP Capabilities

Use this skill when a client, agent, or workflow needs to determine which Studio operation can perform a task.

## Process

1. Enumerate available tools and group them by retrieval, generation, persistence, revision, visual editing, evaluation, and export.
2. Read each candidate’s input, output, authority, mutation, error, and provenance contract.
3. Select the narrowest capability that satisfies the task.
4. Check whether the operation is read-only, reversible, author-gated, or externally visible.
5. Compose calls through the application seam and preserve the public tool name and payload intent.
6. Report unavailable capabilities instead of fabricating tool results.

## Completion

Stop when the selected tool has a validated input, known mutation behavior, expected result shape, error path, and sufficient authority for the requested action.
