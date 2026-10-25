import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const workflow = readFileSync(
  resolve(process.cwd(), "../.github/workflows/dependency-audit.yml"),
  "utf8"
);

test("dependency audit workflow installs and audits the nested package", () => {
  assert.match(workflow, /working-directory: janitorai-bot-creator/);
  assert.match(workflow, /node-version: ['"]?20/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm audit --audit-level=high/);
});
