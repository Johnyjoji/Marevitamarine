---
name: Marevita Marine
description: Bespoke, authoritative maritime engineering and operational excellence
colors:
  primary: "#2d5f8d"
  primary-light: "#4a7ba7"
  primary-dark: "#204770"
  accent-bright: "#82a8ca"
  surface-dark: "#0f1318"
  surface-darker: "#080a0d"
  surface-light: "#ffffff"
  surface-subtle: "#f7f8f9"
  neutral-text: "#0f1318"
  neutral-text-muted: "#657080"
  neutral-text-light: "#eceef1"
  border-dark: "rgba(255, 255, 255, 0.1)"
  border-light: "#eceef1"
typography:
  display:
    fontFamily: "'Erica One', sans-serif"
    fontSize: "clamp(5rem, 10vw, 7.5rem)"
    fontWeight: 400
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Prompt', sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontWeight: 600
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-light}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.neutral-text-light}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Marevita Marine

## Overview

**Creative North Star: "The Captain's Watch"**

Marevita Marine's visual system evokes the precision, steadfast authority, and deep-sea gravitas of veteran Master Mariners and Chief Engineers. Designed around stark, alternating light and dark zones linked by organic, living wave dividers, the aesthetic firmly avoids generic SaaS tropes in favor of heavy industrial elegance, functional data density, and cinematic maritime clarity.

**Key Characteristics:**
- High-contrast alternating deep navy (`#0f1318`) and crisp white architectural sections.
- Organic, mathematically varied trigonometric animated wave transitions.
- Functional pill micro-badges and high-clarity monospace operational telemetry.
- Purposeful, tactile interactive feedback across cards and action triggers.

## Colors

The palette is strictly calibrated to two primary scales: classic naval ocean blues for actions/accents, and profound rich blacks/navies for structural surfaces.

### Primary
- **Naval Command Blue** (`#2d5f8d`): Primary CTA backgrounds, high-emphasis icons, and brand anchoring elements.
- **Deep Marine Wave** (`#204770`): Active states, deep accent borders, and structured card foundations.
- **Ocean Crest Blue** (`#4a7ba7`): Hover states, interactive highlights, and secondary energetic accents.

### Neutral
- **Abyssal Navy** (`#080a0d` / `#0f1318`): Core structural dark backgrounds conveying deep maritime solidity.
- **Pure Hull White** (`#ffffff`): Crisp, daylight architectural surfaces and high-contrast card faces.
- **Slate Mist** (`#657080`): Secondary body typography and technical metadata text on light surfaces.
- **Periscope Fog** (`#b0b7c1`): Subtle borders, secondary annotations, and muted metadata on dark surfaces.

### Named Rules
**The Dual Palette Rule.** No tertiary color families are introduced. All elements draw strictly from the naval blue and rich slate/navy hierarchy.
**The Accent Rarity Rule.** Saturated marine accents occupy ≤15% of surface area to ensure operational focal points command immediate attention.

## Typography

**Display Font:** Erica One (Display accents and punchy scene headlines)
**Body Font:** Prompt (Technical clarity, editorial reading comfort)
**System UI / Sans:** Modern clean system sans for structured headings

### Hierarchy
- **Display** (Erica One / Bold Sans, 48px–96px, line-height 0.95): High-impact section titles and hero statement moments.
- **Headline** (Bold Sans, 32px–48px, line-height 1.1): Section introductions, card headers, and thematic statements.
- **Title** (SemiBold Sans, 18px–24px, line-height 1.3): Feature titles, team names, and service categories.
- **Body** (Prompt, 15px–17px, line-height 1.6): Narrative explanations, operational briefs, and service details.
- **Label** (Monospace / Medium, 11px–13px, tracking 0.15em–0.3em, uppercase): Status telemetry, category markers, and operational metadata.

## Layout

- **Spatial Rhythm:** Generous vertical section pacing (`py-20` to `py-32`) giving space to dramatic transitions.
- **Grid Models:** Asymmetric bento configurations and responsive 2-column splits that avoid rigid, cookie-cutter 3-card monotony.
- **Container Constancy:** Centered page columns strictly clamped via `max-w-7xl` with progressive fluid padding.

## Elevation & Depth

Surfaces rely on tonal hierarchy, crisp micro-borders (`border-white/10` or `border-navy-100`), and subtle atmospheric radial glow diffusions rather than muddy drop shadows.

### Shadow Vocabulary
- **Naval Aura Shadow** (`0 20px 40px -15px rgba(45, 95, 141, 0.25)`): High-priority CTA buttons and active focus cards.
- **Deep Hull Depth** (`0 30px 60px -15px rgba(0, 0, 0, 0.5)`): Overlapping photo panels and floating dark container tiers.

## Shapes

- **Interactive Triggers:** Generous pill silhouettes (`rounded-full`) for high-tactility interactive navigation and primary actions.
- **Structural Containers:** Soft architectural radius (`rounded-2xl` / 16px) for cards, preview panels, and photo frames.
- **Transitions:** Continuous trigonometric multi-frequency organic wave dividers connecting distinct light and dark zones.

## Components

### Buttons
- **Shape:** Full pill (`rounded-full`) with embedded tactile icon badge.
- **Primary:** Marine blue fill (`#2d5f8d`) with white text and directional icon bubble (`bg-white/20`).
- **Hover:** Elevates to `#4a7ba7` with smooth transition and glow bloom.

### Service & Feature Cards
- **Corner Style:** `rounded-2xl` with micro-border definitions (`border-navy-100` or `border-white/10`).
- **Background:** Subtle tinted wash (`bg-navy-50/40` on light or `bg-navy-900` on dark).
- **Interaction:** Smooth border luminance lift and micro-elevation on pointer hover.

## Do's and Don'ts

### Do:
- **Do** alternate between deep oceanic dark sections and high-clarity white sections cleanly via organic wave dividers.
- **Do** use asymmetric layouts (wide feature + stacked secondary) to highlight core expertise.
- **Do** maintain clear uppercase monospace eyebrows with deliberate tracking for maritime telemetry.

### Don't:
- **Don't** use generic AI purple/neon gradient fills or floating generic glowing spheres.
- **Don't** use standard 3-equal-width card grids when communicating distinctive capabilities.
- **Don't** mix multiple conflicting border radiuses on the same viewport.
