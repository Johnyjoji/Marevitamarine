# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin, native CSS, no PostCSS). `react-router-dom` v7 for routing. `framer-motion` for animation. `lucide-react` for icons. Vanilla JavaScript, no TypeScript. Confirmed in `package.json` and `vite.config.js`.

## Users

Shipowners, charterers, and operators of commercial fleets who need a third-party ship-management partner, plus port-side procurement leads evaluating port agency services. Source: `CLAUDE.md` ("business website for Marevita Marine Private Ltd, a marine services company") and the 8-route surface (`/services`, `/fleet`, `/port agency`-adjacent copy in HeroVideoCarousel, `/contact`).

## Product Purpose

Establish Marevita Marine's commercial credibility and route qualified inquiries. The site is the company's primary online presence — its job is to convey trust, expertise, and premium service positioning, and to convert visitors into contact-form submissions. Success = a visitor understands what Marevita does, where it operates, and how to start a conversation. Source: `CLAUDE.md` ("business-critical website", "convey trust, expertise, and premium marine services").

## Positioning

A new-era marine services startup — ship management, crew management, port agency, technical services — built for accountability across the whole voyage: "from the pilot to the port", a single team owning technical, crew, and operational outcomes. Source: HeroVideoCarousel scene copy and Home page case-study cards; both use this framing.

## Operating Context

Commercial shipping context: vessels in transit, in port, at anchorage; clients operating on 24-hour time zones across flag states; port calls at terminals globally. The website must read as a serious B2B services partner, not a consumer travel brand. Source: scene copy in `HeroVideoCarousel.jsx`.

## Capabilities and Constraints

Confirmed in code:
- 8 routes: `/`, `/about`, `/services`, `/fleet`, `/safety`, `/careers`, `/news`, `/contact` (`App.jsx`)
- 3 hero scenes auto-cycling with crossfade (Departure, Open Sea, Arrival) — `HeroVideoCarousel.jsx`
- 4 case-study surfaces rendered as bespoke SVG illustrations (vessel, port, crew, compass) — `Home.jsx`
- Contact form intake is not yet wired (placeholder page)
- Email integration (EmailJS / Formspree / similar) noted in `CLAUDE.md` as planned, not implemented
- Mobile responsiveness required
- Performance and accessibility required
- The project is mid-build: 7 of 8 inner pages are placeholder stubs; the Home page is the only fully designed surface so far

Not yet confirmed (recorded as open):
- Real client list, real press mentions, real testimonials — `CLAUDE.md` warns these must not be fabricated
- Real photos / video — `CLAUDE.md` says design references and content samples are in `/references/` and `/content/`, both currently empty of images
- Form submission destination, CRM integration

## Brand Commitments

Binding from `CLAUDE.md`:
- Name: **Marevita Marine Private Ltd** (full legal), abbreviated **Marevita Marine** in product copy
- Voice: professional, premium, distinctive — explicitly NOT generic AI patterns
- Logo assets exist: `assets/logo.png` (favicon), `assets/logo-with-name.jpeg` (header / large displays) — both also in `public/`
- Visual rule: "black-and-white alternating section design" with bold, organic, irregular wavy dividers — `SectionDivider.jsx` already implements 4 distinct wave paths (coast / deep / ripple / rugged)
- Custom typography intended from `assets/fonts/` (folder currently empty — fonts not yet delivered)

Binding from design references the user has set on the current build:
- Header is a floating pill capsule (commitment made in the current session — etail.me reference screenshot)
- Header carries the actual `logo-with-name.jpeg`, not a typographic wordmark
- Hero is a 3-scene video carousel with crossfaded per-scene editorial typography

## Evidence on Hand

- Hero videos: 3 files in `public/herovideos/` (`hero-ship-video.mp4`, `harbor1.mp4`, `harbor2.mp4`)
- Logo JPEGs in both `assets/` and `public/`
- Design references folder is empty (declared in `CLAUDE.md`, not yet populated)
- Content samples: `content/RECOMMENDED-CONTENT-STRUCTURE.md`, `content/herovideos/`, `content/reference-sites/` — check before assuming structure
- New startup — no long operating history (copy updated to reflect this)
- No inflated fleet/country counts — copy updated to reflect startup positioning

The detector must not invent testimonials, customer logos, awards, certifications, real headcount, real revenue, or real press. Any vessel, country, or fleet figures shown in copy must be confirmed before launch.

## Product Principles

1. **Accountability, not capability list.** The site sells the relationship, not the menu. The hero's "from the pilot to the port" is the brand thesis; every surface should reinforce one accountable team across the voyage, not a directory of services.
2. **Premium B2B, never consumer-bright.** Color, type, and motion signal a serious services firm. The marine-cyan and navy palette is reserved for accents and structural darks — the surface itself stays editorial, not loud.
3. **Distinct, not generic.** The user has flagged "no AI-default patterns" as a binding constraint. Custom illustrations, custom dividers, custom type rhythm — every template-y reflex is wrong.
4. **Evidence-led, not claim-led.** Where a number is on screen, it is anchored to where it comes from. Don't strip provenance when tightening copy.

## Accessibility & Inclusion

Required by `CLAUDE.md` ("performance and accessibility should be considered"). No specific standard (WCAG level) has been committed; the project is a public commercial site so WCAG 2.1 AA is the implied target until the user upgrades the commitment. Keyboard navigation across the nav, focus states on the pill CTAs, and video alternatives (captions / transcripts) are flagged for later passes.
