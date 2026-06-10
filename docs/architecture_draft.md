# Architecture Draft

This is an early architecture draft.
It describes the current direction, not a fixed final design.

## Simple Direction

Ama-Pro should be built as a tools platform:

```text
Frontend website
  -> Backend API
    -> Task system
      -> Tool modules
        -> Result files
```

## Repository Areas

```text
apps/web
```

Frontend website.
It should handle pages, forms, upload UI, status UI, and result download UI.

```text
apps/api
```

Backend API.
It should receive requests, create tasks, call modules, store files, and return task status.

```text
tools
```

Business tool modules.
Each future tool should be added as its own folder.

```text
shared
```

Shared schemas and common utilities.
Use this when multiple parts of the system need the same rule or format.

```text
docs
```

Project decisions, drafts, API notes, and workflow notes.

```text
samples
```

Clean test samples.
Do not place private customer files here.

## First Build Target

Build the website shell first with mock data:

1. Tool list page
2. Tool detail page
3. Upload/task creation page
4. Task status page
5. Task history page
6. Result download placeholder

The first real module can be added later.

## Why This Shape

This keeps the platform flexible.

The frontend can be built before the real modules are ready.
The backend can start with mock task behavior.
Each real tool can be plugged in later under `tools/`.

