# Error Signal — UX & Design Specification

**Version:** 0.2
**Domain:** errorsignal.dev
**Aesthetic:** Terminal User Interface (TUI)
**Color Scheme:** Sonokai

---

# 1. Overview

Error Signal is a personal portfolio site designed to look and feel like a **beautifully crafted Terminal User Interface**—the kind of polished TUI you'd see in modern tools like `lazygit`, `bottom`, or `yazi`.

The twist: **it's fully interactive**. Technical users can type commands to navigate (`cd projects`, `ls`, `open coppermind`), while non-technical visitors can click and browse normally. Both experiences are first-class.

## 1.1 Site Purpose

1. **Portfolio** — Showcase technical projects (primary)
2. **Photography** — Personal photo gallery with masonry layout
3. **Blog** — Technical writing

## 1.2 Target Audience

- Engineers evaluating technical depth
- Potential employers/collaborators
- Fellow developers who appreciate craft
- Anyone curious about the work

---

# 2. Design Philosophy

### 2.1 TUI Authenticity

This isn't a "terminal theme"—it's a genuine TUI experience rendered in the browser:

- **Box-drawing characters** for borders (`─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `┬`, `┴`, `┼`)
- **Panel-based layout** like lazygit/gitui
- **Status bar** at bottom with contextual info
- **Keyboard navigation** as a first-class input method
- **Monospace everything** (with proportional text for readability where needed)

### 2.2 Dual Interaction Model

**Keyboard/Command Mode:**
- Persistent command input at bottom
- Shell-like commands: `cd`, `ls`, `cat`, `open`, `help`
- Vim-style navigation: `j/k` to move, `Enter` to select
- Tab completion for commands and paths

**Mouse/Click Mode:**
- Everything is clickable
- Hover states provide visual feedback
- Works perfectly without ever touching keyboard
- Mobile-friendly tap targets

### 2.3 Delightful Details

- Cursor blink animation in command input
- Easter eggs for curious typists (`sudo`, `rm -rf`, `vim`)
- Clean, modern aesthetic — no retro gimmicks

---

# 3. Color System — Sonokai

Based on the [Sonokai](https://github.com/sainnhe/sonokai) color scheme by sainnhe.

```css
:root {
  /* ═══════════════════════════════════════════════════════════
     BACKGROUNDS — Sonokai Default Variant
     ═══════════════════════════════════════════════════════════ */
  --es-black: #181819;         /* Deepest black */
  --es-bg-dim: #222327;        /* Slightly elevated */
  --es-bg0: #2c2e34;           /* Primary background */
  --es-bg1: #33353f;           /* Elevated surfaces */
  --es-bg2: #363944;           /* Cards, panels */
  --es-bg3: #3b3e48;           /* Hover states */
  --es-bg4: #414550;           /* Active/selected */

  /* ═══════════════════════════════════════════════════════════
     SEMANTIC BACKGROUNDS
     ═══════════════════════════════════════════════════════════ */
  --es-bg-red: #55393d;
  --es-bg-yellow: #4e432f;
  --es-bg-green: #394634;
  --es-bg-blue: #354157;
  --es-bg-purple: #434055;

  /* ═══════════════════════════════════════════════════════════
     PRIMARY COLORS — Vivid Accents
     ═══════════════════════════════════════════════════════════ */
  --es-red: #fc5d7c;           /* Errors, destructive */
  --es-orange: #f39660;        /* Warnings, emphasis */
  --es-yellow: #e7c664;        /* Highlights, strings */
  --es-green: #9ed072;         /* Success, primary accent */
  --es-blue: #76cce0;          /* Links, info */
  --es-purple: #b39df3;        /* Special, keywords */

  /* ═══════════════════════════════════════════════════════════
     TEXT
     ═══════════════════════════════════════════════════════════ */
  --es-fg: #e2e2e3;            /* Primary text */
  --es-grey: #7f8490;          /* Secondary text, comments */
  --es-grey-dim: #595f6f;      /* Muted text, disabled */

  /* ═══════════════════════════════════════════════════════════
     BORDERS — Using box-drawing feel
     ═══════════════════════════════════════════════════════════ */
  --es-border: #414550;        /* Default border (bg4) */
  --es-border-dim: #33353f;    /* Subtle border */
  --es-border-focus: #9ed072;  /* Focused panel border */

  /* ═══════════════════════════════════════════════════════════
     SYNTAX / CODE HIGHLIGHTING
     ═══════════════════════════════════════════════════════════ */
  --es-syntax-keyword: #fc5d7c;
  --es-syntax-function: #9ed072;
  --es-syntax-string: #e7c664;
  --es-syntax-number: #b39df3;
  --es-syntax-comment: #7f8490;
  --es-syntax-type: #76cce0;
  --es-syntax-operator: #f39660;
}
```

---

# 4. Typography

### Font Stack

```css
:root {
  /* Primary — Monospace for TUI authenticity */
  --es-font-mono: "JetBrains Mono", "Fira Code", "SF Mono",
                  "Cascadia Code", "Consolas", monospace;

  /* Secondary — For longer prose (blog posts) */
  --es-font-prose: "Inter", "SF Pro Text", system-ui, sans-serif;

  /* Scale */
  --es-text-xs: 0.75rem;     /* 12px */
  --es-text-sm: 0.875rem;    /* 14px */
  --es-text-base: 1rem;      /* 16px */
  --es-text-lg: 1.125rem;    /* 18px */
  --es-text-xl: 1.25rem;     /* 20px */
  --es-text-2xl: 1.5rem;     /* 24px */
  --es-text-3xl: 2rem;       /* 32px */
}
```

### Usage

| Element | Font | Size | Weight |
|---------|------|------|--------|
| UI chrome, commands | `--es-font-mono` | base | 400 |
| Panel titles | `--es-font-mono` | base | 700 |
| Project descriptions | `--es-font-mono` | sm | 400 |
| Blog body | `--es-font-prose` | lg | 400 |
| Code blocks | `--es-font-mono` | sm | 400 |

---

# 5. Layout System

## 5.1 TUI Shell Structure

The interface uses a **single-panel layout** — each page is a focused view, not split-panes. The shell provides consistent chrome (header, status bar) around changing content.

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── [projects] photos blog    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/projects ─────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  [Page content goes here - one focused view at a time]        │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/projects                                               j/k ↑↓  │
└─────────────────────────────────────────────────────────────────────┘
```

## 5.2 Panel Components

### Header Bar
```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── [projects] photos blog    │
└─────────────────────────────────────────────────────────────────────┘
```
- Logo/name on left
- Navigation tabs on right
- Active tab highlighted with `[brackets]` or color
- Horizontal line extends full width

### Content Panel
```
┌─ panel-title ───────────────────────────────────────────────────────┐
│                                                                     │
│  Content here...                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
- Box-drawing border characters
- Title embedded in top border
- Focused panel: border uses `--es-border-focus` (green)
- Unfocused panel: border uses `--es-border`

### Status Bar / Command Line
```
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/projects                                      [?] help  j/k ↑↓  │
└─────────────────────────────────────────────────────────────────────┘
```
- Current "path" location (like a shell prompt)
- Keyboard hints on right
- Command input mode: shows blinking cursor
- Contextual hints change based on current view

---

# 6. Information Architecture

## 6.1 Virtual Filesystem

The site is navigable as a filesystem:

```
~/
├── projects/
│   ├── coppermind/
│   ├── reprisedb/
│   ├── railyard/
│   ├── nenya/
│   ├── touchstone/
│   └── chip8-emulator/
├── photos/
├── blog/
│   ├── 1-billion-row-challenge-part-1/
│   ├── 1-billion-row-challenge-part-2/
│   ├── a-brave-neo-world/
│   └── ...
├── about.md
└── README.md
```

## 6.2 Commands

| Command | Action |
|---------|--------|
| `ls` | List items in current directory |
| `cd <path>` | Navigate to path |
| `cd ..` | Go up one level |
| `cat <file>` | View file contents (about.md, README.md) |
| `open <item>` | Open project (GitHub), photo (lightbox), post |
| `help` | Show available commands |
| `clear` | Clear terminal output |
| `whoami` | Show about info |

### Easter Eggs

| Command | Response |
|---------|----------|
| `sudo` | "Nice try." |
| `rm -rf /` | ASCII art explosion, then "Just kidding." |
| `vim` | "Ah, I see you're a person of culture." |
| `exit` | "There is no escape." (or redirect to GitHub) |
| `sl` | ASCII train |
| `cowsay` | ASCII cow with quote |

---

# 7. Page Designs

## 7.1 Home / Projects (Portfolio Landing)

**URL:** `/` (virtual path: `~/projects`)

The home page IS the projects page — this is the portfolio, the primary purpose of the site. A brief intro section at the top, then the project list.

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── [projects] photos blog    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/projects ─────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  Matthew Emerson                                              │  │
│  │  Systems Engineer @ Amazon                                    │  │
│  │  github.com/emersonmde · linkedin.com/in/emersonmde           │  │
│  │                                                               │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │                                                               │  │
│  │  NAME             LANG    DESCRIPTION                    ★    │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │  ▸ coppermind      rust    Semantic search with WASM    12   │  │
│  │    reprisedb       rust    LSM Tree key-value store      8   │  │
│  │    railyard        rust    Raft consensus algorithm      5   │  │
│  │    nenya           rust    Distributed rate limiter      4   │  │
│  │    touchstone      c       SQL database engine           1   │  │
│  │    chip8-emulator  c       CHIP-8 emulator               1   │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/projects  j/k navigate, enter to open, g github      [?] help  │
└─────────────────────────────────────────────────────────────────────┘
```

### Interactions

**Keyboard:**
- `j`/`k` or `↓`/`↑`: Move selection in project list
- `Enter`: Open selected project (GitHub or expanded view)
- `g`: Go to GitHub for selected project
- `d`: Go to docs/demo (if available)
- `/`: Focus command input
- `?`: Show help overlay

**Mouse:**
- Click project row to select and expand
- Click action buttons (GitHub, Demo, Docs)
- Click nav tabs to navigate
- Hover highlights row

---

## 7.2 Project Expanded View

When a project row is clicked/selected, it expands inline to show more detail:

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── [projects] photos blog    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/projects ─────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  Matthew Emerson · Systems Engineer @ Amazon                  │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │                                                               │  │
│  │  ▼ coppermind ─────────────────────────────────────────────  │  │
│  │  │                                                            │  │
│  │  │  rust · ★ 12                                               │  │
│  │  │                                                            │  │
│  │  │  Browser-based semantic search using Rust, WASM, and       │  │
│  │  │  local ML inference. Runs entirely in the browser with     │  │
│  │  │  no server-side processing.                                │  │
│  │  │                                                            │  │
│  │  │  [GitHub]  [Live Demo]  [Docs]                             │  │
│  │  │                                                            │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │                                                               │  │
│  │  ▸ reprisedb       rust    LSM Tree key-value store      8   │  │
│  │  ▸ railyard        rust    Raft consensus algorithm      5   │  │
│  │  ▸ nenya           rust    Distributed rate limiter      4   │  │
│  │  ...                                                          │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/projects/coppermind  esc to collapse, g github       [?] help  │
└─────────────────────────────────────────────────────────────────────┘
```

The expanded view shows:
- Full description
- Action buttons (GitHub, Demo if deployed, Docs if available)
- Language and star count
- Collapse with `Esc` or clicking elsewhere

---

## 7.3 Photos Gallery

**URL:** `/photos` (virtual path: `~/photos`)

Masonry gallery with TUI-style frame.

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── home projects [photos]... │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/photos ───────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │  │
│  │  │          │ │          │ │          │ │          │         │  │
│  │  │  IMAGE   │ │  IMAGE   │ │          │ │  IMAGE   │         │  │
│  │  │          │ │          │ │  IMAGE   │ │          │         │  │
│  │  │          │ └──────────┘ │          │ │          │         │  │
│  │  └──────────┘ ┌──────────┐ │          │ └──────────┘         │  │
│  │  ┌──────────┐ │          │ └──────────┘ ┌──────────┐         │  │
│  │  │          │ │  IMAGE   │ ┌──────────┐ │          │         │  │
│  │  │  IMAGE   │ │          │ │          │ │  IMAGE   │         │  │
│  │  │          │ │          │ │  IMAGE   │ │          │         │  │
│  │  │          │ │          │ │          │ │          │         │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/photos  24 photos                          click to expand [?]  │
└─────────────────────────────────────────────────────────────────────┘
```

### Lightbox

When photo is clicked/selected, opens TUI-style lightbox:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─ photo-2024-001.jpg ─────────────────────────────────────────┐  │
│  │                                                               │  │
│  │                                                               │  │
│  │                                                               │  │
│  │                                                               │  │
│  │                     [FULL SIZE IMAGE]                         │  │
│  │                                                               │  │
│  │                                                               │  │
│  │                                                               │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ←  prev    [download]  [close]    next  →                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Keyboard:** `←`/`→` or `h`/`l` to navigate, `Esc` or `q` to close, `d` to download

---

## 7.4 Blog

**URL:** `/blog` (virtual path: `~/blog`)

### Post List

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── home projects photos [blog│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/blog ─────────────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  DATE        TITLE                                            │  │
│  │  ────────────────────────────────────────────────────────────│  │
│  │  2024-03-17  A Brave Neo World                                │  │
│  │              My journey into Neovim and terminal-first dev    │  │
│  │                                                               │  │
│  │  2024-02-17  The 1 Billion Row Challenge - Part 2             │  │
│  │              SIMD optimizations and memory-mapped files       │  │
│  │                                                               │  │
│  │  2024-02-09  The 1 Billion Row Challenge - Part 1             │  │
│  │              Processing massive datasets in Java              │  │
│  │                                                               │  │
│  │  2024-02-05  Hello, Gatsby                                    │  │
│  │              Setting up a static blog with GitHub Pages       │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/blog                                                   [?] help │
└─────────────────────────────────────────────────────────────────────┘
```

### Post Page

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── home projects photos [blog│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ ~/blog/1-billion-row-challenge-part-1 ──────────────────────┐  │
│  │                                                               │  │
│  │  # The 1 Billion Row Challenge - Part 1                       │  │
│  │  2024-02-09                                                   │  │
│  │                                                               │  │
│  │  ─────────────────────────────────────────────────────────── │  │
│  │                                                               │  │
│  │  I recently discovered a great podcast, Programming           │  │
│  │  Throwdown, that featured a challenge to process one          │  │
│  │  billion rows of temperature data as fast as possible...      │  │
│  │                                                               │  │
│  │  ```java                                                      │  │
│  │  public class RowProcessor {                                  │  │
│  │      // code here                                             │  │
│  │  }                                                            │  │
│  │  ```                                                          │  │
│  │                                                               │  │
│  │  ...continued...                                              │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ← prev: Hello, Gatsby    next: Part 2 →                            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/blog/1-billion-row-challenge-part-1             scroll ↑↓  [?]  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7.5 About Page

**URL:** `/about` (virtual path: `cat ~/about.md`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ error-signal ──────────────────────────── home projects photos blog │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ cat ~/about.md ─────────────────────────────────────────────┐  │
│  │                                                               │  │
│  │  # About                                                      │  │
│  │                                                               │  │
│  │  I'm Matthew Emerson, a Systems Engineer at Amazon based     │  │
│  │  in Delaware.                                                 │  │
│  │                                                               │  │
│  │  I specialize in distributed systems, databases, and         │  │
│  │  low-level programming. Most of my work is in Rust, with     │  │
│  │  occasional ventures into C when I want to debug memory      │  │
│  │  issues at 2am.                                               │  │
│  │                                                               │  │
│  │  ## Skills                                                    │  │
│  │                                                               │  │
│  │  Languages:   Rust, C, Java, Python, TypeScript               │  │
│  │  Systems:     AWS, PostgreSQL, DynamoDB, Linux                │  │
│  │  Interests:   Consensus algorithms, storage engines,         │  │
│  │               compilers, emulators                            │  │
│  │                                                               │  │
│  │  ## Links                                                     │  │
│  │                                                               │  │
│  │  github    → github.com/emersonmde                            │  │
│  │  linkedin  → linkedin.com/in/emersonmde                       │  │
│  │  photos    → errorsignal.dev/photos                           │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ λ ~/about.md                                               [?] help │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 8. Components

## 8.1 Box Drawing

Use Unicode box-drawing characters for authentic TUI feel:

```
Light box:
┌───────────────────┐
│                   │
└───────────────────┘

With title:
┌─ title ───────────┐
│                   │
└───────────────────┘

Double box (focused):
╔═══════════════════╗
║                   ║
╚═══════════════════╝

Rounded (softer feel):
╭───────────────────╮
│                   │
╰───────────────────╯
```

## 8.2 Navigation Tabs

```css
/* Inactive tab */
.tab { color: var(--es-grey); }

/* Hover */
.tab:hover { color: var(--es-fg); }

/* Active tab */
.tab.active {
  color: var(--es-green);
}

/* Alternative: bracket notation */
/* home [projects] photos blog */
```

## 8.3 List Item / Project Row

```
  ▸ coppermind      rust    Semantic search with WASM   ★ 12
```

- `▸` indicator for selected item (or `>`)
- Name left-aligned, fixed width
- Language badge/tag
- Description truncated
- Stars right-aligned

**States:**
- Default: `--es-fg`
- Hover: `--es-bg3` background
- Selected: `--es-bg4` background + `▸` prefix
- Focused: green border on container

## 8.4 Command Input

```
┌─────────────────────────────────────────────────────────────────────┐
│ λ ~/projects                                               [?] help │
└─────────────────────────────────────────────────────────────────────┘
```

- Prompt: `λ` or `>` or `$`
- Current path shown
- Blinking cursor when focused
- Tab completion dropdown
- Command history (↑/↓)

## 8.5 Status/Help Hints

Right-aligned contextual hints:

```
j/k ↑↓       Navigate
enter        Open
g            GitHub
?            Help
```

---

# 9. Interactions & Motion

## 9.1 Cursor/Selection

- Visible cursor indicator (`▸` or `>` or highlight bar)
- Smooth scroll to keep selection visible
- Keyboard focus ring for accessibility

## 9.2 Transitions

```css
:root {
  --es-duration-fast: 100ms;
  --es-duration-normal: 200ms;
  --es-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

- Panel content: fade + slight slide
- Selection: instant (responsive feel)
- Page transitions: crossfade with Astro View Transitions

## 9.3 Cursor Blink
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor { animation: blink 1s step-end infinite; }
```

---

# 10. Technical Implementation

## 10.1 Framework

**Astro** with React islands:
- Static pages for SEO/performance
- React components for interactive elements (command input, photo gallery)
- View Transitions API for smooth navigation

## 10.2 Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^3.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "@fontsource/jetbrains-mono": "^5.x",
    "@fontsource/inter": "^5.x"
  }
}
```

## 10.3 Component Structure

```
src/
├── components/
│   ├── TuiShell.astro        # Main layout wrapper
│   ├── Header.astro          # Top nav bar
│   ├── Panel.astro           # Box-drawn panel
│   ├── StatusBar.astro       # Bottom command/status bar
│   ├── CommandInput.tsx      # Interactive command input (React)
│   ├── ProjectList.astro     # Project list/table
│   ├── PhotoGallery.tsx      # Masonry gallery (React)
│   ├── Lightbox.tsx          # Photo lightbox (React)
│   └── ...
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects.astro
│   ├── photos.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── about.astro
├── styles/
│   └── global.css            # Sonokai variables + base styles
└── data/
    └── projects.ts           # Project metadata
```

## 10.4 Photo Gallery

Custom implementation:
- CSS `column-count` for masonry
- `IntersectionObserver` for lazy loading
- Fetch from existing API: `https://knsfeilz9j.execute-api.us-east-1.amazonaws.com/dev/photos`
- Custom lightbox with keyboard navigation

## 10.5 Command System

React component that:
- Maintains command history
- Parses input and triggers navigation
- Provides tab completion
- Integrates with Astro router (`navigate()`)

---

# 11. Responsive Design

## 11.1 Breakpoints

```css
--es-bp-sm: 640px;
--es-bp-md: 768px;
--es-bp-lg: 1024px;
```

## 11.2 Mobile Adaptations

- Stack panels vertically
- Hide command input by default (show on tap)
- Larger touch targets
- Hamburger menu for nav
- Simplified keyboard hints

## 11.3 TUI Feel on Mobile

Still maintain the aesthetic:
- Box-drawing borders
- Monospace text
- Dark background
- But optimize for touch interaction

---

# 12. Accessibility

- **Keyboard navigation** is core to the design
- **Focus indicators** clearly visible
- **Screen reader** support: proper ARIA labels
- **Reduced motion** preference respected
- **Color contrast** meets WCAG AA (Sonokai is well-balanced)

---

# 13. Deliverables

- [x] UX Specification (this document)
- [ ] Color system CSS variables
- [ ] Typography system
- [ ] TuiShell layout component
- [ ] Panel component with box-drawing
- [ ] Header with tabs
- [ ] Status bar with command input
- [ ] Project list/cards
- [ ] Photo gallery with custom masonry
- [ ] Lightbox component
- [ ] Blog post template
- [ ] Command parsing system
- [ ] Keyboard navigation
- [ ] Page transitions
- [ ] Mobile responsive styles

---

# 14. References & Inspiration

- [lazygit](https://github.com/jesseduffield/lazygit) — Panel layout, keyboard UX
- [gitui](https://github.com/extrawurst/gitui) — Clean TUI design
- [bottom](https://github.com/ClementTsang/bottom) — Beautiful system monitor
- [yazi](https://github.com/sxyazi/yazi) — Modern file manager
- [Sonokai](https://github.com/sainnhe/sonokai) — Color scheme
- [ratatui](https://ratatui.rs/) — Rust TUI framework (design patterns)
- [bubbletea](https://github.com/charmbracelet/bubbletea) — Go TUI framework

---

# Changelog

- **v0.1** — Initial specification
- **v0.2** — Complete rewrite for TUI aesthetic with Sonokai colors, command input system, and dual interaction model
