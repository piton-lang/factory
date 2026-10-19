<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# Glossary

*Terms used throughout the factory documentation.*

**Anchor (Piton)** — a named declaration. The factory specification is a set of
anchors composed into the public `Factory` anchor.

**Attempt** — one dispatch of a step, with its own session, effect key, and
outcome.

**Brief** — the focused instructions a delegating agent gives a receiving agent:
objective, requirements, expected output, completion criteria, and links.

**Capability** — a signed grant of an operation on a target, with scope, expiry,
and revocation.

**Configuration digest** — a content hash of the loaded configuration, recorded
on attempts, jobs, deliveries, claims, leases, and retry state.

**Delivery target** — a branch, pull request, environment, package, or external
service that receives an order's integrated change.

**Descriptor** — `.factory/project.json`, the fixed record of invocation,
configuration, specification version, and capabilities.

**Effect key** — a stable identity for an external effect, used to prevent
duplicate application. It is stable per operation target, not per attempt.

**Evidence** — artifacts and assessments that support a result: logs, diffs,
build and test reports, review verdicts, receipts, and the completion manifest.

**Fencing epoch** — a monotonic value that invalidates a stale lease holder's
factory-owned effects.

**Idempotency** — replaying the same request identifier and canonical payload
returns the original outcome without repeating the effect.

**Lease** — durable ownership of a target, overlap key set, or capacity, with an
owner, epoch, expiry, and release rule.

**Order** — the unit of requested work.

**Orphaned** — an attempt that has been replaced after engineer authorization.

**Question generation** — the version of an engineer answer. A new answer
creates a new generation and triggers revalidation.

**Receipt** — proof of one delivery attempt at one order-target-revision.

**Result** — the outcome of an attempt, with evidence and assessment.

**Session** — the harness-side execution of an attempt.

**Specified / configured / operational** — cumulative onboarding states.

**Step** — a unit of planning and delegation inside an order.

**Unresolved** — an attempt whose external effect may or may not have happened.
It reserves the effect key and blocks automatic retry and replacement.

**Workspace / worktree** — the isolated working tree for a writing step. It is
step-owned, materialized per session, and reused by retries.

**Wiring** — the saved environment-specific connection between a factory
operation and a harness, build pool, delivery target, or service.

## Related

- [Core concepts](../start/concepts.md)
- [States](./states.md)
- [Operations](./operations.md)

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← Operations](./operations.md)
