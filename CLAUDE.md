# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server at `localhost:4321` |
| `bun run build` | Production build (output to `./dist/`) |
| `bun run preview` | Preview production build locally |
| `bunx astro check` | Run Astro's type checker / linter |

**Package Manager:** Use Bun exclusively. Never use npm/pnpm/yarn.

**Type Checking:** Project uses strict TypeScript (`astro/tsconfigs/strict`). Run `bunx astro check` to validate.

**Testing:** No test framework is configured. Do not add tests.

## Architecture

**Framework:** Astro 6 (static site generator) with Vercel adapter (`@astrojs/vercel`).

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin. No component library — all components are hand-crafted.

**JavaScript:** Vanilla TypeScript only. No React/Vue/Svelte.

**Theming System:** The "living garden" theme dynamically adapts to time of day and season:
- CSS custom properties (`--color-*`, `--time-*`, `--season-*`) defined in `src/styles/global.css`
- `data-time` attribute on `<html>`: `morning` | `afternoon` | `evening` | `night`
- `data-season` attribute on `<html>`: `spring` | `summer` | `autumn` | `winter`
- Colors mixed via `color-mix(in oklch, var(--time-*) 60%, var(--season-*) 40%)`
- Client-side scripts (`src/scripts/world.ts`) update attributes every 60 seconds
- Particle effects (`src/scripts/seasonal-particles.ts`) render season-specific visuals on canvas

**Page Transitions:** Swup (`@swup/astro`) handles navigation with morphing transitions. Main content is wrapped in `main.transition-garden`.

**File Structure:**
```
src/
  components/     # Astro components (.astro)
  layouts/        # Layout components (Layout.astro)
  pages/          # File-based routing (index.astro, about.astro, etc.)
  scripts/        # Client-side vanilla TypeScript
  styles/         # Global CSS with Tailwind + custom properties
  data/           # Data files (projects.ts, diary.ts)
```

**Fonts:**
- Headings: `Caveat Variable` (imported via `@fontsource-variable/caveat`)
- Body: `Kalam` (imported via `@fontsource/kalam`)

## Design Principles

See `.impeccable.md` for complete design context. Key points:

- **Warm & Handmade:** Organic layouts, slight asymmetry, gentle tilts — avoid sterile grids
- **Garden Metaphor:** Navigation is "garden paths", portfolio is "greenhouse", etc.
- **Light Mode Only:** The time-of-day system replaces dark mode
- **Motion:** Gentle swaying, floating, drifting — nothing abrupt
- **Accessibility:** WCAG AA target, respects `prefers-reduced-motion`

## Code Conventions

**Indentation:** Tabs (not spaces).

**Astro Components:**
- Frontmatter between `---` fences with `interface Props`
- Destructure `Astro.props` for prop access
- Use `class:list={["class1", condition && "class2"]}` for conditional classes
- Scoped `<style>` blocks by default; use `<style is:global>` sparingly
- BEM naming for CSS classes (e.g., `.flower__petal`, `.garden-nav__link`)

**TypeScript:**
- Use single quotes for strings
- Prefer `const` over `let`; prefer `interface` over `type`
- Literal union types for constrained strings

**CSS Custom Properties:**
| Prefix | Purpose |
|--------|---------|
| `--color-bg`, `--color-surface`, `--color-text`, `--color-heading`, `--color-accent*`, `--color-muted` | Page theming |
| `--color-flower`, `--color-leaf` | Flower/season theming |
| `--space-section`, `--space-element` | Spacing |
| `--radius-soft`, `--radius-pill` | Border radius |

**Naming:**
- Components: PascalCase (`Flower.astro`)
- Scripts: kebab-case (`world.ts`)

## What Not To Do

- Do not add React/Vue/Svelte components
- Do not use a component library
- Do not add dark mode
- Do not use rigid grids or sterile layouts
- Do not add code comments unless explicitly requested
- Do not add test files
- Do not use npm/pnpm/yarn
