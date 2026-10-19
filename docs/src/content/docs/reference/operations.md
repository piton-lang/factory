---
title: Operations
description: The semantic operation contract, envelope, actors, and authorization.
---

Agents and humans change factory state through the same named operations. An
operation carries intent, an actor, a target, and the version it expects, so
the factory can enforce authority and consistency before anything changes.

## The envelope

Every request carries:

| Part | Purpose |
| --- | --- |
| Request identifier | Makes retries idempotent |
| Operation name | Says what is being attempted |
| Actor | Identifies who is asking |
| Target | Identifies the record or resource |
| Payload | Carries the operation-specific data |
| Expected version | Prevents lost updates on an existing order |

Creating an order aggregate presents an absence or uniqueness precondition
instead. Creating or changing a record inside an existing order still presents
the aggregate version plus any record-level precondition.

Every response carries a status, a result or error, and the current aggregate
version. A conflict returns the current version and applies nothing.

Idempotency replay precedes version comparison. The expected version is part of
the canonical fingerprint. A corrected retry uses a new request identifier.

Cross-order effects decompose into per-order operations with a correlation
identifier and recorded per-order outcomes. A partial decomposition reports the
committed and failed orders for recovery.

## Actors

| Actor | Scope |
| --- | --- |
| Engineer | Across the factory |
| Factory code | Internal controls |
| Agent | Assigned step and work beneath it |
| Auditor | Read-only, no operations |

Reads are authorized reads under the read filters, not operations.

## Operation families

### Order and plan

- submit an order
- revise scope, priority, or delivery intent
- add or revise a step
- declare or remove a dependency
- supersede a step
- propose or merge a plan revision

### Execution reporting

- report an outcome as done, failed, or blocked
- request help from a higher tier
- escalate a question to the engineer
- record a build or check result
- attach evidence or artifacts
- report progress and estimated completion
- send a heartbeat

### Lifecycle and accounting

- cancel within cause-specific authority
- answer or withdraw a question
- assess a step
- accept an order
- record configuration or evolution changes

### Delivery

- assemble an integration candidate
- merge a conflict
- deliver to a target
- compensate a reversible effect

### Internal

- dispatch and claim work
- allocate resources and accounts
- start, shut down, or import work

Internal operations are not agent operations. Agents do not own the general
orchestration loop.

## Authorization rows

Every row has actors, target, and preconditions. The full set lives in
`FactorySecurity.authorizationRows`. Highlights:

- **Submit** — engineer or an agent with a recorded engineer-delegation
  capability.
- **Revise order** — engineer or recorded plan owner or higher tier.
- **Add/revise step or dependency** — plan owner or higher tier, or the
  assigned agent for its own work within revision authority.
- **Report, help, evidence, progress, heartbeat** — assigned agent, active
  attempt, session lease.
- **Answer/withdraw question** — engineer or delegated agent, current
  generation.
- **Assess step** — independent assessor, result revision, frozen criteria.
- **Accept order** — independent assessor, all required receipts, checks,
  completion assessment, no self.
- **Cancel request vs stop** — cause-specific authority; separate permissions.
- **Configuration/evolution** — engineer or recorded pre-authorization,
  separate grants.
- **Delivery** — delivery owner, merger, or integrator, with target lease and
  epoch.
- **Run conformance and append report** — independent verifier principal.
- **Alter report or write code** — denied to verifier.

Every other combination is denied.

## Related

- [Security and audit](/guides/security/)
- [Conformance](/guides/conformance/)
- [Commands](/reference/commands/)
