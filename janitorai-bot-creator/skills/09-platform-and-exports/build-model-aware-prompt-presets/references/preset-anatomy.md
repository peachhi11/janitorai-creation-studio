# Prompt-preset anatomy

## Canonical manifest

Keep these sections human-readable even when the platform export is JSON:

| Section       | Contents                                                             |
| ------------- | -------------------------------------------------------------------- |
| Identity      | Package name, purpose, version, author/provenance, date              |
| Compatibility | Platform, API style, models/providers tested, required features      |
| Behaviour     | Job, constraints, method, interaction pattern, output contract       |
| Prompt stack  | Block identifier, role, order, trigger, position, enabled state      |
| Inputs        | Variables, macros, injected character/lore/history content           |
| Model profile | Context, output cap, samplers, reasoning, tools, media, streaming    |
| Modules       | Optional blocks and exact activation conditions                      |
| Tests         | Fixtures, expanded prompt snapshots, results, cost/latency, failures |
| Changes       | Previous version, changed fields, migration and rollback notes       |

## Prompt-block test

For every block, ask:

- What behaviour does it own?
- Why must it be a separate block?
- Which role and position does the destination actually send?
- Which operations trigger it?
- What happens if it is disabled?
- Does another block repeat or contradict it?
- Is it instruction, user data, an example, or a marker?
- Can untrusted content interpolate into it?

## Parameter groups

### Capacity

Context window and maximum output must fit the selected model, provider, account limits, and budget. A large configured number does not create model capacity.

### Sampling

Temperature, top-p, top-k, min-p, top-a, frequency penalty, presence penalty, and repetition penalty are backend-dependent. Unsupported values may be ignored, rejected, translated, or behave differently. Tune minimally and record the baseline.

### Reasoning and verbosity

These controls are model-specific. Treat visible reasoning, summaries, and ordinary output verbosity as separate features. Do not request private chain-of-thought.

### Capabilities

Tool calling, web search, image input/output, multiple candidates, seed, streaming, and prefills require explicit backend support. Enable only those the workflow uses.

## SillyTavern adapter cautions

For Chat Completion presets, Prompt Manager order, role, position, depth, trigger, character-card overrides, and prompt post-processing all affect the actual request. Default marker prompts may be disabled but not removed. Provider restrictions may merge roles, remove tool calls, insert placeholders, or flatten messages.

Inspect Prompt Itemization or an equivalent final-request view after every material change. Use unique preset names where automatic character-name matching would be undesirable.

## Style filters

Replace performance claims with operations:

- “masterful coach” → “identify the structural problem and offer two repairs”;
- “surgical precision” → “cite the scene or field causing the issue”;
- “psychological safety” → “criticise the draft, not the writer”;
- “immerse and annotate copiously” → “read the supplied material before commenting”;
- “strict confidentiality” → accurately state the active product's data boundary or make no claim;
- “always ask probing questions” → ask only when an answer changes the work.

Avoid canned rapport, excessive encouragement, therapeutic language, grandiose metaphors, and mandatory question loops unless the user explicitly requests that style.

## Minimum release tests

- JSON or configuration parses and imports.
- Prompt identifiers are unique and all order references resolve.
- Enabled states match the documented default path.
- Expanded prompt order matches the design.
- Token budget leaves room for history and output.
- Unsupported settings fail visibly or are omitted.
- Optional modules remain off until selected.
- User/player authority survives normal and adversarial cases.
- Character prose remains specific and non-clinical.
- One rollback export re-imports successfully.
