<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# Descriptor

*The .factory/project.json schema and path rules.*

The descriptor is the one fixed file every factory exposes. It tells tools how
to invoke the factory, where its configuration lives, and which specification
version it was built against.

## Location

The descriptor is `.factory/project.json`, encoded as UTF-8 JSON.

The project root is the parent of `.factory`. Descriptor discovery searches
upward from the working directory and refuses when multiple descriptors are
found.

## Schema

Current `schemaVersion` is `1`; the supported maximum is `1`.

### Required

| Field | Type | Meaning |
| --- | --- | --- |
| `schemaVersion` | integer | Descriptor schema version |
| `invocation` | string[] | One or more non-empty strings; `argv[0]` plus fixed arguments |
| `config` | string | Project-relative configuration path |
| `specVersion` | string | Immutable full commit SHA or exact tag |
| `builtAgainstSpecVersion` | string | Immutable implementation baseline |

### Optional

| Field | Type | Meaning |
| --- | --- | --- |
| `cwd` | string | Project-relative working directory |
| `env` | object | Non-secret string environment values |
| `dashboard` | string | HTTP or HTTPS URL |
| `capabilities` | string[] | `focus`, `optimize`; empty means none declared |
| `implementationVersion` | string | Implementation version |
| `name` | string | Descriptive name |
| `configDigest` | string | SHA-256 digest of the loaded configuration |

## Example

```json
{
  "schemaVersion": 1,
  "invocation": ["python", "-m", "factory"],
  "config": ".factory/config.yaml",
  "specVersion": "0123456789abcdef0123456789abcdef01234567",
  "builtAgainstSpecVersion": "0123456789abcdef0123456789abcdef01234567",
  "cwd": ".",
  "env": {
    "FACTORY_PROFILE": "local"
  },
  "dashboard": "http://localhost:8787",
  "capabilities": ["focus", "optimize"],
  "implementationVersion": "0.3.1",
  "name": "popcorn-factory"
}
```

## Path rules

- `config` and relative invocation paths resolve from the project root.
- `invocation[0]` and relative fixed arguments resolve from the root before
  `cwd` applies.
- `cwd` defaults to the project root and never changes argument resolution or
  descriptor discovery.
- Absolute paths, parent traversal, and symlinks escaping the root after
  canonicalization are rejected.
- `argv[0]` resolves through `PATH` unless it contains a path separator.
- `PATH` comes from the process environment and cannot be overridden by the
  descriptor or wiring.
- Descriptor environment overlays the process environment for non-PATH keys;
  later entries override earlier ones.

## Environment precedence

For a wired operation child:

1. process environment;
2. descriptor environment;
3. wiring record environment.

Later entries override earlier ones. `PATH` is rejected in descriptor and
wiring environments.

## Validation

- types and containment;
- invocation executability without executing it;
- config existence;
- capability names for the schema version;
- `specVersion` resolvability against the tether lock;
- secrets rejected in the environment map by key pattern, as a best effort.

An empty invocation fails validation.

## Migration

Schema changes increment `schemaVersion`. Older unsupported versions are refused
with an explicit upgrade path that is versioned, backed up, idempotent, and
preserves unknown fields. Newer versions are refused.

Unknown fields are preserved on rewrite and ignored by readers. Writes are
atomic and serialized by the project lock.

## Related

- [Commands](./commands.md)
- [Onboarding](../guides/onboarding.md)

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← States](./states.md) · [Operations →](./operations.md)
