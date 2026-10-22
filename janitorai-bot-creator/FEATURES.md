# JanitorAI Creation Studio — broader feature set

The service now exposes four local, persistence-aware capability groups:

- Reference retrieval: list_references, search_references, and read_reference. Markdown, text, JSON, and PDF files are supported. PDF extraction uses the host pdftotext command when available; the tool reports a clear installation message when it is not.
- Persistent character library: save_character, list_characters, and get_character. Records are JSON files under CHARACTER_LIBRARY_DIR; the default is data/characters.
- Visual character editor: create_visual_character_model and update_visual_character_model. The editor is a constrained structured model for identity, appearance, outfit, palette, and notes.
- Production security: set NODE_ENV=production and MCP_API_TOKEN. Every MCP POST request then requires Authorization: Bearer <token>. HOST is configurable for deployment; keep it on loopback behind a reverse proxy unless external access is intentional.

The persistence and reference tools are deliberately filesystem-backed and local. They do not silently upload Library material or character records to a third party.

## Character revision history

Saving an existing ID archives its complete previous JSON record before replacing
`<id>.json`. Existing records need no migration: their first subsequent save
captures the legacy version, including custom fields. New records have no archived
versions until replaced. History persists in `.history/<id>.json` beneath
`CHARACTER_LIBRARY_DIR`; back up that directory together with the current records.

MCP operations (also exposed by the application seam):

- `list_character_revisions({ id })`: returns `{ revisions }`, oldest archive first,
  with `revisionId`, `archivedAt`, and available name/timestamps.
- `get_character_revision({ id, revisionId })`: returns the full
  `{ revisionId, archivedAt, record }` archive without changing anything.
- `restore_character_revision({ id, revisionId })`: saves that record as current,
  archiving the displaced current version first. It returns the current record
  with a fresh `updatedAt` and the existing character's `createdAt`.

For example, list revisions for `mara`, copy a returned `revisionId`, then pass
both values to the read or restore operation. `get_character` continues to read
current data; history lists contain archived versions only. Revision IDs are
SHA-256 hashes of serialized snapshots; identical snapshots are stored once.
Deleting via the store's `remove` method also archives the current record and
retains history, so an archived version can be restored after deletion.

### Storage behavior and limits

Each mutation acquires an exclusive `.<id>.lock` directory, shared across store
instances/processes using the same local directory. Contention returns a busy
error: retry after the active operation finishes. A process crash can leave a
stale lock; stop writers and verify no operation remains active before manually
removing that lock directory. Locks are never automatically stolen.

History and current JSON each use temporary-file writes followed by atomic
rename. Archive failure prevents replacement; current-write failure may leave an
extra archive of the still-current record, reused on retry. This is **not a
multi-file transaction**, and does not promise power-loss durability (no fsync),
network-filesystem locking semantics, or protection against writers bypassing
this store. A successful current replacement followed by lock-cleanup failure
can report an error; read current data before retrying. Readers see complete
individual files but do not obtain a transactionally consistent pair.

IDs reject traversal; current files and history paths reject symlinks. The root
and its ancestors must be trusted, and checks do not defend against a local
attacker swapping paths during operations. Unreadable/malformed JSON stops saves
rather than treating it as missing. History has no pruning and is rewritten as a
single JSON array per character, so disk use and write cost grow with history.
