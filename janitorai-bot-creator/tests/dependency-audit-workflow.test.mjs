import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const workflow = readFileSync(
  resolve(process.cwd(), "../.github/workflows/dependency-audit.yml"),
  "utf8"
);
const testWorkflow = readFileSync(
  resolve(process.cwd(), "../.github/workflows/test.yml"),
  "utf8"
);

test("dependency audit workflow installs and audits the nested package", () => {
  assert.match(workflow, /working-directory: janitorai-bot-creator/);
  assert.match(workflow, /actions\/checkout@v5/);
  assert.match(workflow, /actions\/setup-node@v5/);
  assert.match(workflow, /node-version: ['"]?20/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm audit --audit-level=high/);
});

test("test workflow runs the complete package suite", () => {
  assert.match(testWorkflow, /working-directory: janitorai-bot-creator/);
  assert.match(testWorkflow, /actions\/checkout@v5/);
  assert.match(testWorkflow, /actions\/setup-node@v5/);
  assert.match(testWorkflow, /node-version: ['"]?20/);
  assert.match(testWorkflow, /npm ci/);
  assert.match(testWorkflow, /npm test/);
});
