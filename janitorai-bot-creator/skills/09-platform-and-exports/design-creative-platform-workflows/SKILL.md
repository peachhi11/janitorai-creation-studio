---
name: design-creative-platform-workflows
description: Design reusable, reviewable workflows for long-form fiction and character projects inside creative platforms. Use when organising project templates, story bibles or codices, prompt libraries, scene pipelines, revision passes, AI-assisted writing stages, temporary snippets, lifecycle states, context routing, or human approval gates across tools such as Novelcrafter or comparable applications. Do NOT use to force a single writing process, erase source-of-truth boundaries, or apply changes without the author's approval.
---

# Design creative platform workflows

Build a workflow around the author's real process, not around every feature a platform offers. Keep portable project logic separate from platform controls. Read [workflow-patterns.md](references/workflow-patterns.md) when selecting stages, records, context scopes, or review gates.

**Action:** Define goal, source of truth, platform boundary, stages, context
scopes, review gates, and stop points.

**Key point:** A workflow may branch, repeat, pause, or end early; completeness
is not the same as usefulness.

**Why:** Author-controlled stages prevent platform features from becoming the
creative process by default.

## Define the work and boundary

Record:

- creative goal and deliverables;
- platform and version;
- project scale, genre, and collaboration needs;
- manual and AI-assisted operations;
- source-of-truth records;
- external files and publication destinations;
- privacy, backup, and portability requirements;
- stages the author actually wants to use.

Do not force a discovery writer through a full plotting pipeline or make a planner skip useful structure. Let the author enter, branch, repeat, or stop at sensible checkpoints.

## Separate project layers

Maintain distinct layers:

1. **canon:** approved story, character, world, timeline, and relationship facts;
2. **working notes:** possibilities, questions, discarded options, and private author knowledge;
3. **plan:** acts, chapters, scenes, beats, arcs, and unresolved threads;
4. **manuscript:** prose and its revisions;
5. **automation:** prompts, model profiles, variables, and context selectors;
6. **outputs:** summaries, submissions, exports, marketing copy, and publication files;
7. **operations:** versions, status, ownership, deadlines, backups, and change history.

Do not let a generated summary silently become canon. Do not put author-only notes into character-visible context.

## Build the minimum reusable template

Create only records that multiple tasks will reuse. Use clear names, stable identifiers, brief field descriptions, and visible placeholders. Prefer a small template that can grow over a huge empty taxonomy.

Include as needed:

- project metadata and creative promise;
- characters, locations, institutions, objects, lore, and glossary;
- arcs, subplots, mysteries, motifs, and knowledge boundaries;
- scene intent, viewpoint, location, timing, stakes, change, and aftermath;
- style, genre, and continuity constraints;
- prompt definitions and output destinations;
- project state and next action.

When cloning a template, clear sample canon, old names, hidden context, identifiers that must be unique, dates, ownership metadata, and links to prior projects.

## Scope context deliberately

For each operation, select the smallest context that can support it:

- global material only when every task needs it;
- series material only for shared canon;
- project material for the current work;
- chapter or scene material for local drafting;
- temporary notes for one transformation;
- private author knowledge only when the task is allowed to use it.

Preview the assembled context before generation. Remove duplicated entries and avoid “always include” records that consume tokens without affecting the task.

For dynamic lore or World Info systems, treat activation as a routing decision:
the entry's keys, filters, source scope, recursion, insertion position, and
budget determine whether it becomes available context. Keep that routing state
separate from canon, character knowledge, and player knowledge. A triggered
entry is not automatically a revealed fact, and a lorebook cannot guarantee
that a model will use the inserted material.

## Use task-sized operations

Prefer focused operations with explicit inputs and destinations:

- brainstorm or compare options;
- create or revise a record;
- transform outline into scenes or beats;
- draft from an approved beat;
- summarise without changing canon;
- extract candidate facts for review;
- edit story, scene, then line;
- package a selected output.

Do not build one prompt that brainstorms, plans, drafts, edits, evaluates, and publishes in one pass. Route to existing focused craft skills when the creative judgement is the hard part.

For AI-assisted literary work, treat generation as a proposal inside a feedback
loop, not as an automatic promotion step. Preserve a baseline and a reversible
accepted version. Review creative gain, voice fidelity, narrative integrity,
style drift, and author control separately; more iterations can create useful
surprise and can also create fragmentation or template convergence. A model-
derived fluency or confusion proxy is evidence about that model's signal, not a
universal literary-quality score.

## Add human gates

Use a review cycle:

1. preview inputs and assembled context;
2. generate into a temporary or proposed state;
3. compare with the source and task contract;
4. apply, retry, revise, split, or discard;
5. promote approved facts or prose deliberately;
6. record the change and next action.

Never overwrite the only copy with generated material. An AI's claim that nothing was omitted is not evidence; compare fields, counts, identifiers, and representative content.

## Design staged revision

Work from expensive structural decisions toward local polish:

1. story promise and causality;
2. arcs, chapters, and scene functions;
3. scene turns, viewpoint, tension, and continuity;
4. paragraphs, dialogue, description, and line style;
5. output formatting and publication preparation.

Skip irrelevant passes. Keep an accepted version before each substantial transformation.

## Handle optional mechanics and sensitive modules

Keep game rules, intimate mechanics, marketing, images, research, and other specialised modules separate from the default workflow. Activate them only for a relevant project.

For fictional sexual or coercive mechanics, separate diegetic character state from real player agreement. A condition, die roll, “willing” flag, restraint rule, arousal state, or preset toggle cannot establish player consent. Preserve fictional darkness without allowing mechanics to seize the player's choices outside the agreed rules.

Avoid diagnostic labels and clinical character evaluations. Translate useful psychology into observable behaviour and continuity checks.

## Validate the workflow

Test with a disposable project before applying the template to valued work:

- complete one small project path end to end;
- branch, repeat, skip, and resume stages;
- verify context selection and knowledge boundaries;
- reject one generated result and restore the prior state;
- export and re-import representative data;
- check that templates contain no old canon or personal metadata;
- confirm a human can understand what to do next.

## Deliver the workflow

Return:

- a stage map with entry, exit, and repeat conditions;
- record and context-scope definitions;
- prompt-to-input-to-destination mappings;
- approval and promotion gates;
- naming, version, and status conventions;
- optional modules;
- backup and export checkpoints;
- tests performed and known platform dependencies.

Do not describe a workflow as automated, saved, or recoverable unless the platform or storage operation confirms it.

## Narrative Intention and fictional genre logic

Treat the skill as a tool inside a chosen fictional genre, not a universal moral or psychological law. Preserve the setting's internal rules, causal consequences, knowledge boundaries, and player sovereignty. Do not turn fictional darkness, eroticism, coercion, obsession, tragedy, comedy, surrealism, or meta-fiction into a real-world manual or an automatic healthy outcome.
