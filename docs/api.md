# API Draft

This document is an early draft.
The project is still exploratory, so these APIs are allowed to change as the frontend, backend, and real tool modules are built.

## Current Goal

The first API goal is not to support every future feature.
It is to define a simple common workflow:

1. Show available tools.
2. Create a processing task.
3. Check task progress.
4. Download task results.
5. View task history.

## Core Concepts

### Tool

A tool is one function module in the platform.

Examples:

- `amazon_ads`: Amazon ads diagnosis
- `listing`: Listing generation
- `image_tools`: Image processing
- `keyword`: Keyword analysis

### Task

A task is one processing job created by a user.

Example:

- upload one Excel file
- choose `amazon_ads`
- backend creates a task
- backend processes the file
- frontend shows status and result download

## Draft Endpoints

### Get Tool List

```text
GET /api/tools
```

Purpose:

Return the tools that the platform can display.

Draft response:

```json
{
  "tools": [
    {
      "id": "amazon_ads",
      "name": "Amazon Ads Diagnosis",
      "status": "planned",
      "description": "Diagnose Amazon ads Excel data and generate action reports."
    }
  ]
}
```

### Create Task

```text
POST /api/tasks
```

Purpose:

Create a task for one tool.

Draft request:

```json
{
  "tool_type": "amazon_ads",
  "params": {
    "target_acos": 0.25
  }
}
```

File uploads can use `multipart/form-data` later.

Draft response:

```json
{
  "task_id": "task_001",
  "status": "queued"
}
```

### Get Task Status

```text
GET /api/tasks/:task_id
```

Purpose:

Return the current task status.

Draft response:

```json
{
  "task_id": "task_001",
  "tool_type": "amazon_ads",
  "status": "completed",
  "progress": 100,
  "message": "Task completed.",
  "result_files": [
    {
      "name": "action_report.xlsx",
      "download_url": "/api/tasks/task_001/files/action_report.xlsx"
    }
  ]
}
```

Allowed task statuses:

- `queued`
- `running`
- `completed`
- `failed`

### Download Result File

```text
GET /api/tasks/:task_id/files/:file_name
```

Purpose:

Download one generated result file.

### Get Task History

```text
GET /api/tasks
```

Purpose:

Return recent tasks.

Draft response:

```json
{
  "tasks": [
    {
      "task_id": "task_001",
      "tool_type": "amazon_ads",
      "status": "completed",
      "created_at": "2026-06-10T00:00:00Z"
    }
  ]
}
```

## Change Rule

When an API changes, update this document in the same pull request or commit.

Do not let frontend and backend rely only on chat messages or memory.

