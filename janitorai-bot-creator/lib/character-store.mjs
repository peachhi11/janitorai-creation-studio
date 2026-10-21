import crypto from "node:crypto";
import { createScopedFileStore, assertSafeIdentifier } from "./file-store.mjs";

export function createCharacterStore(root = process.env.CHARACTER_LIBRARY_DIR || "./data/characters") {
  const files = createScopedFileStore(root);
  const idFor = value => {
    if (value.id !== undefined && value.id !== null) return assertSafeIdentifier(value.id);
    const generated = value.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return assertSafeIdentifier(generated || crypto.randomUUID());
  };
  const fileFor = id => assertSafeIdentifier(id) + ".json";
  return {
    async save(record) {
      const now = new Date().toISOString();
      const id = idFor(record);
      const previous = await this.get(id).catch(() => null);
      const saved = { ...record, id, updatedAt: now, createdAt: previous?.createdAt || now };
      await files.writeJsonAtomic(fileFor(id), saved);
      return saved;
    },
    get(id) { return files.readJson(fileFor(id)); },
    async list() {
      const names = await files.listNames(".json");
      return Promise.all(names.map(name => files.readJson(name)));
    },
    async remove(id) { await files.remove(fileFor(id)); return { id, deleted: true }; }
  };
}
