# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Error Signal** (errorsignal.dev), a TUI-style portfolio site built with Astro. The design mimics a terminal interface with Sonokai color scheme, vim-style navigation, and an interactive command prompt.

## Common Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to ./dist
npm run preview   # Preview production build locally
```

## Architecture

### Pages
- `/` - Projects page (home) - expandable project list with GitHub links
- `/photos` - Photo gallery with masonry layout
- `/blog` - Blog index and posts
- `/about` - About page

### Key Components
- `src/components/TuiShell.astro` - Main terminal shell with command input, vim mode toggle, command execution
- `src/components/TmuxStatusBar.astro` - Bottom status bar (tmux-style) with tabs, path, mode indicator
- `src/layouts/BaseLayout.astro` - Base layout wrapping TuiShell

### Data
- `src/data/projects.ts` - Static project data (name, description, tags, links)
- `src/consts.ts` - Site metadata, author info, social links

### Content
- Blog posts: `src/content/blog/<post-name>/index.md`
- Content collection schema: `src/content.config.ts`

### Styles
- `src/styles/global.css` - Sonokai color palette, CSS variables, base styles

## TUI Features

### Command System
Commands are entered in the prompt at the bottom. Supported:
- `ls` - List directories/files
- `cd <path>` - Navigate (projects, photos, blog, about)
- `cat <file>` - View file
- `open <project>` - Open project on GitHub
- `help` - Show commands
- `clear` - Clear output

### Vim Mode
- Default: INSERT mode (typing goes to prompt)
- `Escape` - Toggle to NORMAL mode (j/k navigation)
- `i`, `:`, `/` - Return to INSERT mode
- Mode shown in status bar

## Adding Content

### New Blog Post
Create `src/content/blog/<post-name>/index.md`:
```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief description"
---
Content...
```

### New Project
Add to `src/data/projects.ts`:
```typescript
{
  name: 'project-name',
  language: 'rust',
  languageColor: 'var(--es-orange)',
  shortDescription: 'One-liner',
  description: 'Full description...',
  tags: ['tag1', 'tag2'],
  github: 'https://github.com/emersonmde/project-name',
  demo?: 'https://...',
  docs?: 'https://...',
}
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to `gh-pages` on push to `main`.
