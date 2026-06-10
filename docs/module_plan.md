# Module Plan

## Module Rule

Each real tool should live under `tools/<tool_name>/`.

Example:

```text
tools/
  amazon_ads/
    logic.py
    rules.py
    schema.py
    tests/
    samples/
    changelog.md
```

## Shared Interface

The platform should call tools through a stable task interface:

```json
{
  "tool_type": "amazon_ads",
  "input_files": [],
  "params": {}
}
```

Each tool should return a normalized result:

```json
{
  "status": "success",
  "result_files": [],
  "summary": {}
}
```

## Early Tools

- `amazon_ads`: Amazon ads diagnosis
- `listing`: Listing generation
- `image_tools`: Image processing
- `keyword`: Keyword analysis
- `inventory`: Inventory analysis

