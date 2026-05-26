---
title: Adding a Kanban Board to TimeTracker Pro
description: How a flat task list became a full planning surface — PlannedTask entities, pull-to-day mechanics, stale session handling, and what it took to wire it all together.
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/kanban-board-timetracker-pro/index.html"
tags:
    - post
    - development
    - apps
    - tools
    - ios
    - claude
date: 2026-05-26
ogImageUrl:
---

TimeTracker Pro has always been good at one thing: capturing time against tasks as they happen. What it wasn't good at was planning. The `/tasks` page was a flat list — useful for quick reference, not useful for thinking about what's coming or what's in flight. If I wanted to see the shape of a week's work before it happened, I was doing that somewhere else.

<!-- truncate -->

*May 2026 · Brimfield Labs / TimeTracker Pro*

## The Design Decision: Separate Entities

The Kanban board replaces the tasks page entirely. Four columns — To Do, In Progress, Done, Blocked — with a `PlannedTask` entity that's completely separate from the timed task model. That separation was the first real design decision, and the right one. A planned task and a timed task serve different purposes: one is a commitment, one is a record. Conflating them means either the planning view is cluttered with raw time data or the tracking model gets complicated by planning state. Keeping them separate keeps both clean.

## Pull-to-Day: Where the Two Systems Connect

The pull-to-day mechanic is where the two systems connect. Dragging a planned task into the active day starts timing immediately and links the `PlannedTask` to the newly created timed entry. If there's no active day open, it guards against creating orphaned time records. If the current day is stale — a session started yesterday and never closed — it requires you to resolve that first.

That stale day edge case was already a bug waiting to happen, and the Kanban work surfaced it cleanly enough to fix properly: `endDay()` now accepts an optional `endDateTime` so closing a previous day's session doesn't stamp everything with today's timestamp.

## The StaleDayDialog

The `StaleDayDialog` that handles stale sessions is non-dismissable by design. You either pick an end time or discard the day. There's no third option that would leave the data in a bad state.

## Storage

On the storage side, `PlannedTask` follows the same dual-storage pattern as the rest of the app: localStorage for guest users, Supabase for authenticated ones. The Supabase migration adds the `planned_tasks` table with status, priority, and `linked_task_id` for the pull connection. The planned task status lifecycle is intentionally independent of the work day — in-progress tasks carry across days without any special handling, which is the correct behavior for work that spans multiple sessions.

## iOS Integration

The iOS-specific layer — `AdaptiveDialog` bottom sheets, haptic feedback on card interactions, long-press context menus — came mostly for free from patterns already established elsewhere in the app. The bigger integration work was wiring five new context methods (`addPlannedTask`, `updatePlannedTask`, `deletePlannedTask`, `movePlannedTask`, `pullPlannedTaskToDay`) without disturbing the existing day lifecycle logic.

## An Unrelated Bug, Found Anyway

The session also caught a stale closure bug in the `beforeunload` handler — unrelated to the Kanban work, but discovered during the merge review when main landed a ref-based fix to the same area of `TimeTrackingContext`. Clean merge, zero type errors, both changes coexist correctly. That's the kind of thing code review surfaces and solo work often misses.

## The Complete Loop

The tasks page as a planning surface changes how I expect to use the app week-to-week. The AI weekly report already handles retrospective synthesis. The Kanban board handles prospective planning. The time tracking in between handles the actual record. That's a complete loop now.
