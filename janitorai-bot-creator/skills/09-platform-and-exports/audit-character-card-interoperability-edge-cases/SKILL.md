---
name: audit-character-card-interoperability-edge-cases
description: Test character-card conversion across platforms for field loss, syntax collisions, unknown fields, prompt order, examples, macros, and agency boundaries.
---

# Audit Character-card Interoperability Edge Cases

Use this skill when importing, exporting, migrating, or comparing character cards across JanitorAI and other roleplay formats.

## Process

1. Create fixtures with required fields, optional fields, multiline text, unknown fields, special syntax, examples, mature themes, and empty values.
2. Convert to the target format and back where possible.
3. Compare canon, scenario, greeting, voice, boundaries, knowledge, examples, provenance, and player-agency behavior.
4. Flag lossy transforms, syntax collisions, truncation, escaping, reordered priority, and platform-specific leakage.
5. Preserve a portable source record and report deliberate degradation.
6. Add a regression fixture for each repaired edge case.

## Completion

Stop when every supported field has round-trip or documented lossy behavior, every edge fixture has a result, and no silent canon or agency loss remains.
