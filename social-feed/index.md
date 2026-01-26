---
title: Social Feed
description: A unified view of my activity across Bluesky and GitHub
layout: libdoc_page.liquid
permalink: social-feed/index.html
date: false
author: false
eleventyNavigation:
  key: Social Feed
---

<link rel="stylesheet" href="/assets/css/social-feed.css">

Stay up to date with my latest activity across social platforms. This feed automatically refreshes every 24 hours.

## Filter by Platform

<div class="feed-filters">
    <button class="feed-filter-btn active" data-feed-filter="all">
        All
    </button>
  <button class="feed-filter-btn" data-feed-filter="bluesky">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5c-2 1.5-4 1.5-6 0-1-1-1.5-2.5-1-4 .5-1.5 2-2.5 3.5-2.5s3 1 3.5 2.5c.5 1.5 0 3-1 4z"/></svg>
      Bluesky
  </button>
  <button class="feed-filter-btn" data-feed-filter="github">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
    GitHub
  </button>
</div>
<div class="feed-status" id="feed-status">
    <span>Loading feed status...</span>
    <button id="refresh-feeds" type="button">
        <span class="icon-arrows-clockwise"></span>
        Refresh Now
    </button>
</div>

## Activity Stream

<div id="feed-container" class="feed-container" data-config='{"bluesky":{"handle":"adamjolicoeur.bsky.social","enabled":true},"github":{"username":"AdamJ","enabled":true}}'>
    <div class="feed-loading">Loading feeds...</div>
</div>

---

### About This Feed

This social feed aggregator pulls content from multiple platforms into a single, unified view:

- **Bluesky**: Posts and interactions from my Bluesky account
- **GitHub**: Public activity including commits, pull requests, issues, and starred repositories

The feed is cached locally in your browser and automatically refreshes every 24 hours to minimize API calls while keeping content reasonably fresh. Click "Refresh Now" to force an immediate update.

<script src="/assets/js/social-feed.js"></script>
