# BaldurDev Portfolio — Design System

> Global source of truth for the visual identity.
> Concept: **“De 8-bit a producción”** — an immersive scroll experience where the 8-bit avatar guides visitors through real engineering impact.

## Conceptual composition

| Dimension                | Selection                                   | Rationale                                                                       |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------- |
| Product semantics        | Portfolio / Personal                        | A single engineer selling craft and real delivery impact.                       |
| Primary landing pattern  | Immersive scroll storytelling               | Each section reveals as a chapter; motion reinforces the engineering journey.   |
| Layout system            | Full-viewport chapters + Bento project grid | High impact above the fold, scannable evidence in the work section.             |
| Surface / depth          | Dark cinematic + spatial particles          | Deep void background with a subtle WebGL particle field that reacts to scroll.  |
| Technical micro-language | Developer precision                         | Monospace only for labels/metadata; NOT a fake terminal identity.               |
| Motion                   | Scroll-driven reveals + parallax            | GSAP ScrollTrigger for section entrances; Three.js particles for ambient depth. |

## Product truth

This portfolio exists to get **BaldurDev / Andrés Baldur Tamayo** hired or contracted as a **Full Stack Software Engineer**.  
Every section must answer the visitor’s implicit question: _“What real impact can this person create for my team/product?”_

Ticador, Cosmos ERP and WordPress projects are **evidence of engineering work**, not products for sale.  
No fabricated customers, testimonials, revenue, users, metrics, awards, client logos or employer relationships.

## Visual thesis

**Dark cinematic void + 8-bit avatar as brand anchor + warm energy accent + scroll-driven chapters + real product evidence.**

The desired reaction is:

> _“This person doesn’t just write code — he ships products that work.”_

The avatar 8-bit is the emotional hook; the projects and capability proof are the rational close.

## What this design must NOT become

- Generic SaaS landing with a hero video + feature grid.
- Coding bootcamp cliché: fake terminal, `$ whoami`, fake source-code hero.
- Matrix / cyberpunk / arcade / HyperCard / retro OS.
- AI chatbot UI, purple AI startup, Apple/Linear/Vercel clone.
- Excessive glassmorphism or neumorphism.
- Scroll hijacking that breaks native navigation.
- Decorative animation without purpose.

## Color system

Dark-first with a polished light mode fallback. Deep void surfaces, blue extracted from the 8-bit avatar background, warm orange accent for energy and CTAs.

### Semantic tokens

| Token                   | Light                   | Dark                     | Usage                               |
| ----------------------- | ----------------------- | ------------------------ | ----------------------------------- |
| `--color-bg`            | `#F7F7F5`               | `#05050A`                | Page background                     |
| `--color-bg-elevated`   | `#FFFFFF`               | `#0F111A`                | Cards, elevated surfaces            |
| `--color-surface`       | `#F0F0ED`               | `#161922`                | Secondary surfaces, inputs          |
| `--color-surface-soft`  | `#E8E8E5`               | `#1E2029`                | Hover/chip backgrounds              |
| `--color-surface-hover` | `#E2E2DE`               | `#252A36`                | Hover states                        |
| `--color-text`          | `#111216`               | `#F0F1F5`                | Primary text                        |
| `--color-text-muted`    | `#3F4654`               | `#C9CED8`                | Secondary text (WCAG AA vs page bg) |
| `--color-text-subtle`   | `#5B6472`               | `#9AA3B2`                | Tertiary/meta text                  |
| `--color-border`        | `#E2E2DE`               | `rgba(255,255,255,0.08)` | Default borders                     |
| `--color-border-strong` | `#D4D4D0`               | `rgba(255,255,255,0.14)` | Focused/emphasized borders          |
| `--color-primary`       | `#2563EB`               | `#3B82F6`                | Primary accent (avatar blue)        |
| `--color-primary-hover` | `#1D4ED8`               | `#60A5FA`                | Primary hover                       |
| `--color-primary-soft`  | `rgba(37,99,235,0.10)`  | `rgba(59,130,246,0.16)`  | Soft primary backgrounds            |
| `--color-accent`        | `#F97316`               | `#FB923C`                | Warm energy accent / CTAs           |
| `--color-accent-hover`  | `#EA580C`               | `#FDBA74`                | Accent hover                        |
| `--color-accent-soft`   | `rgba(249,115,22,0.10)` | `rgba(251,146,60,0.16)`  | Soft accent backgrounds             |
| `--color-success`       | `#10B981`               | `#34D399`                | Success states                      |
| `--color-success-soft`  | `rgba(16,185,129,0.10)` | `rgba(52,211,153,0.12)`  | Soft success backgrounds            |
| `--color-warning`       | `#F59E0B`               | `#FBBF24`                | Warning states                      |
| `--color-danger`        | `#EF4444`               | `#F87171`                | Error/destructive states            |
| `--color-danger-soft`   | `rgba(239,68,68,0.10)`  | `rgba(248,113,113,0.12)` | Soft error backgrounds              |

### Color rules

- Blue is the brand anchor (from the avatar background); orange is the action/energy accent.
- No neon rainbow, no cyan/magenta arcade palette.
- All body text meets WCAG AA (4.5:1); large text and UI meet AAA where feasible.
- Do not convey meaning by color alone; pair with text/icon.

## Typography

### Font families

| Role               | Font               | Weights            | Usage                               |
| ------------------ | ------------------ | ------------------ | ----------------------------------- |
| Display / Headings | **Space Grotesk**  | 400, 500, 600, 700 | Hero name, section titles           |
| Primary sans       | **Inter**          | 400, 500, 600, 700 | Body, UI labels, buttons            |
| Technical mono     | **JetBrains Mono** | 400, 500           | Metadata, dates, tags, small labels |

### Type scale

| Token     | Size                          | Line height | Letter spacing | Weight | Usage                        |
| --------- | ----------------------------- | ----------- | -------------- | ------ | ---------------------------- |
| `display` | `clamp(3rem, 8vw, 6rem)`      | 0.95        | -0.03em        | 700    | Hero name                    |
| `title-1` | `clamp(2.25rem, 5vw, 3.5rem)` | 1.05        | -0.02em        | 700    | Section titles               |
| `title-2` | `clamp(1.5rem, 3vw, 2.25rem)` | 1.15        | -0.01em        | 600    | Subsection titles            |
| `title-3` | `1.25rem`                     | 1.3         | 0              | 600    | Card titles                  |
| `body-lg` | `1.125rem`                    | 1.65        | 0              | 400    | Lead paragraphs              |
| `body`    | `1rem`                        | 1.6         | 0              | 400    | Body copy                    |
| `body-sm` | `0.875rem`                    | 1.55        | 0              | 400    | Descriptions, captions       |
| `label`   | `0.75rem`                     | 1.2         | 0.08em         | 500    | Uppercase labels (sans)      |
| `mono-sm` | `0.75rem`                     | 1.3         | 0.04em         | 500    | Metadata, dates, tags (mono) |

## Spacing

4 px base grid.

| Token        | Value          |
| ------------ | -------------- |
| `--space-1`  | 4px (0.25rem)  |
| `--space-2`  | 8px (0.5rem)   |
| `--space-3`  | 12px (0.75rem) |
| `--space-4`  | 16px (1rem)    |
| `--space-5`  | 20px (1.25rem) |
| `--space-6`  | 24px (1.5rem)  |
| `--space-8`  | 32px (2rem)    |
| `--space-10` | 40px (2.5rem)  |
| `--space-12` | 48px (3rem)    |
| `--space-16` | 64px (4rem)    |
| `--space-20` | 80px (5rem)    |
| `--space-24` | 96px (6rem)    |

Section vertical rhythm: `py-20 sm:py-28 lg:py-36`.  
Container max-width: `max-w-7xl` (80rem / 1280px).

## Radii

| Token           | Value  |
| --------------- | ------ |
| `--radius-sm`   | 6px    |
| `--radius-md`   | 10px   |
| `--radius-lg`   | 14px   |
| `--radius-xl`   | 20px   |
| `--radius-2xl`  | 28px   |
| `--radius-full` | 9999px |

## Shadows

Subtle, layered; never hard offset.

### Light

| Token         | Value                                                                 |
| ------------- | --------------------------------------------------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)`                                          |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.04)`    |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.04)`  |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)` |

### Dark

| Token         | Value                                                                 |
| ------------- | --------------------------------------------------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.30)`                                          |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.35), 0 2px 4px -2px rgba(0,0,0,0.25)`    |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.40), 0 4px 6px -4px rgba(0,0,0,0.30)`  |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.45), 0 8px 10px -6px rgba(0,0,0,0.35)` |

## Motion

Motion communicates hierarchy and journey progress, never decoration.

| Token              | Value                           | Usage                        |
| ------------------ | ------------------------------- | ---------------------------- |
| `--motion-fast`    | 150ms                           | Micro-feedback (hover color) |
| `--motion-normal`  | 250ms                           | Standard transitions         |
| `--motion-slow`    | 400ms                           | Entrance reveals             |
| `--motion-section` | 800ms                           | Section chapter transitions  |
| `--ease-standard`  | `cubic-bezier(0.4, 0, 0.2, 1)`  | Standard                     |
| `--ease-out`       | `cubic-bezier(0.16, 1, 0.3, 1)` | Entering elements (expo out) |
| `--ease-in`        | `cubic-bezier(0.4, 0, 1, 1)`    | Exiting elements             |

### Motion rules

- Use `transform` and `opacity` only.
- Avoid animating width/height, top/left, blur/filter.
- Section entrances use `translateY(40px)` → `0` + opacity with staggered children.
- Card hover: small lift (`translateY(-4px)`) + shadow elevation; disabled for reduced motion.
- Particle field is ambient; it never blocks interaction or dominates attention.
- Respect `prefers-reduced-motion`: reduced-motion users get instant state changes and a static gradient fallback.

## WebGL background

A full-screen Three.js particle field lives behind all content with `pointer-events: none`.

### Behavior by section

| Section         | Particle state                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `#hero`         | Dispersed starfield, slow drift, reacts subtly to scroll velocity.                                 |
| `#about`        | Particles converge toward the avatar, creating a gravitational focal point.                        |
| `#technologies` | Particles cluster into 4 groups (Frontend / Backend / WordPress / Infra) connected by faint lines. |
| `#projects`     | Particles form a loose blueprint grid, hinting at architecture and structure.                      |
| `#experience`   | Particles align into a vertical timeline path.                                                     |
| `#contact`      | Concentric ripple waves emanating from the form center.                                            |

### Implementation rules

- Use `InstancedMesh` for performance; target 60fps on desktop.
- Mobile fallback: lightweight 2D canvas particles or animated gradient.
- Pause rendering when tab is hidden (`visibilitychange`).
- Destroy WebGL context on unmount.
- No cursor tracking; the field reacts to scroll only.

## Layout system

### Full-viewport chapters

- Hero is `100dvh`.
- Other major sections use generous vertical padding (`py-20 sm:py-28 lg:py-36`) but can include full-bleed chapter moments.

### Project Bento grid

- Desktop: 12-column CSS Grid with explicit asymmetric spans.
- Tablet: 6-column or 2-column simplified spans.
- Mobile: single-column stack.
- Gap: 16px mobile, 20px tablet, 24px desktop.

### Section anchors (preserved)

`#hero`, `#about`, `#technologies`, `#projects`, `#experience`, `#contact`

### Responsive breakpoints

Validate at: 320, 375, 430, 768, 1024, 1280, 1440, 1920 px.

## Component primitives

### Avatar morph

- Two images stacked: 8-bit avatar on top, real portrait below.
- Default state: 8-bit avatar visible.
- Hover/tap: crossfade to real portrait over 400ms.
- Reduced motion: instant switch or no morph.
- Used in hero and about sections.

### Buttons

**Primary (accent)**

- Background: `--color-accent`, text: `#0F172A`
- Padding: `px-5 py-2.5` (md), `px-4 py-2` (sm)
- Border-radius: `--radius-lg` (14px)
- Font: 500, 1rem
- Shadow: `--shadow-sm`
- Hover: background `--color-accent-hover`, shadow `--shadow-md`, `translateY(-1px)`
- Focus-visible: 2px ring `--color-accent` at 40% opacity
- Disabled: opacity 0.5, cursor not-allowed

**Secondary / Ghost**

- Background: transparent
- Border: 1px `--color-border`
- Text: `--color-text`
- Hover: background `--color-surface-hover`, border `--color-border-strong`

**Icon button**

- Min touch target 44×44 px; visually 36×36 px with padding.

### Cards

- Background: `--color-bg-elevated`
- Border: 1px `--color-border`
- Border-radius: `--radius-xl` (20px)
- Shadow: `--shadow-sm`
- Hover: `--shadow-md`, `translateY(-4px)`
- Padding: responsive (16–24 px)

### Badges

- Small rounded-full pill
- Background: `--color-surface-soft`, text: `--color-text-muted`
- Primary variant: `--color-primary-soft`, text `--color-primary`
- Accent variant: `--color-accent-soft`, text `--color-accent`
- Font: mono-sm or label

### Inputs / Textarea

- Background: `--color-bg-elevated`
- Border: 1px `--color-border`
- Border-radius: `--radius-lg`
- Padding: `px-4 py-3`
- Focus: border `--color-accent`, ring 2px `--color-accent` at 30% opacity
- Error: border `--color-danger`, text `--color-danger`
- Placeholder: `--color-text-subtle`

### Drawer / Slideover

- Overlay: `bg-black/60` with subtle backdrop-blur
- Surface: `--color-bg-elevated`
- Header: border-bottom `--color-border`
- Close button: icon-only with aria-label, 44×44 touch target
- Focus trap on open, return focus on close
- Reduced motion: disable slide, keep fade instant

### Navigation

- Header: fixed, `--color-bg/80` with `backdrop-blur`, border-bottom `--color-border`
- Logo: 8-bit avatar favicon + wordmark.
- Nav links: text `--color-text-muted`, hover `--color-text`, active `--color-accent`
- Active state: underline or pill background
- Mobile: slideover with vertical link list

## Section design notes

### Hero

- **100dvh**, no project video.
- 8-bit avatar floats on the right/center with subtle levitation animation.
- Name **“BaldurDev”** in huge `Space Grotesk` display, left-aligned.
- Role as a typewriter/decode line: `> Full Stack Software Engineer · Laravel · Vue · Nuxt`.
- Impact statement: one short sentence about real products shipped.
- CTAs: `[Ver proyectos]` (accent), `[Contactar]` (ghost), `[Descargar CV]` (text link).
- Scroll indicator at bottom.

### About

- Chapter reveal: title, lead paragraph, avatar-to-portrait morph.
- 3 real stats: years of experience, projects in production, technologies mastered.
- Text focuses on engineering ownership and delivery, not biography alone.

### Skills / Engineering capabilities

- Anchor `#technologies` preserved.
- 4 capability clusters displayed as connected nodes.
- Each cluster lists concrete technologies.
- Emphasize what you can build, not just what you know.

### Projects

- Primary evidence; use visual size to express hierarchy.
- Bento grid: Ticador flagship large tile, Cosmos large supporting, WordPress medium supporting.
- Each card: screenshot, title, impact summary, tech tags, year, external link, case-study trigger.
- Video reveals on hover/focus, never autoplaying multiple videos.
- Drawer contains media walkthrough with navigation.

### Experience

- Vertical timeline with glowing path.
- Each role emphasizes impact: what was built, what improved, what was shipped.

### Contact

- Preserve EmailJS + Cloudflare Turnstile.
- Floating form over ripple particle background.
- Clear CTA and direct email fallback.

## Accessibility

- WCAG AA minimum; aim for AAA on large text and UI.
- Semantic headings, landmarks, `main`, `section`, `nav`, `footer`.
- Keyboard navigation; visible `focus-visible` rings.
- Form labels, inline errors, aria-live for errors.
- Icon-only controls have aria-labels.
- Touch targets ≥ 44×44 px.
- `prefers-reduced-motion` honored throughout.
- WebGL fallback for reduced motion and low-power mode.
- Language switcher has clear state.
- Skip-to-main-content link.

## Performance

- Hero avatar loads eagerly; everything else lazy.
- Responsive images with `srcset`/`sizes`.
- Videos muted, preloaded `metadata`, no simultaneous autoplay.
- Fonts loaded with `font-display: swap`.
- Three.js instanced mesh; fallback to 2D canvas on mobile/low-end.

## SEO / meta

- Preserve canonical, hreflang, x-default, HTML lang.
- ES default at `/`, EN at `/en/`.
- OpenGraph image must match new identity.
- JSON-LD: `WebSite`, `WebPage`, `Person` — truthful only.

## Anti-patterns

- ❌ HyperCard / arcade / CRT / pixel cliché beyond the avatar.
- ❌ Fake terminal, fake code, fake claims.
- ❌ Stock photography for the core story.
- ❌ Scroll hijacking, cursor followers, excessive parallax.
- ❌ Emoji as icons.
- ❌ Placeholder-only labels.
- ❌ Color-only meaning.
- ❌ Horizontal scroll on mobile.

## Pre-delivery checklist

- [ ] Three.js particle field renders smoothly on desktop.
- [ ] Mobile fallback is graceful (no blank background).
- [ ] Avatar morph works on hover and focus.
- [ ] Hero is 100dvh and has no project video.
- [ ] Projects use Bento hierarchy and real media.
- [ ] Skills communicate capabilities, not just a logo wall.
- [ ] Contact form, Turnstile and EmailJS remain functional.
- [ ] ES and EN layouts work; no hardcoded visible strings.
- [ ] Canonical, hreflang, sitemap, robots remain correct.
- [ ] Reduced motion and keyboard navigation tested.
- [ ] No mobile horizontal overflow.
- [ ] Lint, typecheck and both builds pass.
