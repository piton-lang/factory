<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# Set up in a new project

*A step-by-step setup you can follow without knowing the internals.*

This guide sets up a factory in a project. It assumes you can run commands in
the project and use an AI coding agent such as Claude Code, Codex, or OpenCode.

The example command is `factory`. Your project may use a different executable;
the descriptor records the real one.

## Before you start

You need:

- a project in git;
- the Piton CLI (`piton`) available;
- an AI coding agent that can edit files and run commands;
- at least one agent account or subscription;
- a place where finished work should go: a branch, pull request, environment,
  or package.

If `piton --version` does not work, install Piton first. If you are not sure
how, ask your coding agent to install the Piton CLI from the Piton repository.

## Step 1 — Make sure the project has Piton

A Piton project has a `piton.config.pi` at its root. If yours does not, create
one:

```text
use @piton/config
use @piton/belay

from @piton/belay import ClaudeCodeAdapter

export piton-config Project:
    root: ./spec
    entry: ./spec/index.pi

    frameworks:
        - {Belay}

    dependencies:
        - <factory-package-url>

belay-config Belay:
    codeRoot: .
    adapters:
        - {ClaudeCodeAdapter}
```

Replace `<factory-package-url>` with the repository URL you were given. Use the
adapter for the agent tool you actually use.

Create the source root and entry if they do not exist:

```text
spec/
spec/index.pi
```

Put this in `spec/index.pi` so the factory package and its skills are available:

```text
from factory export *
```

If your package installs under a different name, use that name instead of
`factory`.

## Step 2 — Tether and build

```sh
piton tether
piton build
```

`piton tether` downloads the factory package into `tethers/`. `piton build`
generates the guidance and skills your agent reads.

Check that the factory skill appears:

- Claude Code: `.claude/skills/factory-0010-scaffold/`
- Codex: `.agents/skills/factory-0010-scaffold/`
- OpenCode: `.opencode/skills/factory-0010-scaffold/`

If you use another adapter, check where that tool reads skills.

## Step 3 — Ask your agent to scaffold the factory

Open your coding agent in the project and say:

> Use the factory scaffold skill to create a factory implementation in this
> project. Ask me any questions you need, then build and verify the minimal
> core.

The scaffold creates:

- `.factory/project.json` — how the factory is invoked;
- a configuration file — your project's settings;
- the six core commands;
- a minimal dashboard;
- the wiring directory;
- project-owned Piton decisions;
- run instructions;
- a verification report.

It does not overwrite an existing factory. If it finds one, it stops and sends
you to onboarding or enhancement.

## Step 4 — Onboard

Ask your agent:

> Use the factory onboarding skill to configure this factory.

Or run:

```sh
factory onboard
```

You will be asked for the decisions the factory cannot safely guess:

| Topic | What to prepare |
| --- | --- |
| Implementation | The language and entry point you want |
| Harnesses | Claude Code, Codex, OpenCode, or a mix |
| Accounts | Which accounts exist, and whether API or subscription |
| Money | API budgets and subscription limits |
| Builds | Local build machines, remote builders, or both |
| Delivery | Branch, pull request, environment, or package |
| Routing | Which models are approved, and any speed/quality preferences |
| Concurrency | How much work may run at once |
| Policy | The operating rules you approve |

Onboarding writes the configuration, stores durable decisions in project-owned
Piton, and records the approved policy. It does not put secrets in the
specification; it stores references to your credential store.

When it finishes, ask:

```sh
factory status
```

You should see an operational factory with no work yet.

## Step 5 — Start the factory

```sh
factory start
```

`start` also resumes after a shutdown or restart. It reconnects to sessions
that are still alive instead of launching replacements.

## Step 6 — Submit your first order

Keep the first order small and concrete:

```sh
factory submit "Add a health endpoint at /health and document it"
```

The order becomes a plan. You can watch it:

```sh
factory status
```

If your project has a dashboard, its URL is in `.factory/project.json` under
`dashboard`.

## Step 7 — Answer questions

When the factory needs a decision, `status` shows the question and what it
blocks:

```sh
factory status
factory answer <question-id> "Use the existing auth middleware"
```

Only steps that depend on the answer wait. Independent work keeps going.

## Step 8 — Let it deliver

The factory integrates results, runs checks, and delivers to the destination
you chose. An independent agent assesses completion. You get receipts and
evidence, not just a claim that it is done.

## Step 9 — Shut down

```sh
factory shutdown
```

The factory stops starting new work, waits a grace period, preserves unfinished
work, and reports what finished, what was interrupted, what is still running,
and what is waiting for you.

## Step 10 — Verify

Ask your agent:

> Use the factory verify skill to check this implementation against the
> specification.

Verification uses an independent verifier, typed scenarios, a signed write-once
report, and an admission check. A pass expires when the specification,
implementation, descriptor, capabilities, or environment change, or after 90
days.

## What success looks like

A healthy first setup has:

- a valid `.factory/project.json`;
- all six commands runnable;
- an onboarding report that says **operational**;
- a dashboard that loads;
- one small order delivered with receipts;
- a conformance report that is admissible.

## Common problems

**`piton: command not found`**  
Install the Piton CLI and reopen the terminal.

**`factory: command not found`**  
Read `.factory/project.json`. The `invocation` array is the real command. Run
that instead of `factory`.

**Onboarding says "specified" but not "configured"**  
The implementation or configuration is missing. Run the scaffold first.

**Onboarding says "configured" but not "operational"**  
The six-command surface or dashboard is not validated. Run the scaffold
verification report and fix the failing command.

**Status says unresolved**  
An external effect may or may not have happened. Do not force a retry. Read the
status, let the factory investigate, and either confirm the session ended,
confirm no effect happened, or authorize a replacement.

**Status says budget or capacity**  
Read the reason in `status`. The factory is waiting for money, allowance,
build capacity, or a concurrency slot. It is not stalled by accident.

**A configuration change asks for a restart**  
That is expected. There is no hot reload. The new configuration is validated
and applied on restart; if it fails, the previous file is restored.

## Where things live

| Path | What it is |
| --- | --- |
| `.factory/project.json` | How the factory is invoked and where its config is |
| Configuration path in the descriptor | Your project's runtime settings |
| `spec/` | Project-owned Piton decisions and specifications |
| `tethers/` | Installed Piton packages, including the factory |
| `.claude/`, `.agents/`, `.opencode/` | Generated agent guidance and skills |

## Next

- [First run](./quickstart.md)
- [Operating a factory](../guides/operating.md)
- [Recovery](../guides/recovery.md)

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← How it works](./how-it-works.md) · [First run →](./quickstart.md)
