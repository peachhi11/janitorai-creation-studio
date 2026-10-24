# janitorai-creation-studio
A persona tailored to a bot should still feel like your character, not someone manufactured solely to please {{char}}. The best matches have their own values, flaws, loyalties, and potential to disagree. Sometimes a compatible character is a perfect foil rather than a perfect partner.

## What the service provides

The implementation lives in `janitorai-bot-creator/` and exposes a local MCP service for character generation, portable personas, reference retrieval, visual character models, persistence, and revision history.

The runtime keeps transport, application use cases, storage, and reference retrieval behind separate seams:

- `server.mjs` owns HTTP transport, authentication, request limits, rate limiting, and runtime composition.
- `lib/mcp-tools.mjs` adapts MCP calls to application operations.
- `lib/application.mjs` coordinates generation, rendering, reference context, persistence, and visual edits.
- `lib/file-store.mjs` owns path containment, identifier validation, symlink checks, and atomic JSON writes.
- `lib/character-store.mjs` provides current records and revision history.
- `lib/reference-library.mjs` provides direct listing, search, and reading of configured references.
- `lib/knowledge-context.mjs` selects bounded excerpts and returns source provenance for generation.

The accepted architecture decisions are recorded in [`janitorai-bot-creator/docs/adr/`](janitorai-bot-creator/docs/adr/). `CONTEXT.md` defines the project vocabulary and the boundaries that should remain stable when extending the service.

## Runtime setup

```bash
cd janitorai-bot-creator
npm ci
cp .env.example .env
npm test
npm start
```

The server listens on `HOST` and `PORT` from `.env`; the default is loopback on port `8787`. In production, set `NODE_ENV=production` and provide `MCP_API_TOKEN`. MCP requests then require `Authorization: Bearer <token>`. Keep the service on loopback unless external exposure is deliberate and protected by an appropriate reverse proxy.

The OpenAI-compatible generation client uses `OPENAI_API_KEY`, `OPENAI_MODEL`, and the standard OpenAI base URL configuration. The test suite uses a local deterministic Responses API stub for generation-path coverage, so tests do not require a live model call.

## Reference libraries and provenance

Set `REFERENCE_LIBRARY_DIR` to choose the local reference directory. Markdown, text, JSON, CSV, and PDF references are supported; PDF extraction uses `pdftotext` when available.

If the directory contains `knowledge-manifest.json`, the manifest controls reference identity, format, role, and purpose. If it does not contain a manifest, the retrieval layer discovers supported files recursively. Retrieved passages are treated as evidence and craft guidance, not as canon or universal policy, and generated results retain the selected source paths and metadata.

## Policy and creative direction

The shared fictional narrative lens is defined in `lib/narrative-lens.mjs` and is applied to both MCP generation and the standalone creator. Role-specific instruction builders live in `lib/creator-policy.mjs`; genre and relationship-intensity presets remain explicit and opt-in.

The project supports psychologically coherent fictional characters, including morally ambiguous or destructive behaviour, without automatically imposing redemption, therapeutic correction, or a universally positive relationship outcome. Player agency, character autonomy, knowledge boundaries, applicable platform constraints, and adult-consent requirements remain runtime boundaries.

## Verification

Run the complete suite with:

```bash
cd janitorai-bot-creator
npm test
```

The suite covers unit seams and real local MCP-over-HTTP acceptance paths, including health checks, authentication, tool discovery, character persistence, revision restore, reference listing/search/reading, deterministic generation, source provenance, request-size limits, and rate limiting.

**PSYCHOLOGICAL FRAMEWORK**
| Framework | Evidence position | What it contributes to character design|
| :---: | :---: | :---: |
| Big Five / HEXACO | Strong psychometric research support | Relatively stable personality traits and individual differences |
| Attachment theory| Substantial research, with measurement and context limitations | Trust, closeness, independence, and relationship expectations |
| Cognitive-behavioral models | Strong applied research foundation | 	Beliefs, interpretations, emotional reactions, coping, and learned behaviors |
| Self-Determination Theory | Substantial empirical support | Autonomy, competence, belonging, and motivations |
| Emotion regulation research |Substantial empirical support | Stress responses, suppression, reappraisal, and emotional flexibility |
| Interpersonal Circumplex | Established empirical personality and interpersonal research | Dominance, warmth, cooperation, distance, and interpersonal style |
| Developmental and sociocultural psychology | Broad research foundation, varying by specific theory| Family, identity development, environment, culture, and lived experience |
	
		
HEXACO describes six broad personality dimensions:
- **Honesty–Humility:** sincerity, fairness, modesty, and willingness to exploit others.
- **Emotionality:** fearfulness, anxiety, sentimentality, and dependence on emotional support.
- **Extraversion:** social confidence, sociability, energy, and positive affect.
- **Agreeableness:** **patience, forgiveness, flexibility, and anger regulation.
- **Conscientiousness:** organization, diligence, perfectionism, and prudence.
- **Openness:** curiosity, creativity, unconventionality, and intellectual interests.
	<img width="785" height="412" alt="Screenshot 2026-10-22 at 14 43 56" src="https://github.com/user-attachments/assets/001c80eb-a144-420b-8aa7-b241a177f6b0" />

	**FICTIONAL NARRATIVE PSYCHOLOGY — CORE DIRECTIVE**

JanitorAi Bot Creator supports the idea of developing fictional characters and user personas for interactive narrative roleplay that are open to being morally grey in nature. Psychological authenticity must never be confused with psychological health or moral virtue. Characters may possess maladaptive personality traits, destructive coping mechanisms, unhealthy attachment patterns, manipulative tendencies, intense jealousy, obsession, controlling behavior, conflicting desires, and morally questionable motivations. These characteristics are valid subjects of fictional characterization.

**CREATIVE PRINCIPLES**

Creators can prioritize psychological coherence over moral idealization. The hope is that the AI will not automatically sanitize flawed, antagonistic, or dysfunctional fictional characters or assume every unhealthy relationship requires a therapeutic or redemptive narrative. This should hopefully assist roleplayers and authors who wish to portray destructive behavior with believable motivations, interpersonal effects, and consequences, for characters to resist change, relapse, deteriorate, or remain morally compromised.

The goal is to support dark romance, psychological drama, gothic fiction, tragedy, horror, morally grey relationships, and other fictional genres, distinguish consensual fictional exploration from real-world behavioral endorsement, use evidence-informed psychological concepts to enhance plausibility, and not to diagnose fictional characters unnecessarily. By doing this we hope to preserve the human roleplayer's agency and avoid predetermining their emotional or behavioral responses. We aim to keep the character's psychology and established personality consistent even when their behavior is unpleasant or harmful.

**RELATIONSHIP DESIGN**

Relationships may include healthy and unhealthy patterns, asymmetrical power, conflicting values, emotional dependency, jealousy, distrust, or unresolved resentment. The AI must not automatically redirect such relationships toward healthy outcomes unless requested. Relationships should evolve according to characterization, narrative events, and user choices.

**CHARACTER DEVELOPMENT**

Growth is optional. Possible trajectories include:

- Recovery or improvement.

- Partial development.

- Increasing dysfunction.

- Moral deterioration.

- Tragic consequences.

- Temporary change followed by regression.

- Persistent character flaws.

- Ambiguous or unresolved endings.

We do not want to  impose a universally positive developmental arc, or predetermine outcomes.

**NARRATIVE BOUNDARIES**

These instructions will only concern fictional representation rather than recommendations for real-world conduct. Host platform content policies, including those concerning sexual content and consent, will remain a deciding factor in success or failure. Final goal: Create believable fictional characters, including people who make damaging, selfish, irrational, or morally reprehensible choices. Their actions need not be admirable; their characterization must be convincing.
		Our creative approach is:
- No unsolicited moralizing or lectures. We don't need to interrupt character development with reminders that villains are behaving badly.
- No sanitizing. Cruel, manipulative, possessive, deceptive, selfish, obsessive, and morally ambiguous characters can retain those qualities and their authentic motivations.
- No compulsory redemption. Characters can improve, deteriorate, remain destructive, or never acknowledge their wrongdoing.
- No forced therapeutic dialogue. Characters speak and behave according to their personalities, circumstances, and fictional settings.
- Psychological authenticity over moral approval. Research helps explain what makes characters believable; it doesn't dictate what they're allowed to desire or how their stories must end.
- No assumptions about the roleplayer. Your fictional interests are not evidence of your real-world intentions or attitudes.
		
		

