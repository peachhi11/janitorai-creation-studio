import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const supported = new Set([".md", ".markdown", ".txt", ".json", ".pdf"]);

export function createReferenceLibrary(root = process.env.REFERENCE_LIBRARY_DIR || "./knowledge") {
  const directory = path.resolve(root);
  async function files(relative = "") {
    const base = path.resolve(directory, relative);
    if (!base.startsWith(directory)) throw new Error("Reference path escapes the configured library.");
    const entries = await readdir(base, { withFileTypes: true });
    const output = [];
    for (const entry of entries) {
      const child = path.join(base, entry.name);
      if (entry.isDirectory()) output.push(...await files(path.relative(directory, child)));
      else if (supported.has(path.extname(entry.name).toLowerCase())) output.push(path.relative(directory, child));
    }
    return output;
  }
  async function read(relative) {
    const target = path.resolve(directory, relative);
    if (!target.startsWith(directory)) throw new Error("Reference path escapes the configured library.");
    const extension = path.extname(target).toLowerCase();
    if (!supported.has(extension)) throw new Error("Unsupported reference type.");
    if (extension !== ".pdf") return { path: relative, type: extension.slice(1), text: await readFile(target, "utf8") };
    try {
      const { stdout } = await execFileAsync("pdftotext", ["-layout", target, "-"]);
      return { path: relative, type: "pdf", text: stdout, extraction: "pdftotext" };
    } catch {
      return { path: relative, type: "pdf", text: null, extraction: "unavailable", message: "Install poppler/pdftotext for PDF text extraction." };
    }
  }
  return {
    async list() {
      return (await files()).map(file => ({ path: file, name: path.basename(file), extension: path.extname(file).slice(1) }));
    },
    async search(query) {
      const matches = [];
      for (const file of await files()) {
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
