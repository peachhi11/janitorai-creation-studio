import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getKnowledgeContextDetails } from "../lib/knowledge-context.mjs";
import { registerMcpTools } from "../lib/mcp-tools.mjs";

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "knowledge-context-security-"));
  writeFileSync(join(directory, "knowledge-manifest.json"), JSON.stringify({
    entries: [{ id: "guide", path: "guide.txt", format: "text" }]
  }));
  writeFileSync(
    join(directory, "guide.txt"),
    "Alpha appears in this deliberately long reference paragraph. ".repeat(4)
  );
  return directory;
}

test("reference scoring deduplicates repeated query tokens", () => {
  const directory = fixture();
  try {
    const result = getKnowledgeContextDetails("alpha ".repeat(10_000), { directory, maxSources: 1 });
    assert.equal(result.sources[0].score, 1);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("reference scoring caps the number of unique query tokens", () => {
  const directory = fixture();
  try {
    const words = Array.from({ length: 100 }, (_, index) => {
      const first = String.fromCharCode(97 + Math.floor(index / 26));
      const second = String.fromCharCode(97 + (index % 26));
      return `token${first}${second}`;
    });
    writeFileSync(join(directory, "guide.txt"), words.join(" ").repeat(3));
    const result = getKnowledgeContextDetails(words.join(" "), { directory, maxSources: 1 });
    assert.equal(result.sources[0].score, 64);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("reference scoring bounds the number of chunks inspected", () => {
  const directory = fixture();
  try {
    const ordinary = "A deliberately long ordinary paragraph without the requested term. ".repeat(3);
    const matching = "A deliberately long paragraph containing boundarymatch near its beginning. ".repeat(3);
    writeFileSync(join(directory, "guide.txt"), [...Array(1_024).fill(ordinary), matching].join("\n\n"));
    const result = getKnowledgeContextDetails("boundarymatch", { directory, maxSources: 1 });
    assert.equal(result.sources[0].score, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("reference scoring bounds text inspected within each chunk", () => {
  const directory = fixture();
  try {
    writeFileSync(join(directory, "guide.txt"), `${"ordinary ".repeat(300)} boundarymatch`);
    const result = getKnowledgeContextDetails("boundarymatch", { directory, maxSources: 1 });
    assert.equal(result.sources[0].score, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("reference scoring defensively caps query characters", () => {
  const directory = fixture();
  try {
    writeFileSync(join(directory, "guide.txt"), "A deliberately long paragraph containing boundarymatch. ".repeat(4));
    const query = `${"ordinary ".repeat(600)} boundarymatch`;
    const result = getKnowledgeContextDetails(query, { directory, maxSources: 1 });
    assert.equal(result.sources[0].score, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("MCP generation tools reject oversized reference queries", () => {
  const registrations = new Map();
  const server = {
    registerTool(name, config) {
      registrations.set(name, config);
    }
  };
  registerMcpTools(server, {});
  const referenceQuery = registrations.get("create_character").inputSchema.referenceQuery;
  assert.equal(referenceQuery.safeParse("x".repeat(4_096)).success, true);
  assert.equal(referenceQuery.safeParse("x".repeat(4_097)).success, false);
});
