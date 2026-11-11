---
name: review-database-migrations
description: Use when reviewing database migrations, schema changes, SQL migrations, or a migration pull request, including requests such as “review this migration,” “check this schema change,” “is this migration safe,” or “find migration risks.”
---

## Steps

1. Find the migration files in the supplied paths or repository migration directories.
2. If no migration file is found, stop and return the no-migration output in the Stop section.
3. Identify the database engine, version, migration runner, and deployment environment from repository files.
4. If any of those details are unknown, label the affected checks `Unknown` and do not infer them.
5. Read the migration in execution order.
6. Read every statement in `up`, `down`, or equivalent directions.
7. Compare the migration with the current schema.
8. Compare the migration with adjacent migrations.
9. Compare the migration with application queries.
10. Compare the migration with repository tests.
11. Check whether the forward direction can run twice without an unintended error or duplicate object.
12. Check whether the reverse direction restores the prior schema without deleting unrelated objects.
13. Check whether the reverse direction restores affected data.
14. Check every destructive operation for data loss.
15. Check every destructive operation for lock duration.
16. Check every destructive operation for table rewrite.
17. Check every destructive operation for blocking.
18. Check every destructive operation for rollback impact.
19. Check new and changed columns for nullability.
20. Check new and changed columns for defaults.
21. Check new and changed columns for type conversion.
22. Check new and changed columns for existing-row compatibility.
23. Check new and changed columns for application deploy order.
24. Check constraints for conflicts with existing objects.
25. Check indexes for conflicts with existing objects.
26. Check foreign keys for conflicts with existing objects.
27. Check triggers for conflicts with existing objects.
28. Check generated values for conflicts with existing objects.
29. Check names for conflicts with existing objects.
30. Check whether data backfills are bounded.
31. Check whether data backfills are resumable.
32. Check whether data backfills are observable.
33. Check whether data backfills stay within the tested row count.
34. Check transaction behavior.
35. Identify statements that cannot run inside the migration runner’s transaction mode.
36. Check compatibility with each supported database version.
37. Check compatibility with the deployment procedure.
38. Run the repository’s focused migration command if one exists.
39. Run the repository’s focused schema command if one exists.
40. Run the repository’s focused test command if one exists.
41. Report each finding with file.
42. Report each finding with line.
43. Report each finding with severity.
44. Report each finding with evidence.
45. Report each finding with impact.
46. Report each finding with a fix.
47. Separate verified findings from checks that could not run.
48. Separate verified findings from checks requiring production metrics.

## Decision rules

- Yes: Can a statement remove or overwrite data? Report a finding unless a tested preservation path exists. No: continue.
- Yes: Does a new required value lack a defined value for existing rows? Report a finding. No: continue.
- Yes: Does a check depend on unknown engine, version, traffic, row count, or lock behavior? Mark it `Unknown`. No: record the check result.
- Yes: Does the migration rely on application code deployed before the schema change? Flag the deployment-order dependency. No: continue.
- Yes: Can rollback fail to restore schema and affected data? Flag rollback as incomplete. No: continue.
- Yes: Is a destructive operation explicitly required by the task? Report its data-loss and availability effects. No: continue.
- Yes: Did the focused verification command fail? Report the failure and include the command. No: record the command as passed.
- Yes: Did all runnable checks pass with no findings? Return `No findings`. No: return the findings and unknowns.

## Output

- Format: `Migration review`
- Scope: list reviewed files.
- Database: state the engine, version, and migration runner.
- Unknowns: list inputs that were not available.
- Findings: use one item per finding in the form `[Severity] file:line — issue; evidence; impact; fix.`
- Severity: use `Block` for likely data loss, unrecoverable rollback, or deployment failure.
- Severity: use `Review required` for a risk needing owner confirmation.
- Severity: use `Note` for a non-blocking observation.
- Verification: list each command and its pass/fail result.
- Verdict: use `Block`, `Review required`, `No findings`, or `No review performed`.

## Stop when

- No migration file is supplied or found: return `Migration review`, `Scope: no migration files found`, `Findings: none`, `Verification: not run`, and `Verdict: No review performed`.
