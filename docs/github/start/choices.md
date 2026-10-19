<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# Design choices

*The important choices in the specification, why they were made, and what they cost.*

This page is the decision guide. Each choice names the alternative that was
rejected and the consequence an implementer should expect.

## Project-owned factory, not a shared service

**Choice:** every consuming project tethers the specification and implements
its own factory.

**Why:** projects have different technologies, accounts, harnesses, delivery
targets, and risk tolerances. One shared service would force one model of
capacity, credentials, and data.

**Consequence:** there is no shared model-performance history. Each project's
factory must build its own operational evidence.

## Tethered specification, not a forked implementation

**Choice:** the package is consumed through Piton tether/update. A consuming
project implements from the specification; it does not fork the reference
implementation.

**Why:** the specification stays authoritative while implementation choices
stay local.

**Consequence:** updates require reconciliation with project-specific
customizations. The specification requires an agent to propose reconciliation
and the engineer to decide; neither side wins silently.

## Six core commands, implementation freedom underneath

**Choice:** `onboard`, `start`, `submit`, `status`, `answer`, and `shutdown`
are the minimal surface. `focus` and `optimize` are optional.

**Why:** engineers and packaged skills need a common way to operate any
factory, without dictating the technology inside it.

**Consequence:** subcommand names are fixed, but the executable, packaging,
transport, and internals are project choices. The project records how its
factory is invoked in `.factory/project.json`.

## Semantic operations, not raw record edits

**Choice:** agents change state through named operations with an envelope,
actor, target, payload, request identifier, and expected version.

**Why:** code can validate authority, dependencies, idempotency, and
consistency only if it understands intent.

**Consequence:** the operation set and its authorization rows must be
implemented; direct database edits are out of contract.

## Standard envelope, transport free

**Choice:** every request and response has a standard shape; transport may be
CLI, local HTTP, MCP, or another mechanism.

**Why:** retries, version conflicts, and audit need stable semantics, while
projects need transport freedom.

**Consequence:** the descriptor records invocation; the operation envelope
defines behavior.

## One writer, optimistic concurrency

**Choice:** one factory process writes at a time; records carry versions and
mutations use compare-and-swap.

**Why:** budgets, capacity, leases, and idempotency cannot tolerate lost
updates.

**Consequence:** multi-process deployments need a writer lock with a fencing
epoch and a defined failover path. The specification does not provide a
distributed consensus algorithm.

## Durable intent before external effects

**Choice:** commit intent, request identifier, and reserved version before a
launch, build, delivery, or worktree effect. Record the outcome separately.

**Why:** a crash can otherwise create an orphan effect or a blind retry.

**Consequence:** recovery must reconcile intents and claims before admitting
new work.

## Unknown is a state, not a failure

**Choice:** an attempt whose external effect may or may not have happened
becomes `unresolved`. It reserves the effect key, blocks automatic retry and
replacement, and needs an engineer decision.

**Why:** retrying a possibly-applied effect is worse than pausing.

**Consequence:** unresolved attempts hold a quarantine slot and budget floor
until resolved. That can reduce throughput; the alternative is duplicate
effects.

## Best-effort budget where providers do not enforce a ceiling

**Choice:** reservations and conservative estimates gate dispatch. A
provider-enforced ceiling is preferred; otherwise the engineer accepts a
residual exposure bound.

**Why:** the factory cannot enforce spend a provider does not expose.

**Consequence:** best-effort accounts can exceed the cap by the accepted bound.
Status must say whether the cap is enforced or best effort.

## No hot reload of configuration

**Choice:** configuration changes are validated, written atomically with a
backup, assigned a content digest, and applied by graceful restart.

**Why:** live multi-version configuration complicates budgets, credentials,
and running attempts.

**Consequence:** running work finishes under its pinned digest; new work uses
the new file. A failed start restores the previous file.

## One worktree per writing step

**Choice:** writing steps get isolated worktrees and branches; read-only and
review steps use the artifact under review.

**Why:** concurrent writing needs isolation and traceable prerequisite
versions.

**Consequence:** integration and cleanup cost more. Finished worktrees are
cleaned only after required outputs are preserved.

## Declared overlap resources, not whole-repository locking

**Choice:** steps declare touched paths and non-path resources; path locking is
policy-dependent because worktrees isolate paths. Undeclared non-path resources
are denied dispatch.

**Why:** ports, caches, databases, and registries are the real shared hazards in
an isolated-worktree model.

**Consequence:** declaration completeness becomes a planning responsibility.

## Independent assessment and conformance

**Choice:** completion is assessed by an independent principal; conformance is
verified by a distinct authenticated principal with an exclusion set, signed
report, and admission check.

**Why:** self-approval and self-certification are not evidence.

**Consequence:** small teams may need an external verifier or remain blocked.
The engineer cannot waive independence.

## Evolution is approved, bounded, and reversible

**Choice:** a periodic review produces evidence-backed proposals; approval is
explicit; activation is separate from the enhancing order; rollback must be
tested.

**Why:** a factory that can silently modify its own approval gate is not
governable.

**Consequence:** approved enhancements cannot change the approval policy,
budget enforcement, validation gate, audit, or rollback mechanism under the
same grant.

## What remains intentionally open

- Exact brief and handoff schema.
- Exact command output for some commands.
- Dashboard presentation and authentication details.
- Per-harness adapter details.
- Concrete provider conversion tables and burn-rate values.
- DeepSeek Harness integration.
- Detailed Popcorn mapping beyond the first milestone.
- Jev integration.

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← Why a factory](./why.md) · [Onboarding and configuration →](../guides/onboarding.md)
