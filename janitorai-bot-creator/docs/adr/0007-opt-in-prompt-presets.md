# ADR 0007: Make authorial prompt presets explicit and opt-in

- Status: Accepted
- Date: 2026-10-22

## Context

A genre and relationship-intensity preference file was added to the repository but was not connected to generation. Implicitly applying it would risk changing unrelated creations; ignoring it would make the library misleading.

## Decision

Expose prompt presets through a small registry. The create-character tool accepts an optional `promptPreset`; only an explicitly selected preset is loaded and appended to that generation task. No preset is applied by default.

## Consequences

- Authorial direction is explicit at the call site.
- The dark-romance preset remains available without becoming a global instruction.
- Unknown presets fail clearly.
- Preset files are validated when selected; a future registry can add more presets without changing the public generation contract.
