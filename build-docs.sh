#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")" && pwd)"
docs_root="$repo_root/docs"

if ! command -v npm >/dev/null 2>&1; then
    echo "npm is required to build the docs." >&2
    exit 1
fi

if [ ! -d "$docs_root" ]; then
    echo "Documentation directory not found: $docs_root" >&2
    exit 1
fi

cd "$docs_root"

if [ ! -d node_modules ]; then
    echo "Installing documentation dependencies..."
    npm ci
fi

echo "Building the Starlight site..."
npm run build

echo "Building the GitHub Markdown tree..."
npm run build:github

echo
echo "Done."
echo "  Starlight site: docs/dist"
echo "  GitHub Markdown: docs/github"
