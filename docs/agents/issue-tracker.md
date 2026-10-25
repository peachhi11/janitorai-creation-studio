# Issue tracker: GitHub

Issues and product requirements for this repo live as GitHub issues. Use the `gh` command-line tool for issue operations.

## Conventions

- Create an issue with `gh issue create --title "..." --body "..."`.
- Read an issue with `gh issue view <number> --comments`.
- List issues with `gh issue list`, using appropriate state and label filters.
- Comment with `gh issue comment <number> --body "..."`.
- Apply or remove labels with `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close an issue with `gh issue close <number> --comment "..."`.

Infer the repository from the configured GitHub remote.

## Pull requests as a triage surface

No. External pull requests are not included in the triage queue. Treat GitHub issues as the request surface for this repository.

## When a skill says “publish to the issue tracker”

Create a GitHub issue.

## When a skill says “fetch the relevant ticket”

Run `gh issue view <number> --comments`.
