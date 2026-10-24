#!/usr/bin/env python3
"""Classify an agent-provided shell command for destructive Git operations."""

import json
import shlex
import sys


def blocked_reason(command: str) -> str | None:
    try:
        tokens = shlex.split(command)
    except ValueError:
        return "blocked: command could not be parsed safely"

    for index, token in enumerate(tokens):
        if token != "git" or index + 1 >= len(tokens):
            continue

        command_index = index + 1
        while command_index < len(tokens) and tokens[command_index] in {"-C", "--git-dir", "--work-tree", "-c"}:
            command_index += 2
        if command_index >= len(tokens):
            continue
        git_command = tokens[command_index]
        args = tokens[command_index + 1 :]
        joined = " ".join(args)

        if git_command == "push" and any(
            arg in {"--force", "-f", "--force-with-lease"} or arg.startswith("--force=")
            for arg in args
        ):
            return "blocked: force-pushing can overwrite remote history"
        if git_command == "reset" and "--hard" in args:
            return "blocked: git reset --hard can delete uncommitted work"
        if git_command == "clean" and any(
            arg in {"-f", "-fd", "-df", "-ff", "-ffd", "-dff", "--force"}
            for arg in args
        ):
            return "blocked: git clean can permanently delete untracked work"
        if git_command == "branch" and any(arg == "-D" or arg == "--delete-force" for arg in args):
            return "blocked: force-deleting a branch can discard reachable history"
        if git_command == "checkout" and ("." in args or "--" in args and "." in args[args.index("--") + 1 :]):
            return "blocked: checkout of the worktree can discard local changes"
        if git_command == "restore" and ("." in args or "--worktree" in args and "." in args):
            return "blocked: restoring the worktree can discard local changes"
        if git_command == "rebase":
            return "blocked: rebasing rewrites commit history"
        if git_command == "commit" and "--amend" in args:
            return "blocked: amending rewrites an existing commit"

        # Keep the variable intentionally consumed so future additions can use
        # the complete argument string without changing the parser contract.
        _ = joined

    return None


def main() -> int:
    try:
        payload = json.load(sys.stdin)
        command = payload.get("tool_input", {}).get("command", "")
    except (json.JSONDecodeError, AttributeError):
        print("blocked: expected JSON with tool_input.command", file=sys.stderr)
        return 2

    reason = blocked_reason(str(command))
    if reason:
        print(reason, file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
