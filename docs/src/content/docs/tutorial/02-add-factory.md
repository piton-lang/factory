---
title: 2. Add the factory package
description: Tether the package, import its skills, and build the project.
---

In this lesson you will add the factory repository as a dependency, install it,
and generate the agent skills.

## Add the dependency

Open `piton.config.pi`. Add the factory repository under `dependencies`:

```text
export piton-config Project:
    root: ./spec
    entry: ./spec/index.pi

    frameworks:
        - {Belay}

    dependencies:
        - <factory-package-url>
```

Replace `<factory-package-url>` with the repository URL you were given.

## Import the package in the entry

Open `spec/index.pi` and add:

```text
from factory export *
```

If the package installs under a different name, use that name. The name is the
`name` in the package's `piton-package` declaration, or the name printed by
`piton tether`.

This import is what makes the packaged skills available to your agent.

## Tether and build

```sh
piton tether
piton build
```

`piton tether` installs the package into `tethers/`. `piton build` generates
the agent guidance and skills.

## Checkpoint

Find the scaffold skill:

- Claude Code: `.claude/skills/factory-0010-scaffold/`
- Codex: `.agents/skills/factory-0010-scaffold/`
- OpenCode: `.opencode/skills/factory-0010-scaffold/`

Then run:

```sh
piton check
```

You should see no problems.

## If it fails

**`unresolved-module: factory`**  
The package name in `from factory export *` does not match the installed
package. Check `tethers/` and the package's `name`.

**Tether cannot reach the repository**  
Check the URL, your network, and your git credentials. The package is installed
at compile time; Piton does not fetch it later.

**The skill folder is missing**  
Run `piton build` again. Confirm your adapter is listed under `adapters` in
`belay-config`. Confirm the entry exports the package.

Next: [scaffold the factory](/tutorial/03-scaffold/).
