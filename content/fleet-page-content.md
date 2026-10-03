# Fleet Page — Design & Content Strategy

## 1. Design Philosophy & Visual Language

**Core Objective:** Convey stability, trust, and premium maritime expertise.

- **Theme Strategy:** Black-and-white alternating sections as per project guidelines.
- **Organic Transitions:** Sections must transition using bold, organic, irregular wavy dividers (not generic sine waves) to emulate coastlines or fluid contours.
- **Typography & Spacing:** Use liberal whitespace to emphasize a "premium" feel. Typography should be clean, leveraging custom fonts from `assets/fonts/` for headings to establish brand identity.
- **Color Accent:** Use deep forest green (#1D5C3A) and marine navy blue sparingly as accent colors for buttons, subtle section dividers, or active states to maintain professionalism while adding depth.
- **Icons:** Avoid generic icon sets. Use sleek, thin-stroke monolinear icons for UI elements. For vessel silhouettes, use custom-rendered SVG files to ensure a premium, bespoke look, avoiding off-the-shelf clipart.

---

## 2. Page Structure & Content Implementation

### Section 1: Hero (Black/Dark Background)
*Design Focus: Immersive entry.*
- **Content:**
    - **Page Title:** Our Fleet
    - **Tagline:** Powering Global Trade Across Every Sea
    - **Description:** Our fleet consists of modern and well-maintained vessels operated with a strong focus on safety, efficiency, reliability, and environmental responsibility. We provide skilled and certified crew for a diverse range of vessel types, ensuring every ship we man meets the highest international maritime standards.
- **Visuals:** High-quality, cinematic imagery of maritime operations or vessel silhouettes against a dark, textured background.

### Section 2: Fleet Grid (White/Light Background)
*Design Focus: Clarity through structure.*
- **Content:** Display cards for 6 vessel types (Grid: 2x3).
- **Interactive Component:** On hover, cards should subtly lift (depth effect) and reveal slightly more detailed specs.

| Vessel Type | Full Name | Description |
|---|---|---|
| Cruise Ship | Cruise Ship / Passenger Vessel | Luxury passenger vessels requiring full hotel, deck, and engine crew |
| Container Vessel | Container Vessel | Transportation of containerized cargo across global trade routes |
| Bulk Carrier | Bulk Carrier | Transportation of dry bulk cargo including grain, coal, and ore |
| Oil Tanker | Oil Tanker / Chemical Tanker | Safe transportation of liquid cargo including crude oil and chemicals |
| Offshore Vessel | Offshore Vessel / Platform Supply Vessel | Support for offshore oil & gas operations and platform supply logistics |
| RO-RO | RO-RO Vessels | Roll-on/Roll-off vessels for efficient vehicle and wheeled cargo transport |

### Section 3: Commitment (Black/Dark Background)
*Design Focus: Trust and Authority.*
- **Header:** Built on Safety. Driven by Excellence.
- **Content:** Professional prose highlighting Marevita's standards:
    - Strict compliance with STCW and IMO regulations
    - Thorough vetting and certification of all seafarers
    - Rapid crew mobilization for all vessel types
    - Continuous crew welfare and professional development support

### Section 4: Stats Banner (White/Light Background)
*Design Focus: Minimalist data presentation.*
- **Callouts:**
    - **6** Vessel Types Crewed
    - **Global** Trade Routes
    - **100%** Certified & Compliant
    - **IMO** Standard Operations

### Section 5: CTA (Black/Dark Background)
*Design Focus: Final conversion.*
- **Heading:** Looking for Crew for Your Vessel?
- **Body:** Whether you operate container ships or cruise liners — Marevita Marine has the right professionals.
- **Action:** Primary CTA Button: "Get in Touch" (Marine Navy Blue accent).

---

## 3. UX & Accessibility Checks

- **Responsive Behavior:** 
    - Divider silhouette must remain scale-appropriate on mobile to avoid distorting the organic look.
    - Fleet grid collapses from 3x2 to 1x6 smoothly, ensuring touch targets for cards are adequately spaced for mobile.
- **Performance:** Ensure vessel silhouette SVGs are optimized for rapid loading.
- **Accessibility:** Ensure high contrast ratios for text on both the dark hero/footer sections and light content sections.
