---
name: BaldurDev Portfolio
description: HyperCard stack topology fused with arcade-cabinet retro color — hireable craft evidence as clickable cards/carts
colors:
  # Light — cabinet cream / attract-mode day
  cabinet-cream: '#efe6d5'
  cabinet-sand: '#e2d6c2'
  cabinet-panel: '#d4c4a8'
  bezel: '#1a1a2e'
  coin-amber: '#f0a202'
  coin-deep: '#d48900'
  attract-cyan: '#00b7c6'
  attract-magenta: '#e83e8c'
  muted-bezel: '#5c5c7a'
  seal-ink: '#1a1a2e'
  media-fg: '#efe6d5'
  # Dark — CRT night / cabinet interior
  crt-void: '#0d0d14'
  crt-asphalt: '#161622'
  crt-panel: '#222233'
  chalk: '#efe6d5'
  stencil-dark: '#a8a8c0'
typography:
  display:
    fontFamily: 'Archivo Narrow, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.75rem, 8vw, 5.5rem)'
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: '-0.02em'
  headline:
    fontFamily: 'Archivo Narrow, Arial Narrow, sans-serif'
    fontSize: 'clamp(1.75rem, 4vw, 2.75rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.015em'
  body:
    fontFamily: 'Source Sans 3, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 'normal'
  label:
    fontFamily: 'Pixelify Sans, Archivo Narrow, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.12em'
  pixel-sm:
    fontFamily: 'Pixelify Sans, Archivo Narrow, sans-serif'
    fontSize: '0.6875rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.1em'
  chip:
    fontFamily: 'Pixelify Sans, Archivo Narrow, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.06em'
rounded:
  none: '0px'
  sm: '0px'
  md: '0px'
spacing:
  sm: '8px'
  md: '16px'
  lg: '32px'
  xl: '64px'
components:
  button-primary:
    backgroundColor: '{colors.coin-amber}'
    textColor: '{colors.seal-ink}'
    rounded: '{rounded.sm}'
    padding: '12px 22px'
  button-primary-hover:
    backgroundColor: '{colors.coin-deep}'
    textColor: '{colors.media-fg}'
  crate:
    backgroundColor: '{colors.cabinet-panel}'
    textColor: '{colors.bezel}'
    rounded: '{rounded.sm}'
---

# DESIGN.md

<!-- impeccable:design-seed HyperCard shoebox × arcade retro · seed 12e52a4a · chosen challenger-hypercard · steer arcade colors -->

## Overview

Visual world: **HyperCard stack of craft cards**, painted with **arcade-cabinet retro color** (not 1-bit black/white). Each project is a card/cart you open onto real media. Composition stays asymmetric hero + equal card field. Dark = CRT night; light = cabinet cream day.

**THESIS:** Refuse centered SaaS hero. Lead with brand as card title plate; work as openable HyperCard carts in arcade color.

**FORM:** Shoebox stack (challenger HyperCard) · staging A+C crate/card field · seed `12e52a4a` · steer: arcade retro chroma (no B/N).

## Colors

- **Cabinet cream / sand / panel** (light ground); **CRT void / asphalt / panel** (dark ground).
- **Coin amber:** primary CTA / stamps (~35–50% interactive chrome).
- **Attract cyan + magenta:** secondary accents (live badge, rails, hover) — sparingly, period arcade, not vaporwave purple glow.
- **Bezel:** navy-black ink for type on cream; chalk cream type on CRT.
- No purple neon haze; no factory steel-teal leftover.

## Typography

- **Display/headline:** Archivo Narrow — bold card titles (HyperCard energy without Chicago clone costume).
- **Body:** Source Sans 3 — readable hiring copy.
- **Labels:** Archivo Narrow, tracked uppercase (CARD / STAGE / CREDIT) — bitmap only if a single system kicker needs it later; not every label.

## Layout

- Keep asymmetric first viewport + dominant opening card with video.
- Projects = equal **card field** (former crates); double-rule card chrome like HyperCard frames, in arcade fills.
- Dense card rows, then air, then field.

## Elevation & Depth

- Hard offset shadows (card lift / pressed invert feel), coin-amber hover edge.
- Double border (outer bezel + inner dashed) on sheets/cards.

## Shapes

- Radius 0. Circles only for portrait.
- Cards: rectangular frames, corner stamps as coin plates.

## Components

- Primary = coin plate (amber).
- Secondary = cyan outline on panel.
- Nav: thin bezel bar; brand as card wordmark.
- Hazard rail → attract candy stripe (amber/cyan or amber/bezel).

## Do's and Don'ts

**Do**

- Keep real project media as the card face.
- Dual light/dark with the same arcade grammar.
- Respect `prefers-reduced-motion`.

**Don't**

- Collapse to HyperCard 1-bit B/W (user steer forbids it).
- Sell Ticador/Cosmos as products.
- Purple glow / soft SaaS cards / Space Grotesk.
