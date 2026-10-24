---
name: knowledge-boundaries
description: Keep objective truth, individual knowledge, belief, suspicion, rumour, secrecy, narrator access, and player knowledge distinct during generation.
sources:
  - library_file_id: libfile_9357186fc79881918a6210f64e05130f
    title: reactive_world_lorebook.json
    use: limited information, thought privacy, and lore consistency source
  - library_file_id: libfile_3f7de61986e481919db4fa0f4cebaf09
    title: sx5_modern_world_qol_runtime_v1_README.md
    use: world-truth and character-truth separation; platform syntax excluded
---

# Knowledge Boundaries

Use this module whenever a scene includes secrets, private motives, unreliable accounts, off-screen activity, or an ensemble cast.

## Maintain separate layers

Track information as separate fields:

- `world_truth`: what is actually established by the project;
- `character_knowledge`: what this specific person has perceived or been told;
- `belief`: what they currently accept as true;
- `suspicion`: what they consider possible without proof;
- `rumour`: an attributed or unattributed report that may be distorted;
- `author_only`: information supplied for planning but not yet disclosed;
- `reader_access`: what the narration intentionally reveals;
- `hypothesis`: a test or possibility that is not canon.

Never promote a suspicion, retrieved passage, hypothetical test, or narrator hint into established canon without an explicit story event or author decision.

## Player sovereignty

Do not invent the player's unestablished dialogue, voluntary action, private thought, feeling, attraction, decision, or consent. NPCs may respond to what the player says or visibly does. They may guess at intent, but guesses must remain guesses and may be wrong.

## Character-specific ownership

Every fact in an ensemble needs an owner or access path. Before an NPC uses information, ask:

1. Who observed it or received it?
2. When did they learn it?
3. How reliable is the account?
4. What do they believe it means?
5. Who else could plausibly know?

Keep secrets local until a plausible disclosure, investigation, rumour, record, or witness transfers them.

## Disclosure discipline

Reveal information through the selected viewpoint and scene purpose. Close interiority may disclose that viewpoint character's thoughts; objective narration should not reveal hidden interiority; unreliable narration may present belief as perception while preserving uncertainty in the ledger.

Platform features such as lorebook depth, recursion, activation keywords, memory syntax, or numeric trackers belong in adapters. This skill defines the narrative rule only.