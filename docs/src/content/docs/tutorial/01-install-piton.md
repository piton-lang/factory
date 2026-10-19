---
title: 1. Install Piton and prepare the project
description: Get the Piton CLI working and create the minimum project structure.
---

In this lesson you will confirm Piton is available, make sure the project is a
git repository, and create the Piton configuration and entry file.

## Check the project

Open a terminal in the project root.

```sh
git status
```

If this is not a git repository yet:

```sh
git init
```

The factory uses git worktrees, so the project must be in git.

## Check Piton

```sh
piton --version
```

If the command works, continue.

If it does not, install the Piton CLI. If you are not sure how, ask your coding
agent:

> Install the Piton CLI from the Piton repository and confirm `piton --version`
> works. Do not change the project yet.

## Create the Piton configuration

If the project already has `piton.config.pi`, open it and make sure it has a
`root`, an `entry`, and a Belay framework entry. You will add the factory
dependency in the next lesson.

If it does not have one, create `piton.config.pi` in the project root:

```text
use @piton/config
use @piton/belay

from @piton/belay import ClaudeCodeAdapter

export piton-config Project:
    root: ./spec
    entry: ./spec/index.pi

    frameworks:
        - {Belay}

belay-config Belay:
    codeRoot: .
    adapters:
        - {ClaudeCodeAdapter}
```

Use the adapter for the agent tool you actually use. The common choices are
`ClaudeCodeAdapter`, `CodexAdapter`, and `OpenCodeAdapter`.

## Create the entry

Create the source folder and entry file:

```sh
mkdir -p spec
```

Create `spec/index.pi`:

```text
// Factory entries are added in the next lesson.
```

## Checkpoint

Run:

```sh
piton check
```

You should see:

```text
no problems found
```

If Piton says the entry file is missing, confirm the path in `piton.config.pi`
matches the file you created.

If Piton says a package such as `@piton/config` is missing, install or repair
the Piton toolchain before continuing.

Next: [add the factory package](/tutorial/02-add-factory/).
