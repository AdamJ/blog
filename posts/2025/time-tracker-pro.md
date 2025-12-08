---
title: Time Tracker Pro
description: Taking an idea from concept to reality.
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/time-tracker-pro/index.html"
tags:
    - post
    - development
    - tools
    - apps
date: 2025-10-10
author: AdamJ
---

I've been working on a time tracking site of and on for years, but never got it over the "hump" into something usable. After playing around with Figma Make, Lovable, and various other "no code" tools, I finally got my idea from concept to reality.

> As Law and Order says...here is my story.

## Why

I started this project as I needed a way to track my daily tasks, but not by using some third party option. I know that a ton of them exist, but I (1) didn't want to rely on something that would either shut down or go behind a paywall and (2) needed to be able customize whatever I wanted without hitting a feature wall or some random constraint. I had been using a time clock app that relied on manually entering everything, but what works for some wasn't working for me.

## Getting Started

While I initially tried to make this just using Copilot, I kept running into stumbling blocks - either it used incorrect libraries, UI changes would come and go seemingly at random, or it'd just forget where it was and make similar changes over and over. Realizing that was getting me nowhere, I switched over the [Lovable](https://lovable.dev) to give that a go.

Starting with the following prompt:

"
I’d like to create a time clocking webapp, where users would start their day with a “start day” button and end their day with an “end day” button. Each “start day” button would begin a running timer that should be displayed to users in the navigation title, next to the sheet title.
New tasks/activities would be entered by a “new task” button that would end the running time of the previous task and start a new running time. Each new task requires a title and should display the starting time.
Users should be able to edit a previously entered tasks by an “edit” button that only saves changes when a user explicitly taps “save”.
Users should be able to delete a task viewing the task’s details and then tapping “delete”. This action requires a confirmation through a confirmation screen. Cancelling the action closes dialogue to show the details screen.
After a user taps “end day” the final time is calculated and displayed to the user. After a day has ended and the information is displayed, users can tap a “post time” button to add the day to an archive of all days (that can be displayed on a calendar). Tapping “post time” will clear the current day’s information so that the next day’s work can be added.
"

I watched as the system 'thought' through it's work, created a plan, and started to build out the interface. As a follow-up, I requested the ability to archive my days:

"
Create an archive page that shows all of the archived time entries, in order of the oldest entry at the top to the newest entry at the bottom. There should be an edit button in order to open up the archived day. The page should allow for printing, wherein the printed page will utilize a custom `print.css` file that includes a proper layout similar to an invoice for work performed.
"

I ran into quite a few issues getting the site to compile - navigation link was wrong, various Typescript errors, and Lovable's system hanging. At one point I had to copy an error from the browser console and request that it think step-by-step in order to solve it.

```text
For the code present, I get the error below.

Please think step-by-step in order to resolve it.
```
```js
Error: useTimeTracking must be used within TimeTrackingProvider

{
  "timestamp": 1754747532563,
  "error_type": "RUNTIME_ERROR",
  "filename": "https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js",
  "lineno": 38,
  "colno": 3364,
  "stack": "dg@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:138:2713\nsS@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:182:20633\ndu@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:38:16995\nSh@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:43920\nEh@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:39701\nd0@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:39629\nWs@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:39483\nfc@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:35865\ndp@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:36667\nVn@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:38:3273\n@https://id-preview--4ec1e60c-a670-4297-837e-ad69e2f3f778.lovable.app/assets/index-OSuU4L24.js:40:34201",
  "has_blank_screen": true
}
```

Unfortunately, these additional troubleshooting steps ate up the free plan faster than expected.

After these steps and maybe an hour of time passed (before hitting the end of the free plan), I had a working UI that saved entries to `localStorage` with an option to view previously archived (i.e. completed days).

After hitting the end of my free-tier time with Lovable, I downloaded the project and started to work on it locally (you can read the process for editing the code in the [`README-LOVABLE.md`](https://github.com/AdamJ/TimeTrackerPro/blob/main/info/README-LOVABLE.md) file in the TimeTrackerPro repository).

## Local Development

If you'd like to give TimeTrackerPro a try, check out the repo here: [TimeTrackerPro on GitHub](https://github.com/AdamJ/TimeTrackerPro)

## The End

Interested in Lovable? Click on my link to earn some extra credits for both of us!

[Try Lovable](https://lovable.dev/invite/9OBWGI4)
