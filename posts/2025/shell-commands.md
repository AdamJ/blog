---
title: Shell Commands
description: Common shell commands that I find useful
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/shell-commands/index.html"
tags:
    - post
    - shell
    - commands
    - tools
    - development
date: 2025-11-20
ogImageUrl:
author: AdamJ
---

I often find myself using the command line when prototyping, installing tools (through Homebrew), or editing simple files with VIM and occassionally run into issues where I need commands that I know exist, but can't remember how they exactly go. Instead of constantly searching for them or adding them into some nebulous `.txt` or `.md` file, I figured I would add them here.

## Port in Use

```cmd
sudo lsof -i :3001 # or whatever port you are using
```
This is useful when an error occurs around a port being in use. Sometimes, the system just does not let go of that port, even when there is nothing running on it anymore, and you need to find the PID to stop (kill) the process.

```cmd
sudo lsof -i :3001
43434 # result of running lsof
kill -9 43434 # stops the running process without prejudice
sudo lsof -i :3001 # run again to double check - should return nothing
```

## Change Default Screenshot Location

Have you ever wanted to change the default screenshot location on your Mac, but either didn't want to have to manually open and save them each time, or set up an Apple Shortcut? Try this command:

```cmd
$ default write com.apple.screencapture location /Users/USERNAME/Desktop/screenshots
```

Just change "USERNAME" to whatever your user account is called, and your default location will be changed (in this case to `/Desktop/screenshots`.

## Show Hidden Files

On MacOS, hidden files (such as `.zshrc` or `.env`) are only viewable in the terminal. To change that, and have them available in Finder, enter this command:

```cmd
defaults write com.apple.finder AppleShowAllFiles YES`
```

Follow that with this command to restart Finder:

```cmd
killall Finder
```

## Others

Outside of those listed above, I have a common set of commands that I've added aliases for, primarily centered around Git commands (I prefer the command line to GUI).

```cmd
  alias gs="git status"
  alias ga="git add ."
  alias gf="git fetch"
  alias gpom="git pull --rebase origin main"
  alias gl="git log --graph --decorate --oneline"
```
