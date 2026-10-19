---
title: Onboarding and configuration
description: What onboarding produces, how configuration is modeled, and how changes are applied.
---

## What onboarding produces

Onboarding produces or updates:

- project-owned Piton decisions;
- the implementation configuration;
- credential references;
- the approved policy record;
- an existing-work import report when applicable;
- an onboarding report.

The descriptor is created only when an implementation exists. On a
specification-only project, onboarding does not fabricate a configuration or an
executable.

## States

Specified, configured, and operational are cumulative.

- **Specified** — project-owned Piton decisions and an onboarding report exist.
- **Configured** — specified plus configuration, credential references, an
  approved policy record, and a descriptor when an implementation exists.
- **Operational** — configured plus a validated six-command surface and
  dashboard.

State is derived from artifact validity, not artifact existence.

## The decision set

Onboarding uses a semantic decision set, not a universal configuration schema.

| Category | Required when |
| --- | --- |
| Implementation and entry point | Operational state |
| Harnesses and account kinds | Always |
| API budgets and subscription allowances | Always |
| Build and test capacity, remote pools | When builds are used |
| Delivery default | Always |
| Routing categories, thresholds, approved models | When learned routing is used |
| Concurrency limits | Always |
| Operating-policy version | Always |

A category is required when its predicate is true. Not-applicable requires a
false predicate, not an empty value. A present category must carry its minimum
content: credential bindings, allowance limits and reset windows, pool units,
a destination, and routing categories with thresholds and approved models.

Fields and encoding remain project-specific.

## Credential references

Configuration and Piton store references only, never literal secrets. A
reference is bound to an operation, a route, and its destination or account.
The broker resolves it under a scoped lease. Wired children do not inherit
ambient credential environment variables and have no broker-less credential
access.

Onboarding and checks validate resolution and authorization, including account
identity and write scope where the provider exposes them. A missing, revoked,
wrong-account, or under-scoped reference blocks the affected launch or check.
Rotation invalidates affected checks.

Redaction and secret detection remain best effort. They do not replace the
broker boundary.

## Applying configuration changes

There is no hot reload.

1. Validate against the decision set, descriptor, and approved policy.
2. Write atomically with a backup.
3. Assign a content digest.
4. Restart gracefully.
5. Revalidate and load the new file.
6. On failure, restore the previous file and report.

Each attempt records the digest it started with. Jobs, deliveries, claims,
leases, and retry records record it too. Configuration snapshots are
content-addressed and retained while referenced. New work uses the active
digest; pinned work keeps its snapshot.

A lowered cap admits no new work until committed reservations and unresolved
exposure reconcile. Committed work is never retroactively invalidated.

## Onboarding acceptance

Onboarding conformance uses separately verdicted cells with an expected
observation:

- specified, configured, and operational states;
- each decision category missing under a maximal-applicability fixture;
- each descriptor field missing, wrong type, empty, traversing, or unsupported;
- an unresolved tether;
- unresolvable, revoked, wrong-account, and under-scoped credentials, plus a
  resolvable positive control;
- a planted secret that must fail and a clean scan that must pass;
- import counts and provenance;
- a successful change and a failure after write that restores the backup;
- an operational claim without an implementation, which must fail.

Not-applicable is not a passing verdict for an applicable category.

## Related

- [The descriptor](/reference/descriptor/)
- [Commands](/reference/commands/)
- [Security and audit](/guides/security/)
