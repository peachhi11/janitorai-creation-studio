---
name: run-platform-compatibility-regression
description: Use when running a repeatable compatibility and behavioural regression matrix for fictional character cards, prompt presets, lorebooks, exports, or creative workflows across named platforms, versions, and models. Trigger phrases include “run the compatibility matrix,” “regression-test the export,” and “does this work on Janitor AI and SillyTavern?”
---

## Steps

1. Name source artifact, canonical version, target platforms, versions, models, providers, converters, and claimed behaviours.
2. Define structural checks for schema, fields, packages, assets, prompts, lore, metadata, encoding, and security.
3. Define behavioural fixtures for {{char}}’s identity, voice, goals, knowledge, boundaries, genre, and {{user}}’s agency.
4. Include import, export, round trip, context pressure, long chat, failure, unsupported field, and off-target cases.
5. Run each matrix cell with recorded settings and isolate untrusted package content.
6. Compare structural pass, runtime output, silent loss, drift, latency, and error messages.
7. Separate platform, model, converter, fixture, and source effects.
8. Report compatibility by named target; do not generalise from one import or structural pass.

## Decision rules

- Yes: Is a target or version unknown? Mark the cell `Unknown`. No: run the cell.
- Yes: Does structural validation pass but behaviour drift? Report both results separately. No: continue.
- Yes: Does a package contain untrusted content? Do not execute it. No: continue.
- Yes: Does a target write {{user}}’s response or lose canonical data? Fail the cell and report it. No: continue.

## Output

- Format: `Platform compatibility regression report`
- Matrix: list artifact, target, version, model, provider, converter, fixture, and settings.
- Structural: report schema, package, asset, prompt, lore, metadata, and security results.
- Behavioural: report identity, voice, knowledge, genre, agency, drift, and failure results.
- Verdict: classify each cell `Pass`, `Fail`, or `Unknown` and list limitations.

## Stop when

- No source artifact, target platform, or compatibility claim is supplied: return `No compatibility regression` and do not execute imported content.
