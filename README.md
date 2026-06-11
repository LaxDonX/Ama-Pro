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

The repository now includes the first frontend shell in `apps/web`.
It uses mock data for the homepage, workspace, tool pages, and task states.
Real tool modules will be added later under `tools/`.

## Frontend Quick Start

```text
cd apps/web
npm install
npm run dev
```

Key routes:

- `/` public homepage and access entry
- `/app` mock workspace
- `/app/tools/ads-diagnosis` first available mock tool page
- `/app/tools/listing-builder` planned module placeholder
