# JanitorAI Creation Studio — broader feature set

The service now exposes four local, persistence-aware capability groups:

- Reference retrieval: list_references, search_references, and read_reference. Markdown, text, JSON, and PDF files are supported. PDF extraction uses the host pdftotext command when available; the tool reports a clear installation message when it is not.
- Persistent character library: save_character, list_characters, and get_character. Records are JSON files under CHARACTER_LIBRARY_DIR; the default is data/characters.
- Visual character editor: create_visual_character_model and update_visual_character_model. The editor is a constrained structured model for identity, appearance, outfit, palette, and notes.
- Production security: set NODE_ENV=production and MCP_API_TOKEN. Every MCP POST request then requires Authorization: Bearer <token>. HOST is configurable for deployment; keep it on loopback behind a reverse proxy unless external access is intentional.

The persistence and reference tools are deliberately filesystem-backed and local. They do not silently upload Library material or character records to a third party.
