<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# 7. Shut down and verify

*Stop cleanly, resume, and check the implementation against the specification.*

In this lesson you stop the factory, confirm work is preserved, resume it, and
run a conformance check.

## Shut down

```sh
factory shutdown
```

The factory:

1. stops starting new steps;
2. waits a configurable grace period for running steps;
3. preserves unfinished steps and pending questions as resumable;
4. reports finished, interrupted, still-running, and awaiting-input work;
5. never discards preserved work.

Read the report. Work that is still running is not the same as work that
finished, and work that is waiting for you is not a failure.

## Resume

```sh
factory start
```

The factory reconnects to surviving sessions and resumes preserved work. It does
not blindly repeat completed steps, and it does not launch a second session when
liveness is unknown.

## Check status

```sh
factory status
```

The interrupted work should be resumable, and completed work should still be
complete. If a step is `unresolved`, do not force a retry.

## Verify the implementation

Ask your agent:

> Use the factory verify skill to check this implementation against the
> specification.

Or use the packaged verification skill by name: `factory-0010-verify`.

The verifier must be a distinct authenticated principal, not merely a new
session. It records the pinned revision, environment, evidence hashes, and a
verdict per scenario. The report is write-once and signed, and it is admitted by
a separate check.

A pass expires when the specification, implementation, descriptor, capabilities,
or environment changes, or after 90 days.

## Final checklist

You have:

- [ ] a valid `.factory/project.json`;
- [ ] all six core commands;
- [ ] a loading dashboard;
- [ ] an onboarding report that says **operational**;
- [ ] one order delivered with receipts;
- [ ] a clean shutdown and a successful resume;
- [ ] an admissible conformance report.

## If it fails

**Shutdown leaves work running**  
That can be normal. The report distinguishes still-running work. Start again
and let it reconnect.

**Resume duplicates work**  
Stop and inspect. The factory is not supposed to launch a second session while
liveness is unknown. Check the session references and the recovery report.

**Conformance is blocked**  
Read the admission reason. Common causes are a non-independent verifier, a
stale specification or implementation version, missing evidence, or a required
scenario marked not-applicable.

**Conformance fails a scenario**  
That is an implementation gap, not a documentation problem. Fix the
implementation and re-run. A claimed specification gap becomes an amendment
proposal; it does not turn a failure into a pass.

## You are done

The factory is set up, operated, and verified. Next, read
[Operating a factory](../guides/operating.md) for day-to-day use, or
[Design choices](../start/choices.md) to understand the tradeoffs.

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← 6. Answer and deliver](./06-answer-deliver.md) · [How it works →](../start/how-it-works.md)
