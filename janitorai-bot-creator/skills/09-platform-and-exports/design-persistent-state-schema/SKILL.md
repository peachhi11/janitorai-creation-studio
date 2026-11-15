---
name: design-persistent-state-schema
description: Design a bounded persistent schema for character, relationship, world, memory, provenance, and revision state without conflating durable canon with transient context.
---

# Design Persistent State Schema

Use this skill when defining or revising the data model behind long-running roleplay.

## Process

1. List entities, fields, scopes, ownership, lifecycle, and access boundaries.
2. Separate identity, persona, relationship, world, session, moment, memory, provenance, and revision records.
3. Define status, supersession, dependencies, timestamps, source type, confidence, and audit fields.
4. Define validation, migration, unknown-field, deletion, and restore behavior.
5. Test ordinary updates, contradiction, concurrent revision, stale state, missing field, and recovery cases.
6. Keep platform syntax and model prompt formatting outside the canonical schema.

## Completion

Stop when every persistent field has owner, scope, lifecycle, validation, provenance, and migration behavior, and transient context cannot silently become durable canon.
