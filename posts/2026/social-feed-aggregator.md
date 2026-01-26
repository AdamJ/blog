---
title: Building a Social Feed Aggregator for My Blog
description: How I built a unified social feed that pulls content from Bluesky and GitHub into a single page with automatic caching.
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/social-feed-aggregator/index.html"
tags:
    - post
    - javascript
    - api
    - development
    - claude
date: 2026-01-25
ogImageUrl:
---

For a while now, I've been wanting to try out having all my social activity on my site, without having to embed using old framing or screenshots with links. With the help of documentation and Claude Code, I've finally added a **Social Feed Aggregator** that pulls content from Bluesky and GitHub into one unified view.

<!-- truncate -->

## The Problem

I found myself constantly switching between apps to share my activity with others. Each platform has its own interface, and there's no easy way to see a chronological view of what I've done.

I wanted to solve this by creating a single page on my blog that:

1. Pull together content from multiple social platforms
2. Displays everything in a single feed
3. Allows filtering by platform
4. Caches data locally to minimize API calls
5. Automatically refreshes every day (24 hours)

## The Solution

With the help of Claude Code, I built a client-side JavaScript solution that fetches data from the public APIs provided by Bluesky and GitHub, and displays it in a clean, filterable interface. It is up today on my [Social Feed page](/social-feed/).

### Architecture Overview

The aggregator consists of three main components:

1. **JavaScript API Client** - Handles fetching data from each platform's API
2. **Local Storage Cache** - Stores feed data with a 24-hour expiration
3. **Rendering Engine** - Displays feed items with filtering capabilities

### Fetching from Bluesky

Bluesky uses the AT Protocol, and has a public API that doesn't require authentication (for reading public posts). Here's how it turned out:

```javascript
async function fetchBlueskyFeed() {
    const handle = 'yourhandle.bsky.social';

    // First, resolve the DID from the handle
    const resolveResponse = await fetch(
        `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`
    );
    const { did } = await resolveResponse.json();

    // Then fetch the author's feed
    const feedResponse = await fetch(
        `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&limit=20`
    );
    return feedResponse.json();
}
```

Between the use of Bluesky's [documentation on Custom Feeds](https://docs.bsky.app/docs/starter-templates/custom-feeds) and the AT Protocol, it was surprisingly straightforward to implement.

### Fetching from GitHub

I've know for a while that GitHub has a [well-documented](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28), public API, so I wanted to try to surface the following activities:

- Push commits
- Pull request actions
- Issue creation and updates
- Repository stars and forks
- Release publications

```javascript
async function fetchGitHubFeed() {
    const username = 'YourUsername';
    const response = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=30`
    );
    return response.json();
}
```

Each event type is formatted differently to provide relevant context - Commit messages are push events, while a Pull Request shows the pull request title and status.

### Implementing the Cache

In order to provide a snappy experience while also keeping API requests to a minimum, the aggregator caches all feed data locally:

```javascript
const CACHE_KEY = 'social_feed_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getCache() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const age = Date.now() - parsed.timestamp;

    if (age > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }

    return parsed;
}

function setCache(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
    }));
}
```

I decided on 24-hours between each refresh so that I can balance the content updates with API rate limits.

## The User Interface

The feed page includes:

- **Filter buttons** to view all content or just a specific platform
- **Status indicator** showing when the feed was last updated
- **Manual refresh button** to force an immediate update
- **Responsive cards** for each feed item with platform-specific styling

Each platform gets a unique accent color so you can quickly scan the feed and identify content sources:

- Bluesky: Blue (#0085ff)
- GitHub: Dark gray (#24292e)

## Lessons Learned

Building this feature taught me a few things:

1. **Public APIs make this possible** - Both Bluesky and GitHub offer developer-friendly public APIs
2. **Caching is essential** - Both for performance and being respectful of API rate limits
3. **Progressive enhancement works** - The page is still useful even if one API fails
4. **Date handling is tricky** - Each platform formats dates differently, requiring normalization

## What's Next

While I don't really use other platforms, here are a few ideas for future improvements:

- Add Mastodon support via ActivityPub
- Include RSS feed integration for other content sources (maybe a playlist of YouTube video that I recommend?)
- Add engagement tracking to show trending posts
- Implement server-side rendering for better SEO

## Try It Out

If you'd like to check out what I have so far, visit the [Social Feed page](/social-feed/) to see it in action. The code is available in [my blog's repository](https://github.com/AdamJ/eleventy-blog) if you want to implement something similar for your own site.

Have questions or suggestions? Feel free to reach out on any of the platforms in the feed!
