---
title: My MTG App
description: Creating an app using Gemini prompts
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/my-mtg-app/index.html"
tags:
    - post
    - gemini
    - ai
    - development
date: 2025-02-12
ogImageUrl:
---

It all began with this prompt:

> What are some of the best tools for creating a native web application for managing magic card decks lists, a life counter, and have the ability to manage an event directly from the application insofar as to have a standings, tie-breakers, and breakdown of wins-loses-draws by each game for each player?

<!-- truncate -->

From this initial prompt, I began the two-day process of creating my first web app using AI.

## AI Choice

For this, I decided to try out Gemini, as I had tried ChatGPT and Claude AI previously but was not too impressed with the results. I don't know if this was due to my prompts or the models, but it was enough to get me to try another system.

<img class="long-shadow"
    src="./images/gemini.png"
    alt="gemini">

## The Prompts And Returns

> What are some of the best tools for creating a native web application for managing magic card decks lists, a life counter, and have the ability to manage an event directly from the application insofar as to have a standings, tie-breakers, and breakdown of wins-loses-draws by each game for each player?

<img class="long-shadow"
    src="./images/gemini-one.png"
    alt="gemini-one">

This was my initial prompt, as I have wanted to create a new system for managing my local games and never really liked the way that I had to use multiple apps to handle matches, standings, and deck lists.

Gemini responded with a variety of frontend, backend, database, and state management solutions, with an example tech stack of the following:

- Frontend: React, Material UI, Redux
- Backend: Node.js, Express, PostgreSQL
- Database: PostgreSQL
- Hosting: Netlify (for frontend), AWS or Google Cloud (for backend and database)

From this example tech stack, I followed up with this prompt:

> Can you provide me with a basic framework for creating this application, including usable code for the life counter? The framework is React, using Material UI. The data will need to be saved locally until a user decides to export the data in a JSON formatted file, which I will be uploading to GitHub for reference.

<img class="long-shadow"
    src="./images/gemini-two.png"
    alt="gemini-two">

**Below is `App.js` code provided by Gemini**

<script src="https://gist.github.com/AdamJ/602edd46c916754580c1c91115741c18.js"></script>

This included explainers on how to use Material UI and why it was chosen, state management uses, handling of the match history (including how to select a winner, life totals, etc.), and methods for exporting the data in the desired JSON format. It even included a breakdown of how to run the code using by first creating a React project, installing Material UI, and replacing the `App.js` file with the one it provided me.

What came next was my first back-and-forth, where I had to explain to Gemini that the suggested `npx create-react-app mtg-life-counter` prompt would not work, as the CreateReactApp project is no longer maintained.

<img class="long-shadow"
    src="./images/gemini-create-app.png"
    alt="gemini-create-app">

**Me:**
> how to I create a new react app when the 'create-react-app' package is no longer maintained?

**Gemini:**
> You're right, create-react-app is no longer the officially recommended way to start new React projects.  While it might still work in some cases, it's best to use a more modern and supported approach.  Here are the primary recommended alternatives:

- Vite `npm create vite@latest mtg-life-counter`
- Create a React App (new method) `npm init react-app mtg-life-counter`
- Parcel

I chose to use Vite and ran the suggested command `npm create vite@latest my-mtg-app -- --template react`, installed the dependencies, and started up the development server for the first time. Next came the installation of Material UI.

### Pivot (!)

Here is where I decided to throw in the PWA (Progressive Web App) requirement, testing if it could continue to build off of the prior pieces, using React with Vite.

<img class="long-shadow"
    src="./images/gemini-webapp.png"
    alt="gemini-webapp">

From there, I asked the following:

- to create this as a multi-page application
- use Material UI for the navigation
- responsive design (material Grid)
- use an `if` option to allow for a secondary dropdown when "multicolor" is selected from the color list
- making fields required
- grouping fields in the "Match Summary" section
  - expanding upon this as a user-choice rather than a fixed option

## Code Questions

Throughout this back-and-forth, I either had questions on why a piece of code was not working or I would ask Gemini to update a piece of code to either replace an existing from Material UI component, or add in a new one somewhere in the code.

### Reference One

**Asking to Fix a Coding Error**
![gemini-debug](./images/gemini-debug.png)
**Gemini provided me with a tidy fixed, with an explanation for each change.**
![gemini-debug-response](./images/gemini-debug-response.png)
![gemini-debug-response-2](./images/gemini-debug-response-2.png)

### Reference Two

I also came across a piece of deprecated code that came from a Gemini response (`<Grid>` vs `<Grid2>`). I asked how to fix this as well:
![gemini-deprecated-code](./images/gemini-deprecated-code.png)

## Referencing Prior Chats

At some point, I left the chat alone for a while and asked if Gemini could reference a prior chat. Even though I had not left the chat window, nor started a fresh conversation, Gemini was unable to reference what had been discussed previously.

![gemini-update-chat](./images/gemini-update-chat.png)

## Findings

After this experiment, I came away quite impressed with what I was able to accomplish with a good set of prompts, research, and trial-and-error. Admittedly, I have some experience with React, but I had always used existing libraries to create anything, riffing off of what came from templates or examples.

Moving forward, I plan to continue to utilize Gemini for updating this web-app and potentially turn it into a native iOS and/or Android app. I'll be testing it at my next Cube event but, if you're interested in it, check out the GitHub repo here: [My MTG App](https://github.com/AdamJ/my-mtg-app).

---

Thanks for reading!
