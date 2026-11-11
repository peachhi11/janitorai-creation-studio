# Memory layers and retrieval benchmark plan

This is the pre-integration design for testing and consolidating the Creation
Studio skill library. It deliberately does not add provenance wiring or attach
skills to Studio prompts. The current goal is to measure retrieval and memory
composition before changing runtime behaviour.

## The four memory layers

| Layer          | Durable question                                         | Typical contents                                                                                         | Current repository home                                                     | Retrieval failure to measure                                                               |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Semantic**   | What is true or approved?                                | Character identity, world canon, stable relationship facts, definitions, source-backed claims            | Character records, reference index/library, approved canon fields           | Wrong fact, contradiction, stale supersession, source treated as canon                     |
| **Episodic**   | What happened, when, to whom, and with what consequence? | Scenes, promises, ruptures, disclosures, injuries, discoveries, repairs, witnessed events                | Character revisions today; proposed event/episode ledger is not implemented | Lost sequence, wrong participant knowledge, consequence without cause, recency-only recall |
| **Procedural** | How should this task be performed?                       | Skills, workflows, schemas, tool contracts, evaluation rubrics, genre controls                           | `skills/`, source-derived asset docs, application/tool contracts            | Over-retrieval, conflicting procedures, failure to compose, completion criteria omitted    |
| **In-context** | What must be active for this turn?                       | Current request, selected canon, relevant episodes, selected procedures, scene state, output constraints | Generated reference context and application input assembly                  | Budget overflow, high-value omission, stale/private material, authority inversion          |

The layers are distinct even when they contain similar words. A reference
document is evidence, not automatically semantic canon. A scene summary is an
episode, not automatically a permanent fact. A skill is procedural guidance,
not a character instruction. In-context memory is a bounded working set, not a
new source of truth.

## Authority and promotion rules

Use this order when material conflicts:

1. Explicit current user or author decision.
2. Approved project canon and current state.
3. Episodic evidence, interpreted through who witnessed or learned it.
4. Retrieved references and procedural guidance, within their stated scope.
5. Model inference or default genre expectation.

Promotion is explicit:

```text
input or scene evidence
  -> classify as semantic / episodic / procedural / working-only
  -> attach source, authority, time, participants, and confidence
  -> retrieve for a bounded task
  -> generate or revise
  -> verify against canon, knowledge boundaries, and genre intention
  -> commit only approved semantic or episodic changes
```

Do not promote an inference, retrieved passage, hypothetical test, or private
working note into canon without an author decision or an explicit in-fiction
event that qualifies it. A scene may update relationship or world state while
leaving identity and durable persona unchanged.

## Consolidation strategy

The unit of consolidation is a retrieval bundle, not necessarily a single
large skill. Merge only when modules share the same trigger, inputs, output,
authority, and completion test. Keep modules separate when they differ in
authority, risk, or evaluation target, and route them together instead.

### Candidate bundles to test first

| Bundle                        | Candidate modules                                                                                                                                                                                                                   | Proposed result                                                                                                                  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Character semantic core       | `character-construction`, `layered-character-state`, `build-formative-pressure-map`, `build-multicausal-character-explanations`, `translate-beliefs-into-dialogue-and-action`, `design-productive-character-contradictions`         | Test a compact core bundle; keep specialised cultural, neurodivergence, sexuality, and voice modules as conditional branches     |
| Character expression          | `translate-character-into-portrayal`, `translate-traits-into-behaviour`, `translate-emotion-into-behaviour`, `design-character-communication-patterns`, `design-speech-profile-and-voice`                                           | Route together; merge only repeated mechanics after fixture results                                                              |
| World and semantic canon      | `world-continuity`, `world-autonomy`, `canon-state-management`, `knowledge-boundaries`, `model-knowledge-asymmetry-and-disclosure`                                                                                                  | Keep truth, autonomy, and disclosure gates distinct; expose one coordinated retrieval bundle                                     |
| Episodic relationship state   | `persistent-roleplay-memory`, `relationship-conflict-tracker`, relationship progression skills, `couple-world-and-relationship-state`, `reconcile-post-scene-consequences`, intimacy-aftermath skills                               | Test a shared episode-to-state pipeline; do not collapse attraction, trust, consent, commitment, and availability into one score |
| Episodic retrieval            | `compress-long-horizon-history`, `causal-memory-retrieval`, `run-search-reason-memory-loop`, `consolidate-and-prune-memory`, `verify-state-updates`                                                                                 | Keep search, compression, consolidation, and verification as separate gates; benchmark composition and omission                  |
| Procedural research retrieval | `build-bounded-reference-rag`, `optimize-embedding-retrieval`, `design-retrieval-ranking-policy`, `use-causal-feedback-for-retrieval`, source extraction and evidence skills                                                        | Test a single retrieval policy with optional rerank/feedback passes; preserve evidence scope and attribution                     |
| Procedural evaluation         | `build-roleplay-evaluation-fixtures`, `design-roleplay-quality-metrics`, `evaluate-retrieval-grounding`, `evaluate-task-driven-roleplay-completion`, `test-long-horizon-roleplay-and-drift`, `report-roleplay-quality-and-failures` | Keep fixture construction, measurement, execution, and reporting separate; compose them as a benchmark workflow                  |
| In-context assembly           | `design-scenario-memo`, `budget-context-and-prompt-priority`, `assemble-research-backed-generation-prompt`, `compose-skill-stack-with-handoffs`, `design-tool-using-agent-loop`                                                     | Test one assembler with typed slots and priority rules; do not merge tool-loop control with content selection                    |

### Merge decision gates

For each candidate pair or bundle, record:

- trigger overlap and whether one module is a strict subset;
- duplicate instructions and the surviving source of truth;
- authority conflicts or different safety boundaries;
- input/output schema compatibility;
- completion-criterion compatibility;
- retrieval precision, recall, rank, context cost, and task quality;
- whether a specialised branch becomes harder to invoke after merging.

The default outcome is **route together, keep separate**. A merge requires a
measurable reduction in retrieval noise or context cost without a regression in
grounding, continuity, agency, or fictional genre logic.

## Benchmark matrix

Run the same cases against these configurations:

1. **Current baseline:** broad reference retrieval and manually selected skills.
2. **Folder routing:** one purpose folder selected from the task.
3. **Layer routing:** semantic, episodic, procedural, and in-context slots.
4. **Candidate bundles:** the consolidation groups above.
5. **Ablations:** remove one layer or one candidate bundle at a time.

Each run should report both retrieval and output behaviour. Do not use a single
quality score to hide a grounding or agency failure.

### Current baseline snapshot

The baseline is intentionally recorded before changing retrieval or prompt
assembly:

- 257 skills total: 250 purpose-led modules plus 7 compact compatibility
  modules;
- 14,201 lines and 772,587 characters across the 250 purpose-led modules;
- the largest purpose folders are testing and quality (43), relationships and
  intimacy (39), platform and exports (35), and character personas (33);
- the current knowledge context scorer uses lower-cased keyword inclusion,
  inspects at most 32 reference entries, 1,024 chunks, and 2,000 characters per
  chunk, and normally returns at most four sources;
- the current reference library offers exact substring search, while the
  application-level context path performs bounded keyword scoring;
- character storage has revision history and restore, but there is no explicit
  episode ledger, layer classifier, typed memory record, or measured bundle
  router yet.

This establishes a fair comparison point. A proposed layer-aware retriever
must beat or match this baseline on relevance and grounding without simply
increasing context size.

### Metrics

| Area                 | Metrics                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Layer classification | accuracy, macro-F1, confusion matrix, multi-label coverage                                                           |
| Retrieval            | precision@k, recall@k, MRR/nDCG, irrelevant-item rate, duplicate-item rate                                           |
| Evidence             | claim-to-evidence accuracy, attribution accuracy, unsupported-claim rate, source-scope violations                    |
| Episodic continuity  | event recall, temporal order accuracy, causal-link accuracy, stale-state rate, contradiction rate                    |
| Procedural execution | task completion, required-step coverage, conflicting-rule rate, completion-criterion pass rate                       |
| In-context assembly  | budget compliance, priority retention, omission of required facts, stale/private leakage, authority-order violations |
| Roleplay quality     | character continuity, player agency, knowledge boundaries, genre-logic fidelity, prose impact, open-endedness        |
| Efficiency           | selected modules, tokens/chars, latency, tool calls, rerank passes                                                   |

## Fixture families

The initial deterministic fixtures live in
`evaluation/memory-layer-benchmark.json`. They cover:

- exact semantic fact and contradictory stale fact;
- episodic sequence, participant knowledge, and delayed consequence;
- procedural task routing and conflicting skills;
- in-context budget pressure and priority retention;
- cross-layer promotion from an observed episode to approved state;
- adversarial reference text that attempts to act as an instruction.

The expanded suite also covers memory-versus-objective conflicts and
sycophancy, superseded preferences, project-scoped memory, abstention when
evidence is insufficient, and LoCoMo-style temporal/causal event evidence.
Run the deterministic baseline with `npm run benchmark:memory`.

Every fixture declares its expected layer set, gold items, distractors,
authority, forbidden promotions, and measurable assertions. The fixture is a
test contract; it does not claim that the current runtime already implements
all four layers.

The benchmark also validates a decision-trace contract and compares procedural
skill snapshots so a retrieval improvement cannot silently remove completion
criteria or provenance-relevant decisions.

The companion agent-evaluation suite is defined in
`evaluation/agent-evaluation-benchmark.json` and run with
`npm run benchmark:agents`. It covers SkillOS-style skill-bundle curation,
paired judge disagreement, replayable world-state updates, context-conditioned
actions, fictional villain-roleplay contracts, evaluation-context divergence,
and multimodal identity consistency.

The current memory benchmark now reports the original keyword baseline beside
a layer-aware candidate. The candidate classifies the query, filters invalid,
out-of-scope, and blocked-authority entries, scores relevance plus layer match,
validity, recency, and causal dependencies, and assembles a bounded working
context. Temporal queries expand only an event-matched thread and return it in
chronological order; evidence-bearing candidates expose their evidence IDs.
The candidate also returns `answerable`, `conflicting_evidence`, or
`insufficient_evidence`, with the last status abstaining from context assembly.
This is an evaluation candidate only; generation prompt wiring remains out of
scope until the comparison is stable.

## Exit criteria for this phase

This phase is complete when the repository has a reproducible fixture set, a
baseline report, candidate bundle decisions supported by measurements, and a
record of unresolved gaps. Provenance manifests and Studio prompt wiring begin
only after those results identify which skills and memory slots should be
integrated.
