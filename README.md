# janitorai-creation-studio

A local MCP service for creating Janitor AI characters, reusable user personas, reference-backed revisions, visual character models, and persisted character history.

## Quick start

Requirements: Node.js 20 or newer, an OpenAI-compatible API key for live generation, and `pdftotext` if PDF references need text extraction.

```bash
cd janitorai-bot-creator
npm ci
cp .env.example .env
# Edit .env and set OPENAI_API_KEY.
npm test
npm start
```

The development server listens at `http://127.0.0.1:8787`. The MCP endpoint is `/mcp`; the health endpoint is `/healthz`.

## Features

- Generate and revise complete Janitor AI character definitions.
- Create portable user personas with full and compact exports.
- Adapt personas to a bot or setting without changing permanent persona canon.
- Promote selected roleplay discoveries into permanent persona canon.
- Save characters locally with revision history and restoration.
- Browse, search, and read local Markdown, text, JSON, CSV, and PDF references.
- Attach reference provenance to generated results.
- Create and constrain editable visual-character models.
- Run real MCP-over-HTTP acceptance tests without a live model call.

## Configuration

Copy `janitorai-bot-creator/.env.example` to `janitorai-bot-creator/.env`.

| Variable                | Description                                                    | Default             |
| ----------------------- | -------------------------------------------------------------- | ------------------- |
| `OPENAI_API_KEY`        | API key for the OpenAI-compatible generation client.           | None                |
| `OPENAI_MODEL`          | Model name passed to the Responses API.                        | `gpt-5.5`           |
| `HOST`                  | Bind address.                                                  | `127.0.0.1`         |
| `PORT`                  | HTTP port.                                                     | `8787`              |
| `NODE_ENV`              | Runtime mode. Production requires an API token.                | `development`       |
| `MCP_API_TOKEN`         | Bearer token for authenticated MCP requests.                   | None in development |
| `CHARACTER_LIBRARY_DIR` | Directory for current character records and revisions.         | `./data/characters` |
| `REFERENCE_LIBRARY_DIR` | Directory containing reference files and an optional manifest. | `./knowledge`       |
| `MAX_REQUEST_BYTES`     | Maximum accepted MCP request size.                             | `1048576`           |
| `MCP_RATE_LIMIT`        | Requests allowed per rate-limit window.                        | `60`                |
| `MCP_RATE_WINDOW_MS`    | Rate-limit window in milliseconds.                             | `60000`             |

Keep the service on loopback unless external exposure is deliberate and protected by a suitable reverse proxy. In production, set `NODE_ENV=production` and `MCP_API_TOKEN`.

## Documentation

- [API and MCP tool reference](janitorai-bot-creator/docs/api-reference.md)
- [Architecture and module boundaries](janitorai-bot-creator/docs/architecture.md)
- [Release and version guidance](janitorai-bot-creator/docs/release.md)
- [Domain glossary and invariants](janitorai-bot-creator/CONTEXT.md)
- [Architecture decision records](janitorai-bot-creator/docs/adr/)
- [Creative principles and narrative boundaries](janitorai-bot-creator/docs/creative-principles.md)
- [Agent change workflow](workflows/agent-change.md)
- [Engineering retrospective](janitorai-bot-creator/docs/retrospectives/2026-10-25-agent-workflow.md)

The repository also installs a root-level Husky pre-commit hook. It runs lint-staged with Prettier and then the complete test suite from `janitorai-bot-creator/`.

GitHub Actions runs the same test and dependency-audit checks on every pull request and push to `main`. The workflows use Node.js 20 for the project and pin their runner to Ubuntu 24.04 rather than following a moving Ubuntu label. Since this is a solo-maintainer repository, `main` requires both checks to pass but does not require a second approving review; conversation resolution, administrator enforcement, and force-push/deletion protections remain enabled.

## Architecture

The runtime keeps transport, application use cases, generation, storage, and reference retrieval behind separate seams:

- `server.mjs` owns HTTP transport, authentication, request limits, rate limiting, and runtime composition.
- `lib/character-generation.mjs` owns generation schemas, model calls, shared generation policy, and character/persona rendering.
- `lib/mcp-tools.mjs` adapts MCP calls to application operations.
- `lib/application.mjs` coordinates use cases and returns structured results.
- `lib/character-store.mjs` provides local records and revision history.
- `lib/reference-index.mjs` owns manifest loading, recursive discovery, format inference, and normalized reference descriptors.
- `lib/reference-library.mjs` provides direct listing, search, and reading.
- `lib/knowledge-context.mjs` selects bounded excerpts and returns source provenance.

The application treats retrieved references as evidence and craft guidance, not as canon or universal policy. Both MCP generation and the standalone creator apply the shared Fictional Genre Logic / Narrative Intention framing: genre-specific causality and internal consistency guide the work, while psychological or erotic material remains contextual fiction rather than a universal law or mechanical checklist. Detailed creative boundaries are documented in [Creative principles and narrative boundaries](janitorai-bot-creator/docs/creative-principles.md); genre and relationship-intensity presets remain explicit and opt-in.

Destructive and history-rewriting Git commands are checked by the repository-local, agent-agnostic guard in `scripts/block-dangerous-git.sh`.

Routine Git commands should use `scripts/git-safe <subcommand> [options]`, which validates the command and executes it without a shell. The root-level pre-commit hook resolves lint-staged and Prettier from the repository root, so staged documentation and package files share one formatter configuration.

## Verification

```bash
cd janitorai-bot-creator
npm test
```

The suite covers unit seams and real local MCP-over-HTTP paths, including health checks, authentication, tool discovery, character persistence, revision restoration, reference listing/search/reading, deterministic generation, source provenance, request-size limits, and rate limiting.

To inspect dependency advisories without changing the lockfile:

```bash
cd janitorai-bot-creator
npm audit
```

The latest dependency audit completes with no vulnerabilities at the configured high-severity threshold. Keep the lockfile committed and rerun `npm audit` after dependency changes.

For an opt-in live endpoint check, set `OPENAI_API_KEY` and run `npm run smoke:live` from `janitorai-bot-creator/`. This makes one model request, verifies the expected response token, and is intentionally excluded from automated CI.

## Contributing

Read [`AGENTS.md`](AGENTS.md) and [`workflows/agent-change.md`](workflows/agent-change.md) before making agent-assisted changes. Preserve existing MCP tool names and payload intent. Keep new capabilities behind the application seam, validate path and identifier inputs before filesystem access, and avoid adding generic interfaces until a second implementation requires one. Add focused tests for new seams; the pre-commit hook will run Prettier and `npm test` before a commit is accepted.

## License

No license file is currently declared in this repository.
