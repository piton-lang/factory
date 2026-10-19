# Factory

A tetherable Piton specification for a general-purpose agentic factory. A
project adopts the specification, implements a factory in its own technology,
and uses it to plan, execute, review, and deliver work across AI agents.

The specification is the source of truth and lives under `spec/factory`.

## Start here

| If you want to... | Read |
| --- | --- |
| Build a working factory step by step | [Getting started tutorial](docs/github/tutorial/README.md) |
| Understand the idea first | [How it works](docs/github/start/how-it-works.md) |
| Set up an existing project | [Set up in a new project](docs/github/start/setup.md) |
| Run your first order | [First run](docs/github/start/quickstart.md) |
| Operate a factory day to day | [Operating a factory](docs/github/guides/operating.md) |
| Understand the tradeoffs | [Design choices](docs/github/start/choices.md) |
| Implement or verify one | [Commands](docs/github/reference/commands.md) and [Descriptor](docs/github/reference/descriptor.md) |

The tutorial is the hand-held path: install Piton, add the package, scaffold,
onboard, submit an order, deliver it, then shut down and verify.

## Documentation

- [Full documentation index](docs/github/README.md)
- [Core concepts](docs/github/start/concepts.md)
- [States](docs/github/reference/states.md)
- [Operations](docs/github/reference/operations.md)
- [Glossary](docs/github/reference/glossary.md)

The Markdown under `docs/github` is generated from the Astro Starlight source
in `docs/src/content/docs`. Rebuild the site and the Markdown tree with:

```sh
./build-docs.sh
```

To work on the browsable site:

```sh
cd docs
npm install
npm run dev
```

## Repository layout

| Path | Contents |
| --- | --- |
| `spec/` | Piton specifications, including the factory package |
| `docs/src/content/docs/` | Astro Starlight documentation source |
| `docs/github/` | Generated Markdown for GitHub |
| `tethers/` | Installed Piton packages |

## Source of truth

The `.pi` files under `spec/` are authoritative. Generated guidance, the
Starlight site, and the Markdown under `docs/github` are derived output.
