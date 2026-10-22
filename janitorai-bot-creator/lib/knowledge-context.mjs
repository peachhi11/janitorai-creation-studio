import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const knowledgeDirectory = new URL("../knowledge/", import.meta.url);
const fallbackEntries = ["Advanced Janitor AI Creator Master Guide — Community Edition 1.0", "Authentic Cross-Cultural English A Writer's Guide to Accents, Speech Patterns & Linguistic Authenticity Community Edition — Version 1.0", "Character Psychology & Human Behavior Comprehensive Character Creator's Reference Guide  Community Edition — Version 1.0", "Dark Fiction, Moral Ambiguity & Immersive Consent", "Human Sexuality & Intimacy Psychology A Comprehensive Character Creator's Reference Guide Community Edition — Version 1.0", "Portable User Persona Architecture The Complete Guide to Reusable Roleplay Identities, Character Bibles & Standalone Bot Conversion JanitorAi Bot Creator — Community Edition, Version 1.0", "knowledge-manifest.json", "unified-names-and-naming-conventions.csv"];

function rootPath(directory) { return typeof directory === "string" ? directory : fileURLToPath(directory); }
function inferFormat(filePath) { const extension = extname(filePath).toLowerCase(); return extension === "" ? "text" : extension === ".pdf" ? "pdf" : extension === ".json" ? "json" : extension === ".csv" ? "csv" : extension === ".md" || extension === ".markdown" || extension === ".txt" ? "text" : null; }

export function loadKnowledgeManifest({ directory = knowledgeDirectory } = {}) {
  const path = join(rootPath(directory), "knowledge-manifest.json");
  if (!existsSync(path)) return { entries: fallbackEntries.map(filePath => ({ path: filePath, format: inferFormat(filePath) })) };
  try { const manifest = JSON.parse(readFileSync(path, "utf8")); return { ...manifest, entries: Array.isArray(manifest.entries) ? manifest.entries : [] }; }
  catch (error) { throw new Error("Invalid knowledge-manifest.json: " + error.message); }
}

function normaliseEntries(manifest, filenames, referenceIds) {
  const requestedPaths = filenames ? new Set(filenames) : null;
  const requestedIds = referenceIds ? new Set(referenceIds) : null;
  let entries = manifest.entries.map((entry, index) => ({ id: entry.id || entry.path || "reference-" + index, path: entry.path, format: entry.format || inferFormat(entry.path), role: entry.role || "reference", purpose: entry.purpose || "" })).filter(entry => entry.path);
  if (requestedPaths) entries = entries.filter(entry => requestedPaths.has(entry.path));
  if (requestedIds) entries = entries.filter(entry => requestedIds.has(entry.id) || requestedIds.has(entry.path));
  if (requestedPaths) {
    for (const path of requestedPaths) {
      if (!entries.some(entry => entry.path === path) && inferFormat(path)) entries.push({ id: path, path, format: inferFormat(path), role: "reference", purpose: "" });
    }
  }
  return entries;
}
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
  const entries = normaliseEntries(loadKnowledgeManifest({ directory }), filenames, referenceIds);
  const keywords = String(query).toLowerCase().match(/[a-z]{4,}/g) || [];
  const ranked = [];
  for (const entry of entries) {
    try {
      const paragraphs = extract(entry, rootPath(directory));
      const selected = paragraphs.map(text => ({ text, score: keywords.reduce((sum, word) => sum + Number(text.toLowerCase().includes(word)), 0) })).sort((a, b) => b.score - a.score).slice(0, 3);
      if (selected.length) ranked.push({ entry, selected, score: selected[0].score });
    } catch { /* A missing PDF converter does not block creation. */ }
  }
  ranked.sort((a, b) => b.score - a.score);
  const limit = String(query).trim() ? (maxSources || 4) : (maxSources || ranked.length);
  const selected = ranked.slice(0, limit);
  return { text: selected.map(({ entry, selected: paragraphs }) => "SOURCE: " + entry.path + "\n" + paragraphs.map(item => item.text.slice(0, 1500)).join("\n")).join("\n\n").slice(0, 18000), sources: selected.map(({ entry, score }) => ({ id: entry.id, path: entry.path, role: entry.role, purpose: entry.purpose, score })) };
}
export function getKnowledgeContext(query, options = {}) { return getKnowledgeContextDetails(query, options).text; }
