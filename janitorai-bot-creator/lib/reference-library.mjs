import path from "node:path";
import { readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createScopedFileStore } from "./file-store.mjs";

const execFileAsync = promisify(execFile);
const supported = new Set([".md", ".markdown", ".txt", ".json", ".pdf"]);

export function createReferenceLibrary(root = process.env.REFERENCE_LIBRARY_DIR || "./knowledge") {
  const files = createScopedFileStore(root);
  async function names(relative = "") {
    const base = files.resolve(relative);
    const entries = await readdir(base, { withFileTypes: true });
    const output = [];
    for (const entry of entries) {
      const child = path.join(relative, entry.name);
      if (entry.isDirectory()) output.push(...await names(child));
      else if (supported.has(path.extname(entry.name).toLowerCase())) output.push(child);
    }
    return output;
  }
  async function read(relative) {
    const target = files.resolve(relative);
    const extension = path.extname(target).toLowerCase();
    if (!supported.has(extension)) throw new Error("Unsupported reference type.");
    if (extension !== ".pdf") return { path: relative, type: extension.slice(1), text: await files.readText(relative) };
    try {
      const { stdout } = await execFileAsync("pdftotext", ["-layout", target, "-"]);
      return { path: relative, type: "pdf", text: stdout, extraction: "pdftotext" };
    } catch {
      return { path: relative, type: "pdf", text: null, extraction: "unavailable", message: "Install poppler/pdftotext for PDF text extraction." };
    }
  }
  return {
    async list() { return (await names()).map(file => ({ path: file, name: path.basename(file), extension: path.extname(file).slice(1) })); },
    async search(query) {
      const matches = [];
      for (const file of await names()) {
        const item = await read(file);
        if (!item.text) continue;
        const index = item.text.toLowerCase().indexOf(query.toLowerCase());
        if (index >= 0) matches.push({ path: file, excerpt: item.text.slice(Math.max(0, index - 160), index + query.length + 240) });
      }
      return matches;
    },
    read
  };
}
