# Factory documentation

An Astro Starlight site that explains the factory specification: why it
exists, the choices behind it, how it behaves, and how to use it.

## One command

From the repository root:

```sh
./build-docs.sh
```

This installs dependencies if needed, builds the Starlight site, and rebuilds
the GitHub Markdown tree.

## Local development

```sh
cd docs
npm install
npm run dev
```

The site is served at the URL printed by Astro, usually
`http://localhost:4321`.

## Build

```sh
npm run build
npm run preview
```

The generated site is written to `docs/dist`.

## GitHub Markdown

The repository root is one directory up from `docs`. Its `README.md` is the
GitHub landing page and links into the generated Markdown tree.

```sh
npm run build:github
```

This writes a navigable Markdown copy to `docs/github`, with a `README.md`
index and relative links between pages. The repository root `README.md` links
into that tree so GitHub renders it as the project documentation.

## Source of truth

The specification under `../spec/factory` is authoritative. These pages are a
guided explanation, not a replacement for the Piton source.
