---
name: BaldurDev Portfolio
description: Product-engineering portfolio for Andrés Baldur Tamayo — editorial clarity, Bento modularity, developer precision, soft professional depth.
colors:
  light:
    bg: '#F7F7F5'
    bg-elevated: '#FFFFFF'
    surface: '#F0F0ED'
    surface-soft: '#E8E8E5'
    surface-hover: '#E2E2DE'
    text: '#111216'
    text-muted: '#6B7280'
    text-subtle: '#9CA3AF'
    border: '#E2E2DE'
    border-strong: '#D4D4D0'
    primary: '#4F46E5'
    primary-hover: '#4338CA'
    success: '#10B981'
    warning: '#F59E0B'
    danger: '#EF4444'
  dark:
    bg: '#0B0C0F'
    bg-elevated: '#15161B'
    surface: '#1E2028'
    surface-soft: '#252830'
    surface-hover: '#2A2D36'
    text: '#F0F1F5'
    text-muted: '#9CA3AF'
    text-subtle: '#6B7280'
    border: '#2A2D36'
    border-strong: '#3A3E49'
    primary: '#6366F1'
    primary-hover: '#818CF8'
    success: '#34D399'
    warning: '#FBBF24'
    danger: '#F87171'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.02em'
  title-1:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  title-2:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)'
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 'normal'
  label:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '0.08em'
  mono:
    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: '0.04em'
rounded:
  sm: '6px'
  md: '10px'
  lg: '14px'
  xl: '20px'
  2xl: '28px'
spacing:
  1: '4px'
  2: '8px'
  3: '12px'
  4: '16px'
  5: '20px'
  6: '24px'
  8: '32px'
  10: '40px'
  12: '48px'
  16: '64px'
  20: '80px'
  24: '96px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#FFFFFF'
    rounded: '{rounded.lg}'
    padding: '10px 20px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '#FFFFFF'
  card:
    backgroundColor: '{colors.bg-elevated}'
    borderColor: '{colors.border}'
    rounded: '{rounded.xl}'
    shadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.04)'
---

# DESIGN.md

## Overview

The BaldurDev portfolio is a **product-engineering portfolio**, not a product sales site. Its job is to make technical visitors conclude that Andrés Baldur Tamayo is a hireable Full Stack Software Engineer who has built real production software.

The visual identity is built from five ideas:

1. **Editorial clarity** — who, what, proof, next step are scannable.
2. **Bento modularity** — projects and capabilities are organized as asymmetric, content-first tiles.
3. **Developer precision** — clean metadata, monospace labels for technical detail, no gimmicks.
4. **Soft professional depth** — subtle elevation, accessible borders, controlled shadows, high-quality surfaces.
5. **Restrained motion** — motion communicates hierarchy and feedback; it is never decoration.

## Thesis

> The work itself dominates. The UI gets out of the way and makes the engineering evidence easy to scan.

## Colors

- **Deep neutral/ink surfaces** — warm white `#F7F7F5` in light, near-black `#0B0C0F` in dark.
- **Professional indigo accent** — `#4F46E5` light, `#6366F1` dark; used sparingly for CTAs, active states and key metadata.
- **Clear hierarchy** — primary text, muted secondary text, subtle tertiary text.
- **Semantic functional colors** — success green, warning amber, danger red for states.
- No neon, no purple AI dominance, no cyan/magenta arcade accents, no gradients as backgrounds.

## Typography

- **Primary:** Inter — modern, highly readable variable sans for headings, body and UI.
- **Technical mono:** JetBrains Mono — used only for small metadata, dates, labels and technical details.
- Monospace is not used as a developer cliché across the entire site.

## Layout

- **Bento Box Grid** — modular asymmetric tiles on desktop, simplified on tablet, single-column stack on mobile.
- Container max-width `80rem` (1280px).
- 4 px base spacing grid; generous section rhythm.
- Mobile-first responsive validation: 320, 375, 430, 768, 1024, 1280, 1440, 1920 px.

## Elevation & Depth

- Subtle layered shadows, not hard offset shadows.
- Surfaces are separated by 1 px borders plus soft shadows.
- Hover elevation is small (`translateY(-2px)`) and paired with shadow growth.

## Shapes

- Consistent rounded corners: 6/10/14/20/28 px.
- Pills for badges and labels; rounded rectangles for cards, buttons and inputs.

## Components

- **Primary button:** indigo fill, white text, rounded, subtle shadow, small lift on hover.
- **Secondary button:** transparent with border, hover fills surface-hover.
- **Cards:** elevated surface, border, rounded-xl, subtle hover lift.
- **Badges:** small rounded pills, soft backgrounds.
- **Inputs/textarea:** elevated surface, border, focus ring.
- **Drawer/slideover:** dark scrim, elevated surface, clear header/close, accessible focus.

## Motion

- Durations: 150/200/300 ms.
- Easing: standard `cubic-bezier(0.4, 0, 0.2, 1)`.
- Properties: `transform` and `opacity` only.
- Entrance reveals are subtle fade-slide-up.
- Respect `prefers-reduced-motion`; reduced-motion users get instant state changes and full content.

## Do's and Don'ts

**Do**

- Lead with real project media as engineering evidence.
- Keep the first viewport focused: name, role, proof, CTA.
- Use Bento size to express project hierarchy.
- Maintain both dark and light modes with equal polish.
- Use semantic HTML and accessible focus states.

**Don't**

- Use HyperCard, arcade, CRT, fake terminal or fake-code metaphors.
- Fabricate customers, testimonials, metrics or client logos.
- Rely on hover for important interactions.
- Add decorative-only animation, parallax or scroll hijacking.
- Use stock photography for the core portfolio story.

## Source of truth

The full token system, anti-patterns and pre-delivery checklist live in `design-system/MASTER.md`.
