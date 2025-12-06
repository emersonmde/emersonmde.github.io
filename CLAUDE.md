# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Error Signal** (errorsignal.dev), a personal blog built with Astro. Blog posts are written in Markdown and processed through Astro's content collections.

## Common Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to ./dist
npm run preview   # Preview production build locally
```

## Architecture

### Content Pipeline
- Blog posts live in `src/content/blog/<post-name>/index.md`
- Each post folder can contain images referenced in the markdown
- Frontmatter: `title`, `date`, `description`
- Content collection schema defined in `src/content.config.ts`
- Posts rendered via `src/pages/blog/[...slug].astro`

### Key Files
- `astro.config.mjs` - Astro configuration, site URL, markdown settings
- `src/consts.ts` - Site metadata, author info, social links
- `src/content.config.ts` - Content collection schema definitions
- `src/layouts/BaseLayout.astro` - Main layout with SEO
- `src/pages/index.astro` - Blog index page
- `src/pages/blog/[...slug].astro` - Individual post template
- `src/components/Bio.astro` - Author bio component

### Deployment
- GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys to `gh-pages` branch on push to `main`
- Build output goes to `dist/` directory

## Adding a New Blog Post

Create a new folder in `src/content/blog/` with an `index.md` file:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief description for previews and SEO"
---

Content here...
```

Code blocks use Shiki for syntax highlighting (github-dark theme).
