---
title: Storybook
description: Creating a Storybook site for the first time!
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/storybook/index.html"
tags:
    - post
    - development
    - tools
    - first
date: 2025-10-03
ogImageUrl:
author: AdamJ
---

In my current role at [CAS](https://www.componentassembly.com), I not only manage the various products and internal applications, but design the interfaces and create the documentation for internal tooling.

The current project, codenamed "casWOW", is a refresh of an older internal project requiring an upgraded user interface with new(er) frameworks. As it stood at the start of the project, design documentation was limited and relied on static images shared on Sharepoint with no references. I set out to change that.

## Why Storybook?

Simply put, I've used it before (with React projects) and not only appreciated how the content could be organized, but how it showed both the visualization and the code to implement the component. Additionally, Storybook pointed out a Figma integration, which was an added bonus as Figma is part of the team's workflow.

### Getting started

Although the demo is an HTML-based site, Storybook has the ability to run with plain HTML as the stack, using JavaScript for the configuration and component files, rather than Typesciprt (`.tsx`) files. From there, I followed the guide on [integrating Bootstrap into Storybook](https://storybook.js.org/recipes/bootstrap) by adding my compiled CSS files to the `.storybook/preview.js` file in the same order that the `<head>` of my files renders the CSS.

> I skipped the theme switcher option, as I wanted to verify the initial installation and basic rendering of a single component before adding other features.

### Initial pass

I started with a simple Button component (Storybook provided Button, Header, and Page examples to start with), applying the styles from casWOW and including the different variations that will be used in the project. Not all of Bootstrap's button styles are included, so I wanted to keep the documentation to only what we use, not everything that Bootstrap offers).

The first issue that I encountered was adding the `btn-outline` variant, as it requires that the base variant (primary, secondary, etc.) be placed between `btn` and `outline`. Thankfully, I was able to reference examples online, with a simple cleanup request to Copilot to implement an outline variant.

## Next steps

As I add more component examples and expand the documentation, I'm hoping to add the theme-switcher (so that the development team can see how each component should look in both light and dark mode) as well as an [accessibility add-on](https://storybook.js.org/addons/@storybook/addon-a11y) that uses axe-core to test the components against a11y requirements.
