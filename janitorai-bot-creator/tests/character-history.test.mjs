import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { syncBuiltinESMExports } from "node:module";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { createCharacterStore } from "../lib/character-store.mjs";
import { createCharacterApplication } from "../lib/application.mjs";
import { registerMcpTools } from "../lib/mcp-tools.mjs";

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "character-history-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return { root, store: createCharacterStore(root) };
}

test("repeated saves survive reopening and restore archives the displaced current record", async t => {
  const { root, store } = await fixture(t);
  const first = await store.save({ id: "mara", name: "Mara", details: { hair: "black" } });
  assert.deepEqual(await store.listRevisions("mara"), []);
  const second = await store.save({ id: "mara", name: "Mara II" });
  const third = await store.save({ id: "mara", name: "Mara III" });
  const reopened = createCharacterStore(root);
  const versions = await reopened.listRevisions("mara");
  assert.equal(versions.length, 2);
  assert.deepEqual((await reopened.getRevision("mara", versions[0].revisionId)).record, first);
  assert.deepEqual((await reopened.getRevision("mara", versions[1].revisionId)).record, second);
  const restored = await reopened.restoreRevision("mara", versions[0].revisionId);
  assert.deepEqual(restored.details, first.details);
  assert.equal(restored.createdAt, first.createdAt);
  const after = await reopened.listRevisions("mara");
  assert.equal(after.length, 3);
  assert.deepEqual((await reopened.getRevision("mara", after[2].revisionId)).record, third);
  assert.equal((await reopened.list()).length, 1);
});

test("legacy records retain all original fields on their first subsequent save", async t => {
  const { root, store } = await fixture(t);
  const legacy = { name: "Legacy", custom: [1, { a: true }], createdAt: "2020-01-01" };
  await fs.writeFile(path.join(root, "legacy.json"), JSON.stringify(legacy));
  const saved = await store.save({ id: "legacy", name: "New" });
  assert.equal(saved.createdAt, legacy.createdAt);
  const [revision] = await store.listRevisions("legacy");
  assert.deepEqual((await store.getRevision("legacy", revision.revisionId)).record, legacy);
});

test("invalid IDs and missing revisions never mutate records", async t => {
  const { store } = await fixture(t);
  const initial = await store.save({ id: "safe", name: "Safe" });
  for (const id of ["../escape", "/tmp/escape", "..", "a/b", "a\\b", "a\0b", ""]) {
    await assert.rejects(() => store.save({ id }), /Invalid record identifier/);
    await assert.rejects(() => store.listRevisions(id), /Invalid record identifier/);
    await assert.rejects(() => store.restoreRevision(id, "a".repeat(64)), /Invalid record identifier/);
  }
  for (const revision of ["../escape", "/tmp/x", "", "a".repeat(63), "G".repeat(64)]) {
    await assert.rejects(() => store.getRevision("safe", revision), /Invalid revision identifier/);
    await assert.rejects(() => store.restoreRevision("safe", revision), /Invalid revision identifier/);
  }
  await assert.rejects(() => store.restoreRevision("safe", "a".repeat(64)), /not found/);
  assert.deepEqual(await store.get("safe"), initial);
});

test("malformed current or history data blocks replacement", async t => {
  const { root, store } = await fixture(t);
  await fs.writeFile(path.join(root, "bad.json"), "broken");
  await assert.rejects(() => store.save({ id: "bad" }), SyntaxError);
  assert.equal(await fs.readFile(path.join(root, "bad.json"), "utf8"), "broken");
  await fs.writeFile(path.join(root, "null.json"), "null");
  await assert.rejects(() => store.save({ id: "null" }), /Invalid character record/);
  const initial = await store.save({ id: "safe" });
  await fs.mkdir(path.join(root, ".history"));
  await fs.writeFile(path.join(root, ".history/safe.json"), "{}");
  await assert.rejects(() => store.save({ id: "safe", name: "New" }), /Invalid character history/);
  assert.deepEqual(await store.get("safe"), initial);
});

test("concurrent store instances either preserve the preceding version or reject as busy", async t => {
  const { root, store } = await fixture(t);
  const first = await store.save({ id: "same", name: "first" });
  const outcomes = await Promise.allSettled(Array.from({ length: 12 }, (_, i) =>
    createCharacterStore(root).save({ id: "same", name: `writer-${i}` })));
  const successes = outcomes.filter(x => x.status === "fulfilled");
  assert.ok(successes.length >= 1);
  for (const result of outcomes.filter(x => x.status === "rejected")) assert.match(result.reason.message, /busy/);
  const archived = await Promise.all((await store.listRevisions("same")).map(x => store.getRevision("same", x.revisionId)));
  const all = [...archived.map(x => x.record), await store.get("same")];
  for (const record of [first, ...successes.map(x => x.value)]) assert.ok(all.some(x => JSON.stringify(x) === JSON.stringify(record)));
});

test("archive and current rename failures preserve current data and release locks", async t => {
  const { root, store } = await fixture(t);
  const initial = await store.save({ id: "safe", name: "Original" });
  const originalRename = fs.rename;
  for (const stage of ["archive", "current"]) {
    fs.rename = async (source, target) => {
      if ((stage === "archive") === target.includes(`${path.sep}.history${path.sep}`)) throw new Error("Injected rename failure");
      return originalRename(source, target);
    };
    syncBuiltinESMExports();
    try { await assert.rejects(() => store.save({ id: "safe", name: "Changed" }), /Injected rename failure/); }
    finally { fs.rename = originalRename; syncBuiltinESMExports(); }
    assert.deepEqual(await store.get("safe"), initial);
    assert.equal((await fs.readdir(root)).some(x => x.endsWith(".tmp") || x.endsWith(".lock")), false);
    if (stage === "archive") assert.deepEqual(await store.listRevisions("safe"), []);
    else assert.equal((await store.listRevisions("safe")).length, 1);
  }
  await store.save({ id: "safe", name: "Retry" });
  assert.equal((await store.listRevisions("safe")).length, 1);
  assert.equal((await fs.readdir(path.join(root, ".history"))).some(x => x.endsWith(".tmp")), false);
});

test("symlinked current records and history directories are rejected", async t => {
  const { root, store } = await fixture(t);
  await fs.writeFile(path.join(root, "target"), '{"name":"keep"}');
  await fs.symlink(path.join(root, "target"), path.join(root, "linked.json"));
  await assert.rejects(() => store.save({ id: "linked" }), /symlinks/);
  await store.save({ id: "safe" });
  await fs.mkdir(path.join(root, "elsewhere"));
  await fs.symlink(path.join(root, "elsewhere"), path.join(root, ".history"));
  await assert.rejects(() => store.save({ id: "safe" }), /symlinks/);
});

test("MCP list/read/restore tools use the real application and return errors safely", async t => {
  const { store } = await fixture(t);
  const app = createCharacterApplication({ characterStore: store });
  const tools = new Map();
  registerMcpTools({ registerTool: (name, config, handler) => tools.set(name, handler) }, app);
  const call = (name, args) => tools.get(name)(args);
  await call("save_character", { record: { id: "mara", name: "Original", payload: "custom payload", display: "custom display" } });
  await call("save_character", { record: { id: "mara", name: "Changed" } });
  const listed = await call("list_character_revisions", { id: "mara" });
  const { revisionId } = listed.structuredContent.revisions[0];
  const read = await call("get_character_revision", { id: "mara", revisionId });
  assert.equal(read.structuredContent.record.name, "Original");
  const restored = await call("restore_character_revision", { id: "mara", revisionId });
  assert.equal(restored.structuredContent.name, "Original");
  assert.equal(restored.structuredContent.payload, "custom payload");
  assert.equal(JSON.parse(restored.content[0].text).display, "custom display");
  assert.equal((await app.listCharacterRevisions("mara")).length, 2);
  assert.equal((await call("restore_character_revision", { id: "mara", revisionId: "../bad" })).isError, true);
});

test("separate writer processes preserve every successful save", async t => {
  const { root, store } = await fixture(t);
  const initial = await store.save({ id: "shared", name: "Initial" });
  const moduleUrl = new URL("../lib/character-store.mjs", import.meta.url).href;
  const script = `import { createCharacterStore } from ${JSON.stringify(moduleUrl)};
    try { console.log(JSON.stringify(await createCharacterStore(process.argv[1]).save({id:"shared", name:process.argv[2]}))); }
    catch (error) { if (!error.message.includes("busy")) throw error; console.log("null"); }`;
  const results = await Promise.all(Array.from({ length: 8 }, (_, i) =>
    promisify(execFile)(process.execPath, ["--input-type=module", "-e", script, root, `child-${i}`])));
  const successful = results.map(x => JSON.parse(x.stdout)).filter(Boolean);
  assert.ok(successful.length > 0);
  const archived = await Promise.all((await store.listRevisions("shared")).map(x => store.getRevision("shared", x.revisionId)));
  const records = [...archived.map(x => x.record), await store.get("shared")];
  for (const record of [initial, ...successful]) assert.ok(records.some(x => JSON.stringify(x) === JSON.stringify(record)));
});

test("remove archives current data and permits restoration after deletion", async t => {
  const { store } = await fixture(t);
  const initial = await store.save({ id: "removed", name: "Preserved" });
  await store.remove("removed");
  assert.deepEqual(await store.list(), []);
  const [version] = await store.listRevisions("removed");
  assert.deepEqual((await store.getRevision("removed", version.revisionId)).record, initial);
  assert.equal((await store.restoreRevision("removed", version.revisionId)).name, "Preserved");
});
