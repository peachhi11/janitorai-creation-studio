---
name: configure-safe-local-deployment
description: Configure local Creation Studio deployment with bounded requests, authentication, trusted storage paths, loopback defaults, and explicit external-exposure decisions.
---

# Configure Safe Local Deployment

Use this skill when starting, packaging, exposing, or troubleshooting the local Studio service.

## Process

1. Define host, port, environment, API credentials, model endpoint, character-library path, reference-library path, request limit, and rate limit.
2. Keep development on loopback unless external exposure is deliberate.
3. Require authentication in production and keep secrets out of records, references, logs, and exports.
4. Verify storage roots, path containment, identifiers, symlinks, atomic writes, revision history, and backup scope.
5. Test health, authentication, malformed input, oversized input, rate limiting, tool discovery, persistence, and shutdown.
6. Document assumptions and the exact command or adapter used for deployment.

## Completion

Stop when the service starts with validated configuration, protected endpoints, trusted storage, bounded requests, reproducible health checks, and an explicit exposure decision.
