import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createScopedFileStore } from "./file-store.mjs";
import { createReferenceIndex } from "./reference-index.mjs";

const execFileAsync = promisify(execFile);
export function createReferenceLibrary(root = process.env.REFERENCE_LIBRARY_DIR || "./knowledge") {
  const files = createScopedFileStore(root);
  const index = createReferenceIndex(root);
  async function read(relative) {
    const target = files.resolve(relative);
    const manifest = index.manifest();
    const descriptor = manifest.entries.find(entry => entry.path === relative);
    const extension = path.extname(target).toLowerCase();
    const format = descriptor?.format || (extension ? extension.slice(1) : "text");
    if (!descriptor && !index.entries().some(entry => entry.path === relative)) throw new Error("Unsupported reference type.");
    if (format !== "pdf") return { path: relative, type: format, text: await files.readText(relative), sourceId: descriptor?.id };
    try { const { stdout } = await execFileAsync("pdftotext", ["-layout", target, "-"]); return { path: relative, type: "pdf", text: stdout, extraction: "pdftotext", sourceId: descriptor?.id }; }
    catch { return { path: relative, type: "pdf", text: null, extraction: "unavailable", message: "Install poppler/pdftotext for PDF text extraction.", sourceId: descriptor?.id }; }
  }
  return {
    async list() { const manifest = index.manifest(); return (await index.listFiles()).map(file => { const entry = manifest.entries.find(item => item.path === file); return { path: file, name: path.basename(file), extension: path.extname(file).slice(1), sourceId: entry?.id, role: entry?.role }; }); },
    async search(query) { const matches = []; for (const file of await index.listFiles()) { const item = await read(file); if (!item.text) continue; const matchIndex = item.text.toLowerCase().indexOf(query.toLowerCase()); if (matchIndex >= 0) matches.push({ path: file, sourceId: item.sourceId, excerpt: item.text.slice(Math.max(0, matchIndex - 160), matchIndex + query.length + 240) }); } return matches; },
    read
  };
}
