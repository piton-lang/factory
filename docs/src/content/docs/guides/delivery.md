---
title: Delivery and integration
description: Targets, candidates, outcomes, partial delivery, compensation, and acceptance.
---

## Targets and delivery units

A target record carries an identifier, kind, destination, baseline and current
revision, state, required checks, receipt, lease, and fencing epoch.

The delivery unit is the order-target pair. A target may be explicitly none,
recorded with its authorizer. Required targets are frozen when the order is
planned; changing them needs an engineer-approved order revision.

Integration assembles and checks a candidate before completion assessment. The
external delivery effect happens only after assessment passes.

## Integration

Each target has one integration queue and one target lease.

- Candidates are ordered by dependency, then order priority, then readiness.
- The integrator re-applies the candidate onto the current target revision with
  its recorded prerequisite revisions.
- Required checks run on the combined result.
- The exact candidate revision is recorded.
- Assessment binds to that revision.

A revision mismatch re-applies and rechecks. If the candidate must change after
assessment, it is reassessed.

Git targets use compare-and-swap on the target revision. Non-git targets use an
adapter with intent, outcome, and read-back; unchanged means the read-back
matches the baseline.

A merger resolution creates a new candidate revision. Every affected order's
assessor revalidates it. If assessors disagree on the same integrated revision,
the target enters a blocked split state until an authorized decision.

## Target leases

A target lease records target, holder, epoch, acquisition, expiry, state, and
the queue head it covers. It is durable ownership, not a lock held across an
external call.

- Acquisition is atomic with queue-head selection.
- A multi-target order acquires and releases one target lease per target effect
  in sorted order; it never holds several at once.
- Renewal uses a heartbeat and TTL.
- Check results and assessments are epoch-bound; if the epoch advances, they
  are discarded and rerun.
- An in-doubt delivery holds the lease and epoch until disposition.
- A separate disposition deadline keeps the target blocked and the lease held
  until an engineer decision or authorized forced disposition.

## Outcomes

Delivery outcomes are pending, running, succeeded, partial, failed, unresolved,
or unnecessary.

The idempotency key is the order, target, and canonical integrated revision. A
receipt records the target revision, external identifier, effect count, checks,
and actor.

Retries read back the target and never repeat a confirmed effect. An in-doubt
effect becomes unresolved and holds the target lease until disposition:

- applied → adopt or reconstruct the receipt;
- not applied → release and retry;
- unknown → engineer-authorized replacement.

## Partial delivery

Partial delivery is nonterminal. It records the remainder. An engineer-approved
scope reduction creates a follow-up order in a non-running state, acquires the
target lease and epoch, and then activates. The original order's target retries
are suppressed by the same revision.

A crash between steps leaves the follow-up inert and the original claim held.
After an approved reduction the removed target is no longer required, so the
original order may complete without it.

## Compensation

A target or effect declares whether it is reversible and names its
compensator. The declaration is approved above the implementer; an agent cannot
declare its own effect reversible.

Compensation:

- runs only after the original effect is resolved;
- holds the target lease;
- is effect-keyed and idempotent;
- is reverse-ordered across multiple targets;
- has outcomes succeeded, failed, partial, or unresolved;
- records whether it invalidates the receipt and whether a successor order is
  required.

Partial compensation becomes unresolved.

## Roles and final acceptance

- **Delivery owner** — coordinates targets, receipts, and retries.
- **Merger** — resolves integration conflicts.
- **Integrator** — assembles combined candidates and runs combined checks.
- **Independent assessor** — accepts the result; distinct from every required
  implementer, the delivery owner, the merger, and the integrator.

Final acceptance is a recorded operation with an actor, assessor identity,
checked revision, and receipt set. It requires successful receipts for every
required target, passing combined checks, and the completion assessment.

The assessor may refuse acceptance. A refused acceptance after a successful
external effect blocks the order and requires compensation or a successor
order. If the top tier implemented, the engineer or a fresh independent
reviewer with recorded authority assesses; if neither exists, acceptance stays
blocked.

## Related

- [Execution](/guides/execution/)
- [Recovery](/guides/recovery/)
- [Conformance](/guides/conformance/)
