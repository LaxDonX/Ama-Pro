# Development Workflow

This document is a lightweight working agreement.
It is not a final company process.
The rules can change as the project becomes clearer.

## Current Stage

Ama-Pro is in the early platform-shell stage.

The current priority is:

1. Keep the repository organized.
2. Build the frontend and backend around a common task flow.
3. Avoid locking the project into one specific tool too early.
4. Keep future tool modules easy to plug in.

## Branch Rule

Keep `main` stable.

For new work, create a feature branch:

```text
feature/web-shell
feature/api-task-flow
feature/ads-module
feature/upload-download
feature/task-history
```

For fixes, use:

```text
fix/upload-error
fix/task-status-bug
```

Small documentation changes can be committed directly when the project is still early.

## Collaboration Rule

Different people should mainly work in different areas:

```text
apps/web              Frontend
apps/api              Backend
tools/<tool_name>     Tool modules
shared/               Shared schemas and utilities
docs/                 Product, API, and workflow docs
samples/              Test samples
```

If a change affects multiple areas, write down the reason in the commit or pull request.

## API Rule

Frontend and backend should follow `docs/api.md`.

If the API changes:

1. Update `docs/api.md`.
2. Update frontend mock data if needed.
3. Update backend response format if needed.
4. Test the related flow again.

## Module Rule

Real business logic should live under `tools/<tool_name>/`.

Example:

```text
tools/amazon_ads/
  logic.py
  rules.py
  schema.py
  tests/
  samples/
  changelog.md
```

The frontend should not directly know the internal logic of a tool.
The backend should call tool modules through a stable task interface.

## Data Safety

Do not commit:

- real customer data
- private ad reports
- API keys
- passwords
- `.env` files
- generated output files that are not deliberate test fixtures

If sample files are needed, use cleaned or fake data.

## Practical Rule

When unsure, prefer a small clear change:

1. Write the current assumption.
2. Build the smallest useful version.
3. Test it.
4. Update the document if the assumption changes.

