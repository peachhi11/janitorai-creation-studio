# Character-card audit matrix

## Minimum schema checks

| Version | Shape and required content                                                                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| V1      | Flat object; six string fields: `name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example`                                                                                                 |
| V2      | `spec: chara_card_v2`; `spec_version: 2.0`; `data` containing V1 fields plus required notes, runtime prompts, alternate greetings, tags, creator, character version, and extensions; optional character book |
| V3      | `spec: chara_card_v3`; `spec_version: 3.0`; V2-derived `data`; required `group_only_greetings`; optional assets, nickname, multilingual notes, source, and dates; changed lorebook rules                     |

Validate against the declared version first. Do not silently reinterpret a malformed V2 object as V1 merely because six familiar fields are present.

## Container checks

### JSON

- One complete top-level card object.
- Valid encoding and no hidden concatenated payload.
- Extension and MIME claims agree with content.

### PNG/APNG

- Required version-specific chunk exists.
- Payload uses the expected base64 and text encoding.
- When V2 and V3 chunks coexist, record which one each application selects.
- Image rewriting does not discard unknown metadata without warning.

### CHARX

- Valid ZIP structure with root `card.json`.
- All member paths are safe, relative, case-correct, and portable.
- Asset references resolve to the intended member.
- Literal `embeded://` references are recognised where the V3 proposal requires that spelling.
- No traversal, unsafe links, duplicate collisions, excessive expansion, or unexpected execution.

## Preservation checks

Always compare:

- unknown fields and namespaced extensions;
- `character_version` separately from `spec_version`;
- null, absent, empty string, empty array, and empty object;
- full Unicode content and line breaks;
- greeting order;
- lorebook entry IDs and types;
- scanning, priority, position, selection, constant, regex, and decorator behaviour;
- asset type, name, extension, URI, bytes, and primary selection;
- creator notes, multilingual fallbacks, provenance, and timestamps;
- macros as both literal stored text and evaluated runtime behaviour.

## Expected losses to detect

### V3 to V2

Assets, nickname substitution, multilingual creator notes, source history, group-only greetings, dates, V3 lorebook regex/decorators, newer macros, CHARX-only packaging, and some prompt-position semantics may not survive.

### V2 to V1

Creator notes, system and post-history instructions, alternate greetings, tags, creator metadata, character version, extensions, and character lorebook cannot be represented directly.

Moving these into `description`, `personality`, or `scenario` is semantic drift, not preservation.

## Behaviour probes

Use small visible markers in disposable copies:

- character and user substitution;
- default and alternate greeting selection;
- group-only greeting selection;
- system and post-history placement;
- one ordinary lorebook key;
- one constant entry;
- one selective entry;
- one regex entry with a bounded pattern;
- one supported decorator;
- one local embedded asset;
- one unknown extension field.

Remove probes from final production cards.

## Verdict vocabulary

- **Lossless:** all data survives the tested round trip and tested behaviours remain equivalent.
- **Compatible with stated degradation:** unsupported features are preserved or deliberately omitted with an accepted loss manifest.
- **Conversion-only:** the card can be transformed, but direct import or round-trip preservation fails.
- **Incompatible:** the tested path blocks, corrupts, silently loses, or dangerously mishandles required content.

Limit every verdict to the exact application versions, operations, containers, and feature families tested.
