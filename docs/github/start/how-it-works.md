<!-- Generated from docs/src/content/docs. Do not edit directly. -->

# How it works

*A plain-language explanation of what the factory does and what you do.*

## The simple version

Think of the factory as a project manager with a team.

- **You** decide what should be built and what matters.
- **The planner** breaks the work into steps.
- **The workers** do the steps.
- **The reviewer** checks the result.
- **The factory** keeps track of everything, decides what can run at the same
  time, watches the budget, and asks you when a decision is needed.

You do not have to prompt every worker. You give the factory an order and it
handles the handoffs.

## What happens to an order

1. **You submit an order.** It can be a sentence, a specification, or both.
2. **The factory plans.** A strong model makes a broad plan. A mid-tier model
   turns each part into a detailed brief.
3. **Work is scheduled.** Steps run when their dependencies are done, there is
   capacity, and the budget allows it.
4. **Agents execute.** A cheap, fast agent often does the implementation. It
   works in its own git worktree so it cannot collide with other work.
5. **Results are checked.** A different, higher-level agent checks that the
   result matches the brief. It does not take over the work.
6. **Changes are integrated.** The factory combines the results, runs checks on
   the combined change, and resolves conflicts through an authorized agent.
7. **Work is delivered.** The change goes to the branch, pull request,
   environment, or package the order asked for.
8. **You get a clear record.** Plans, briefs, results, evidence, sessions, and
   receipts are stored so the work can be resumed or audited.

## What you do

You only need to do four kinds of things:

- **Decide intent.** What should be built, and what tradeoffs matter.
- **Approve exceptions.** More money, a new model, a specification change, or
  a factory enhancement.
- **Answer questions.** When an agent genuinely needs your decision, the
  factory asks. Only work that depends on the answer waits.
- **Check the result.** Use `status`, the dashboard, or the delivered change.

## What the factory does by itself

- breaks work into steps and dependencies;
- decides what is ready to run;
- routes work to models within your rules;
- enforces budgets and capacity;
- retries temporary failures within limits;
- recovers after a restart;
- detects stalls and escalates them;
- preserves evidence and worktrees;
- keeps running work independent while a question waits.

## What it will not do silently

- retry an effect that may already have happened;
- launch a second session when liveness is unknown;
- treat a missing usage reading as zero;
- mark an order complete without delivery and independent assessment;
- change its own approval rules, budget limits, audit, or rollback;
- change the specification without your authorization.

## The three things it needs from you

1. **A place to work.** A git project and a Piton toolchain.
2. **Accounts and limits.** Which agent tools you use, and what they may spend.
3. **A delivery destination.** A branch, pull request, environment, or package.

Everything else has a default, and the factory asks when there is no safe
default.

Next: [set it up in a new project](./setup.md).

---

[Repository README](../../../README.md) · [Documentation home](../README.md) · [← 7. Shut down and verify](../tutorial/07-shutdown-verify.md) · [Set up in a new project →](./setup.md)
