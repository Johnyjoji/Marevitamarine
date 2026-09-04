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
 *
 * Why two phases? The container's negative margin (which depends on the
 * previous card's measured height) and the sticky element's height (which
 * depends on the current card's measured height) form a chicken-and-egg
 * problem: we need the content's natural height to lay out the sticky, but
 * the sticky position is what determines how the content gets measured.
 * Solution: render the children once in a hidden, in-flow measurement div
 * BEFORE committing to the sticky layout. Once we know the natural content
 * height, the sticky render uses that height to set the container, sticky,
 * and negative-margin values correctly.
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
  const measureRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Measured natural height of the content (in px). Starts at 0 (un-measured).
  // The first render uses the hidden measurement div to compute this; once
  // it's set, the real (sticky) layout renders.
  const [contentHeight, setContentHeight] = useState(0);

  // Phase 1: measure the content's natural height by rendering it offscreen
  // in a hidden, in-flow div. We then commit to the sticky layout.
  useLayoutEffect(() => {
    if (!measureRef.current) return;
    const measure = () => {
      // Guard: ref can be null if the observer fires during the
      // measurement → sticky render swap (we just unmounted the
      // measurement div by setting contentHeight).
      if (!measureRef.current) return;
      const h = measureRef.current.getBoundingClientRect().height;
      if (h > 0 && Math.abs(h - contentHeight) > 0.5) {
        setContentHeight(h);
      }
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
    ro.observe(measureRef.current);
    window.addEventListener('resize', schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
    // contentHeight intentionally omitted: we only want to re-measure on
    // content change, not in response to our own state update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track scroll progress of this section's container.
  // The 'end start' means: progress = 1 when container bottom hits viewport top,
  // which lines up with the sticky element releasing after its full content.
  // We only start measuring once the sticky layout has rendered (i.e.
  // contentHeight > 0); before that, the container is the placeholder height.
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
  // The release zone is the upper 100vh of the container, which corresponds
  // to the last (100vh / (contentHeight + 100vh)) of scrollYProgress. We
  // remap the transform to fire during that release zone so the card
  // finishes shrinking by the time the next card has fully covered it.
  // For simplicity and visual consistency, we use a 50% range of progress
  // (0 → 0.5) for all transforms regardless of content height — meaning
  // short cards animate over a longer fraction of their pin time than tall
  // cards. Acceptable for the visual feel; if a section's contentHeight
  // is much larger than 100vh, the transforms still complete in the last
  // 100vh of scroll, which is the intended deck effect.
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

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const releaseZone = vh; // 100vh in pixels
  const hasMeasured = contentHeight > 0;

  // Phase 1: render the content in a hidden, in-flow div to measure its
  // natural height. We use position: absolute off the top of the page with
  // a real width matching the parent, so the content lays out as it would
  // in the sticky parent. The cardClassName is intentionally omitted here
  // so we measure content height without the rounded-top border/shadow
  // affecting the height (it doesn't actually affect height, but keeping
  // the measurement minimal is cleaner). After the first useLayoutEffect
  // run, we re-render in the sticky layout below.
  if (!hasMeasured) {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div ref={measureRef}>{children}</div>
      </div>
    );
  }

  // Phase 2: real sticky layout. Container is contentHeight + 100vh; sticky
  // element is contentHeight tall; subsequent containers pull themselves up
  // by -contentHeight so the next card's top sits exactly at the previous
  // card's top.
  const containerHeight = contentHeight + releaseZone;
  const stickyHeight = contentHeight;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: `${containerHeight}px`,
        zIndex: (index + 1) * 10,
        marginTop: index === 0 ? 0 : `-${stickyHeight}px`,
      }}
    >
      {/* Outer sticky element — NO transforms on this element so sticky works.
          Its height matches the content so the user can scroll through all
          of the content while it's pinned. */}
      <div
        className={`sticky top-0 w-full overflow-hidden ${cardClassName}`}
        style={{ height: `${stickyHeight}px` }}
      >
        {/* Inner element receives the transforms. transformOrigin: top center
            keeps the top edge of the card visually pinned while the rest
            scales. */}
        <motion.div
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
