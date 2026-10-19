---
title: 4. Onboard
description: Answer the setup questions and reach an operational factory.
---

In this lesson you configure the factory and approve its first operating
policy.

## Start onboarding

Ask your agent:

> Use the factory onboarding skill to configure this factory.

Or run the onboarding command from the descriptor:

```sh
factory onboard
```

## Answer the questions

Onboarding asks only what the factory cannot safely guess. Prepare these
answers before you start.

| Topic | What it needs |
| --- | --- |
| Implementation | Language, runtime, entry point, package manager |
| Harnesses | Claude Code, Codex, OpenCode, or a mix |
| Accounts | Which accounts exist, and whether API or subscription |
| Money | API budgets and subscription limits |
| Builds | Local build machines, remote builders, or both |
| Delivery | Branch, pull request, environment, or package |
| Routing | Approved models, and any speed/quality preferences |
| Concurrency | How much work may run at once |
| Policy | The operating rules you approve |

If you do not know a value, say so. The factory records it as unresolved rather
than inventing a default.

## Credentials

Onboarding stores references to credentials, not the secrets themselves.

- Point each account at your existing credential store or secret manager.
- Do not paste an API key into the specification or the conversation.
- If a reference cannot be resolved, onboarding blocks the affected launch or
  check.

## What it writes

- the configuration file;
- durable, non-secret decisions in project-owned Piton;
- the approved policy record;
- the descriptor pointer and configuration digest;
- an onboarding report.

There is no hot reload. If you change configuration later, the factory
validates it, writes it atomically with a backup, and applies it on restart.

## Checkpoint

Run:

```sh
factory status
```

You should see:

- factory state;
- whether dispatch is active;
- no work yet, or clearly identified setup work;
- the specification version;
- any missing configuration.

The onboarding report should say **operational**. If it says **specified** or
**configured**, something is still missing.

## If it fails

**It says “specified”, not “configured”**  
The implementation or configuration is missing. Return to the scaffold lesson.

**It says “configured”, not “operational”**  
The six-command surface or dashboard is not validated. Read the scaffold
verification report and fix the failing command.

**It asks for a credential you do not have**  
Skip that account for now. The factory can run with the accounts it has, as
long as the policy reflects that.

**It asks for a budget you cannot decide**  
Choose a small, explicit number. You can change it later with an approved
configuration change. Do not leave it blank and assume “unlimited.”

Next: [submit your first order](/tutorial/05-first-order/).
