---
name: manage-prompt-cache-and-context
description: Separate stable instructions from dynamic character state and research context so caching reduces cost without serving stale canon.
---

# Manage Prompt Cache and Context

Use this skill when designing long-context prompts, caching system instructions, or optimizing repeated Studio generation.

## Process

1. Partition the request into stable policy, character canon, current state, retrieved evidence, recent history, and user input.
2. Cache only stable material whose invalidation conditions are explicit.
3. Keep relationship state, secrets, permissions, and author decisions in dynamic segments.
4. Assign a version or digest to each cached segment.
5. Invalidate when the source, prompt preset, canon, platform contract, or policy changes.
6. Inspect the final assembled request for stale segments, truncation, ordering, and missing state.

## Completion

Stop when every cached segment has an owner and invalidation rule, dynamic state cannot be served from stale cache, and a normal, revised, long-context, and conflict case has been checked.
