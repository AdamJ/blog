/**
 * Social Feed Aggregator
 * Fetches and displays content from Bluesky and GitHub
 * with 24-hour caching and filtering capabilities
 */

const SocialFeedAggregator = (function() {
    const CACHE_KEY = 'social_feed_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Configuration - these should be set via data attributes on the page
    let config = {
        bluesky: {
            handle: '',
            enabled: true
        },
        github: {
            username: '',
            enabled: true
        }
    };

    /**
     * Initialize the feed aggregator
     * @param {Object} userConfig - User configuration for social accounts
     */
    function init(userConfig) {
        config = { ...config, ...userConfig };
        setupEventListeners();
        loadFeeds();
    }

    /**
     * Setup filter button event listeners
     */
    function setupEventListeners() {
        const filterButtons = document.querySelectorAll('[data-feed-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.feedFilter;
                setActiveFilter(filter);
                filterFeeds(filter);
            });
        });

        const refreshButton = document.getElementById('refresh-feeds');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                clearCache();
                loadFeeds(true);
            });
        }
    }

    /**
     * Set active state on filter buttons
     */
    function setActiveFilter(filter) {
        const buttons = document.querySelectorAll('[data-feed-filter]');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.feedFilter === filter) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Filter displayed feed items
     */
    function filterFeeds(filter) {
        const items = document.querySelectorAll('.feed-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.source === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    /**
     * Load feeds from cache or fetch fresh data
     */
    async function loadFeeds(forceRefresh = false) {
        const container = document.getElementById('feed-container');
        const statusEl = document.getElementById('feed-status');

        if (!container) return;

        // Show loading state
        container.innerHTML = '<div class="feed-loading">Loading feeds...</div>';

        // Check cache first
        const cached = getCache();
        if (cached && !forceRefresh) {
            renderFeeds(cached.data);
            updateStatus(cached.timestamp);
            return;
        }

        try {
            const feeds = await fetchAllFeeds();
            const sortedFeeds = sortFeedsByDate(feeds);

            setCache(sortedFeeds);
            renderFeeds(sortedFeeds);
            updateStatus(Date.now());
        } catch (error) {
            console.error('Error loading feeds:', error);
            container.innerHTML = '<div class="feed-error">Error loading feeds. Please try again later.</div>';
        }
    }

    /**
     * Fetch feeds from all enabled sources
     */
    async function fetchAllFeeds() {
        const promises = [];

        if (config.bluesky.enabled && config.bluesky.handle) {
            promises.push(fetchBlueskyFeed().catch(err => {
                console.error('Bluesky fetch error:', err);
                return [];
            }));
        }

        if (config.github.enabled && config.github.username) {
            promises.push(fetchGitHubFeed().catch(err => {
                console.error('GitHub fetch error:', err);
                return [];
            }));
        }

        const results = await Promise.all(promises);
        return results.flat();
    }

    /**
     * Fetch Bluesky feed using AT Protocol public API
     */
    async function fetchBlueskyFeed() {
        const handle = config.bluesky.handle;

        // First, resolve the DID from the handle
        const resolveResponse = await fetch(
            `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`
        );

        if (!resolveResponse.ok) {
            throw new Error('Failed to resolve Bluesky handle');
        }

        const { did } = await resolveResponse.json();

        // Fetch the author's feed
        const feedResponse = await fetch(
            `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${encodeURIComponent(did)}&limit=20`
        );

        if (!feedResponse.ok) {
            throw new Error('Failed to fetch Bluesky feed');
        }

        const feedData = await feedResponse.json();

        return feedData.feed.map(item => ({
            id: item.post.uri,
            source: 'bluesky',
            type: 'post',
            title: null,
            content: item.post.record.text,
            url: `https://bsky.app/profile/${handle}/post/${item.post.uri.split('/').pop()}`,
            date: new Date(item.post.record.createdAt),
            author: item.post.author.displayName || item.post.author.handle,
            avatar: item.post.author.avatar,
            engagement: {
                likes: item.post.likeCount || 0,
                reposts: item.post.repostCount || 0,
                replies: item.post.replyCount || 0
            },
            images: item.post.embed?.images?.map(img => img.thumb) || []
        }));
    }

    /**
     * Fetch GitHub public events
     */
    async function fetchGitHubFeed() {
        const username = config.github.username;
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub events');
        }

        const events = await response.json();

        return events
            .filter(event => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent', 'ReleaseEvent', 'WatchEvent', 'ForkEvent'].includes(event.type))
            .map(event => formatGitHubEvent(event));
    }

    /**
     * Format GitHub event into standard feed item format
     */
    function formatGitHubEvent(event) {
        const baseItem = {
            id: event.id,
            source: 'github',
            date: new Date(event.created_at),
            author: event.actor.display_login || event.actor.login,
            avatar: event.actor.avatar_url,
            repo: event.repo.name
        };

        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits || [];
                const commitMessages = commits.slice(0, 3).map(c => c.message.split('\n')[0]).join(', ');
                return {
                    ...baseItem,
                    type: 'push',
                    title: `Pushed ${commits.length} commit${commits.length !== 1 ? 's' : ''} to ${event.repo.name}`,
                    content: commitMessages || 'No commit message',
                    url: `https://github.com/${event.repo.name}/commits`
                };

            case 'CreateEvent':
                return {
                    ...baseItem,
                    type: 'create',
                    title: `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${event.repo.name}`,
                    content: event.payload.description || `New ${event.payload.ref_type} created`,
                    url: `https://github.com/${event.repo.name}`
                };

            case 'PullRequestEvent':
                return {
                    ...baseItem,
                    type: 'pr',
                    title: `${event.payload.action} PR: ${event.payload.pull_request.title}`,
                    content: event.payload.pull_request.body?.substring(0, 200) || 'No description',
                    url: event.payload.pull_request.html_url
                };

            case 'IssuesEvent':
                return {
                    ...baseItem,
                    type: 'issue',
                    title: `${event.payload.action} issue: ${event.payload.issue.title}`,
                    content: event.payload.issue.body?.substring(0, 200) || 'No description',
                    url: event.payload.issue.html_url
                };

            case 'ReleaseEvent':
                return {
                    ...baseItem,
                    type: 'release',
                    title: `Released ${event.payload.release.tag_name} of ${event.repo.name}`,
                    content: event.payload.release.body?.substring(0, 200) || 'New release',
                    url: event.payload.release.html_url
                };

            case 'WatchEvent':
                return {
                    ...baseItem,
                    type: 'star',
                    title: `Starred ${event.repo.name}`,
                    content: 'Added repository to starred list',
                    url: `https://github.com/${event.repo.name}`
                };

            case 'ForkEvent':
                return {
                    ...baseItem,
                    type: 'fork',
                    title: `Forked ${event.repo.name}`,
                    content: `Created fork at ${event.payload.forkee.full_name}`,
                    url: event.payload.forkee.html_url
                };

            default:
                return {
                    ...baseItem,
                    type: 'activity',
                    title: `Activity on ${event.repo.name}`,
                    content: event.type,
                    url: `https://github.com/${event.repo.name}`
                };
        }
    }

    /**
     * Sort feeds by date (newest first)
     */
    function sortFeedsByDate(feeds) {
        return feeds.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Render feeds to the container
     */
    function renderFeeds(feeds) {
        const container = document.getElementById('feed-container');
        if (!container) return;

        if (feeds.length === 0) {
            container.innerHTML = '<div class="feed-empty">No feed items found.</div>';
            return;
        }

        const html = feeds.map(item => renderFeedItem(item)).join('');
        container.innerHTML = html;

        // Apply current filter
        const activeFilter = document.querySelector('[data-feed-filter].active');
        if (activeFilter) {
            filterFeeds(activeFilter.dataset.feedFilter);
        }
    }

    /**
     * Render a single feed item
     */
    function renderFeedItem(item) {
        const sourceIcon = getSourceIcon(item.source);
        const typeIcon = getTypeIcon(item.type);
        const formattedDate = formatDate(item.date);
        const engagementHtml = item.engagement ? renderEngagement(item.engagement) : '';
        const imagesHtml = item.images && item.images.length > 0 ? renderImages(item.images) : '';

        return `
            <article class="feed-item" data-source="${item.source}" data-type="${item.type}">
                <div class="feed-item__header">
                    <span class="feed-item__source ${item.source}" title="${item.source}">
                        ${sourceIcon}
                    </span>
                    <span class="feed-item__type" title="${item.type}">
                        ${typeIcon}
                    </span>
                    <time class="feed-item__date" datetime="${item.date.toISOString()}">
                        ${formattedDate}
                    </time>
                </div>
                ${item.title ? `<h3 class="feed-item__title">${escapeHtml(item.title)}</h3>` : ''}
                <div class="feed-item__content">
                    ${item.isPlaceholder ? item.content : escapeHtml(item.content)}
                </div>
                ${imagesHtml}
                ${engagementHtml}
                <a href="${item.url}" class="feed-item__link" target="_blank" rel="noopener noreferrer">
                    View on ${item.source.charAt(0).toUpperCase() + item.source.slice(1)} →
                </a>
            </article>
        `;
    }

    /**
     * Render engagement stats (likes, reposts, etc.)
     */
    function renderEngagement(engagement) {
        return `
            <div class="feed-item__engagement">
                ${engagement.likes ? `<span class="engagement-stat"><span class="icon-heart"></span> ${engagement.likes}</span>` : ''}
                ${engagement.reposts ? `<span class="engagement-stat"><span class="icon-repeat"></span> ${engagement.reposts}</span>` : ''}
                ${engagement.replies ? `<span class="engagement-stat"><span class="icon-chat-text"></span> ${engagement.replies}</span>` : ''}
            </div>
        `;
    }

    /**
     * Render images grid
     */
    function renderImages(images) {
        return `
            <div class="feed-item__images">
                ${images.slice(0, 4).map(img => `<img src="${img}" alt="" loading="lazy" />`).join('')}
            </div>
        `;
    }

    /**
     * Get icon for source platform
     */
    function getSourceIcon(source) {
        const icons = {
            bluesky: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5c-2 1.5-4 1.5-6 0-1-1-1.5-2.5-1-4 .5-1.5 2-2.5 3.5-2.5s3 1 3.5 2.5c.5 1.5 0 3-1 4z"/></svg>',
            github: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>'
        };
        return icons[source] || '';
    }

    /**
     * Get icon for activity type
     */
    function getTypeIcon(type) {
        const icons = {
            post: '<span class="icon-chat-text"></span>',
            push: '<span class="icon-git-commit"></span>',
            create: '<span class="icon-plus"></span>',
            pr: '<span class="icon-git-pull-request"></span>',
            issue: '<span class="icon-warning-circle"></span>',
            release: '<span class="icon-tag"></span>',
            star: '<span class="icon-star"></span>',
            fork: '<span class="icon-git-fork"></span>',
            activity: '<span class="icon-activity"></span>'
        };
        return icons[type] || '<span class="icon-circle"></span>';
    }

    /**
     * Format date for display
     */
    function formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        } else if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get cached data
     */
    function getCache() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const parsed = JSON.parse(cached);
            const age = Date.now() - parsed.timestamp;

            if (age > CACHE_DURATION) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }

            // Restore Date objects
            parsed.data = parsed.data.map(item => ({
                ...item,
                date: new Date(item.date)
            }));

            return parsed;
        } catch (e) {
            console.error('Cache read error:', e);
            return null;
        }
    }

    /**
     * Set cache data
     */
    function setCache(data) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: data
            }));
        } catch (e) {
            console.error('Cache write error:', e);
        }
    }

    /**
     * Clear cache
     */
    function clearCache() {
        localStorage.removeItem(CACHE_KEY);
    }

    /**
     * Update status display
     */
    function updateStatus(timestamp) {
        const statusEl = document.getElementById('feed-status');
        if (!statusEl) return;

        const date = new Date(timestamp);
        const nextRefresh = new Date(timestamp + CACHE_DURATION);

        statusEl.innerHTML = `
            <span>Last updated: ${date.toLocaleString()}<br>
            <small>Auto-refresh in: ${formatTimeUntil(nextRefresh)}</small></span>
            <button id="refresh-feeds" type="button">
                <span class="icon-arrows-clockwise"></span>
                Refresh Now
            </button>
        `;

        // Re-attach event listener to new button
        const refreshButton = document.getElementById('refresh-feeds');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                clearCache();
                loadFeeds(true);
            });
        }
    }

    /**
     * Format time until next refresh
     */
    function formatTimeUntil(date) {
        const diff = date - Date.now();
        if (diff <= 0) return 'now';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    // Public API
    return {
        init,
        loadFeeds,
        clearCache,
        filterFeeds
    };
})();

// Auto-initialize if config is present
document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.getElementById('feed-container');
    if (feedContainer && feedContainer.dataset.config) {
        try {
            const config = JSON.parse(feedContainer.dataset.config);
            SocialFeedAggregator.init(config);
        } catch (e) {
            console.error('Failed to parse feed config:', e);
        }
    }
});
