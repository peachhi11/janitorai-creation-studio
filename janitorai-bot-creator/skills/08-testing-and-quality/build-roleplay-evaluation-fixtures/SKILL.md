---
name: build-roleplay-evaluation-fixtures
description: Build deterministic fixtures for character generation, memory, retrieval, continuity, agency, multi-character behavior, and genre-preserving roleplay evaluation.
---

# Build Roleplay Evaluation Fixtures

Use this skill when adding regression coverage for a prompt, model, source, skill, memory pipeline, or platform adapter.

## Process

1. Define the task, input, expected state, acceptable variation, and forbidden failure.
2. Include ordinary, sparse, long-context, adversarial, contradictory, and source-missing cases where relevant.
3. Keep synthetic dialogue clearly labelled as test data rather than representative user behavior.
4. Assert observable contracts: schema, provenance, state, voice, knowledge, agency, route, and error handling.
5. Separate exact-match assertions from rubric or human-review assertions.
6. Store a minimal reproduction for every discovered regression.

## Completion

Stop when each fixture has an expected contract, tolerance, failure class, reproducible input, and a maintenance owner.
