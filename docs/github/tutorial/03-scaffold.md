<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# 3. Scaffold the factory

*Ask your agent to create the first runnable factory core.*

In this lesson your agent creates the files that make the factory runnable in
your project.

## Ask the agent

In the project, open your coding agent and say:

> Use the factory scaffold skill to create a factory implementation in this
> project. Ask me any questions you need, then build and verify the minimal
> core.

The agent may ask:

- which language and runtime to use;
- where configuration should live;
- whether you want a local dashboard;
- which package manager to use.

Answer in your own words. The scaffold is technology-agnostic; it supports a
stack it can implement and validate.

## What it creates

The scaffold produces:

- `.factory/project.json` — the descriptor;
- a configuration file at the location you chose;
- a runnable entry point for `onboard`, `start`, `submit`, `status`, `answer`,
  and `shutdown`;
- a minimal dashboard;
- a wiring directory;
- project-owned Piton decisions;
- run instructions;
- a verification report.

It refuses to overwrite an existing factory. If it finds one, it sends you to
onboarding or enhancement instead.

## Checkpoint

Confirm the descriptor exists:

```sh
cat .factory/project.json
```

It should contain at least:

- `schemaVersion`;
- `invocation`;
- `config`;
- `specVersion`;
- `builtAgainstSpecVersion`.

Run the command from `invocation`. For example, if `invocation` is
`["python", "-m", "factory"]`, run:

```sh
python -m factory status
```

You should get a status response, even if the factory is not configured yet.

## If it fails

**The agent says it cannot find the skill**  
Re-run `piton build` and check the skill folder for your adapter. If you still
cannot find it, ask the agent to inspect the tethered package under `tethers/`.

**`factory` is not found**  
Use the exact command in `.factory/project.json` under `invocation`.

**The scaffold refuses because a file exists**  
It found an existing factory or a conflicting file. Inspect it before deleting
anything. Use onboarding or enhancement instead of overwriting user work.

**The verification report says “accepted, not dispatched”**  
That is honest. Dispatch was not verified in the sandbox. Continue to
onboarding, then verify dispatch with a real order.

Next: [onboard](./04-onboard.md).

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← 2. Add the factory package](./02-add-factory.md) · [4. Onboard →](./04-onboard.md)
