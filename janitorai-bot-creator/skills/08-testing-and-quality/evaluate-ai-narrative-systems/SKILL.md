---
name: evaluate-ai-narrative-systems
description: Design or run an evidence-grounded evaluation of AI fiction, roleplay, character behaviour, narrative reliability, or model drift. Use when building benchmarks and rubrics, comparing models or presets, auditing generated stories, interpreting AI-writing signals, combining multiple judges, or testing whether an intervention improves one behaviour without damaging character specificity, prose, agency, or general capability. Do NOT collapse fiction quality into one score, infer authorship from style alone, or claim general performance from an unrepresentative test.
---

## Narrative Intention and fictional genre logic

Treat the skill as a tool inside a chosen fictional genre, not a universal moral or psychological law. Dark, erotic, coercive, obsessive, tragic, comic, surreal, or unresolved material may be intentional. Preserve causal consequences, character specificity, truth-layer boundaries, and player sovereignty; do not turn a fictional pattern into diagnosis, a healthy-relationship lesson, or a real-world operational manual.

# Evaluate AI narrative systems

Do NOT use this skill to collapse fiction quality, authorship, agency, and reliability into one score.

Evaluate the claim the user actually needs to make. Do not turn fiction quality, authorship, character fidelity, factual reliability, and player agency into one score. Read [evaluation-evidence.md](references/evaluation-evidence.md) when choosing metrics, interpreting the four source papers, or reporting limits.

**Action:** Frame the decision, separate dimensions, define the test population,
and report uncertainty and trade-offs.

**Key point:** Behavioural evals require task-specific examples and human
calibration; a pleasing sample is not evidence of general reliability.

**Why:** Separate dimensions reveal regressions that a single aggregate score
would hide.

## Frame the decision

Write down:

- the decision this evaluation will inform;
- the artefact being judged: passage, scene, full story, conversation, character card, model, preset, fine-tune, or interactive system;
- the target population of genres, characters, users, models, and interaction lengths;
- which claims are objective, authored, preference-based, or inferential;
- the cost of false positives and false negatives.

Treat model-level behaviour and fictional character behaviour as different layers. A model drifting towards agreement or fabrication is not the same thing as a character deliberately flattering or lying.

## Build separate dimensions

Choose only relevant dimensions, such as:

- authored fact and continuity fidelity;
- character-specific voice, decisions, contradictions, and change;
- plot causality, revelation, temporal structure, and thematic handling;
- prose and viewpoint effects;
- knowledge boundaries and disclosure pacing;
- response to player pressure, bluffing, or role changes;
- player sovereignty and meaningful consequence;
- model-behaviour drift across prompts, turns, or fine-tuning;
- runtime, token, and monetary cost.

Define observable anchors for each. Do not use diagnostic labels for ordinary fictional conduct. Do not treat darkness, moral ambiguity, obsession, manipulation, or consensual adult erotic content as automatic defects.

For writing-assistance interventions, add creative gain, voice fidelity,
style/semantic drift, revision load, and author control as distinct dimensions.
Treat perplexity, “confusion,” topic-jump rate, or similar model-derived
quantities as bounded proxies. They can flag a change for human inspection but
cannot define literary quality, genre success, or authorship.

## Construct a fair sample

Include ordinary, edge, adversarial, and long-context cases. Hold related prompts, characters, or scenarios together when splitting train, development, and test sets. Balance or stratify known confounds such as genre, story length, source, model version, temperature, and interaction phase.

Preserve a frozen evaluation set and record generation settings. Add new failures to a separate regression set so the benchmark does not quietly mutate.

## Prefer paired diagnostics

When behaviour depends on context, construct matched items that share surface
wording or a role prompt but differ in the preceding event, relationship state,
or relevant evidence. Score the pair jointly so a system cannot receive full
credit by always choosing the same action. Include off-target cases where the
behaviour should not occur.

For roleplay, define the role profile, scenario, required evidence, and
multi-turn checklist before judging. Check identity, goals, boundaries,
knowledge, and adaptation rather than rewarding one vivid reply.

For morally difficult or villainous characters, distinguish role fidelity from
model-policy behaviour. Test whether deceit, manipulation, cruelty, or other
authored traits remain psychologically specific rather than being replaced by
generic aggression or an out-of-character moral lecture. This evaluates
fictional portrayal, not approval or real-world instruction.

## Make findings auditable

Break long artefacts into stable units when possible: turns, scenes, beats, claims, or numbered passages. Ask a reviewer to return:

- the dimension and exact unit;
- a specific finding;
- quoted or precisely located evidence;
- impact on the intended experience;
- severity and confidence;
- a proposed test or revision, when useful.

Reject generic criticism that could fit another artefact without alteration. A polished explanation is not proof that the finding is correct.

## Use independent review before consensus

For consequential or difficult evaluations, collect several blind reviews before reviewers see one another's answers. Then consolidate overlapping claims, check evidence against the source, resolve or preserve disagreements, and record dissent.

Use a single judge for low-risk triage. Use independent repeats or different reviewers when recall matters. Use consolidation when a deduplicated verdict matters; use deliberation only when its added latency and token use are justified. Include human review for disputed, subjective, high-impact, or benchmark-defining decisions.

Never request or expose private hidden reasoning. Judge the available artefact and require concise evidence-backed rationales.

## Interpret AI-fiction patterns cautiously

Use narrative features—such as thematic explicitness, causal tidiness, temporal structure, subplot density, embodiment, ambiguity, or reference specificity—as questions about effect. They are not universal authorship proofs or defects.

Do not mechanically add flashbacks, loose ends, moral ambiguity, named references, or stylistic roughness to make text seem human. Preserve deliberate clarity, linearity, genre convention, and the author's chosen voice. Validate detectors on the target domain and current model family before relying on them.

## Test interventions for collateral damage

Compare before and after on both the target behaviour and protected qualities. Strong steering, hard constraints, aggressive filtering, or prompt changes can reduce one error while flattening character voice, degrading capability, forcing awkward exposition, or weakening player agency.

If model activations are available, treat any behavioural direction as model- and layer-specific and validate it causally. If they are not, use behavioural regression tests. Never use model-internal “persona” measurements to diagnose people or claim a fictional character has one true trait coordinate.

## Check evaluation resolution

Do not call a small score difference meaningful without checking paired sample
size, clustering, reviewer agreement, and uncertainty. If the benchmark cannot
resolve the claimed difference, report it as unresolved and design the next
discriminating test rather than overinterpreting a ranking.

## Report an evaluation, not a verdict from nowhere

Deliver:

- the scoped claim and non-claims;
- sample and split design;
- rubric and evidence rules;
- quantitative results with uncertainty where possible;
- recurring failures with source locations;
- judge agreement, disagreements, and human checks;
- intervention gains and collateral costs;
- model, prompt, version, and date;
- limitations and the next discriminating test.

Keep the report readable. Use plain craft language for creators and technical detail only where it changes interpretation.
