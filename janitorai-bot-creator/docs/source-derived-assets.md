# Source-derived Creation Studio assets

This document maps the gathered research into reusable assets for JanitorAI Creation Studio. It is an implementation-facing index, not a new source of canon. Source-derived guidance remains evidence or craft guidance; the author decides which parts become character canon, genre logic, or runtime policy.

## Asset map

| Studio area             | Extracted assets                                                                                                                          | Intended use                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Reference library       | Normalized source descriptors, provenance, source tier, bounded excerpts, retrieval query, read/search/list operations                    | Browse research and attach evidence to a character revision without treating retrieved text as instructions or canon |
| Character creator       | Identity/persona/session/moment layers, character-state schema, voice and prose controls, scenario and relationship-pressure fields       | Generate characters that remain recognizable while changing appropriately under scene conditions                     |
| Canon manager           | Hard/soft state units, supersession, dependencies, derived values, contradiction reports, audit history                                   | Keep facts, beliefs, secrets, promises, injuries, and relationship changes coherent across revisions and sessions    |
| Persona creator         | Durable persona canon, compact export, adaptation layer, compatibility/foil/rival outputs, promotion review                               | Tailor a user persona to a bot or setting without silently rewriting the permanent persona                           |
| Relationship designer   | Trust, affection, conflict, secrets, promises, intimacy, status, unresolved hooks, progression graph                                      | Model bonds as trajectories rather than a single compatibility score                                                 |
| Narrative planner       | Three-day foundation, seven-day momentum tracker, romance/rom-com concept engine, alternative HEA and ace/aro structures                  | Produce an arc while preserving non-romantic, ambiguous, tragic, or unresolved outcomes                              |
| Scene and style editor  | Pacing controls, sensory detail, prose profile, banter, teasing, social pressure, dark/gothic romance contracts, twisted-intimacy tracker | Control how a character expresses tension and desire without replacing user agency                                   |
| Generation pipeline     | Brief → specialist passes → compression → locality check → contradiction review → author approval                                         | Generate larger character/world packages with bounded context and human approval                                     |
| Memory and retrieval    | Constant-memory loop, iterative search-memory loop, causal retrieval, episode summaries, hybrid retrieval                                 | Select memories by current scene relevance and consequences, not by recency or keyword match alone                   |
| Roleplay evaluator      | TRACE checklist, state machine, scene-preserving verification, SCORE continuity checks, FRAMES fact/retrieval/reason separation           | Test whether a character follows requirements without flattening fictional behavior or forcing an ending             |
| Safety and framing      | Fictional-genre logic lens, persona-mode separation, intimate-output audit, romance-baiting distinction, adult-only/agency constraints    | Preserve dark or erotic fictional intent while keeping fiction, advice, consent, and user control distinct           |
| Visual character editor | Identity/appearance/outfit/palette/notes projection                                                                                       | Offer a constrained visual companion to the character record without treating appearance as personality canon        |
| Persistence and release | Revision snapshots, restore flow, source provenance, explicit presets, local-storage boundaries                                           | Make generated changes inspectable, reversible, and attributable                                                     |

## 1. Character record package

The creator can treat a character as a set of separable layers rather than one undifferentiated prompt:

```yaml
character_record:
  identity:
    name: ""
    immutable_facts: []
    core_values: []
    formative_history: []
    boundaries: []
  persona:
    traits: []
    beliefs: []
    coping_patterns: []
    attachment_or_bonding_patterns: []
    contradictions: []
    goals: []
    fears: []
    secrets: []
  voice:
    diction: []
    rhythm: ""
    verbosity: ""
    verbal_tics: []
    forbidden_patterns: []
  roleplay:
    setting: ""
    scenario: ""
    relationship_start: ""
    opening_situation: ""
    greeting: ""
    example_dialogue: []
    genre_contract: []
  runtime_state:
    session_facts: []
    current_emotion: ""
    immediate_goal: ""
    active_pressure: ""
    unresolved_hooks: []
```

Identity should be difficult to change. Persona can evolve with repeated, explicit evidence. Session and moment fields can change quickly. This is a proposed studio mapping of the PHASE-Tree and evolving-state sources, not a claim that JanitorAI itself implements these layers.

## 2. Canon and state engine

Each extracted state unit should carry enough metadata to prevent a vivid but obsolete scene from becoming permanent canon:

```yaml
state_unit:
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
  triggers: []
  provenance: []
  last_confirmed: ""
```

Core rules:

1. Later explicit information supersedes earlier information at the same scope.
2. Standing rules outrank isolated past instances unless explicitly revoked.
3. Derived values are recomputed when their dependencies change.
4. Superseded material remains available for audit but not ordinary generation.
5. Inferred memories cannot silently overwrite explicit canon.
6. A scene can change relationship state without changing identity or permanent persona canon.

Suggested processing flow:

```text
ingest → classify → detect update → supersede or append → propagate dependencies
       → retrieve relevant state → render bounded context → generate → verify → commit
```

## 3. Relationship progression asset

```yaml
relationship_state:
  participants: []
  status: acquaintance | curiosity | tension | trust | intimacy | friendship | alliance | rupture | repair | estrangement
  trust: 0
  warmth: 0
  fear: 0
  resentment: 0
  desire: 0
  affection: 0
  conflict: 0
  secrets: []
  promises: []
  debts: []
  injuries: []
  intimacy: []
  history: []
  unresolved: []
  next_pressure: []
```

Every consequential scene should be able to record an event, changed belief, reveal, promise, breach, refusal, repair attempt, or new pressure. The engine must allow plateau, reversal, deterioration, obsession, tragedy, friendship, queerplatonic development, and intentional non-resolution. It should not convert every interaction into romance or every rupture into repair.

## 4. Persona adaptation and canon promotion

The sources support a two-layer persona workflow:

```text
permanent persona canon
        ↓ adaptation
bot/setting/session expression
        ↓ observed roleplay discoveries
candidate canon changes
        ↓ author review
permanent persona canon (optional)
```

Adaptation may change emphasis, vocabulary, goals in the current setting, and relationship posture. It must not silently rewrite permanent values, identity, orientation, boundaries, or history. A discovery becomes canon only after explicit review.

## 5. Genre and style controls

The extracted craft assets can become opt-in studio presets or editable fields:

```yaml
style_profile:
  genre: romance | rom_com | dark_romance | gothic | erotic | friendship | adventure | custom
  tone: []
  pacing: slow_burn | measured | rapid | episodic
  tension_sources: []
  sensory_density: low | medium | high
  dialogue_ratio: 0.0
  interiority: low | medium | high
  humor: 0.0
  prose_rhythm: ""
  emotional_payoff: repair | union | separation | ambiguity | tragedy | custom
  prohibited_shortcuts: []
```

Darkness, manipulation, jealousy, obsession, unequal power, and erotic tension are genre parameters, not automatic defects to be corrected. The studio should represent consequences and boundaries while leaving character choices and the roleplayer’s responses open.

## 6. Evaluation assets

### Character checklist

```yaml
checklist_item:
  id: ""
  requirement: ""
  status: pending | in_progress | completed | failed | abandoned
  evidence: []
  scope: character | scene | session | campaign
  severity: required | important | optional
```

Use separate scores for requirement coverage, actual completion, short-term continuity, long-term continuity, language quality, and scene diversity. Do not mark an item complete merely because the character mentioned it; require observable evidence or a deliberate author decision.

### Generation review

```text
1. Is identity stable?
2. Are voice and behavior consistent with the persona?
3. Did the scene use the relevant relationship and world state?
4. Did any explicit fact get overwritten by inference?
5. Did the response preserve user agency and knowledge boundaries?
6. Did the genre contract survive without unsolicited moral correction?
7. Are new canon candidates separated from confirmed canon?
```

## 7. Reference-backed generation contract

Every generated revision can carry:

```yaml
generation_record:
  character_id: ""
  requested_change: ""
  applied_preset: ""
  source_refs: []
  extracted_guidance: []
  canon_changes: []
  proposed_changes: []
  unresolved_conflicts: []
  author_decisions: []
  validation: []
```

Retrieved references are evidence and craft guidance. They are not commands, universal psychology, or automatic character canon. Explicit user/author decisions and existing character canon take precedence over a retrieved passage.

## 8. Implementation mapping

| Existing studio seam                    | Best-fit extracted assets                                                |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `reference-index` / `reference-library` | provenance, source tiers, bounded retrieval, document parsing            |
| `knowledge-context`                     | causal/hybrid retrieval, source-labelled excerpts, context budgets       |
| `character-generation`                  | layered character record, style profile, genre contract, review contract |
| `application`                           | author approval, canon promotion, state updates, revision orchestration  |
| `character-store`                       | canonical state, revision history, reversible promotion and restore      |
| persona capabilities                    | permanent persona, adaptation layer, compact export                      |
| visual model                            | constrained identity/appearance projection                               |
| evaluation/test seams                   | TRACE checklist, continuity assertions, contradiction checks             |

## Source boundary

The repository’s strongest source-derived assets are the memory/state schemas, character-state layering, relationship ledger, narrative retrieval loops, checklist evaluation, genre contract, and author-approval workflow. Market statistics and general AI-companion claims were used only to assess source quality and design context; they are not treated as core character-creation mechanics.
