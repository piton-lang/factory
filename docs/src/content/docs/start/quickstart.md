---
title: First run
description: What to do after the factory is set up and onboarding is complete.
---

This page starts after [setup](/start/setup/). It assumes onboarding says the
factory is **operational**.

## 1. Start

```sh
factory start
```

This starts the factory or resumes it after a shutdown. It reconnects to
sessions that are still alive.

## 2. Submit a small order

```sh
factory submit "Add a health endpoint at /health and document it"
```

Start small. A first order should be easy to check by hand.

## 3. Watch

```sh
factory status
```

You should see the order, its steps, the agents working, any pending questions,
usage, capacity, and the reason nothing else is starting if work is waiting.

The dashboard shows the same facts with more detail. Its URL is in
`.factory/project.json`.

## 4. Answer only what is asked

```sh
factory answer <question-id> "Use the existing auth middleware"
```

Only dependents wait. Independent work continues.

## 5. Let it finish

The factory integrates the result, runs checks, delivers to the chosen target,
and records receipts. An independent assessor accepts completion.

## 6. Shut down

```sh
factory shutdown
```

Unfinished work is preserved. The next `factory start` resumes it.

## What to read next

- [Operating a factory](/guides/operating/)
- [Delivery and integration](/guides/delivery/)
- [Recovery](/guides/recovery/)
- [Conformance](/guides/conformance/)
