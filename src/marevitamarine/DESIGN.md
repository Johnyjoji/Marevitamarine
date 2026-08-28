---
name: Marevita Marine
description: Editorial marine-services identity for a new-era marine services startup
colors:
  marine-50: "#f0f9ff"
  marine-100: "#e0f2fe"
  marine-200: "#bae6fd"
  marine-300: "#7dd3fc"
  marine-400: "#38bdf8"
  marine-500: "#0ea5e9"
  marine-600: "#0284c7"
  marine-700: "#0369a1"
  marine-800: "#075985"
  marine-900: "#0c4a6e"
  marine-950: "#082f49"
  navy-50: "#f8fafc"
  navy-100: "#f1f5f9"
  navy-200: "#e2e8f0"
  navy-300: "#cbd5e1"
  navy-400: "#94a3b8"
  navy-500: "#64748b"
  navy-600: "#475569"
  navy-700: "#334155"
  navy-800: "#1e293b"
  navy-900: "#0f172a"
  navy-950: "#020617"
  # Pure neutrals used for text, backgrounds, shadows
  white: "#ffffff"
  black: "#000000"
  # Gray for secondary UI (muted text, dividers)
  gray-400: "oklch(70.7% .022 261.325)"
  # Opacity system — documented overlay values used throughout the UI.
  # Each step is a deliberate design choice, not arbitrary Tailwind output.
  opacity:
    # Overlays on dark surfaces (marine/navy 900-950)
    overlay-5: "0.05"    # border-black/5, subtle borders
    overlay-10: "0.1"    # bg-white/10, bg-marine-950/10
    overlay-15: "0.15"   # bg-white/15
    overlay-20: "0.2"    # bg-white/20
    overlay-25: "0.25"   # bg-white/25
    overlay-30: "0.3"    # border-marine-400/30, bg-white/30
    overlay-40: "0.4"    # text-white/40, text-marine-300/40
    overlay-50: "0.5"    # bg-white/50, text-white/50
    overlay-60: "0.6"    # bg-marine-950/60, text-white/60
    overlay-70: "0.7"    # bg-navy-900/70, text-white/70
    overlay-80: "0.8"    # bg-navy-950/80
    overlay-90: "0.9"    # bg-white/90, bg-navy-950/90
    overlay-95: "0.95"   # bg-white/95 (pill background)
    # Shadows — explicit alpha values from Tailwind shadow utilities
    shadow-sm: "0.05"
    shadow-md: "0.08"
    shadow-lg: "0.1"
    shadow-xl: "0.12"
    shadow-2xl: "0.22"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontWeight: 600
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  display-alt:
    fontFamily: "'Erica One', cursive"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  accent:
    fontFamily: "'Prompt', sans-serif"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  pill: "9999px"
  card: "0.25rem"
  sheet: "1.5rem"
spacing:
  section: "6rem"
  container: "1.5rem / 2rem"
  stack-tight: "0.5rem"
components:
  button-primary:
    backgroundColor: "{colors.navy-900}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.navy-800}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  button-cta-marine:
    backgroundColor: "{colors.marine-500}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-cta-marine-hover:
    backgroundColor: "{colors.marine-400}"
  nav-link:
    textColor: "{colors.navy-700}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.625rem"
  nav-link-active:
    textColor: "{colors.navy-900}"
---

# Design System: Marevita Marine

## Overview

**Creative North Star: "The Operations Bridge"**

Marevita Marine is built as a premium B2B services identity that reads like the inside of a ship's bridge: dark structural surfaces, single-color instrument accents, no decoration that doesn't earn its place. The brand thesis is accountability across the whole voyage — the site sells the relationship, not the menu — and the visual system reflects that by reserving color for action, type for hierarchy, and shape for navigation.

The aesthetic is editorial and confident, not minimal. Headlines are large and tightly tracked (-0.04em); sections alternate between pure white surfaces and structural navy blocks, separated by hand-drawn organic wave dividers (never a perfect sine); case-study cards use bespoke SVG illustrations, not stock photography. The overall density is "comfortable, not airy" — generous spacing between sections, but no wasted real estate inside a section.

**Key Characteristics:**
- **Two-scale palette only:** marine-cyan (action, accent) + navy (structure, text). No third hue.
- **Editorial typography:** system sans throughout, with a tightened display scale and uppercase tracking-wide labels for metadata.
- **Organic dividers, not straight lines:** four hand-drawn wave paths (coast, deep, ripple, rugged), each with a distinct silhouette.
- **Floating-pill navigation:** the header is a centered capsule that sits over the hero, not a full-width bar.
- **Black-and-white section alternation:** white surfaces carry editorial content; navy-900 surfaces carry proof and CTAs.

## Colors

Two scales, used as roles, not as decoration. Marine is the only chromatic voice; navy carries every structural surface, every text color, every border. The full ramp (50–950) is exposed in `index.css` so a surface can pick the lightness that fits its context — but in practice the design pulls from a small set of anchor tones.

### Primary — Marine
- **Marine 500 (#0ea5e9):** the accent color for action — primary CTAs, the marine-500 chip in the case-study card eyebrows, the data callouts on the navy surface.
- **Marine 400 (#38bdf8):** hover state for marine CTAs, the "currently at sea" pulsing dot in the hero, the wave-of-color accent in section headlines.
- **Marine 300 (#7dd3fc):** text on dark surfaces where marine-500 would be too saturated.
- **Marine 600 (#0284c7):** the only marine shade used on light surfaces — section eyebrows, the dot under the active nav link (older iteration), link hovers.

**The Single Voice Rule.** Marine is the only chromatic color. Its rarity is the point — when marine appears, it is doing work (CTA, eyebrow, active state, data callout). Never use marine for decoration, never for backgrounds, never for large fills.

### Secondary — (omitted)
The project deliberately has no secondary palette. Adding a third hue would dilute the marine/navy commitment.

### Tertiary — (omitted)
Same.

### Neutral — Navy
- **Navy 950 (#020617):** the case-study card surface — the darkest navy, used as a "premium display" surface.
- **Navy 900 (#0f172a):** the structural dark — section backgrounds for proof, CTA, and stats blocks; also the filled CTA button.
- **Navy 800 (#1e293b):** hover state for the filled CTA; secondary structural shade.
- **Navy 700 (#334155):** default nav-link text on light surfaces, body text on dark surfaces where 900 is too heavy.
- **Navy 600 (#475569):** secondary body copy on light surfaces — the "1-2 sentences under a headline" voice.
- **Navy 400–500:** captions, timestamps, supporting text on dark surfaces.
- **Navy 200–300:** hairlines, dividers, the input border at rest.
- **Navy 50–100:** subtle backgrounds — the hamburger button background, the active-nav hover state.
- **White:** the section surface, the header pill background, the CTA icon chip.

**The Background-Light Rule.** Light sections (white surface) carry editorial content. Dark sections (navy-900 surface) carry proof, statistics, and CTAs. There are no gradient backgrounds; alternation is a flat swap, mediated by an organic wave divider.

## Typography

**Display Font:** system sans (ui-sans-serif stack) — bold/black weights, tracking tightened to -0.04em.
**Body Font:** system sans — same family, regular weight, leading 1.6.
**Label/Mono Font:** system mono (ui-monospace stack) — used for tracking-wide uppercase labels (eyebrows, card metadata, timestamps).

**Character:** A confident system-sans voice at display weight, with a deliberate tracking-tight headline. Custom fonts from `assets/fonts/` are planned but not yet delivered — the project ships on the system stack in the meantime, and the design has been authored to read correctly on it.

### Hierarchy
- **Display (800, clamp to 7xl, leading 0.95, tracking -0.04em):** hero scene headlines — 3–4 word statements ("Setting course.", "Safe harbor, every time.") that own the first viewport.
- **Headline (700, 3xl–6xl responsive, leading 1.05, tracking -0.02em):** section H2s ("From the pilot to the port. Right now, today.").
- **Title (600, 2xl, leading 1.05, tracking tight):** card titles (case-study card heads, value-prop titles).
- **Body (400, base–lg, leading relaxed):** descriptive prose under headlines; max-width 32rem (about 65ch) to keep measure tight.
- **Label (mono 600, 0.625rem–0.75rem, tracking 0.2em, uppercase):** eyebrows, card metadata, "currently at sea" status, stat captions.

**The Two-Weights Rule.** Display and headline use weight + tracking to carry hierarchy; body and supporting copy use weight + size. Never use a third weight for the same role — variation comes from context, not from font weight piling on.

## Layout

A single max-width container (`max-w-7xl`, 1280px) with horizontal padding (`px-6 lg:px-8`) drives the entire site. Sections stack vertically with `py-24 lg:py-32` (96–128px top and bottom), creating a generous editorial rhythm. The hero is its own rhythm: `min-h-[640px] lg:min-h-[720px] xl:min-h-[800px]` with centered content, escaping the 7xl container for the video layer.

Stat blocks and case-study cards are 3-up grids at desktop, 1-up at mobile, with asymmetric internal padding (cards use `aspect-[4/5]` for portrait composition). Hero composition is the only place where layout breaks the symmetric grid: each of the 3 scenes declares its own composition (`left`, `center`, `right`) and its own display-style (italic-extralight, black, light-uppercase), so the carousel reads as three different editorial covers rather than one paragraph floating over three ambient clips.

## Elevation & Depth

A hybrid system: tonal layering is the default (white sections, navy sections, no shadow), but **soft, multi-stop shadows** are reserved for floating elements — the header pill, the case-study card on hover, the primary CTA. The shadow vocabulary is one tier of "soft floating" used for both at-rest and hover states, with intensity scaled by element importance.

### Shadow Vocabulary
- **Pill at rest** (`0 10px 40px -12px rgba(15,23,42,0.22), 0 2px 8px -2px rgba(15,23,42,0.06)`): the floating header, sitting over the hero.
- **Pill on scroll** (`0 8px 28px -12px rgba(15,23,42,0.18), 0 2px 6px -2px rgba(15,23,42,0.08)`): same shadow, slightly tighter — the user has scrolled.
- **Primary CTA at rest** (`shadow-2xl shadow-marine-950/50`): a darker, larger shadow that pairs the marine button with the navy ground.
- **Primary CTA on hover** (`shadow-2xl shadow-marine-500/40 + translate-y-0.5`): the button lifts and its shadow shifts from "in front of the surface" to "tinted by its own color" — a one-token micro-moment.

**The Floating-Pill Rule.** A pill (rounded-full container) is the only shape that ever gets a soft outer shadow. Cards are flat at rest; cards on hover get a small lift if at all. The pill is the floating element, not the card.

## Shapes

One form language, two radius tiers:
- **Pill (rounded-full, 9999px):** every interactive element (buttons, nav links, the header, the case-study card eyebrow chip, the hamburger). The pill is the shape of "action" in this system.
- **Card (rounded-sm, 4px):** the case-study card itself. Cards are nearly square — the tiny radius says "structural, not decorative" without going fully sharp.
- **Sheet (rounded-3xl, 24px):** the mobile menu sheet beneath the pill, the case-study illustration's clipping frame. The half-pill is for surfaces that hang in space.

There are no colored borders except the `border-black/5` 1px hairline on the header pill and the case-study card's `border-marine-400/30` accent on the eyebrow. There is no rounded-md (6–8px) middle ground — the system commits to either pill or near-sharp.

## Components

### Buttons
- **Shape:** pill (rounded-full). Every interactive element, no exceptions.
- **Primary (Filled):** `bg-navy-900 text-white px-4 py-2` (header) or `bg-marine-500 text-white pl-7 pr-5 py-4` (hero CTA, with a circular arrow icon chip in `bg-white/15`). Hover: darken by one step (`bg-navy-800` / `bg-marine-400`).
- **Ghost:** transparent, `text-navy-900 px-4 py-2`. Hover: `bg-navy-50`. Used for the header's "Client portal" and the case-study card's "Read case →" link.
- **Icon chip:** a circular `h-7 w-7 rounded-full bg-white/15` element on the marine CTA, host of the trailing icon.

### Chips / Eyebrows
- **Hero status pill:** `bg-marine-950/60 border border-marine-400/30 text-marine-300 px-3 py-1` with a 6px pulsing marine-400 dot — reads as a "live instrument" indicator.
- **Section eyebrow:** `text-sm font-semibold tracking-[0.2em] uppercase text-marine-600` — a label that sits above a section H2, with a small horizontal mark (`w-6 h-px bg-marine-400`) preceding it on case-study cards.
- **Stat caption:** `text-sm font-semibold uppercase tracking-wider text-white` with `text-marine-400` on the figure above.

### Cards / Containers
- **Case-study card:** `rounded-sm bg-navy-950 text-white aspect-[4/5]`, with a bespoke SVG illustration (vessel at sea, port cranes with dock, compass rose) as the visual anchor. The illustration is its own composition, not a stock photo. Cards are flat at rest; the section they're in is a structural white surface, so the navy card pops.
- **Section surface:** `bg-white text-navy-900` or `bg-navy-900 text-white`. No shadows. No borders. Just color.

### Inputs / Fields
The contact form is not yet implemented. When it ships: `border-navy-200 bg-white rounded-full px-4 py-3 text-base text-navy-900 placeholder:text-navy-400 focus:border-marine-500 focus:ring-2 focus:ring-marine-500/20`. Inputs are pills, not rectangles, to match the header.

### Navigation
- **Pill capsule (`max-w-7xl mx-auto`):** white `bg-white/95` with `backdrop-blur-xl`, `rounded-full`, top-4 to top-6 offset, scroll-tightening shadow. Contains: brand logo (left) + 7 inline nav links (center) + ghost "Client portal" + filled "Get a quote" (right).
- **Nav links:** `text-[13px] font-medium text-navy-700`, hover `text-navy-900 bg-navy-50`, active `text-navy-900` (color only, no dot, no underline). No background, no border, no chip — the link is the affordance.
- **Mobile (<768px):** the inline nav hides; a `h-9 w-9 rounded-full bg-navy-50` hamburger appears at the right of the pill. Tapping it drops a `rounded-3xl` sheet beneath the pill carrying the same 7 items stacked.

### Signature — Wavy Divider (`SectionDivider`)
- Four hand-drawn SVG paths (`coast`, `deep`, `ripple`, `rugged`), each a cubic-Bezier silhouette with varying amplitude and occasional sharper bends — not a perfect sine. ViewBox is 1200×N; the path scales responsively with `preserveAspectRatio="none"`.
- Each transition picks a `type` and `fromColor`/`toColor` to bridge the two surfaces. The divider is the moment of section break, not decoration before/after it.
- Default height 120px; flipped via `transform: scaleY(-1)` for the rare top-down break.

### Signature — Hero Scene Composition
- The hero is a 3-scene carousel with auto-advance on `onEnded`. Crossfade is 1.0s, in-lockstep between video and per-scene typography.
- Each scene declares its own eyebrow, two-line headline, body, CTA, and `composition` (`left` / `center` / `right`). The headline style shifts per composition: italic-extralight, black, or light-uppercase. The same brand at three angles.

## Do's and Don'ts

### Do:
- **Do** use marine-500 for the single primary action on any given surface. Its rarity is the point.
- **Do** alternate white and navy-900 sections, bridged by an organic wave divider.
- **Do** carry hierarchy through weight + tracking on display, weight + size on body.
- **Do** size display headlines to `clamp(text-4xl, 7vw, text-7xl)` so they own the viewport at every breakpoint.
- **Do** let the floating pill carry its scroll-tightening shadow — the shadow shifting is the only "scroll" the header performs.
- **Do** author bespoke illustrations for case studies. Stock photography is not a default.

### Don't:
- **Don't** introduce a third palette. The marine + navy commitment is binding.
- **Don't** add a kicker or eyebrow above a section H2 unless the section's role demands it (the "live status" pill in the hero earns it; section eyebrows earn it because they carry the section's topic; decoration does not).
- **Don't** use straight horizontal section dividers. Always one of the four wave types, never a hard line.
- **Don't** use a flat-pill (8px radius) middle ground. Pills are pills; cards are nearly square.
- **Don't** use stock photography for case studies, hero scenes, or anywhere else. Bespoke SVG illustration, real video, or honest absence — never a placeholder image of a ship.
- **Don't** use emoji, unicode glyphs, or stock icon fonts as decoration. Icons come from Lucide, drawn in one consistent stroke (2.25–2.5).
- **Don't** use gradient text, colored borders thicker than 1px on cards, or hard offset block shadows. The shadow system is soft, multi-stop, reserved for floating pills.
- **Don't** write copy without provenance. Where a number is on screen, anchor it to where it comes from.
