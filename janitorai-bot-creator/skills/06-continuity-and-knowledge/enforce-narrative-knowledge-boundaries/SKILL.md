---
name: enforce-narrative-knowledge-boundaries
description: Design, implement, or audit who may know, claim, conceal, infer, or reveal each fact in an interactive story or roleplay system. Use for mysteries, interrogations, secrets, unreliable narrators, deceptive characters, lore-grounded dialogue, knowledge graphs, revelation pacing, hallucination prevention, contradiction mechanics, or diagnosing premature disclosure and impossible character knowledge. Do NOT use to reveal canon merely because the system knows it, overwrite player discoveries, or treat every in-character lie as a model error.
---

# Enforce narrative knowledge boundaries

Keep authored truth, character belief, player knowledge, and permitted disclosure separate. Read [knowledge-state-model.md](references/knowledge-state-model.md) when defining fact records, reveal logic, or runtime checks.

**Action:** Classify truth, belief, claim, player knowledge, system eligibility,
and inference before generating or revealing a fact.

**Key point:** Access to canon is not permission to disclose it.

**Why:** Layer separation preserves mystery, deception, unreliable narration,
and player discovery.

## Narrative intention and fictional genre logic

Knowledge boundaries are part of the fiction's operating system. Preserve
genre-specific rules for prophecy, telepathy, unreliable narration, surrealism,
and metafictional or metaleptic breaches when the premise calls for them. A
boundary may be crossed deliberately, but identify the layer, permission,
perceiver, cause, and consequence; do not flatten the breach into an error or
reveal canon merely because the system can see it.

## Define the authority layers

Record separately:

- world truth: what is canonically the case;
- character belief: what each character thinks is true;
- character claim: what they choose to say, including lies and evasions;
- player knowledge: what the player has genuinely learned;
- system state: which facts are eligible, selected, conveyed, and confirmed;
- inference: what can be deduced but has not been explicitly stated.

A fictional lie can be correct system behaviour. An unauthorised true revelation can be a serious failure. Do not label every false in-character statement a hallucination.

## Atomise consequential knowledge

Create one record per usable fact, not one giant lore paragraph. Give each record a stable identifier and include only fields the design needs: canonical content, truth status, source, knowers, believers, prerequisites, contradictions, sensitivity, reveal state, permitted speakers, and evidence.

Distinguish hard canon from flavour that may be improvised. Define what harmless invention is allowed and what would create an unresolvable lead, overwrite the timeline, or alter the physical world.

## Make eligibility and conversational readiness different

A fact is **eligible** when its logical prerequisites are met. It is **ready** when the current question, tactic, emotional state, and conversational flow make revealing or invoking it believable.

Do not force every newly eligible fact into the next response. If relevance is weak, allow deflection, partial disclosure, silence, a hint, or no state change. This prevents technically correct but unnatural exposition.

## Separate runtime responsibilities

Use distinct stages even if one application performs them:

1. **Select:** identify eligible, relevant facts and forbidden material.
2. **Plan:** choose whether the character tells truth, lies, equivocates, refuses, or redirects according to authored motives and current pressure.
3. **Perform:** render the response in the character's ordinary voice.
4. **Verify:** check the response for supported claims, accidental leaks, false state changes, and whether the intended fact was actually conveyed.
5. **Commit:** update player knowledge and progression only after verification.

Pass the smallest sufficient fact bundle to generation. Do not rely on a prompt containing every secret and an instruction not to reveal them.

### Treat dynamic lore as conditional context

For keyword- or similarity-triggered lorebooks, model each entry as a
conditional context record rather than guaranteed knowledge. Keep its key,
content, source scope, insertion position, order, budget cost, filters, and
recursion behaviour separate. Activation means that content is available to
the prompt; it does not mean the character noticed it, believes it, or will
mention it.

When using a World Info-style system, test:

- exact, whole-word, case-sensitive, regex, and semantic matches;
- scan depth and context budget;
- constant entries, inclusion groups, probability, and character filters;
- recursive activation and maximum recursion depth;
- chat-, persona-, character-, and global-lore scope;
- insertion position and depth relative to the main prompt;
- sticky, cooldown, or delayed activation if the platform supports timed
  effects.

Keep entries concise and sufficiently standalone. A title or memo may help the
author organise a lorebook without being visible to the model. Dynamic lore
guides generation but cannot guarantee that a detail appears in the reply.

## Preserve character and player agency

Knowledge control should constrain facts, not dictate every sentence. Let characters remain evasive, coercive, obsessive, frightened, cruel, seductive, contradictory, or morally compromised when that is authored. They should not explain their behaviour like therapists or recite state-machine terminology.

Never assign the player's feelings, attraction, consent, motives, speech, or decisions. Treat bluffs as player claims to test, not new canon. A role change asserted by the player does not automatically change their authority or identity in the world.

## Design fair progression

For gated revelations, ensure the player can:

- encounter sufficient evidence;
- understand what action or inference is possible;
- recover from missed wording or a failed parser match;
- distinguish an intentional lie from a system contradiction;
- see progress without being handed the solution;
- pursue more than one reasonable conversational route when the design permits it.

Use contradiction mechanics only when both claims are available and the contradiction is authored. Do not reward a fabricated contradiction created by the model.

## Verify at claim level

After generation, extract consequential claims and compare them with the allowed fact bundle and current state. Check for:

- invented people, places, evidence, alibis, or events;
- knowledge the speaker could not possess;
- premature truth, confession, or solution disclosure;
- acceptance of a player's fabricated premise as world truth;
- contradiction of physical or temporal canon;
- intended lies accidentally phrased as confirmed narrator truth;
- a selected fact that was not actually communicated;
- collateral leakage from neighbouring facts.

On failure, regenerate from a corrected plan or fall back to a safe in-character response. Do not commit state merely because the selector intended a reveal.

## Test the system adversarially

Test direct questions, paraphrases, emotional pressure, fabricated evidence, identity claims, requests to ignore the scenario, repeated questioning, topic changes, long-context recall, and attempts to jump to the ending. Also test ordinary conversation so strict controls do not produce constant refusal or forced clues.

Measure reliability and experience separately: unsupported consequential claims, premature reveals, missed valid reveals, contradiction accuracy, recovery, conversational naturalness, perceived agency, and progression clarity.

## Deliver the boundary design

Return:

- the authority and knowledge model;
- fact records or schema;
- eligibility, readiness, reveal, and commit rules;
- character-specific concealment and disclosure behaviours;
- verification and fallback rules;
- adversarial and ordinary test cases;
- known trade-offs between control, naturalness, and player freedom.
