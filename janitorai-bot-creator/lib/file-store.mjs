import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";

function contained(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith(".." + path.sep) && relative !== ".." && !path.isAbsolute(relative));
}

export function createScopedFileStore(root) {
  const directory = path.resolve(root);
  function resolve(relative = "") {
    if (typeof relative !== "string" || relative.includes("\\0")) throw new Error("Invalid file path.");
    const target = path.resolve(directory, relative);
    if (!contained(directory, target)) throw new Error("Path escapes the configured directory.");
    return target;
  }
  async function ensure() { await mkdir(directory, { recursive: true }); }
  async function writeJsonAtomic(relative, value) {
    await ensure();
    const target = resolve(relative);
    const temporary = target + "." + process.pid + "." + crypto.randomUUID() + ".tmp";
    try {
      await writeFile(temporary, JSON.stringify(value, null, 2), { encoding: "utf8", flag: "wx" });
      await rename(temporary, target);
    } finally { await unlink(temporary).catch(() => {}); }
  }
  async function readJson(relative) { return JSON.parse(await readFile(resolve(relative), "utf8")); }
  async function listNames(extension = "") {
    await ensure();
    return (await readdir(directory, { withFileTypes: true }))
      .filter(entry => entry.isFile() && (!extension || entry.name.endsWith(extension)))
      .map(entry => entry.name);
  }
  return {
    directory, ensure, resolve,
    readText: (relative, encoding = "utf8") => readFile(resolve(relative), encoding),
    readJson, listNames, writeJsonAtomic,
    remove: relative => unlink(resolve(relative))
  };
}

export function assertSafeIdentifier(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value) || value === "." || value === "..") throw new Error("Invalid record identifier.");
  return value;
}
