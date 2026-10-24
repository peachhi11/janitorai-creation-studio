import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import {
  knowledgeDirectory,
  rootPath,
  loadReferenceManifest,
  normaliseReferenceEntries,
} from "./reference-index.mjs";
const MAX_SCORING_ENTRIES = 32;
const MAX_SCORING_CHUNKS = 1_024;
const MAX_SCORING_CHARS_PER_CHUNK = 2_000;
const MAX_QUERY_CHARS = 4_096;

export const loadKnowledgeManifest = loadReferenceManifest;
function splitParagraphs(text) { return text.split(/\n\s*\n/).map(value => value.replace(/\s+/g, " ").trim()).filter(value => value.length > 120); }
function splitLines(text) { return text.split(/\r?\n/).map(value => value.replace(/\s+/g, " ").trim()).filter(Boolean); }
function extract(entry, root) {
  const filePath = join(root, entry.path); if (!existsSync(filePath)) return [];
  if (entry.format === "pdf") return splitParagraphs(execFileSync("pdftotext", ["-layout", filePath, "-"], { encoding: "utf8", maxBuffer: 15 * 1024 * 1024 }));
  const raw = readFileSync(filePath, "utf8");
  if (entry.format === "json") { try { return splitLines(JSON.stringify(JSON.parse(raw), null, 2)); } catch { return splitLines(raw); } }
  return entry.format === "csv" ? splitLines(raw) : splitParagraphs(raw);
}

export function getKnowledgeContextDetails(query = "", { directory = knowledgeDirectory, filenames, referenceIds, maxSources = 0 } = {}) {
  const entries = normaliseReferenceEntries(loadKnowledgeManifest({ directory }), filenames, referenceIds).slice(0, MAX_SCORING_ENTRIES);
  const rawQuery = String(query);
  const clippedQuery = rawQuery.slice(0, MAX_QUERY_CHARS);
  const queryText = rawQuery.length > MAX_QUERY_CHARS ? clippedQuery.slice(0, Math.max(0, clippedQuery.search(/\s+\S*$/))) : clippedQuery;
  const keywords = [...new Set(queryText.toLowerCase().match(/[a-z]{4,}/g) || [])].slice(0, 64);
  const chunksPerEntry = Math.max(1, Math.floor(MAX_SCORING_CHUNKS / Math.max(entries.length, 1)));
  const ranked = [];
  for (const entry of entries) {
    try {
      const paragraphs = extract(entry, rootPath(directory)).slice(0, chunksPerEntry);
      const selected = paragraphs.map(text => {
        const searchableText = text.slice(0, MAX_SCORING_CHARS_PER_CHUNK).toLowerCase();
        return { text, score: keywords.reduce((sum, word) => sum + Number(searchableText.includes(word)), 0) };
      }).sort((a, b) => b.score - a.score).slice(0, 3);
      if (selected.length) ranked.push({ entry, selected, score: selected[0].score });
    } catch { /* A missing PDF converter does not block creation. */ }
  }
  ranked.sort((a, b) => b.score - a.score);
  const limit = queryText.trim() ? (maxSources || 4) : (maxSources || ranked.length);
  const selected = ranked.slice(0, limit);
  return { text: selected.map(({ entry, selected: paragraphs }) => "SOURCE: " + entry.path + "\n" + paragraphs.map(item => item.text.slice(0, 1500)).join("\n")).join("\n\n").slice(0, 18000), sources: selected.map(({ entry, score }) => ({ id: entry.id, path: entry.path, role: entry.role, purpose: entry.purpose, score })) };
}
export function getKnowledgeContext(query, options = {}) { return getKnowledgeContextDetails(query, options).text; }
