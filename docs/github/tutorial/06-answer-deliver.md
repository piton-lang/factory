<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# 6. Answer and deliver

*Answer a question if one appears, then check the delivered result.*

In this lesson you answer the factory if it needs you, then confirm the result
was delivered.

## If a question appears

`status` shows pending questions, what each one blocks, and how long it has
waited.

```sh
factory status
```

Answer it:

```sh
factory answer <question-id> "Use the existing auth middleware"
```

Only steps that depend on the answer wait. Independent work keeps running.

You can also answer from the dashboard. Both surfaces use the same operation
and authorization, so answering twice does not create two effects.

## If no question appears

Some orders need no engineer input. That is normal. Continue to the delivery
check.

## Check the result

When the order reaches delivery, it goes to the target you chose during
onboarding: a branch, pull request, environment, or package.

The factory records:

- the integrated revision;
- the required checks on the combined change;
- a receipt for each target;
- the independent completion assessment;
- the evidence manifest.

The order is **completed** only when required targets succeed and the
assessment passes. A partial or failed delivery stays active or blocked.

## What “delivered” means

- The change exists at the destination.
- The target’s required checks ran on the combined result.
- The receipt identifies the target revision and the effect.
- A retry reads the target back and does not repeat a confirmed effect.
- The order has an evidence manifest.

## Checkpoint

Inspect the destination:

- open the branch or pull request;
- or check the environment or package.

You should see the change and the checks the order required.

If the order is still `active` or `blocked`, read the delivery reason in
`status`. A target may be unavailable, a check may have failed, or a conflict
may still need resolution.

## If it fails

**The order is blocked on a question you already answered**  
The answer may be a new generation or may have been rejected. Read the question
state and generation in `status`.

**Delivery says unresolved**  
An external effect may or may not have happened. Do not repeat it. Let the
factory read the target back, then follow the disposition shown in `status`.

**The change is on the branch but the order is not complete**  
Delivery can succeed before completion assessment. Check whether the assessment
is still running or needs a fresh reviewer.

Next: [shut down and verify](./07-shutdown-verify.md).

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← 5. Submit your first order](./05-first-order.md) · [7. Shut down and verify →](./07-shutdown-verify.md)
