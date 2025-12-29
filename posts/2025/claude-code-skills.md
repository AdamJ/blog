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

## Creating My First Skill: Frontend Development

My first major skill was focused on frontend development workflows. The goal was to create a skill that would help with common frontend tasks like:

- Setting up component structure
- Implementing responsive designs
- Managing state
- Adding proper TypeScript types
- Writing tests

### The Skill Definition

I created `.claude/skills/frontend.md` with comprehensive instructions:

```markdown
---
name: frontend
description: Specialized skill for frontend development tasks including React, TypeScript, and component architecture
---

# Frontend Development Skill

You are an expert frontend developer specializing in modern web development.

## Technologies

- React (with hooks and functional components)
- TypeScript
- CSS Modules / Styled Components
- Testing with Jest and React Testing Library

## Guidelines

1. **Component Structure**
   - Use functional components with TypeScript
   - Keep components small and focused
   - Extract reusable logic into custom hooks

2. **Type Safety**
   - Always define proper TypeScript interfaces
   - Use strict type checking
   - Avoid `any` types

3. **Styling**
   - Follow existing patterns in the codebase
   - Use CSS custom properties for theming
   - Ensure responsive design

4. **Testing**
   - Write tests for user interactions
   - Test edge cases and error states
   - Ensure accessibility
```

## Testing the Skill

The real test came when I wanted to create a landing page for a project. Instead of just asking Claude Code directly, I invoked the frontend-design skill:

```bash
/skill frontend-design
```

### What Worked Well

The skill invocation immediately changed Claude's approach:

1. **Structured Thinking**: Claude started by asking about the page requirements and design goals
2. **Design-First Approach**: The skill encouraged thinking about layout, hierarchy, and visual design before jumping into code
3. **Consistent Patterns**: The skill ensured that new code matched existing architectural decisions
4. **Responsive by Default**: Mobile-first thinking was baked into the process

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
- Responsive design using CSS Grid and clamp()
- CSS custom properties for theming
- Semantic HTML structure
- Accessible markup with proper headings

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
