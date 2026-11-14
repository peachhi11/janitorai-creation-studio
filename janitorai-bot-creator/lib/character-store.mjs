import crypto from "node:crypto";
import { lstat, mkdir, rmdir } from "node:fs/promises";
import { createScopedFileStore, assertSafeIdentifier } from "./file-store.mjs";

export function createCharacterStore(root = process.env.CHARACTER_LIBRARY_DIR || "./data/characters") {
  const files = createScopedFileStore(root);
  const history = createScopedFileStore(files.resolve(".history"));
  const idFor = value => {
    if (value.id !== undefined && value.id !== null) return assertSafeIdentifier(value.id);
    const generated = value.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return assertSafeIdentifier(generated || crypto.randomUUID());
  };
  const fileFor = id => assertSafeIdentifier(id) + ".json";
  const revisionIdFor = id => {
    if (typeof id !== "string" || !/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid revision identifier.");
    return id;
  };
  async function rejectSymlink(target) {
    const stat = await lstat(target).catch(error => {
      if (error.code !== "ENOENT") throw error;
    });
    if (stat?.isSymbolicLink()) throw new Error("Character storage symlinks are not supported.");
  }
  async function readOptional(store, name) {
    await rejectSymlink(store.resolve(name));
    try { return await store.readJson(name); }
    catch (error) { if (error.code === "ENOENT") return undefined; throw error; }
  }
  async function revisions(id) {
    const name = fileFor(id);
    await rejectSymlink(history.directory);
    const entries = await readOptional(history, name);
    if (entries !== undefined && !Array.isArray(entries)) throw new Error("Invalid character history.");
    return entries || [];
  }
  async function locked(id, action) {
    fileFor(id);
    await files.ensure();
    const lock = files.resolve(`.${id}.lock`);
    try { await mkdir(lock); }
    catch (error) {
      if (error.code === "EEXIST") throw new Error(`Character ${id} is busy; retry after the active write completes (or inspect a stale lock).`);
      throw error;
    }
    try { return await action(); }
    finally { await rmdir(lock); }
  }
  async function archive(id, record) {
    const entries = await revisions(id);
    const revisionId = crypto.createHash("sha256").update(JSON.stringify(record)).digest("hex");
    if (!entries.some(entry => entry.revisionId === revisionId)) {
      entries.push({ revisionId, archivedAt: new Date().toISOString(), record });
      await history.writeJsonAtomic(fileFor(id), entries);
    }
  }
  async function saveLocked(id, record) {
    const previous = await readOptional(files, fileFor(id));
    if (previous !== undefined && (!previous || typeof previous !== "object" || Array.isArray(previous))) {
      throw new Error("Invalid character record.");
    }
    const now = new Date().toISOString();
    const saved = { ...record, id, updatedAt: now, createdAt: previous?.createdAt || now };
    // Serialize before archiving so invalid input cannot change either file.
    const snapshot = JSON.parse(JSON.stringify(saved));
    if (previous !== undefined) await archive(id, previous);
    await files.writeJsonAtomic(fileFor(id), snapshot);
    return snapshot;
  }
  const getRevision = async (id, revisionId) => {
    fileFor(id);
    revisionIdFor(revisionId);
    const entry = (await revisions(id)).find(entry => entry.revisionId === revisionId);
    if (!entry) throw new Error("Character revision not found.");
    return entry;
  };
  return {
    async save(record) {
      // Detach caller-owned data before waiting for filesystem operations.
      const snapshot = JSON.parse(JSON.stringify(record));
      const id = idFor(snapshot);
      return locked(id, () => saveLocked(id, snapshot));
    },
    get(id) {
      const name = fileFor(id);
      return rejectSymlink(files.resolve(name)).then(() => files.readJson(name));
    },
    async list() {
      const names = await files.listNames(".json");
      return Promise.all(names.map(name => this.get(name.slice(0, -5))));
    },
    async listRevisions(id) {
      return (await revisions(id)).map(({ revisionId, archivedAt, record }) => ({
        revisionId, archivedAt, updatedAt: record.updatedAt, createdAt: record.createdAt,
        name: record.name || record.Name
      }));
    },
    getRevision,
    async restoreRevision(id, revisionId) {
      fileFor(id);
      revisionIdFor(revisionId);
      return locked(id, async () => {
        const { record } = await getRevision(id, revisionId);
        return saveLocked(id, record);
      });
    },
    async remove(id) {
      return locked(id, async () => {
        const record = await this.get(id);
        await archive(id, record);
        await files.remove(fileFor(id));
        return { id, deleted: true };
      });
    }
  };
}
