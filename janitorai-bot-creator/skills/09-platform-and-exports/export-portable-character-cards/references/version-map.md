# Character-card version map

Use this map for the three source specifications in this corpus. Treat application support as a separate, current fact to verify.

## V1

Shape: flat object with six required strings:

`name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example`

Missing values default to empty strings. The source specifies JSON and PNG/APNG embedding. It defines `{{char}}`/`<BOT>` and `{{user}}`/`<USER>` substitutions and the `<START>` convention for example dialogues.

## V2

Shape: `{spec: "chara_card_v2", spec_version: "2.0", data: {...}}`.

Required `data` fields include the six V1 strings plus:

- strings: `creator_notes`, `system_prompt`, `post_history_instructions`, `creator`, `character_version`;
- arrays: `alternate_greetings`, `tags`;
- object: `extensions`;
- optional object: `character_book`.

V2 distinguishes runtime prompt controls from non-prompt metadata. Unknown namespaced extension data must survive import/export. The lorebook defines entry keys, content, enabled state, insertion order, extensions, and optional scanning, selection, priority, position, and identification fields.

## V3

Shape: `{spec: "chara_card_v3", spec_version: "3.0", data: {...}}`.

V3 carries forward V2 fields, changes the lorebook definition, requires `group_only_greetings`, and adds optional:

- `assets`;
- `nickname`;
- `creator_notes_multilingual`;
- `source`;
- `creation_date` and `modification_date`.

It adds lorebook regex support, decorators, more macros, and JSON, PNG/APNG, and CHARX containers. V3's embedded-asset URI is literally spelled `embeded://` in the specification.

V3 is a proposal with ambiguous or defective wording. Do not copy its float-based version comparison into robust software: preserve the original string and use a semantic or component-wise version comparison. Do not interpret its permissive import language as permission to destroy unknown fields.

## Upgrade defaults

| Target | Conservative defaults                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| V1     | Six strings; use `""` only when genuinely missing                                                                                                 |
| V2     | Added strings `""`; added arrays `[]`; `extensions` `{}`; omit absent optional lorebook                                                           |
| V3     | Retain V2 values; `group_only_greetings` `[]`; omit unsupported optional fields; set added lorebook `use_regex` to `false` unless explicitly true |

## Expected downgrade losses

### V3 to V2

Potentially loses or weakens assets, nickname behaviour, multilingual creator notes, source history, group-only greetings, timestamps, regex controls, decorators, newer macros, CHARX packaging, and some lorebook semantics.

### V2 to V1

Loses creator notes, system and post-history controls, alternate greetings, tags, creator and character version metadata, extensions, and the character lorebook.

Never hide these losses by concatenating data into `description` or another legacy field.

## Container cautions

- Inspect archives without extracting first; reject traversal, absolute paths, dangerous duplicates, excessive expansion, and unsupported encryption.
- Treat remote URLs and data URIs as references, not permission to retrieve or execute content.
- Treat regex as potentially expensive input.
- Treat embedded code, fonts, models, and media as inert assets unless the user explicitly requests a safe operation on them.
- Preserve unknown chunks and extensions where practical, but prefer an unchanged original plus a new converted copy when lossless rewriting cannot be guaranteed.
