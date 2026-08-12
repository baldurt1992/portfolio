# BaldurDev Portfolio — Design System

> Global source of truth for the visual identity migration.  
> Generated with `ui-ux-pro-max` and then synthesized for PRODUCT.md constraints.

## Conceptual composition

| Dimension | Selection | Rationale |
|-----------|-----------|-----------|
| Product semantics | #11 Portfolio / Personal | A single engineer selling craft, not a product. |
| Primary landing pattern | #28 Bento Grid Showcase | Scannable evidence, high density without clutter, mobile stack. |
| Layout system | #39 Bento Box Grid | Modular asymmetric tiles; work dominates the composition. |
| Surface / depth | #19 Soft UI Evolution | Subtle elevation, high-quality surfaces, clear hierarchy — not neumorphism. |
| Technical micro-language | #81 Developer Tool / IDE | Precision, metadata, restrained chrome; NOT the product identity. |
| Motion | #15 Motion-Driven, intentionally restrained | Transform/opacity only, feedback-first, respects `prefers-reduced-motion`. |

## Product truth

This portfolio exists to get **BaldurDev / Andrés Baldur Tamayo** hired as a **Full Stack Software Engineer**.  
Ticador, Cosmos ERP and WordPress projects are **evidence of engineering work**, not products for sale.  
No fabricated customers, testimonials, revenue, users, metrics, awards, client logos or employer relationships.

## Visual thesis

**Editorial clarity + Bento modularity + Developer precision + Soft professional depth + real product evidence + restrained motion.**

The visual hierarchy must communicate:

```
ENGINEER
  → REAL WORK
    → CAPABILITIES
      → EXPERIENCE
        → CONTACT
```

The work itself dominates. The UI must never feel like a gimmick; the desired reaction is *“This person clearly knows how to build software.”*

## What this design must NOT become

- Fake terminal / `$ whoami` / fake source-code hero
- Matrix, cyberpunk, space HUD, arcade, HyperCard, retro OS
- AI chatbot UI, purple AI startup, Apple/Linear/Vercel clone
- Coding bootcamp, claymorphism toy UI, excessive glassmorphism
- Generic Tailwind template, giant logo wall
- Gratuitous Three.js/WebGL, permanent animated gradient, scroll hijacking, excessive parallax

## Color system

Dark-first with a polished light mode. Deep neutral/ink surfaces, restrained professional indigo accent, clear hierarchy, subtle depth, accessible borders.

### Semantic tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-bg` | `#F7F7F5` | `#0B0C0F` | Page background |
| `--color-bg-elevated` | `#FFFFFF` | `#15161B` | Cards, elevated surfaces |
| `--color-surface` | `#F0F0ED` | `#1E2028` | Secondary surfaces, inputs |
| `--color-surface-soft` | `#E8E8E5` | `#252830` | Hover/chip backgrounds |
| `--color-surface-hover` | `#E2E2DE` | `#2A2D36` | Hover states |
| `--color-text` | `#111216` | `#F0F1F5` | Primary text |
| `--color-text-muted` | `#6B7280` | `#9CA3AF` | Secondary text |
| `--color-text-subtle` | `#9CA3AF` | `#6B7280` | Tertiary/meta text |
| `--color-border` | `#E2E2DE` | `#2A2D36` | Default borders |
| `--color-border-strong` | `#D4D4D0` | `#3A3E49` | Focused/emphasized borders |
| `--color-primary` | `#4F46E5` | `#6366F1` | Primary accent |
| `--color-primary-hover` | `#4338CA` | `#818CF8` | Primary hover |
| `--color-primary-soft` | `rgba(79,70,229,0.10)` | `rgba(99,102,241,0.16)` | Soft primary backgrounds |
| `--color-primary-muted` | `rgba(79,70,229,0.06)` | `rgba(99,102,241,0.10)` | Very soft primary backgrounds |
| `--color-success` | `#10B981` | `#34D399` | Success states |
| `--color-success-soft` | `rgba(16,185,129,0.10)` | `rgba(52,211,153,0.12)` | Soft success backgrounds |
| `--color-warning` | `#F59E0B` | `#FBBF24` | Warning states |
| `--color-danger` | `#EF4444` | `#F87171` | Error/destructive states |
| `--color-danger-soft` | `rgba(239,68,68,0.10)` | `rgba(248,113,113,0.12)` | Soft error backgrounds |

### Color rules

- No AI-purple dominance, neon, cyan/magenta arcade accents.
- No CRT textures, scanlines, paper noise, hard offset shadows.
- All body text meets WCAG AA (4.5:1); large text and UI meet AAA where feasible.
- Do not convey meaning by color alone; pair with text/icon.

## Typography

### Font families

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Primary sans | **Inter** | 400, 500, 600, 700 | Headings, body, UI labels |
| Technical mono | **JetBrains Mono** | 400, 500 | Metadata, dates, small labels, code-like details |

Monospace is used **only** for small technical metadata. It is not a developer cliché across the whole site.

### Type scale

| Token | Size | Line height | Letter spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `display` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | -0.02em | 700 | Hero name / main headline |
| `title-1` | `clamp(2rem, 4.5vw, 3.5rem)` | 1.1 | -0.02em | 700 | Section titles |
| `title-2` | `clamp(1.5rem, 3vw, 2.25rem)` | 1.15 | -0.01em | 600 | Subsection titles |
| `title-3` | `1.25rem` | 1.3 | 0 | 600 | Card titles |
| `body-lg` | `1.125rem` | 1.65 | 0 | 400 | Lead paragraphs |
| `body` | `1rem` | 1.6 | 0 | 400 | Body copy |
| `body-sm` | `0.875rem` | 1.55 | 0 | 400 | Descriptions, captions |
| `label` | `0.75rem` | 1.2 | 0.08em | 500 | Uppercase labels (sans) |
| `mono-sm` | `0.75rem` | 1.3 | 0.04em | 500 | Metadata, dates, tags (mono) |

## Spacing

4 px base grid.

| Token | Value |
|-------|-------|
| `--space-1` | 4px (0.25rem) |
| `--space-2` | 8px (0.5rem) |
| `--space-3` | 12px (0.75rem) |
| `--space-4` | 16px (1rem) |
| `--space-5` | 20px (1.25rem) |
| `--space-6` | 24px (1.5rem) |
| `--space-8` | 32px (2rem) |
| `--space-10` | 40px (2.5rem) |
| `--space-12` | 48px (3rem) |
| `--space-16` | 64px (4rem) |
| `--space-20` | 80px (5rem) |
| `--space-24` | 96px (6rem) |

Section vertical rhythm: `py-16 sm:py-24 lg:py-32` (64/96/128 px).  
Container max-width: `max-w-7xl` (80rem / 1280px).

## Radii

| Token | Value |
|-------|-------|
| `--radius-sm` | 6px |
| `--radius-md` | 10px |
| `--radius-lg` | 14px |
| `--radius-xl` | 20px |
| `--radius-2xl` | 28px |
| `--radius-full` | 9999px |

## Shadows

Subtle, layered; never hard offset.

### Light

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.04)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.04)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)` |

### Dark

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.30)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.35), 0 2px 4px -2px rgba(0,0,0,0.25)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.40), 0 4px 6px -4px rgba(0,0,0,0.30)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.45), 0 8px 10px -6px rgba(0,0,0,0.35)` |

## Motion

Moderate motion level. Motion communicates hierarchy and feedback, never decoration.

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-fast` | 150ms | Micro-feedback (hover color) |
| `--motion-normal` | 200ms | Standard transitions |
| `--motion-slow` | 300ms | Entrance reveals, drawer |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |

### Motion rules

- Use `transform` and `opacity` only.
- Avoid animating width/height, top/left, blur/filter.
- No constant animation, large parallax, scroll-jacking, cursor-following effects.
- Entrance reveals are subtle (translate-y + opacity).
- Card hover: small lift (`translateY(-2px)`) + shadow elevation; disabled for reduced motion.
- Respect `prefers-reduced-motion`: reduced-motion users get the full information experience with instant state changes.

## Layout system

### Bento grid

- Desktop: 12-column CSS Grid with explicit asymmetric spans.
- Tablet: 6-column or 2-column simplified spans.
- Mobile: single-column stack.
- Gap: 16px mobile, 20px tablet, 24px desktop.
- Never force desktop spans onto mobile.

### Section anchors (preserved)

`#hero`, `#about`, `#technologies`, `#projects`, `#experience`, `#contact`

### Responsive breakpoints

Validate at: 320, 375, 430, 768, 1024, 1280, 1440, 1920 px.

## Component primitives

### Buttons

**Primary**
- Background: `--color-primary`, text: white
- Padding: `px-5 py-2.5` (md), `px-4 py-2` (sm)
- Border-radius: `--radius-lg` (14px)
- Font: 500, 1rem
- Shadow: `--shadow-sm`
- Hover: background `--color-primary-hover`, shadow `--shadow-md`, `translateY(-1px)`
- Focus-visible: 2px ring `--color-primary` at 40% opacity
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
- Hover: `--shadow-md`, `translateY(-2px)`
- Padding: responsive (16–24 px)

### Badges

- Small rounded-full pill
- Background: `--color-surface-soft`, text: `--color-text-muted`
- Primary variant: `--color-primary-soft`, text `--color-primary`
- Font: mono-sm or label

### Inputs / Textarea

- Background: `--color-bg-elevated`
- Border: 1px `--color-border`
- Border-radius: `--radius-lg`
- Padding: `px-4 py-3`
- Focus: border `--color-primary`, ring 2px `--color-primary` at 30% opacity
- Error: border `--color-danger`, text `--color-danger`
- Placeholder: `--color-text-subtle`

### Form fields

- Visible label above input, font-weight 500, `--color-text`
- Required indicator via aria and optional `*`
- Error text below field, `--color-danger`

### Drawer / Slideover

- Overlay: `bg-black/60` with subtle backdrop-blur
- Surface: `--color-bg-elevated`
- Header: border-bottom `--color-border`
- Close button: icon-only with aria-label, 44×44 touch target
- Focus trap on open, return focus on close
- Reduced motion: disable slide, keep fade instant

### Navigation

- Header: sticky, `--color-bg` with `backdrop-blur`, border-bottom `--color-border`
- Nav links: text `--color-text-muted`, hover `--color-text`, active `--color-primary`
- Active state: underline or pill background
- Mobile: slideover with vertical link list

## Section design notes

### Hero

- Communicate immediately: **BaldurDev — Full Stack Software Engineer**.
- Hierarchy: positioning → proof → CTA.
- Include real metadata: location, key stack (Laravel, Vue/Nuxt, WordPress).
- Preserve real portrait/avatar.
- Preserve featured project media (muted video, eager load).
- CTAs: Contact, Explore work, Download CV.
- No fake terminal, fake code, HOME CARD, HyperCard menu/window semantics.

### About

- Preserve real portrait, biography, location, resume.
- Combine human biography + engineering ownership.
- No fake stats.

### Skills / Engineering capabilities

- Anchor `#technologies` preserved.
- Present as capability groups:
  1. Product / Frontend Engineering
  2. Backend Architecture
  3. WordPress Engineering
  4. Infrastructure / Delivery
- Technology icons support the information; they are not the information.
- Encourage Bento composition.

### Projects

- Primary evidence; use visual size to express hierarchy.
- Explicit prominence metadata: `flagship`, `large`, `medium`.
- Ticador = flagship large tile, Cosmos = large supporting tile, WordPress = medium supporting tile.
- Each project communicates: name, what it proves, technologies, year, real screenshot/video, external link, media exploration action.
- Avoid generic marketing copy; treat media as engineering evidence.

### Experience

- Modern timeline or structured editorial list.
- Supports engineering story, not a résumé dump.

### Contact

- Preserve EmailJS + Cloudflare Turnstile.
- Redesign container, form, inputs, labels, errors, submit, captcha placement, direct email.
- Mailto fallback preserved.

## Accessibility

- WCAG AA minimum; aim for AAA on large text and UI.
- Semantic headings, landmarks, `main`, `section`, `nav`, `footer`.
- Keyboard navigation; visible `focus-visible` rings.
- Form labels, inline errors, aria-live for errors.
- Icon-only controls have aria-labels.
- Touch targets ≥ 44×44 px.
- `prefers-reduced-motion` honored throughout.
- Language switcher has clear state.
- Skip-to-main-content link.

## Performance

- Only hero media loads eagerly; everything else lazy.
- Responsive images with `srcset`/`sizes`.
- Videos muted, preloaded `metadata`, not autoplaying several at once.
- Fonts loaded with `font-display: swap`.
- Avoid heavy animation libraries; use VueUse + IntersectionObserver + CSS.

## SEO / meta

- Preserve canonical, hreflang, x-default, HTML lang.
- ES default at `/`, EN at `/en/`.
- OpenGraph image must match new identity.
- JSON-LD: `WebSite`, `WebPage`, `Person` — truthful only.

## Anti-patterns

- ❌ HyperCard / arcade / CRT / pixel / hard-shadow / fake-window metaphors.
- ❌ Fake claims, fake logos, fake stats, fake testimonials.
- ❌ Stock photography for the core story.
- ❌ Decorative-only animation, scroll hijacking, parallax, cursor followers.
- ❌ Emoji as icons.
- ❌ Placeholder-only labels.
- ❌ Color-only meaning.
- ❌ Horizontal scroll on mobile.

## Pre-delivery checklist

- [ ] No obsolete `hc-`, `manifest-`, `dock-`, `seal-`, `stencil`, `attract-`, `font-pixel` references.
- [ ] Dark and light modes both polished and contrast-checked.
- [ ] Hero says *Full Stack Software Engineer* within the first viewport.
- [ ] Projects lead with visual hierarchy and real media.
- [ ] Skills communicate capabilities, not just a logo wall.
- [ ] Contact form, Turnstile and EmailJS remain functional.
- [ ] ES and EN layouts work; no hardcoded visible strings.
- [ ] Canonical, hreflang, sitemap, robots remain correct.
- [ ] Reduced motion and keyboard navigation tested.
- [ ] No mobile horizontal overflow.
- [ ] Lint, typecheck and both builds pass.
