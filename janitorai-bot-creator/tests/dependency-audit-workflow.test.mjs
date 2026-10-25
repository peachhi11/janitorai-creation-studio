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
const ossarWorkflow = readFileSync(
  resolve(process.cwd(), "../.github/workflows/ossar.yml"),
  "utf8"
);

test("dependency audit workflow installs and audits the nested package", () => {
  assert.match(workflow, /working-directory: janitorai-bot-creator/);
  assert.match(workflow, /runs-on: ubuntu-24\.04/);
  assert.match(workflow, /actions\/checkout@v5/);
  assert.match(workflow, /actions\/setup-node@v5/);
  assert.match(workflow, /node-version: ['"]?20/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm audit --audit-level=high/);
});

test("test workflow runs the complete package suite", () => {
  assert.match(testWorkflow, /working-directory: janitorai-bot-creator/);
  assert.match(testWorkflow, /runs-on: ubuntu-24\.04/);
  assert.match(testWorkflow, /actions\/checkout@v5/);
  assert.match(testWorkflow, /actions\/setup-node@v5/);
  assert.match(testWorkflow, /node-version: ['"]?20/);
  assert.match(testWorkflow, /npm ci/);
  assert.match(testWorkflow, /npm test/);
});

test("OSSAR workflow scans supported branches and uploads SARIF", () => {
  assert.match(ossarWorkflow, /name: OSSAR/);
  assert.match(ossarWorkflow, /branches: \[main\]/g);
  assert.match(ossarWorkflow, /cron: ["']41 3 \* \* 2["']/);
  assert.match(ossarWorkflow, /runs-on: windows-latest/);
  assert.match(ossarWorkflow, /github\/ossar-action@v1/);
  assert.match(ossarWorkflow, /github\/codeql-action\/upload-sarif@v4/);
  assert.match(ossarWorkflow, /security-events: write/);
  assert.match(
    ossarWorkflow,
    /sarif_file: \$\{\{ steps\.ossar\.outputs\.sarifFile \}\}/
  );
});
