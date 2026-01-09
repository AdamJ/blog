---
title: Homebrew
description: The best way (IMO) to skip the drag-to-install mess of installing software on macOS.
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/homebrew-2026/index.html"
tags:
    - post
    - homebrew
    - software
    - macOS
    - tools
date: 2026-01-09
ogImageUrl:
---

## Why

I've grown tired of either having to visit sites individually to download `.DMG` files and install them, or using some 3rd party application to batch install software.

<!-- truncate -->

## What is Homebrew

[Homebrew](https://brew.sh) is the "missing package manager" for macOS and Linux. Rather than having to download applications and then install them manually, Homebrew, through the simple `brew install` command pulls the package and installs it for you - all in one go. Each application is installed into it's own directory and then, through a symbolic link (symlink), is added to the `/opt/homebrew` directory for macOS to read.

## What do I need to start?

All you need to have to start using Homebrew is 1. a terminal (comes in macOS!) and 2. the desire to change the old ways :-D

## What I Use

My particular usage of Homebrew is for installing some basic software - 1Password, Firefox, Discord, iTerm2, etc., but also some developer-centric pieces such as Node, PNPM, GitHub integrations, and ZSH (to name a few). Outside of software, I've also used it to install fonts (like [`font-monocraft`](https://github.com/IdreesInc/Monocraft) for a fun Minecraft-inspired font) and coding assistants such as Claude Code and GitHub Copilot for XCode.

### My Casks

> Casks are what Homebrew uses to skip the "to install, drag this icon..." step with manually installations
>
> **Cask names are written as shown in the terminal - copy these to install**

- 1password-cli
- alt-tab
- appcleaner
- breaktimer
- claude-code
- discord
- firefox
- font-monocraft
- ghostty
- github
- github-copilot-for-xcode
- handbrake
- iterm2
- obs
- obsidian
- pearcleaner
- raycast
- the-unarchiver
- vlc

## Managing Homebrew

There are two ways that I manage Homebrew installations - through iTerm2 (customized with ZSH+Oh-my-zsh) and through the Raycast extension [Brew](https://www.raycast.com/nhojb/brew).

Through iTerm2 is often the easiest when provided an specific cask (such as `brew install --cask font-monocraft`). THis insures that I get the exact one that I'm wanting.

If I'm more looking around for new tools, then I'll use the Raycast extension with it's GUI and ability to see the available commands for the given extension.

## Try It Yourself

To try out Homebrew, use the built-in Terminal on macOS or download your preferred option - I recommend [iTerm2](https://iterm2.com/index.html). From there, visit the [Homebrew](https://brew.sh) website and follow their instructions (I'd list them here, but there are options you may want to explore). After that, search for something you're familiar with or explore the new world available to you!

Enjoy!
