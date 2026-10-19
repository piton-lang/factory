<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# 5. Submit your first order

*Start the factory, give it a small order, and watch it work.*

In this lesson you start the factory and submit a small, easy-to-check order.

## Start the factory

```sh
factory start
```

`start` also resumes after a shutdown or restart. It reconnects to surviving
sessions instead of launching replacements.

## Submit a small order

Pick something small enough to check by hand. For example:

```sh
factory submit "Add a health endpoint at /health and document it"
```

An order can also come from a specification file, or from a conversation with
your agent that ends with “submit this to the factory.”

## Watch it

```sh
factory status
```

You should see:

- the order and its state;
- its priority;
- the active steps and assigned agents or models;
- pending questions;
- usage and remaining allowance;
- build and test queue and capacity;
- any failures or escalations;
- why eligible work is not starting, if it is waiting.

The dashboard shows the same picture with more detail. Its URL is in
`.factory/project.json` under `dashboard`.

## What you might see

| Status | Meaning |
| --- | --- |
| `active` | The factory can make progress |
| `blocked` | It needs a decision or a resource |
| `assessing` | Work is done and being checked |
| `delivering` | Work is being sent to the target |
| `completed` | Required work was accepted and delivered |
| `unresolved` on a step | An effect may or may not have happened; do not force a retry |

## Checkpoint

The order exists and is moving, or it is waiting with a clear reason.

If every step is waiting, read the reason. Common reasons are:

- a pending engineer question;
- an account or budget limit;
- build capacity;
- a dependency;
- unknown session liveness.

Next: [answer and deliver](./06-answer-deliver.md).

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← 4. Onboard](./04-onboard.md) · [6. Answer and deliver →](./06-answer-deliver.md)
