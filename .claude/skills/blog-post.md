---
name: blog-post
description: Write blog posts in Adam's conversational, technical style with proper frontmatter and structure
---

# Blog Post Writing Skill

Write blog posts for Adam Jolicoeur's Eleventy blog in his distinctive voice and style.

## Core Philosophy

Create **conversational, technically-informed posts** that blend personal experience with practical knowledge. Write like you're explaining to a colleague over coffee—direct, honest, and approachable.

## Frontmatter Structure

**ALWAYS** use this exact frontmatter structure:

```yaml
---
title: [Clear, descriptive title describing what was built/learned]
description: [One-sentence summary of the post]
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/[post-slug]/index.html"
tags:
    - post
    - [relevant-tag-1]
    - [relevant-tag-2]
    - [relevant-tag-3]
date: YYYY-MM-DD
ogImageUrl:
---
```

**Rules:**
- `layout` is ALWAYS `libdoc_page.liquid`
- `permalink` ALWAYS follows pattern `"{{ libdocConfig.blogSlug }}/slug/index.html"`
- `tags` MUST include `post` as first tag (required for posts to appear in blog collection)
- Include 2-5 additional tags (lowercase, hyphenated)
- `date` in YYYY-MM-DD format
- `ogImageUrl` typically left empty
- Post slug should match filename (no year prefix)

## Writing Style

### Voice & Tone
- **First-person throughout**: "I've been working on...", "After playing around with..."
- **Conversational and approachable**: Use contractions, casual expressions
- **Honest about challenges**: "I ran into quite a few issues...", "Unfortunately..."
- **Direct but friendly**: Like explaining to a colleague
- **Technically informed but not pedantic**: Explain jargon naturally

### Language Patterns
Adam frequently uses:
- Parenthetical asides: "(I prefer the command line to GUI)"
- Casual expressions: "to name a few", "and so on", "a ton of"
- Em-dashes for elaboration: "...something I needed — and couldn't find elsewhere"
- Block quotes for prompts or key statements
- "IMO" and other informal abbreviations

### Sentence Structure
- Mix short, punchy sentences with longer explanatory ones
- Use questions to introduce sections: "Why?", "What is X?"
- Start paragraphs with context or motivation
- End with practical takeaways or calls to action

## Content Structure

### 1. Opening (Before Truncate)
Start with context or motivation (1-3 paragraphs):
- Why this project/tool/technique?
- What problem were you solving?
- Personal context or story hook

**After 1-3 paragraphs, insert:**
```markdown
<!-- truncate -->
```

### 2. Main Content Organization

Use clear section hierarchy:

```markdown
## Why [or "The Problem" or "Getting Started"]

Explain motivation or context

## What is [Tool/Technology]?

Define key concepts if needed

## The Process [or "Implementation" or "How I Built This"]

Walk through the work step-by-step

### Sub-sections

Break down complex topics

## Code/Technical Details

Include actual code examples

## Challenges and Learnings [or "Findings"]

Be honest about what worked and what didn't

## What's Next [or "Conclusion"]

Future plans or takeaways
```

### 3. Content Elements

**Code Blocks:**
```markdown
\`\`\`javascript
// Use proper syntax highlighting
// Include inline comments for clarity
function example() {
  return "Real code from actual work";
}
\`\`\`
```

**Inline Code:**
Use `backticks` for commands, file names, variables, function names

**Images:**
```markdown
<img class="long-shadow"
    src="./images/filename.png"
    alt="Descriptive alt text">
```
Or use figures for captions:
```markdown
<figure>
    <img src="./images/filename.png" alt="Description">
    <figcaption>Caption text</figcaption>
</figure>
```

**Lists:**
Use liberally for:
- Feature lists
- Step-by-step instructions
- Findings or lessons
- Tool recommendations

**Block Quotes:**
For prompts, emphasis, or key statements:
```markdown
> This is important context or a prompt I used
```

**Tables:**
Occasionally for comparisons:
```markdown
| Option A | Option B |
|----------|----------|
| Detail 1 | Detail 2 |
```

**External Links:**
Integrate naturally in text:
```markdown
I decided to try [Lovable](https://lovable.dev) to give that a go.
```

**GitHub Gists:**
For longer code examples:
```html
<script src="https://gist.github.com/AdamJ/[gist-id].js"></script>
```

### 4. Closing

End with one of:
- "What's Next" section for future plans
- "Findings" or "Lessons Learned"
- Practical takeaways or resources
- Invitation for feedback
- Simple sign-off: "Thanks for reading!" or "Enjoy!"

## Topic Patterns

### When Writing About Tools/Projects
1. Start with **Why** - the motivation
2. Explain **What** it is (if not well-known)
3. Walk through **The Process** - step by step
4. Include **Code Examples** - real working code
5. Be honest about **Challenges**
6. Share **Learnings** and next steps

### When Writing Technical Guides
1. Provide **context** for why this matters
2. Break down into **clear steps**
3. Include **actual commands** with explanations
4. Add **screenshots** where helpful
5. Share **personal usage** patterns

### When Writing About AI/Tools Experience
1. Set up the **experiment** or goal
2. Share **actual prompts** used (in block quotes)
3. Include **screenshots** of the process
4. Show **results** (code, images)
5. Honest **assessment** - what worked, what didn't
6. **Findings** section

## Quality Checklist

Before completing a post, verify:

- [ ] Frontmatter is complete and correct (including `post` tag)
- [ ] `<!-- truncate -->` appears after 1-3 opening paragraphs
- [ ] First-person voice throughout
- [ ] Clear section headings (##, ###)
- [ ] Code blocks have syntax highlighting
- [ ] Images have descriptive alt text
- [ ] Technical terms explained or contextualized
- [ ] Honest about challenges and learning moments
- [ ] Conversational tone (contractions, casual phrases)
- [ ] Ends with practical takeaway or sign-off
- [ ] External links work and are contextually relevant

## Common Mistakes to Avoid

❌ **Don't:**
- Use third-person voice
- Write in overly formal academic style
- Skip the `<!-- truncate -->` marker
- Forget the `post` tag in frontmatter
- Use generic "Lorem ipsum" style placeholders
- Hide failures or challenges
- Use excessive jargon without explanation
- Write conclusions that just summarize

✅ **Do:**
- Write like you're explaining to a friend
- Be specific about actual tools and commands used
- Share real code from projects
- Be honest about what didn't work
- Mix technical detail with personal experience
- Use bullet points and lists liberally
- End with practical value or next steps

## File Naming & Organization

**File location:**
```
posts/YYYY/post-slug.md
```

**Images:**
Store in `posts/YYYY/images/` directory:
```
posts/2026/images/
├── screenshot-1.png
├── example-code.png
└── result-image.png
```

Reference with relative paths:
```markdown
![alt text](./images/filename.png)
```

## Example Opening Patterns

**Project Introduction:**
```markdown
For a while now, I've been wanting to [goal], without having to [problem]. With the help of [tool/person], I've finally added [solution].

<!-- truncate -->
```

**Tool Discovery:**
```markdown
I've grown tired of [problem]. [Tool name] is [solution description].

<!-- truncate -->
```

**Learning Experience:**
```markdown
Over the past [timeframe], I've been diving deep into [topic], specifically exploring [specific aspect]. This post documents my experience [what you did].

<!-- truncate -->
```

## Before You Start Writing

1. **Read recent posts** - Check `posts/2026/` for current style
2. **Determine post type** - Is this a project showcase, technical guide, or tool review?
3. **Gather materials** - Code snippets, screenshots, links
4. **Choose appropriate tags** - Look at existing posts for common tags

## After Writing

1. **Read aloud** - Does it sound conversational?
2. **Check frontmatter** - All required fields present?
3. **Verify links** - External links work?
4. **Review images** - Alt text descriptive?
5. **Test locally** - Run `pnpm serve` to preview

---

Remember: Adam's posts are **conversational technical storytelling**. They're honest, practical, and approachable—like explaining your project to a friend who understands the tech but wants to hear about your experience with it.
