import test from "node:test";
import assert from "node:assert/strict";
import { NARRATIVE_LENS, withNarrativeLens } from "../lib/narrative-lens.mjs";
import {
  buildCreateInstructions,
  buildRevisionInstructions,
} from "../lib/creator-policy.mjs";

test("narrative lens preserves unsanitised fictional direction", () => {
  assert.match(NARRATIVE_LENS, /FICTIONAL GENRE LOGIC \/ NARRATIVE INTENTION/);
  assert.match(NARRATIVE_LENS, /fictional creative writing/i);
  assert.match(NARRATIVE_LENS, /internal consistency/i);
  assert.match(NARRATIVE_LENS, /mechanical checklists/i);
  assert.match(NARRATIVE_LENS, /Do not moralise/i);
  assert.match(NARRATIVE_LENS, /Do not force redemption/i);
  assert.match(NARRATIVE_LENS, /Do not infer the author's beliefs/i);
});

test("narrative lens keeps platform constraints scoped", () => {
  assert.match(NARRATIVE_LENS, /genuinely applicable/i);
});

test("runtime instruction composition prepends the shared lens", () => {
  const instructions = withNarrativeLens(
    "Role-specific generation instructions."
  );
  assert.ok(instructions.startsWith(NARRATIVE_LENS));
  assert.match(instructions, /Role-specific generation instructions\.$/);
});

test("standalone creator create and revision policies share the narrative lens", () => {
  const create = buildCreateInstructions("Standalone creator instructions.");
  const revise = buildRevisionInstructions("Standalone revision instructions.");
  assert.ok(create.startsWith(NARRATIVE_LENS));
  assert.ok(revise.startsWith(NARRATIVE_LENS));
  assert.match(create, /Standalone creator instructions\./);
  assert.match(revise, /Standalone revision instructions\./);
});
