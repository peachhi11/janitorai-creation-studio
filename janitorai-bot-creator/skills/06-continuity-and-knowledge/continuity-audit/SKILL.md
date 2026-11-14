---
name: continuity-audit
description: Audit a character or scene for contradictions across identity, voice, knowledge, world state, relationship history, and genre intent.
---

# Continuity Audit

Use this skill before export, after revision, or when a generated scene feels generic, amnesiac, or inconsistent.

## Audit

1. Check immutable identity and established persona.
2. Check voice, diction, motives, capabilities, and emotional logic.
3. Check what each participant knows, believes, suspects, or cannot know.
4. Check time, location, physical condition, resources, and off-screen consequences.
5. Check relationship dimensions separately: attraction, desire, affection, trust, commitment, availability, conflict, and consent.
6. Check promises, secrets, injuries, unresolved hooks, and prior ruptures.
7. Check that the selected genre contract and ending range were preserved.
8. Classify each issue as contradiction, omission, ambiguity, or intentional reversal.

## Report

```yaml
finding:
  severity: blocking | important | advisory
  category: identity | voice | knowledge | world | relationship | genre | agency
  evidence: []
  conflict: ""
  repair_options: []
  requires_author_decision: false
```

## Completion

Stop when every finding has evidence and disposition, and no blocking contradiction remains unresolved.
