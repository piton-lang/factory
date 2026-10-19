---
title: Why a factory
description: The problem, the goal, and the boundaries of the factory.
---

## The problem

An engineer can prompt an agent to do a task. Repeating that for a whole
project creates a different problem: plans live in one session, results live in
another, reviews depend on memory, and nobody can say what is running, what is
blocked, or why money is being spent.

The factory exists to make delegated work traceable, resumable, and
repeatable without turning every project into a bespoke orchestration service.

## The goal

A project-owned factory should be able to:

- accept an order from a prompt, a specification, or both;
- plan work at a high level, elaborate it into steps, and delegate it;
- run independent work concurrently within budget and capacity limits;
- keep plans, briefs, results, evidence, and sessions durable across restarts;
- explain what is running, what is blocked, and what needs the engineer;
- review and deliver results with an independent assessment;
- learn from completed work and improve its own implementation when approved.

## What it is not

The specification deliberately does not define:

- one hosted factory service shared by every project;
- one implementation language or runtime;
- one universal configuration schema;
- one universal test suite or review gate;
- one fixed pipeline of stage types;
- automatic approval for new models, more money, or specification changes.

## Principles

**The project owns its factory.** The package is tetherable. Each project
implements only the capabilities it needs, in its own technology, and grows
them over time.

**Deterministic controls, agent-written wiring.** Code owns scheduling,
budgeting, capacity, retries, recovery, and validation. Agents write and repair
the environment-specific connections to harnesses, builds, and delivery
targets.

**Approval is explicit.** Specification amendments, enhancements, new models,
and additional funds need the engineer unless a recorded authorization covers
them.

**Work is independent until it is not.** Independent steps continue while a
question is pending. Only dependents of the answer are blocked.

**Nothing is silently assumed.** Unknown liveness, unknown usage, missing
evidence, and unresolved effects are explicit states, not zeros or successes.

## What success looks like

The first useful version can resume existing work, deliver one pending order,
survive a restart without duplicate effects, and explain what it did. Later
versions add capacity, routing, evolution, and richer conformance.

Continue with [the design choices](/start/choices/) or the
[core concepts](/start/concepts/).
