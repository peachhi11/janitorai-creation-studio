import path from "node:path";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const knowledgeDirectory = new URL("../knowledge/", import.meta.url);
export const supportedReferenceExtensions = new Set([".md", ".markdown", ".txt", ".json", ".csv", ".pdf"]);
const fallbackEntries = [
  "Advanced Janitor AI Creator Master Guide — Community Edition 1.0",
  "Authentic Cross-Cultural English A Writer's Guide to Accents, Speech Patterns & Linguistic Authenticity Community Edition — Version 1.0",
  "Character Psychology & Human Behavior Comprehensive Character Creator's Reference Guide  Community Edition — Version 1.0",
  "Dark Fiction, Moral Ambiguity & Immersive Consent",
  "Human Sexuality & Intimacy Psychology A Comprehensive Character Creator's Reference Guide Community Edition — Version 1.0",
  "Portable User Persona Architecture The Complete Guide to Reusable Roleplay Identities, Character Bibles & Standalone Bot Conversion JanitorAi Bot Creator — Community Edition, Version 1.0",
  "knowledge-manifest.json",
  "unified-names-and-naming-conventions.csv"
];

export function rootPath(directory) {
  return typeof directory === "string" ? directory : fileURLToPath(directory);
}

export function inferReferenceFormat(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (!extension) return "text";
  if (extension === ".pdf") return "pdf";
  if (extension === ".json") return "json";
  if (extension === ".csv" || extension === ".md" || extension === ".markdown" || extension === ".txt") return extension === ".csv" ? "csv" : "text";
  return null;
}

export function discoverReferenceEntries(directory) {
  const root = rootPath(directory);
  if (!existsSync(root)) return [];
  const entries = [];
  const visit = (relative = "") => {
    const absolute = path.join(root, relative);
    for (const item of readdirSync(absolute, { withFileTypes: true })) {
      const child = relative ? path.join(relative, item.name) : item.name;
      if (item.isDirectory()) visit(child);
      else {
        const format = inferReferenceFormat(child);
        if (format) entries.push({ path: child, format });
      }
    }
  };
  visit();
  return entries;
}

export function loadReferenceManifest({ directory = knowledgeDirectory } = {}) {
  const root = rootPath(directory);
  const manifestPath = path.join(root, "knowledge-manifest.json");
  if (!existsSync(manifestPath)) {
    const discovered = discoverReferenceEntries(directory);
    return {
      entries: discovered.length
        ? discovered
        : fallbackEntries.map(filePath => ({ path: filePath, format: inferReferenceFormat(filePath) }))
    };
  }
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    return { ...manifest, entries: Array.isArray(manifest.entries) ? manifest.entries : [] };
  } catch (error) {
    throw new Error("Invalid knowledge-manifest.json: " + error.message);
  }
}

export function normaliseReferenceEntries(manifest, filenames, referenceIds) {
  const requestedPaths = filenames ? new Set(filenames) : null;
  const requestedIds = referenceIds ? new Set(referenceIds) : null;
  let entries = manifest.entries
    .map((entry, index) => ({
      id: entry.id || entry.path || "reference-" + index,
      path: entry.path,
      format: entry.format || inferReferenceFormat(entry.path),
      role: entry.role || "reference",
      purpose: entry.purpose || ""
    }))
    .filter(entry => entry.path);
  if (requestedPaths) entries = entries.filter(entry => requestedPaths.has(entry.path));
  if (requestedIds) entries = entries.filter(entry => requestedIds.has(entry.id) || requestedIds.has(entry.path));
  if (requestedPaths) {
    for (const filePath of requestedPaths) {
      if (!entries.some(entry => entry.path === filePath) && inferReferenceFormat(filePath)) {
        entries.push({ id: filePath, path: filePath, format: inferReferenceFormat(filePath), role: "reference", purpose: "" });
      }
    }
  }
  return entries;
}

export function createReferenceIndex(root = process.env.REFERENCE_LIBRARY_DIR || "./knowledge") {
  async function listFiles(relative = "", declared = null) {
    const manifestPaths = declared || new Set(loadReferenceManifest({ directory: root }).entries.map(entry => entry.path));
    const absolute = path.join(rootPath(root), relative);
    const entries = await readdir(absolute, { withFileTypes: true });
    const output = [];
    for (const entry of entries) {
      const child = path.join(relative, entry.name);
      if (entry.isDirectory()) output.push(...await listFiles(child, manifestPaths));
      else if (supportedReferenceExtensions.has(path.extname(entry.name).toLowerCase()) || (!path.extname(entry.name) && manifestPaths.has(child))) output.push(child);
    }
    return output;
  }

  return {
    manifest: () => loadReferenceManifest({ directory: root }),
    entries: () => normaliseReferenceEntries(loadReferenceManifest({ directory: root })),
    listFiles
  };
}

export { knowledgeDirectory };
