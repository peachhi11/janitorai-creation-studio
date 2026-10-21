import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export function createCharacterStore(root = process.env.CHARACTER_LIBRARY_DIR || "./data/characters") {
  const directory = path.resolve(root);
  const ensure = () => mkdir(directory, { recursive: true });
  const fileFor = id => path.join(directory, `${id}.json`);
  const idFor = value => value.id || value.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID();

  return {
    async save(record) {
      await ensure();
      const now = new Date().toISOString();
      const id = idFor(record);
      const previous = await this.get(id).catch(() => null);
      const saved = { ...record, id, updatedAt: now, createdAt: previous?.createdAt || now };
      await writeFile(fileFor(id), JSON.stringify(saved, null, 2), "utf8");
      return saved;
    },
    async get(id) {
      return JSON.parse(await readFile(fileFor(id), "utf8"));
    },
    async list() {
      await ensure();
      const names = (await readdir(directory)).filter(name => name.endsWith(".json"));
      return Promise.all(names.map(name => this.get(name.slice(0, -5))));
    },
    async remove(id) {
      await unlink(fileFor(id));
      return { id, deleted: true };
    }
  };
}
