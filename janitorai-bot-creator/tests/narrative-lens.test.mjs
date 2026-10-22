import test from "node:test";
import assert from "node:assert/strict";
import { NARRATIVE_LENS } from "../lib/narrative-lens.mjs";

test("narrative lens preserves unsanitised fictional direction", () => {
  assert.match(NARRATIVE_LENS, /fictional creative writing/i);
  assert.match(NARRATIVE_LENS, /Do not moralise/i);
  assert.match(NARRATIVE_LENS, /Do not force redemption/i);
  assert.match(NARRATIVE_LENS, /Do not infer the author's beliefs/i);
});

test("narrative lens keeps platform constraints scoped", () => {
  assert.match(NARRATIVE_LENS, /genuinely applicable/i);
});
