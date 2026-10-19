---
title: Core concepts
description: The records and states the rest of the documentation assumes.
---

## Order

An order is the unit of requested work. It carries an identifier, the source
prompt or specification reference, state, phase, priority, delivery intent, and
timestamps.

An order is one of `submitted`, `active`, `blocked`, `completed`, `failed`, or
`cancelled`. It also carries a phase: `planning`, `executing`, `integrating`,
`delivering`, or `assessing`.

## Step

A step is a unit of planning and delegation inside an order. It carries the
objective and brief, expected output, completion criteria, dependencies, state,
assigned agent or model, worktree and branch when it writes files, attempt
count, estimate, and result reference.

Steps are `pending`, `ready`, `running`, `paused`, `blocked`, `completed`,
`failed`, `cancelled`, `superseded`, or `deferred`.

## Attempt

An attempt is one dispatch of a step. It carries the step, attempt number,
parent attempt, launch request identifier, effect key, session references,
state, times, end cause, retry-counted flag, evidence, and worktree.

Attempts are `intent`, `launching`, `running`, `completed`, `failed`,
`interrupted`, `unresolved`, `cancelled`, or `orphaned`.

`unresolved` is the important one: the external effect may or may not have
happened, so the effect key is reserved and no automatic retry or replacement
is allowed.

## Session

A session is the harness-side execution of an attempt. It carries the harness,
external session reference, discovery variant or token, epoch, per-source
signal history, liveness state, last signal time, and last activity time.

Liveness is `alive`, `ended`, or `unknown`. A client disconnect is not evidence
that the session ended.

## Result and evidence

A result is the outcome of an attempt: succeeded, failed, or partial, with a
summary, artifact references, checks run, and completion assessment. Evidence
is everything needed to trust the result: logs, diffs, build and test reports,
review verdicts, delivery receipts, and the completion manifest.

Artifacts are immutable, copied on attach, hashed, and retained according to
policy. Expired artifacts leave tombstones with hashes.

## Question and assumption

A question is an engineer-facing decision request. It records its order, asker,
decision key, generation, blocking scope, state, and answer. Questions are
same-order.

An assumption records a statement, provenance, scope, owner, state, and
timestamps. Briefs and results record the question generations and assumptions
they rely on, so a changed answer can be traced and revalidated.

## Target, lease, and receipt

A delivery target is a branch, pull request, environment, package, or external
service. It carries a baseline and current revision, required checks, receipt,
lease, and fencing epoch.

A lease is durable ownership, not a lock held across an external call. The
fencing epoch prevents a stale holder from committing factory-owned effects.

A receipt proves one delivery attempt at one order-target-revision.

## Configuration digest

Configuration is content-addressed. Attempts, jobs, deliveries, claims,
leases, and retry records record the digest they started with. A configuration
change is applied by restart; new work uses the new digest, pinned work keeps
its own.

## The operation envelope

Every operation has a request identifier, operation name, actor, target,
payload, and the expected order aggregate version for a mutation. The response
has a status, result or error, and current version. Idempotency replay happens
before version comparison.

## Where to go next

- [Orders, steps, and attempts](/reference/states/)
- [Operation families](/reference/operations/)
- [The descriptor](/reference/descriptor/)
