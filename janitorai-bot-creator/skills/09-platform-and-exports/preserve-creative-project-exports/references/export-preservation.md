# Creative-export preservation checks

## Minimum inventory

| Area       | Record                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| Artefact   | Path, filename, size, hash, media type                                   |
| Origin     | Application, version, account/workspace scope, export trigger            |
| Schema     | Schema identifier, storage version, export version                       |
| Content    | Projects, series, chapters, scenes, cards, codex, prompts, assets        |
| Versions   | Immutable IDs, names, statuses, active selectors, timestamps             |
| Operations | Order arrays, histories, trash, deadlines, ownership, collaborators      |
| External   | Remote assets, linked files, provider data, content excluded from export |

## Privacy scan

Search field names and values for:

- owner, user, account, email, collaborator, invite, UID, UUID;
- filesystem paths, device names, hostnames, URLs, and cloud IDs;
- API keys, tokens, secrets, credentials, cookies, and headers;
- unpublished prose, private notes, prompts, deadlines, and deleted material;
- embedded metadata in images, DOCX, PDF, and archives.

Report categories and locations, not personal values.

## Canonical-record questions

- Which record is edited by the application?
- Which record is the active projection?
- Which copies are immutable snapshots?
- Does an active index agree with active ID and UID?
- Are scene-level fields mirrored inside a selected version?
- Are counts recalculated or authoritative?
- Are deleted items recoverable or intentionally purged?
- Does export order come from arrays, numbers, timestamps, or object insertion?

When evidence is insufficient, preserve all copies and mark the authority unresolved.

## Time handling

Exports may mix epoch seconds, epoch milliseconds, ISO strings, and locale-formatted display dates. Preserve originals. Convert only in derived reports, record the assumed unit and zone, and flag impossible or conflicting dates.

## Restore sampling

Do not inspect only the first record. Sample:

- first, middle, and last hierarchy items;
- smallest and largest content records;
- non-ASCII and multiline text;
- records with multiple versions;
- empty and fully populated records;
- links, arrays, optional nulls, and unknown fields;
- one deleted, archived, or shelved record when present.

## Comparison classes

- **identical:** value and type unchanged;
- **equivalent:** harmless normalisation with same meaning;
- **defaulted:** absent source value became an explicit target default;
- **transformed:** documented representation change;
- **derived:** recalculated from canonical content;
- **unsupported-preserved:** target cannot use it but round trip retains it;
- **accepted loss:** user approved and source is preserved elsewhere;
- **silent loss:** missing or changed without approval;
- **unresolved:** authority or meaning is unknown.

## ProseEngine example cautions

The reviewed `hm_export_v1` sample is an empty-project structural export. It contains duplicated scene data in current records, scene versions, and a book-version snapshot; active selection by index, ID, and UID; mixed timestamp representations; ownership metadata; and a storage-version marker. Use it to infer preservation questions, not to claim a complete schema or tested restore path.

## Publication versus recovery

Keep three outcomes distinct:

- **project recovery:** restores application structure and editing state;
- **portable archive:** preserves content and provenance outside the application;
- **publication export:** formats selected prose for readers or downstream layout.

One file rarely satisfies all three purposes.
