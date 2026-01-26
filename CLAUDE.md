# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Eleventy (11ty) static site blog built on the [eleventy-libdoc](https://eleventy-libdoc.netlify.app) framework. The site generates a personal blog with posts, social feed aggregator, RSS feed, and search functionality.

**Production URL**: https://blog.adamjolicoeur.com

## Development Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Run development server with live reload
pnpm serve
# or: npx @11ty/eleventy --serve

# Build for production
pnpm build
# or: npx @11ty/eleventy

# Clean build artifacts
pnpm clean
```

**Important**: This project enforces pnpm as the package manager via preinstall hook. Do not use npm or yarn.

## Architecture

### Configuration System

The blog uses a dual-layer configuration approach:

1. **`settings.json`** - User-editable site configuration (title, description, links, author, production URL, etc.)
2. **`_data/libdocConfig.js`** - Processed configuration with fallback defaults that imports from settings.json

All configuration values flow from settings.json → libdocConfig.js → templates. When modifying site settings, always edit settings.json, not libdocConfig.js.

### Directory Structure

- **`posts/YYYY/`** - Blog posts organized by year with markdown frontmatter
- **`_data/`** - Data files and Eleventy global data:
  - `libdocConfig.js` - Site configuration processor
  - `libdocFunctions.js` - Custom filters, shortcodes, collections
  - `libdocUtils.js` - Utility functions
  - `libdocMessages.json` - UI text/messages
  - `libdocSystem.json` - System-level configuration
- **`_includes/`** - Liquid templates:
  - `libdoc_page.liquid` - Primary page layout
  - `libdoc_index.liquid` - Homepage layout
  - `libdoc_before_html.liquid` - HTML head/meta tags
- **`core/`** - LibDoc framework files (blog list, tag pages, search, RSS feed)
- **`content/`** - Additional static pages
- **`social-feed/`** - Social feed aggregator page
- **`assets/`** - CSS, JS, images
- **`_site/`** - Build output (gitignored)

### Content Architecture

**Blog Posts** follow this pattern:
- Stored in `posts/YYYY/post-slug.md`
- Use `libdoc_page.liquid` layout
- Require frontmatter:
  ```yaml
  ---
  title: Post Title
  description: Post description
  layout: libdoc_page.liquid
  permalink: "{{ libdocConfig.blogSlug }}/post-slug/index.html"
  tags:
    - post
    - other-tags
  date: YYYY-MM-DD
  ---
  ```
- The `post` tag is required for posts to appear in the blog collection
- Use `<!-- truncate -->` to mark excerpt break for blog list view

**Static Pages** (like social-feed):
- Can be in root or subdirectories
- Use same frontmatter structure but without `post` tag
- Can include custom CSS/JS inline or via `/assets/`

### Eleventy Configuration (.eleventy.js)

Key plugins and features:
- **Image transform** - Automatic responsive image generation via @11ty/eleventy-img
- **Navigation** - Hierarchical navigation via @11ty/eleventy-navigation
- **RSS** - Feed generation at `/feed.xml`
- **Custom filters** - `autoids`, `embed`, `cleanup`, `dateString`, `toc`, `gitLastModifiedDate`
- **Custom collections** - `myTags`, `postsByDateDescending`
- **Shortcodes** - `alert`, `embed`, `icon`, `iconCard`, `sandbox`

### LibDoc Workarounds

Due to Eleventy 3.x ESM requirements, the project uses a JSON import workaround:

```javascript
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const userConfig = require("../settings.json");
```

This pattern appears in `libdocConfig.js` and `libdocFunctions.js` and should be maintained for JSON imports.

## Working with Posts

### Creating New Posts

1. Create markdown file in `posts/YYYY/` (current year directory)
2. Add required frontmatter with `post` tag
3. Set permalink following pattern: `"{{ libdocConfig.blogSlug }}/slug/index.html"`
4. Add `<!-- truncate -->` after the excerpt (optional but recommended)

### Organizing Images

- Post images can be stored in `posts/YYYY/images/` for organization
- Reference with relative paths: `./images/filename.jpg`
- Eleventy's image transform plugin will automatically optimize them

## Social Feed Aggregator

The social feed (`social-feed/index.md`) is a custom feature that:
- Aggregates Bluesky and GitHub activity
- Uses client-side JavaScript (`/assets/js/social-feed.js`)
- Caches data in browser localStorage (24-hour refresh cycle)
- Configuration embedded in data-config attribute on feed container

To modify platforms or handles, edit the `data-config` JSON in `social-feed/index.md`.

## Customization Points

### Site-Wide Changes
- **Metadata/branding**: Edit `settings.json`
- **Navigation links**: Update `customLinks` array in `settings.json`
- **Theme/styling**: Modify files in `core/assets/` or add custom CSS to `assets/css/`

### Content Features
- **Table of contents**: Controlled by `tocEnabled`, `tocHtmlTags`, `tocMinTags` in settings.json
- **Git last modified dates**: Toggle via `gitLastModifiedDate` in settings.json
- **Search**: Toggle via `searchEnabled` in settings.json
- **Syntax highlighting**: Configure languages via `hljsLanguages` array in settings.json

## Deployment

The site builds static HTML/CSS/JS to `_site/` directory. Deployment strategy:
- GitHub Pages configured with `CNAME` file
- GitHub Actions likely handles automated builds on push to main branch
- Build command: `npx @11ty/eleventy`
