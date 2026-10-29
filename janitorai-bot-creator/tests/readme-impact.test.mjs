import test from "node:test";
import assert from "node:assert/strict";
import {
  checkReadmeImpact,
  readmeImpactPaths,
} from "../../scripts/check-readme-impact.mjs";

test("README-impact checker flags runtime policy changes without README", () => {
  const result = checkReadmeImpact([
    "janitorai-bot-creator/lib/narrative-lens.mjs",
  ]);
  assert.equal(result.required, true);
  assert.deepEqual(result.impacted, [
    "janitorai-bot-creator/lib/narrative-lens.mjs",
  ]);
});

test("README-impact checker passes when README accompanies a protected change", () => {
  const result = checkReadmeImpact([
    "janitorai-bot-creator/lib/narrative-lens.mjs",
    "README.md",
  ]);
  assert.equal(result.ok, true);
  assert.equal(result.required, false);
});

test("README-impact checker ignores ordinary test-only changes", () => {
  assert.deepEqual(
    readmeImpactPaths(["janitorai-bot-creator/tests/example.test.mjs"]),
    []
  );
  assert.equal(
    checkReadmeImpact(["janitorai-bot-creator/tests/example.test.mjs"]).ok,
    true
  );
});
