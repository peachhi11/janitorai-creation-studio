import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const hook = resolve(process.cwd(), "../scripts/block-dangerous-git.sh");
const classifier = resolve(process.cwd(), "../scripts/classify_git_command.py");

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

test("git safety guard documents its agent-agnostic input contract", () => {
  const source = readFileSync(classifier, "utf8");
  assert.match(source, /tool_input/);
  assert.match(source, /return 2/);
});
