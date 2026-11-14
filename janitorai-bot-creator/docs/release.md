# Release and version guidance

## What to update for a release

Treat a release as a coordinated documentation, dependency, and runtime change. Update the package version when the published package metadata changes, update the service version when the health endpoint or runtime contract changes, and update the README when setup, supported runtimes, configuration, CI, or user-visible behavior changes.

The current version surfaces are intentionally recorded here because they do not currently share one value:

- `janitorai-bot-creator/package.json` declares package version `1.0.0`.
- `janitorai-bot-creator/server.mjs` reports service version `1.1.0` from `/healthz`.

Do not silently align these values as part of an unrelated change. Decide whether the next release is a package release, a service release, or both, then update the relevant tests and documentation in the same slice.

## Release checklist

1. Confirm the intended release scope and version surfaces.
2. Update package or service versions only when that surface is part of the release.
3. Update the README and API documentation for user-visible or operational changes.
4. Run `npm ci`, `npm test`, `npm audit`, and `git diff --check` from `janitorai-bot-creator/` as applicable.
5. Run `npm run smoke:live` manually when a configured OpenAI-compatible endpoint is available. This makes one model request and is not part of CI.
6. Commit code, tests, version metadata, and documentation together.
7. Push through the protected pull-request workflow and verify the post-merge `main` checks.
