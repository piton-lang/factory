---
title: Commands
description: The six core commands, optional commands, and invocation.
---

## Core commands

| Command | Purpose |
| --- | --- |
| `onboard` | Configure, approve policy, assess existing work, and import |
| `start` | Start or resume, reconnect surviving sessions |
| `submit` | Submit an order from a prompt, specification, or both |
| `status` | Report the operational picture from the terminal |
| `answer` | Answer an escalated engineer question |
| `shutdown` | Stop gracefully and preserve work |

## Optional commands

| Command | Purpose |
| --- | --- |
| `focus` | Direct or reprioritize effort toward an objective, order, bottleneck, or capability |
| `optimize` | Inspect or tune resource policy and routing within approved limits |

A project may provide either through its factory surface or reach the same work
through the conversational agent and packaged skills.

## Invocation

The descriptor at `.factory/project.json` records how the factory is invoked.

- The invocation array has at least one element.
- `argv[0]` is `invocation[0]`; the rest of the array is fixed arguments.
- The standard subcommand is appended immediately after the invocation array.
- The subcommand's own arguments follow it.
- No global option is inserted between them.
- `cwd` applies to the invocation and every subcommand.

Example:

```json
{
  "schemaVersion": 1,
  "invocation": ["python", "-m", "factory"],
  "config": ".factory/config.yaml",
  "specVersion": "0123456789abcdef0123456789abcdef01234567",
  "builtAgainstSpecVersion": "0123456789abcdef0123456789abcdef01234567",
  "dashboard": "http://localhost:8787",
  "capabilities": ["focus", "optimize"]
}
```

A `submit` call becomes:

```text
python -m factory submit "Add a health endpoint"
```

## Dashboard actions

The dashboard exposes `submit` and `answer`. Onboard, start, and shutdown remain
CLI and onboarding surfaces.

Every exposed action uses the same operation envelope and authorization as the
CLI, with one request identifier and one effect.

## Operational notes

- `status` excludes full plans, dependency graphs, historical analytics, and
  drill-down views by default.
- `shutdown` waits a configurable grace period and reports finished,
  interrupted, still-running, and awaiting-input work.
- Agent operations use the same semantic operation contract as human actions.
  They are not a separate API.

## Related

- [Descriptor](/reference/descriptor/)
- [Operations](/reference/operations/)
- [Operating](/guides/operating/)
