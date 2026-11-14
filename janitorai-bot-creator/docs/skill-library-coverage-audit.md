# Skill library coverage audit

Audit date: 2026-11-09

## Result

The current library contains 257 unique `SKILL.md` modules:

- 250 purpose-led modules in the nine numbered folders;
- 7 compact compatibility modules at the root of `skills/`.

All 257 modules have frontmatter, a unique `name`, a `description`, and an H1 heading. No duplicate skill names were found. `git diff --check` passes.

The library is substantively covered for the current source corpus. The remaining issues are maintenance and discoverability gaps, not missing core domains.

## Findings

### 1. Provenance is incomplete — high priority

Only the 7 compact compatibility modules are represented in `knowledge/source-ledger.json`. The 250 purpose-led modules do not currently carry per-skill source IDs or a source-family pointer.

Impact:

- a source revision cannot reliably identify every affected skill;
- source-derived guidance and repository-invented implementation guidance are difficult to distinguish at module level;
- archival or retirement decisions cannot be traced consistently.

Required repair: add a source-family or `derived_from` record to each purpose-led module, preferably through a shared manifest rather than duplicating long citation blocks inside every skill.

### 2. The compact index is partial — medium priority

`skills/README.md` lists the compact modules and selected high-value modules, but not all 257 skill names. The numbered folder taxonomy is the canonical browse structure, so this is not a routing failure; the index now labels the list “Selected core modules.”

Required repair: rename that section to “Selected core modules,” add a link to the full taxonomy and coverage report, and generate a complete machine-readable skill manifest for tooling.

### 3. Completion-criterion style — resolved

All 257 modules now use exactly one `## Completion` section. The 45 former `## Deliverable` sections were renamed without changing their content. The remaining 100 older modules received a concise completion gate after their existing final checklist or return section.

### 4. Overlap is concentrated in intentional families — review priority

These families are adjacent but not automatically duplicates:

- character construction, formative pressure, emotion architecture, belief translation, and contradiction;
- relationship conflict, progression, momentum, intimacy aftermath, and pursuit/withdraw cycles;
- persistent memory, scene commits, consolidation, long-horizon compression, causal retrieval, and search/reason loops;
- roleplay evaluation, task completion, long-horizon drift, grounding, agency, multimodal consistency, and release verification;
- character-card export, persona conversion, schema migration, provenance export, and interoperability.

Required repair: add routing relationships and handoff descriptions before merging anything. The modules represent different phases and should remain separate unless usage evidence shows they are routinely invoked together or confused.

### 5. Broad source-to-skill coverage is present

The extracted asset map has destinations for reference retrieval, character creation, canon management, persona adaptation, relationship progression, narrative planning, style, worldbuilding, memory, evaluation, safety/framing, visual projection, persistence, and release. No top-level asset-map area is currently without a skill family.

## Priority order

1. Create a complete source-family manifest and attach each skill to it.
2. Generate a complete skill manifest with name, path, folder, trigger, completion style, and provenance pointer.
3. Add routing links for the overlap families.
4. Run the audit again after implementation wiring begins.

## Completion boundary

The source-derived skill expansion is complete. This audit is complete for the current working tree when the structural checks above pass and the remaining gaps are recorded as explicit maintenance work rather than hidden assumptions.
