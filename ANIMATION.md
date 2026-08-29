# Animation Guidelines

## Animation Libraries

This project uses two animation libraries:

### Motion.dev

Use Motion.dev for:

* Component enter and exit animations
* Navbar animations
* Menus and dropdowns
* Hover and tap interactions
* Cards and buttons
* Layout transitions
* Page transitions
* Simple viewport reveal animations
* React state-driven animations


### GSAP

Use GSAP only when Motion.dev would make the implementation unnecessarily complex.

Use GSAP for:

* Complex scroll storytelling
* ScrollTrigger sequences
* Pinned sections
* Multi-step timeline animations
* Complex coordinated hero animations
* Advanced horizontal scrolling
* Complex SVG animation

## Animation Principles

Animations should feel:

* Smooth
* Premium
* Intentional
* Responsive

Avoid:

* Animating every element
* Long delays
* Random animations
* Excessive fade-ins
* Excessive scale effects
* Animations that block user interaction

## Timing

Use these general guidelines:

* Micro interactions: 150ms–250ms
* Standard UI transitions: 250ms–400ms
* Section reveals: 400ms–700ms
* Complex sequences: only when necessary

## Performance

Prioritize animating:

* transform
* opacity

Avoid animating expensive layout properties such as:

* width
* height
* top
* left

unless necessary.

Respect `prefers-reduced-motion`.

Clean up all GSAP animations correctly when React components unmount.

## Scroll Animations

Do not add scroll animations automatically to every section.

Use scroll animation only when it improves storytelling or visual hierarchy.

For simple elements entering the viewport:

Use Motion.dev.

For scroll-linked or complex pinned sequences:

Use GSAP when appropriate.

Always consider mobile performance.

## Before Adding Animation

First analyze:

1. What is the purpose of this animation?
2. Does it improve user experience?
3. Which library is most appropriate?
4. Can the same result be achieved more simply?
5. Will it perform well on mobile?

Do not mix GSAP and Motion.dev on the same element unless absolutely necessary.
