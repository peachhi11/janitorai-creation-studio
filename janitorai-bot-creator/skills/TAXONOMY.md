# Skills taxonomy

The library is organised by the task a writer is trying to perform. Each skill
has one primary home so browsing stays predictable; a skill can still be
cross-cutting in its instructions and can be found by its name or description.

This is deliberately a shallow hierarchy. The categories reflect user mental
models and workflow purpose rather than the order in which the skills were
created.

| Folder                         | Purpose                                                                                                                                                                           | Skills |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----: |
| `01-character-personas`        | Build personality, identity, psychology, formative history, behaviour, and persona foundations.                                                                                   |     33 |
| `02-relationships-intimacy`    | Design relationships, attraction, erotic dynamics, power exchange, conflict, intimacy, and aftermath.                                                                             |     39 |
| `03-cast-and-npcs`             | Build ensembles, families, NPC agency, recurring-cast memory and voice, faction/community dynamics, institutions in action, witness networks, and character-led world revelation. |     11 |
| `04-worldbuilding-and-setting` | Build cultures, beliefs, ecologies, institutions, places, naming, geography, and setting consequences.                                                                            |     20 |
| `05-narrative-writing`         | Turn architecture into scenes, prose, viewpoint, dialogue, rhythm, escalation, literary technique, and interactive narrative opportunities.                                       |     24 |
| `06-continuity-and-knowledge`  | Track memory, emotional state, relationship continuity, canon, belief, inference, witness propagation, state commits, reveals, and disclosure boundaries.                         |     21 |
| `07-research-and-reference`    | Research, historicise, catalogue provenance and evidence, triage OCR/readability, deduplicate sources, prepare corpora, and adapt writing worksheets or reference systems.        |     24 |
| `08-testing-and-quality`       | Audit, evaluate, validate, and diagnose craft, framing, agency, coherence, multimodal consistency, library coverage, and safety failures.                                         |     43 |
| `09-platform-and-exports`      | Prepare prompt packages, character cards, context budgets, platform workflows, compatibility regressions, model-aware presets, and exports.                                       |     35 |

## Placement rule

Put a skill where a user would look first when they know what they are trying
to do. Do not duplicate a skill into multiple folders. If a skill serves several
areas, keep one primary folder and make its cross-domain role explicit in the
description and index.

## Cross-cutting standards

The purpose-led folders contain 250 modules. Seven compact backwards-compatible modules remain at the root of `skills/` and are included in the repository-wide total.

The following principles apply across folders rather than receiving duplicate
copies of every skill:

- fictional genre logic and narrative intention;
- persona truth, story truth, world truth, narrator knowledge, and runtime state;
- player sovereignty and non-diagnostic framing;
- continuity of cause, consequence, knowledge, and character choice.

When a skill creates or portrays a character, it should include the compact
Narrative Intention guidance used throughout the character and relationship
folders. The expanded reference is in
`evaluation/fictional-genre-logic-standard.md`.
