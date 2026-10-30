import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const hook = resolve(process.cwd(), "../scripts/block-dangerous-git.sh");
const classifier = resolve(process.cwd(), "../scripts/classify_git_command.py");
const repositoryRoot = resolve(process.cwd(), "..");
const safeGit = resolve(repositoryRoot, "scripts/git-safe");

function classify(command) {
  return spawnSync(hook, {
    input: JSON.stringify({ tool_input: { command } }),
    encoding: "utf8",
  });
}

test("git safety guard blocks destructive commands with an explicit denial", () => {
  for (const command of [
    "git push origin main --force",
    "git -C repo reset --hard HEAD",
    "/usr/bin/git reset --hard HEAD",
    "git reset --hard HEAD~1",
    "git clean -fd",
    "git branch -D feature",
    "git restore .",
  ]) {
    const result = classify(command);
    assert.equal(result.status, 2, command);
    assert.match(result.stderr, /blocked|destructive/i);
  }
});

test("git safety guard permits routine read and additive commands", () => {
  for (const command of [
    "git status --short",
    "git diff",
    "git add README.md",
    "git commit -m test",
  ]) {
    const result = classify(command);
    assert.equal(result.status, 0, command);
  }
});

test("git-safe validates before executing Git", () => {
  const safe = spawnSync(safeGit, ["status", "--short"], { encoding: "utf8" });
  assert.equal(safe.status, 0);

  const blocked = spawnSync(safeGit, ["reset", "--hard", "HEAD"], {
    encoding: "utf8",
  });
  assert.equal(blocked.status, 2);
  assert.match(blocked.stderr, /blocked|destructive/i);
});

test("git safety guard documents its agent-agnostic input contract", () => {
  const source = readFileSync(classifier, "utf8");
  assert.match(source, /tool_input/);
  assert.match(source, /return 2/);
});

test("repository hook and formatter resolve from the Git root", () => {
  const rootHook = readFileSync(
    resolve(repositoryRoot, ".husky/pre-commit"),
    "utf8"
  );
  const rootLintStaged = readFileSync(
    resolve(repositoryRoot, ".lintstagedrc"),
    "utf8"
  );

  assert.match(rootHook, /node_modules\/\.bin\/lint-staged/);
  assert.match(rootHook, /npm --prefix janitorai-bot-creator run test/);
  assert.match(
    rootLintStaged,
    /janitorai-bot-creator\/node_modules\/\.bin\/prettier/
  );
  assert.equal(
    existsSync(resolve(repositoryRoot, "janitorai-bot-creator/.lintstagedrc")),
    false
  );
  assert.equal(
    existsSync(resolve(repositoryRoot, "janitorai-bot-creator/.prettierrc")),
    false
  );
});

test("agent workflow requires autonomous completion and ranked next steps", () => {
  const workflow = readFileSync(
    resolve(repositoryRoot, "docs/workflows/agent-change.md"),
    "utf8"
  );
  const agents = readFileSync(resolve(repositoryRoot, "AGENTS.md"), "utf8");

  assert.match(workflow, /do not stop at an intermediate milestone/i);
  assert.match(workflow, /exactly three ranked options/i);
  assert.match(workflow, /assess README impact before committing/i);
  assert.match(workflow, /README impact is addressed/i);
  assert.match(agents, /continue autonomously/i);
  assert.match(agents, /assess README impact/i);
});
