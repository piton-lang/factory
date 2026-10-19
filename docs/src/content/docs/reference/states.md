---
title: States
description: The state machines an implementation must represent.
---

```mermaid
stateDiagram-v2
    [*] --> submitted
    submitted --> active: accepted and planned
    active --> blocked: no progress without a decision or resource
    blocked --> active: decision or resource arrives
    active --> completed: required work accepted and delivered
    active --> failed: no authorized path forward
    submitted --> cancelled: rejected or withdrawn
    active --> cancelled: replaced or stopped by authority
    blocked --> cancelled: replaced or stopped by authority
    completed --> [*]
    failed --> [*]
    cancelled --> [*]
```

## Order states

| State | Meaning |
| --- | --- |
| `submitted` | Accepted, no work started |
| `active` | Factory can make progress |
| `blocked` | Progress needs an external decision or resource |
| `completed` | Required work accepted and delivered |
| `failed` | Terminal, no authorized path forward |
| `cancelled` | Terminal, by code or engineer authority |

Precedence: cancelled, failed, completed, blocked, active, submitted.

Order phases:

| Phase | Meaning |
| --- | --- |
| `planning` | A plan is being produced or repaired |
| `executing` | Steps are being dispatched or run |
| `integrating` | Combined changes are being integrated |
| `delivering` | External delivery is in progress |
| `assessing` | Completion is being assessed |

Phase precedence: assessing, delivering, integrating, executing, planning.
Phase is null for submitted and terminal orders.

```mermaid
stateDiagram-v2
    [*] --> pending
    pending --> ready: dependencies satisfied
    ready --> running: dispatch
    running --> paused: plan conflict or revision
    paused --> ready: resolved
    running --> blocked: help, answer, or wiring repair
    blocked --> ready: unblocked
    running --> completed: result assessed
    running --> failed: retries exhausted or escalation
    running --> cancelled: authority
    running --> superseded: authorized revision
    pending --> deferred: engineer approval
    completed --> [*]
    failed --> [*]
    cancelled --> [*]
    superseded --> [*]
    deferred --> [*]
```

## Step states

| State | Meaning |
| --- | --- |
| `pending` | At least one dependency unmet |
| `ready` | Eligible for dispatch |
| `running` | Active attempt or completed attempt awaiting assessment |
| `paused` | Plan conflict or revision holds the subtree |
| `blocked` | Awaiting help, an engineer answer, or wiring repair |
| `completed` | Attempt completed and required assessment passed |
| `failed` | Terminal after retries or escalation |
| `cancelled` | Terminal by authority |
| `superseded` | Terminal by authorized revision |
| `deferred` | Terminal only with engineer approval |

A step becomes cancelled or superseded only after its attempt is terminal.
Until then it stays running with a cancelling blocker. A failed, cancelled,
superseded, or unresolved prerequisite blocks dependents.

```mermaid
stateDiagram-v2
    [*] --> intent
    intent --> launching: commit intent and request launch
    launching --> running: session confirmed
    running --> completed: result recorded
    running --> failed: confirmed terminal failure
    running --> interrupted: shutdown, restart, or confirmed stop
    running --> unresolved: effect may or may not have happened
    unresolved --> interrupted: terminal evidence or confirmed stop
    unresolved --> failed: engineer confirms no effect
    unresolved --> orphaned: engineer authorizes replacement
    running --> cancelled: authority
    completed --> [*]
    failed --> [*]
    interrupted --> [*]
    cancelled --> [*]
    orphaned --> [*]
```

## Attempt states

| State | Meaning |
| --- | --- |
| `intent` | Persisted before launch |
| `launching` | Launch requested, session not yet confirmed |
| `running` | Session active |
| `completed` | Finished with a result |
| `failed` | Terminal failure |
| `interrupted` | Shutdown, restart, or confirmed stop |
| `unresolved` | Effect may or may not have happened |
| `cancelled` | Terminal by authority |
| `orphaned` | Terminal, replaced after engineer authorization |

`unresolved` never returns to running. It transitions to interrupted, failed,
or orphaned under explicit evidence or authority.

## Session liveness

| State | Meaning |
| --- | --- |
| `alive` | Positive evidence of a live session |
| `ended` | Positive terminal evidence |
| `unknown` | No positive evidence either way |

Absence, a failed probe, a timeout, a client disconnect, and zero token matches
are unknown.

## Job states

`queued`, `running`, `succeeded`, `failed`, `timed_out`, `cancelled`,
`unknown`, `orphaned`.

## Delivery outcomes

`pending`, `running`, `succeeded`, `partial`, `failed`, `unresolved`,
`unnecessary`.

## Observability fact states

`current`, `stale`, `unknown`, `unavailable`.

A real zero is a value, not a state. Precedence: unavailable, unknown, stale,
current.

## Related

- [Core concepts](/start/concepts/)
- [Execution](/guides/execution/)
- [Delivery](/guides/delivery/)
