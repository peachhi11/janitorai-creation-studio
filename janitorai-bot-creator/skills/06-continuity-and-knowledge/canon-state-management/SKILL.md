---
name: canon-state-management
description: Commit, supersede, and audit character, relationship, and world state when a roleplay event changes continuity.
---

# Canon State Management

Use this skill when a scene introduces, changes, contradicts, or retires a fact, belief, secret, promise, injury, relationship state, or world condition.

## Process

1. Classify each candidate state item as `identity`, `persona`, `campaign`, `session`, or `moment` scope.
2. Record whether it is explicit, inferred, retrieved, or derived.
3. Compare it with active state at the same scope.
4. Apply precedence: later explicit state supersedes earlier explicit state; standing rules outrank isolated instances; inference never silently overwrites explicit canon.
5. Recompute dependent values and retain superseded values for audit.
6. Return confirmed changes, unresolved conflicts, and proposed changes separately.

## State unit

```yaml
id: ""
content: ""
type: fact | belief | promise | secret | injury | relationship | world | preference
scope: identity | persona | campaign | session | moment
priority: hard | soft
source_type: explicit_user | explicit_character | inferred | retrieved | derived
status: active | closed | superseded | needs_recheck
supersedes: []
depends_on: []
coupled_with: []
provenance: []
```

## Completion

Stop only when every changed item has scope, source type, status, conflict result, and provenance, and every dependent value has either been recomputed or marked `needs_recheck`.
