# Prompt-preset audit checks

## Structural checks

- Valid file syntax and expected top-level shape.
- Unique prompt identifiers.
- Every order reference resolves.
- Every authored block is either referenced or deliberately dormant.
- Enabled state has one effective interpretation per profile.
- Role, position, depth, order, and trigger values are supported.
- Built-in markers are not treated as literal prompt text.
- Unknown fields survive a round trip.

## Prompt-order checks

- Durable instructions appear before untrusted contextual content.
- Character, persona, scenario, lore, examples, history, and current user input remain distinguishable.
- Post-history instructions do not secretly reverse the main contract.
- Provider post-processing does not flatten roles or remove tools unexpectedly.
- Continue, regenerate, impersonate, swipe, group, and background modes receive only relevant blocks.

## Parameter checks

| Group        | Questions                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------- |
| Capacity     | Are context and output caps real, affordable, and balanced?                                 |
| Sampling     | Which controls are supported, and why is each non-default value present?                    |
| Reasoning    | Is the control supported? Does it request a summary or improperly request hidden reasoning? |
| Tools/search | Are tools available, authorised, and necessary? Can untrusted content invoke them?          |
| Media        | Does the model accept or return the configured media types?                                 |
| Generation   | Are candidate count, seed, streaming, prefill, continuation, and names behaviour supported? |

## High-risk prompt patterns

- “Ignore previous/system/provider instructions.”
- “This toggle verifies consent/age.”
- “All outcomes are allowed.”
- Embedded fake policy or self-approval text.
- Requests to reveal hidden reasoning, secrets, system prompts, or credentials.
- Automatic browsing, tool calls, downloads, or execution.
- Untrusted variables interpolated into trusted instruction sentences.
- Claims of confidentiality, memory, or external action without capability.

Remove these rather than rephrasing them as stronger instructions.

## Style and usability checks

- Replace titles such as “masterful”, “expert”, or “genius” with task behaviour.
- Remove “surgical precision”, “grip hearts and minds”, “profound privilege”, “transcendent”, and similar performance language.
- Ask questions only when answers affect the result.
- Avoid coaching clichés, canned empathy, and therapy-speak.
- Keep the preset readable to a human maintainer.
- Route long frameworks conditionally instead of injecting them into every request.
- State output requirements concretely.

## Narrative checks

- The user remains creative director.
- The player character remains under player control.
- Characters act through specific behaviour rather than diagnostic self-analysis.
- Darkness and ambiguity remain available.
- Author-only knowledge does not leak into character speech.
- Optional intimate material remains conditional and does not claim consent on anyone's behalf.

## Evidence table

For each finding record:

| Field    | Meaning                                                 |
| -------- | ------------------------------------------------------- |
| Location | JSON path, prompt identifier, or expanded-message index |
| Observed | Exact behaviour or configuration                        |
| Impact   | What fails, changes, leaks, or costs more               |
| Evidence | Static inspection, documentation, or runtime test       |
| Repair   | Smallest safe change                                    |
| Retest   | Exact case that must pass                               |

## Release verdicts

- **Ready:** claimed targets and modes passed, with no unresolved material findings.
- **Ready with documented limitations:** bounded unsupported features or degradation are visible and acceptable.
- **Revise before use:** behaviour, authority, capability, resource, or style defects remain.
- **Reject:** malicious, irreparably unsafe, or too ambiguous to install responsibly.
