# Ama-Pro

Ama-Pro is an internal tools platform skeleton for Amazon seller workflows.

The first goal is to build the platform shell before plugging in real modules:

- tools catalog
- upload and task flow
- task history
- result download
- modular backend integration

## Planned Structure

```text
Ama-Pro/
  apps/
    web/              Frontend app
    api/              Backend API
  tools/              Business tool modules
  shared/
    schemas/          Shared input/output schemas
    task_runner/      Shared task execution utilities
    file_storage/     Shared file storage utilities
  samples/            Sample files for testing
  docs/               Product and module planning docs
```

## Current Status

This repository currently contains the initial project skeleton only.
Real tool modules will be added later under `tools/`.

