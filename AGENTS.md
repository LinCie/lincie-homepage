# AGENTS.md

## Project Overview

LinCie is a personal website built as a "living garden" — a static site that dynamically adapts to time of day and season. Built with Astro and Tailwind CSS v4. No JavaScript framework, no component library — fully hand-crafted.

## Build & Development Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (Astro)
bun run build        # Production build (output to dist/)
bun run preview      # Preview production build
bun run astro check  # Run Astro's built-in linter/type checker
```

**Type checking:** `bunx astro check` (runs TypeScript + Astro diagnostics)

**There is no test framework configured.** No test runner, no test files exist. Do not attempt to run tests.

## Tech Stack

- **Runtime:** Bun (required — Node >=22.12.0)
- **Framework:** Astro 6 (static site generator)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Fonts:** `@fontsource-variable/caveat` (headings), `@fontsource/kalam` (body)
- **No JS framework** — vanilla TypeScript only
- **No component library** — all components hand-crafted

## Project Structure

```
src/
  components/     # Astro components (.astro files)
  layouts/        # Layout components
  pages/          # File-based routing
  scripts/        # Client-side vanilla TS (time-of-day.ts, season.ts)
  styles/         # Global CSS (Tailwind + custom properties)
```

## Code Style

### General

- Use tabs for indentation (match existing files)
- No code comments unless explicitly asked
- Files use LF line endings
- Package manager: **Bun** — never use npm/pnpm/yarn

### Astro Components (.astro)

- Frontmatter between `---` fences at top of file
- Props defined with `interface Props {}` in the frontmatter
- Destructure `Astro.props` for prop access
- Use `class:list={["class1", condition && "class2"]}` for conditional classes
- Use `<slot />` for children
- Scoped `<style>` blocks by default; use `<style is:global>` sparingly
- HTML tag format: lowercase, attribute values in double quotes
- Self-closing void elements: `<meta ... />`, `<link ... />`

### TypeScript

- Strict mode via `astro/tsconfigs/strict`
- Use literal union types for constrained strings (e.g. `"spring" | "summer" | "autumn" | "winter"`)
- Prefer `const` over `let`; prefer `interface` over `type`
- Use single quotes for strings in `.ts` files
- No semicolons in `.ts` files (follow existing convention — mixed, prefer consistency with surrounding code)

### CSS & Styling

- Tailwind utility classes inline on elements
- Custom CSS properties (`--color-*`, `--space-*`, `--radius-*`) in `src/styles/global.css`
- Theme tokens defined via Tailwind v4 `@theme {}` directive
- Color theming uses `data-time` and `data-season` attributes on `<html>`
- Prefer `var(--custom-property)` for theming, Tailwind utilities for layout/spacing
- BEM naming for CSS classes within scoped styles (e.g. `.flower__petal`, `.flower--modifier`)

### Imports

- Relative imports with `../` pathing
- CSS imports in frontmatter: `import "../styles/global.css"`
- Font imports via `@import` in CSS files, not `<link>` tags
- Client-side scripts imported in Layout via `<script>` tags, not frontmatter

### Naming Conventions

- Components: PascalCase files (`Flower.astro`, `OrganicCard.astro`)
- Scripts: kebab-case files (`time-of-day.ts`, `season.ts`)
- CSS custom properties: `--category-name` (e.g. `--color-accent-soft`, `--space-element`)
- Tailwind theme tokens: same CSS property convention
- Props: camelCase
- HTML attributes: kebab-case

### Error Handling

- Astro validates components at build time — fix type errors before building
- Client-side scripts are simple and synchronous; no error boundaries needed
- Missing CSS custom properties fall back to explicit defaults in component styles

## Design System

See `.impeccable.md` for the full design context. Key rules for agents:

- **Garden metaphor:** Everything flows from nature — navigation, layout, content, visual language
- **Mint-based palette** that shifts with time-of-day and season via CSS custom properties
- **Handwritten fonts:** Caveat Variable for headings, Kalam for body
- **Organic over sterile:** Slight asymmetry, gentle tilts, hand-placed layouts
- **Light mode only** — the living world system replaces dark mode
- **Accessibility:** WCAG AA target
- **Motion:** Gentle swaying, floating, drifting — nothing abrupt

### CSS Custom Property Categories

| Prefix | Purpose |
|--------|---------|
| `--color-bg`, `--color-surface`, `--color-text`, `--color-heading`, `--color-accent*`, `--color-muted`, `--color-sky` | Page theming (time-of-day) |
| `--color-flower`, `--color-flower-center`, `--color-flower-opacity`, `--color-leaf` | Flower/season theming |
| `--space-section`, `--space-element` | Spacing |
| `--radius-soft`, `--radius-pill` | Border radius |
| `--max-width` | Layout width |

## What NOT to Do

- Do not add React/Vue/Svelte components — vanilla only
- Do not use a component library (Material UI, Shadcn, etc.)
- Do not add dark mode — the time-of-day system handles this
- Do not use rigid grids or sterile layouts
- Do not add comments to code unless explicitly requested
- Do not add test files — there is no test framework
- Do not use npm/pnpm/yarn commands — use Bun exclusively
- Do not commit `.env` files
