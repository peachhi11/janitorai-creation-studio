---
name: review-database-migrations
description: Use when reviewing database migrations, schema changes, SQL migrations, or migration pull requests. Trigger phrases include “review this migration,” “check this schema change,” “is this migration safe?”, and “find migration risks.”
---

## Steps

1. Find migration files in the supplied paths or repository migration directories.
2. Identify database engine, version, migration runner, deployment environment, current schema, adjacent migrations, application queries, and tests.
3. Read forward and reverse directions in execution order and record unknown inputs without guessing.
4. Check idempotency, rollback schema, rollback data, destructive operations, locks, rewrites, blocking, and deployment order.
5. Check nullability, defaults, conversions, existing rows, constraints, indexes, foreign keys, triggers, generated values, and naming conflicts.
6. Check backfill bounds, resumability, observability, tested row counts, transaction mode, database-version support, and deployment procedure.
7. Run focused migration, schema, and test commands when repository scripts provide them.
8. Record each finding with file, line, severity, evidence, impact, and fix; separate verified results, unknowns, and production-metric checks.

## Decision rules

- Yes: Can a statement remove or overwrite data without a tested preservation path? Report it. No: continue.
- Yes: Does a required value lack a value for existing rows? Report it. No: continue.
- Yes: Does a check depend on unknown engine, version, traffic, rows, or locks? Mark `Unknown`. No: record the result.
- Yes: Does application code need deployment before the schema? Flag the order. No: continue.
- Yes: Can rollback fail to restore schema or affected data? Flag incomplete rollback. No: continue.
- Yes: Did a focused command fail? Report the command and failure. No: record pass.
- Yes: Are there no findings after all runnable checks? Return `No findings`. No: return findings and unknowns.

## Output

- Format: `Migration review`
- Scope: list reviewed files.
- Database: state engine, version, runner, and deployment environment.
- Unknowns: list unavailable inputs and production checks.
- Findings: use `[Severity] file:line — issue; evidence; impact; fix.`
- Severity: use `Block`, `Review required`, or `Note`.
- Verification: list every command and pass/fail result.
- Verdict: use `Block`, `Review required`, `No findings`, or `No review performed`.

## Stop when

- No migration file is supplied or found: return `Migration review`, `Scope: no migration files found`, `Findings: none`, `Verification: not run`, and `Verdict: No review performed`.
