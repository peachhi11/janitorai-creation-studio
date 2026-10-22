import path from "node:path";
import { readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createScopedFileStore } from "./file-store.mjs";
import { loadKnowledgeManifest } from "./knowledge-context.mjs";

const execFileAsync = promisify(execFile);
const supported = new Set([".md", ".markdown", ".txt", ".json", ".csv", ".pdf"]);

export function createReferenceLibrary(root = process.env.REFERENCE_LIBRARY_DIR || "./knowledge") {
  const files = createScopedFileStore(root);
  async function declaredPaths() { return new Set(loadKnowledgeManifest({ directory: root }).entries.map(entry => entry.path)); }
  async function names(relative = "", declared = null) {
    const manifestPaths = declared || await declaredPaths();
    const entries = await readdir(files.resolve(relative), { withFileTypes: true });
    const output = [];
    for (const entry of entries) {
      const child = path.join(relative, entry.name);
      if (entry.isDirectory()) output.push(...await names(child, manifestPaths));
      else if (supported.has(path.extname(entry.name).toLowerCase()) || (!path.extname(entry.name) && manifestPaths.has(child))) output.push(child);
    }
    return output;
  }
  async function read(relative) {
    const target = files.resolve(relative);
    const manifest = loadKnowledgeManifest({ directory: root });
    const descriptor = manifest.entries.find(entry => entry.path === relative);
    const extension = path.extname(target).toLowerCase();
    const format = descriptor?.format || (extension ? extension.slice(1) : "text");
    if (!descriptor && !supported.has(extension)) throw new Error("Unsupported reference type.");
    if (format !== "pdf") return { path: relative, type: format, text: await files.readText(relative), sourceId: descriptor?.id };
    try { const { stdout } = await execFileAsync("pdftotext", ["-layout", target, "-"]); return { path: relative, type: "pdf", text: stdout, extraction: "pdftotext", sourceId: descriptor?.id }; }
    catch { return { path: relative, type: "pdf", text: null, extraction: "unavailable", message: "Install poppler/pdftotext for PDF text extraction.", sourceId: descriptor?.id }; }
  }
  return {
    async list() { const manifest = loadKnowledgeManifest({ directory: root }); return (await names()).map(file => { const entry = manifest.entries.find(item => item.path === file); return { path: file, name: path.basename(file), extension: path.extname(file).slice(1), sourceId: entry?.id, role: entry?.role }; }); },
    async search(query) { const matches = []; for (const file of await names()) { const item = await read(file); if (!item.text) continue; const index = item.text.toLowerCase().indexOf(query.toLowerCase()); if (index >= 0) matches.push({ path: file, sourceId: item.sourceId, excerpt: item.text.slice(Math.max(0, index - 160), index + query.length + 240) }); } return matches; },
    read
  };
}
