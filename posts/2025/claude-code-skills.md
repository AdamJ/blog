---
title: Building Custom Claude Code Skills
description: My journey creating custom skills for Claude Code and testing the frontend development skill
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.blogSlug }}/claude-code-skills/index.html"
tags:
    - post
    - development
    - ai
    - claude
    - automation
date: 2025-12-29
ogImageUrl:
---

## Introduction

Over the past few weeks, I've been diving deep into the Claude Code ecosystem, specifically exploring how to create custom skills that extend Claude Code's capabilities. This post documents my experience building skills and my first real test of a frontend development skill.

<!-- truncate -->

## What are Claude Code Skills?

Claude Code Skills are specialized capabilities that can be invoked within the Claude Code CLI to perform specific tasks more effectively. Think of them as plugins or extensions that provide domain knowledge and specialized workflows.

Skills are defined in the `.claude/skills/` directory of a project and are written in markdown format. When you invoke a skill, Claude Code loads the skill's prompt and uses it to guide its behavior for that specific task.

### Anatomy of a Skill

A basic skill consists of a markdown file with instructions for Claude. Here's a simple example structure:

```markdown
---
name: example-skill
description: Brief description of what this skill does
---

# Skill Instructions

Detailed instructions for Claude on how to perform this task...

## Steps

1. First step
2. Second step
3. And so on...
```

## Creating My First Skill: Frontend Design

My first major skill was focused on creating distinctive, production-grade frontend interfaces. The core challenge I wanted to solve was avoiding the generic, templated feel that AI-generated code often has.

### The Problem: Generic AI Aesthetics

If you've used AI to generate frontend code, you've probably noticed the patterns:
- Purple/blue gradients everywhere
- Excessive rounded corners on everything
- Generic card layouts with drop shadows
- Overuse of glassmorphism effects
- Templated hero sections with centered text

These patterns make AI-generated UIs instantly recognizable—and not in a good way.

### The Skill Definition

I created `.claude/skills/frontend-design.md` with a focus on generating **distinctive, polished code** that stands out from generic AI interfaces:

```markdown
---
name: frontend-design
description: Creates distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics.
---

# Frontend Design Skill

## Core Philosophy

Generate **distinctive, production-ready frontend code** with high design quality
that stands out from generic AI-generated interfaces.

## Design Principles

### 1. Avoid Generic AI Aesthetics

**Common AI clichés to avoid:**
- Purple/blue gradients everywhere
- Excessive rounded corners (border-radius: 24px on everything)
- Generic card layouts with drop shadows
- Overuse of glassmorphism effects

**Instead, create:**
- Intentional color palettes with purpose
- Varied visual hierarchy through scale, weight, and spacing
- Unique layout patterns that serve the content
- Thoughtful use of whitespace and breathing room

### 2. Production-Grade Quality

Every component should be:
- **Accessible** — WCAG 2.1 AA compliant minimum
- **Responsive** — Mobile-first, graceful scaling
- **Performant** — Optimized CSS, minimal JS overhead
- **Maintainable** — Clean structure, clear naming
- **Polished** — Refined details, smooth interactions
```

The skill also includes comprehensive guidelines on CSS methodology (element-based naming, no BEM), React patterns (both functional and class components), accessibility standards, and a quality checklist.

## Testing the Skill

The real test came when I wanted to create a landing page for a project. Instead of just asking Claude Code directly, I invoked the frontend-design skill:

```bash
/skill frontend-design
```

### What Worked Well

The skill invocation immediately changed Claude's approach in noticeable ways:

1. **Anti-Pattern Awareness**: Claude actively avoided generic AI aesthetics—no purple gradients, no excessive rounded corners, no templated layouts

2. **Design-First Thinking**: Instead of jumping to code, Claude considered layout hierarchy, visual balance, and intentional color choices

3. **Production-Grade Standards**: Every component came with proper accessibility (ARIA attributes, semantic HTML), responsive design (mobile-first), and clean code structure

4. **Distinctive Visual Direction**: The resulting code felt intentional and polished, not like it came from a template

5. **Quality Checklist**: The skill enforced a systematic approach—accessibility checks, responsiveness testing, and visual design review built into the process

### Example Output

Here's a snippet of what Claude generated when I asked it to create a landing page:

```typescript
// components/LandingPage/LandingPage.tsx
import React from 'react';
import { Button } from '@/components/Button';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export function LandingPage({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  features
}: LandingPageProps) {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Button variant="primary" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </section>

      <section className={styles.features}>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

```css
/* components/LandingPage/LandingPage.module.css */
.container {
  width: 100%;
  min-height: 100vh;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
}

.features {
  padding: 4rem 2rem;
  background: var(--color-background-alt);
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.featureCard {
  padding: 2rem;
  background: var(--color-background);
  border-radius: var(--radius-card);
  box-shadow: var(--elevation-sm);
}
```

The skill ensured:
- Proper TypeScript interfaces for props
- Separation of styles into CSS modules
- Responsive design using CSS Grid and `clamp()` for fluid typography
- CSS custom properties for theming
- Semantic HTML structure (`<section>`, `<h1>`, proper heading hierarchy)
- Accessible markup with proper headings

### What Made This Different

Comparing this to previous attempts without the skill, the differences were striking:

**Without the skill**, Claude would typically generate:
```jsx
<div style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '24px',
  padding: '60px',
  textAlign: 'center'
}}>
  <h1>Welcome to Our Product</h1>
  {/* Generic, templated feel */}
</div>
```

**With the frontend-design skill**, Claude generated:
- Intentional layout choices (split-screen hero, asymmetric grids)
- Purpose-driven color usage (no gratuitous gradients)
- Fluid, responsive typography using modern CSS (`clamp()`)
- Clean component structure with separated concerns
- Built-in accessibility considerations

The skill's emphasis on **avoiding generic AI patterns** was evident throughout. No purple gradients, no excessive rounding, no templated feel.

## Challenges and Learnings

### Challenge 1: Skill Scope

I've noticed that my initial skill is quite broad - it tries to handle everything from React to Vue to Angular, plus testing, performance, and more. This is something I need to address.

**Finding**: Focused skills likely work better than broad, catch-all skills.

**Next Steps**: I plan to split this into separate, focused skills:

- `frontend-react`: React-specific development
- `frontend-testing`: Testing and accessibility
- `frontend-performance`: Performance optimization

This refactoring should make each skill more targeted and effective for specific use cases.

### Challenge 2: Context Awareness

Skills need to be aware of the existing codebase patterns. I added a section to my skill that instructs Claude to:

1. First examine existing components
2. Identify patterns and conventions
3. Match the existing style

```markdown
## Before Starting

1. Search for similar components in the codebase
2. Review the project's component structure patterns
3. Check for existing utility functions or hooks
4. Understand the styling approach being used
```

### Challenge 3: Balancing Guidance and Flexibility

Too many prescriptive rules made the skill rigid. I found a balance by:

- Setting clear principles rather than strict rules
- Allowing Claude to make contextual decisions
- Focusing on outcomes rather than specific implementations

## Skill Composition

One powerful pattern I've discovered is the potential for composing skills. For a complex feature, you could chain skills:

```bash
# First, plan the architecture
/skill architecture-planning

# Then implement frontend
/skill frontend-design

# Finally, add tests
/skill testing
```

This modular approach would keep each skill focused while allowing complex workflows. This is something I'm excited to explore further once I've refactored my skills to be more focused.

## Key Insights from the Frontend-Design Skill

Creating this skill taught me several important lessons about effective skill design:

### 1. Negative Examples Are Powerful

The skill explicitly lists what **NOT** to do:
- Purple/blue gradients everywhere
- Excessive rounded corners
- Generic card layouts with drop shadows

This negative guidance was surprisingly effective. By teaching Claude what to avoid, it learned to make more intentional choices.

### 2. Opinionated Conventions Work Better

Instead of saying "use good naming conventions," the skill is specific:
- Use element-based naming (`.card`, `.card-header`)
- Avoid BEM notation (unless project requires it)
- Avoid utility-first frameworks like Tailwind (unless project requires it)

This opinionated approach eliminated decision paralysis and produced more consistent results.

### 3. Quality Checklists Enforce Standards

The skill includes a comprehensive checklist:
- [ ] WCAG 2.1 AA compliant
- [ ] Works from 320px to 2560px
- [ ] Touch targets minimum 44×44px
- [ ] Not generic AI aesthetics

Having explicit success criteria ensures nothing gets skipped.

### 4. Examples Beat Explanations

The skill includes side-by-side comparisons of "Generic AI Pattern (Avoid)" vs "Distinctive Design (Preferred)". These concrete examples were more effective than abstract principles.

### 5. Allow Tool Restrictions

The skill specifies `allowed-tools: Read, Write, Edit, Glob, Grep` to keep Claude focused on design and implementation rather than running builds or tests. This boundary helped maintain skill focus.

## Best Practices for Writing Skills

After creating several skills, here are my recommendations:

### 1. Be Specific About Tools and Versions

```markdown
## Tech Stack

- React 18+ (with concurrent features)
- TypeScript 5.x
- Vite for building
```

### 2. Include Examples

Skills work better with examples of desired outputs:

```markdown
## Example Component Structure

\`\`\`typescript
// ✅ Good: Focused, typed, tested
export interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  // implementation
}
\`\`\`
```

### 3. Define Success Criteria

```markdown
## Task Completion Checklist

- [ ] TypeScript types defined
- [ ] Component implemented
- [ ] Tests written and passing
- [ ] Accessibility verified
- [ ] Responsive design confirmed
```

### 4. Encourage Exploration

```markdown
## Before Implementation

Use the following tools to understand the codebase:
- Grep for similar patterns
- Read existing component files
- Check test structure
```

## Results and Impact

Since implementing custom skills:

- **Faster Development**: Common tasks that took multiple prompts now complete in one skill invocation
- **Consistency**: Code follows established patterns more reliably
- **Better Quality**: Tests and TypeScript types are included by default
- **Learning Tool**: Skills document best practices for the project

## Future Directions

I'm planning to create skills for:

1. **Database Migrations**: Handling schema changes with proper rollback procedures
2. **API Design**: RESTful API development following OpenAPI specs
3. **Documentation**: Generating docs from code with proper examples
4. **Deployment**: Managing CI/CD and deployment workflows

## Conclusion

Claude Code Skills have transformed how I work with AI assistance. Instead of repeatedly explaining my preferences and patterns, I can encode them once in a skill and invoke them when needed.

The key is to start simple, test thoroughly, and iterate based on real usage. Skills are living documents that should evolve with your codebase and practices.

If you're using Claude Code, I highly recommend exploring skills for your most common workflows. The upfront investment in creating a good skill pays dividends in consistency and productivity.

## Resources

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Claude Agent SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- My skills repository: `.claude/skills/` in my projects

---

*Have you created any interesting Claude Code skills? I'd love to hear about your experiences and what workflows you've automated.*
