---
name: BaldurDev
description: Technical clarity with confident product craft.
colors:
  primary: '#2563eb'
  accent: '#f97316'
  light-canvas: '#f7f7f5'
  light-surface: '#ffffff'
  light-ink: '#111216'
  dark-canvas: '#05050a'
  dark-surface: '#0f111a'
  dark-ink: '#f0f1f5'
  success: '#10b981'
  danger: '#ef4444'
typography:
  display:
    fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.65rem, 7vw, 5.5rem)'
    fontWeight: 650
    lineHeight: 0.94
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.75rem'
    fontWeight: 600
    letterSpacing: '0.06em'
rounded:
  sm: '6px'
  md: '10px'
  lg: '14px'
  xl: '20px'
  xxl: '28px'
spacing:
  xs: '8px'
  sm: '16px'
  md: '24px'
  lg: '40px'
  xl: '64px'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.light-ink}'
    rounded: '{rounded.md}'
    padding: '10px 16px'
  surface:
    backgroundColor: '{colors.light-surface}'
    textColor: '{colors.light-ink}'
    rounded: '{rounded.lg}'
---

# Design System: BaldurDev

## Overview

**Creative North Star: "The Production Workbench"**

BaldurDev feels like a skilled engineer's workbench: precise, useful and visibly made by someone who understands both product and implementation. Interfaces are dark-first but equally deliberate in light mode. Evidence and content lead; brand appears through decisive type, disciplined spacing, blue structure and sparing orange action.

**Key Characteristics:**

- Technical without becoming terminal-themed.
- Restrained surfaces with one obvious action color.
- Large Space Grotesk statements paired with highly readable body copy.
- Motion clarifies state or reading order and always respects reduced motion.

## Colors

Blue establishes structure and trust; orange is reserved for action and precise emphasis. Neutral canvases carry most of every screen.

**The Rare Orange Rule.** Orange identifies the most important action or marker; it never becomes ambient decoration.

## Typography

**Display Font:** Space Grotesk with a sans-serif fallback  
**Body Font:** Inter with a sans-serif fallback  
**Label/Mono Font:** JetBrains Mono

Space Grotesk gives the identity its compact, engineered silhouette. Inter keeps dense explanatory copy quiet, while JetBrains Mono is limited to references, technical metadata and measurements.

**The Job-Specific Type Rule.** Monospace describes data; it does not costume ordinary prose as technical.

## Layout

Public pages use a centered maximum width of 80rem with responsive 20–40px gutters. Marketing sections use generous vertical separation; reading surfaces constrain prose to 65–75 characters and may introduce a sticky index on desktop. Mobile collapses parallel columns into a single reading order without hiding essential content.

## Elevation & Depth

Depth is structural and quiet. Most separation comes from tonal surfaces and thin borders. Shadows combine a small vertical offset with soft blur; larger elevation is reserved for documents or demonstrable media.

**The Flat-at-Rest Rule.** Common content surfaces stay flat; lift appears on interactive hover or on physical metaphors such as a document sheet.

## Shapes

Controls and cards use gently curved 10–14px corners. Larger 20–28px radii belong to feature containers, while pills are limited to compact status and filter controls. Borders stay one pixel and use the theme's neutral border token.

## Components

### Buttons

Primary actions use orange with dark text, medium corners and a compact confident weight. Hover combines a color shift with a 2px lift; focus uses the orange outline token. Secondary actions are neutral or blue when the surrounding artifact already uses orange as editorial emphasis.

### Cards / Containers

Containers use tonal separation or one border, not both border and decorative shadow. Internal padding scales from 16px on mobile to 24–32px on larger surfaces.

### Navigation

Navigation is compact and text-led. The PNG wordmark is the home anchor; hover uses the soft surface token and active state uses primary blue. Mobile navigation preserves the same hierarchy in a focused side panel.

### Branded Documents

Proposals use a white paper surface in both website themes so screen and print share one color model. A blue/orange registration rail, monospaced reference code, marginal index and final signed block make the document recognizable without overwhelming client content.

## Do's and Don'ts

### Do:

- **Do** let project evidence and concrete technical decisions occupy the largest visual area.
- **Do** use the supplied light/dark wordmarks and marks against their intended backgrounds.
- **Do** preserve visible focus, AA contrast and useful reading widths.

### Don't:

- **Don't** invent client claims, prices, metrics or endorsements.
- **Don't** use gradients, glass or glow as substitutes for content.
- **Don't** scatter orange across low-priority decoration.
- **Don't** combine a border and a wide shadow on ordinary cards.
