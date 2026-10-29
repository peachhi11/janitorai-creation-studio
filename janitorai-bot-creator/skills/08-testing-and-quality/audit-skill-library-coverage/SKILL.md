---
name: audit-skill-library-coverage
description: Audit a local narrative-skill library for taxonomy integrity, duplicate or overlapping triggers, missing negative boundaries, privacy leaks, Fictional Genre Logic coverage, and untested claims. Use when a skill collection has grown across folders, after a synthesis batch, or before a local release. Do NOT use to rewrite every skill mechanically, treat keyword coverage as behavioural proof, or publish private source paths and reports.
---

# Audit skill-library coverage

Review the library as a system. A clean individual skill can still be misplaced,
untriggerable, redundant, or missing a critical cross-cutting boundary.

**Action:** Inventory skills, reconcile taxonomy, inspect trigger boundaries and
cross-cutting standards, detect overlap, run available fixtures, and report
verified versus untested behaviour.

**Key point:** Structural coverage is necessary but does not prove that a model
will choose the right skill or follow it in a live task.

**Why:** System-level review catches gaps that individual file validation cannot.

## Inventory the library

Record for every skill:

- folder, name, description, line count, references, and declared purpose;
- positive trigger and negative trigger;
- Action/Key point/Why structure and relevant risk checklist;
- privacy-sensitive strings, absolute paths, secrets, and stale names;
- cross-cutting markers such as Fictional Genre Logic, narrative intention,
  player sovereignty, truth-layer separation, and non-diagnostic framing.

Compare the inventory with the taxonomy. Counts, names, and folder placement
must agree. A skill may have one primary home while its description names its
cross-domain use.

## Find overlap and gaps

Group skills by failure mode rather than matching keywords alone. Flag:

- duplicate names or descriptions;
- adjacent skills with indistinguishable triggers and no routing distinction;
- broad skills that absorb several narrower jobs;
- folders with a missing workflow seam;
- skills that claim a platform, model, source, or runtime capability without a
  test path;
- character, relationship, scene, cast, and testing skills lacking the compact
  fictional genre and agency framing required by the project.

Do not “fix” overlap by merging skills that have different inputs, failure
conditions, or deliverables. Prefer a routing note or a narrower description.

## Run evidence checks

Run structural validators, blind trigger fixtures, privacy scans, and any
available source or runtime tests. Separate:

- syntax and frontmatter pass;
- fixture or trigger pass;
- source-backed synthesis;
- structural export or round-trip pass;
- model-generated paired behavioural result;
- untested or unavailable capability.

Never describe a keyword scan as proof of compliance. Inspect representative
skills manually, including newly added and historically edited files.

## Preserve narrative intent

Fictional Genre Logic is a framing standard, not a command to sanitise, approve,
or moralise fictional darkness, eroticism, coercion, obsession, tragedy, or
surrealism. Check that the skill preserves intended genre rules, causal
consequences, knowledge boundaries, and player sovereignty without making
characters sound like therapists or turning a craft tool into a real-world
operational manual.

## Deliverable

Return a coverage matrix, taxonomy reconciliation, overlap and routing findings,
privacy results, fixture results, explicit genre-logic coverage, untested claims,
and a prioritised remediation list. Do not call the library complete while a
known high-priority seam remains untested or structurally inconsistent.
