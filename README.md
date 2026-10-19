# Factory

A tetherable Piton specification for a general-purpose agentic factory. A
project adopts the specification, implements a factory in its own technology,
and uses it to plan, execute, review, and deliver work across AI agents.

The specification is the source of truth and lives under `spec/factory`.

## New here?

Start with the hand-held tutorial:

- [Getting started tutorial](docs/github/tutorial/README.md)
- [1. Install Piton](docs/github/tutorial/01-install-piton.md)
- [2. Add the factory package](docs/github/tutorial/02-add-factory.md)
- [3. Scaffold the factory](docs/github/tutorial/03-scaffold.md)
- [4. Onboard](docs/github/tutorial/04-onboard.md)
- [5. Submit your first order](docs/github/tutorial/05-first-order.md)
- [6. Answer and deliver](docs/github/tutorial/06-answer-deliver.md)
- [7. Shut down and verify](docs/github/tutorial/07-shutdown-verify.md)

If you already know how it works, use the [setup guide](docs/github/start/setup.md)
or the [first-run guide](docs/github/start/quickstart.md).

## Documentation

- [Full documentation index](docs/github/README.md)
- [How it works](docs/github/start/how-it-works.md)
- [Design choices](docs/github/start/choices.md)
- [Operating a factory](docs/github/guides/operating.md)
- [Commands](docs/github/reference/commands.md)
- [Descriptor](docs/github/reference/descriptor.md)

The Markdown under `docs/github` is generated from the Astro Starlight source
in `docs/src/content/docs`. Rebuild both the site and the Markdown tree with:

```sh
./build-docs.sh
```

The browsable site can be run with:

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
