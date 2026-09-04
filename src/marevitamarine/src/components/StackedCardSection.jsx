import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * useReducedMotion hook
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const listener = (e) => setReduced(e.matches);
    media.addEventListener?.('change', listener);
    return () => media.removeEventListener?.('change', listener);
  }, []);
  return reduced;
}

/**
 * StackedCardSection
 * ------------------
 * A section that physically stacks over the previous one as the user scrolls
 * (deck-of-cards). The effect is created by three things working together:
 *
 *   1. The container is `contentHeight + 100vh` tall. The OUTER sticky element
 *      pins to the top of the viewport while the user scrolls the first
 *      `contentHeight` of the container, then releases. That gives us 100vh of
 *      "overlap zone" per card.
 *
 *   2. Every container after the first pulls itself UP by `contentHeight` with
 *      a negative margin, so the next card's container starts at the same Y
 *      as the previous card's top. The sticky inside the new container pins to
 *      top:0 immediately, covering the previous card.
 *
 *   3. Z-index increases per card, so later cards always paint on top.
 *
 * The transform (scale/opacity/border-radius/filter) lives on a child of the
 * sticky element. Putting `transform` on the same element as `position: sticky`
 * would create a new containing block and break sticky behavior — so we
 * keep them on separate layers.
 *
 * Why dynamic height? The card's content may be taller than 100vh (dense
 * sections like the team grid, the services list, etc.). To let the user
 * scroll through ALL of the content for every section, the sticky card itself
 * grows to its content's natural height. Each card then pins for as long as
 * its content needs, before the 100vh release zone. Scroll distance per
 * section becomes variable — that's the price of "no content ever clipped."
 */
export function StackedCardSection({
  children,
  index = 0,
  total = 1,
  targetScale = 0.92,
  cardClassName = '',
  className = '',
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Measured height of the content (in px). Drives the container's height,
  // the negative margin on subsequent cards, and the sticky card's height.
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height. ResizeObserver picks up viewport changes, font
  // loads, image loads, etc. Initial measurement uses the rendered DOM via
  // getBoundingClientRect on first layout effect.
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const measure = () => {
      const h = contentRef.current.getBoundingClientRect().height;
      if (h > 0) setContentHeight(h);
    };
    measure();

    // Debounce to next frame so a burst of resize events (e.g. devtools
    // opening) only schedules one measurement.
    let rafId = null;
    const schedule = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        measure();
      });
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(contentRef.current);
    window.addEventListener('resize', schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Track scroll progress of this section's container.
  // The 'end start' means: progress = 1 when container bottom hits viewport top,
  // which lines up with the sticky element releasing after its full content.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth the scroll progress with a spring for an organic, physics feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Transforms applied to the inner element as the user scrolls.
  // We only apply transforms while the sticky is actually pinned — which is
  // the first (contentHeight / (contentHeight + 100vh)) fraction of the
  // container's scroll. We hard-map that to [0, 0.5] of scrollYProgress so
  // the card finishes shrinking by the time the next card has fully covered
  // it. The 100vh release zone occupies the upper half of scrollYProgress
  // (0.5 → 1) — the transform range below stays inside the pinned half.
  // The upper end of each transform is reached exactly at progress = 0.5
  // regardless of content height, so the visual feel is consistent.
  const scale = useTransform(smoothProgress, [0, 0.5], [1, targetScale], {
    clamp: true,
  });
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.5], [1, 0.92, 0.7], {
    clamp: true,
  });
  const brightness = useTransform(smoothProgress, [0, 0.5], [1, 0.78], {
    clamp: true,
  });
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.1, 0.5],
    ['0px', '20px', '32px'],
    { clamp: true }
  );

  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  // Reduced motion: render a normal, non-stacking section. Content height
  // flows naturally so the user still scrolls through everything.
  if (isReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  // While we haven't measured the content yet, render at minimum 100vh so
  // the first paint isn't broken. The useLayoutEffect above will sync the
  // real height before the next paint.
  const measuredHeight = contentHeight || 0;
  const releaseZone = 100; // vh units
  const containerHeight = measuredHeight
    ? `${measuredHeight + releaseZone * (typeof window !== 'undefined' ? window.innerHeight / 100 : 8)}px`
    : '200vh';
  const stickyHeight = measuredHeight ? `${measuredHeight}px` : '100vh';
  const negativeMargin = measuredHeight ? `-${measuredHeight}px` : '-100vh';

  return (
    // Container drives the scroll length. Negative top margin on all but the
    // first container makes the next card overlap the previous one, creating
    // the deck-of-cards effect.
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: containerHeight,
        zIndex: (index + 1) * 10,
        marginTop: index === 0 ? 0 : negativeMargin,
      }}
    >
      {/* Outer sticky element — NO transforms on this element so sticky works.
          Its height matches the content so the user can scroll through all
          of the content while it's pinned. */}
      <div
        className={`sticky top-0 w-full overflow-hidden ${cardClassName}`}
        style={{ height: stickyHeight }}
      >
        {/* Inner element receives the transforms. transformOrigin: top center
            keeps the top edge of the card visually pinned while the rest
            scales. The content ref lives on this element so ResizeObserver
            measures the actual rendered content (including padding,
            children, images, etc.). */}
        <motion.div
          ref={contentRef}
          style={{
            scale,
            opacity,
            filter,
            borderRadius,
            transformOrigin: 'top center',
            height: '100%',
            width: '100%',
          }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
