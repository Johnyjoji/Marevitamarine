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
 * A section that scrolls like a deck-of-cards transition, with all of its
 * content reachable by the user. The effect is created by:
 *
 *   1. The container is `contentHeight + 100vh` tall. The OUTER sticky
 *      element is exactly `100vh` tall (one viewport) and pins to the
 *      top of the viewport. The INNER element is the full `contentHeight`
 *      tall and is translated up as the user scrolls, so every line of
 *      the section passes through the sticky window — the user can read
 *      all of the content.
 *
 *   2. Cards stack on top of each other (deck-of-cards): every container
 *      after the first pulls itself UP by `100vh` with a negative margin.
 *      That overlap is what makes the next card's sticky slide up from
 *      the bottom of the viewport into the current card's release zone.
 *      The current card plays a release animation (scale, opacity,
 *      border-radius, brightness) during that same window, so the user
 *      sees a true deck-of-cards transition.
 *
 *   3. Z-index DECREASES per card: earlier cards paint on top. This way
 *      during a card's release, the releasing card is on top (its
 *      scale/opacity animation is visible), and the next card is behind,
 *      sliding up. After the release, the current card un-pins and the
 *      next card takes over the viewport top.
 *
 * The transforms (translate, scale, opacity, border-radius, filter) live
 * on the inner motion.div, NOT on the sticky element. Putting `transform`
 * on the same element as `position: sticky` would create a new containing
 * block and break sticky behavior — so we keep them on separate layers.
 *
 * Why two phases? We need the content's natural height to lay out the
 * sticky (container height, translate distance, release timing all
 * depend on it), but the content can only be measured after a real
 * render. Solution: render the children once in a hidden, in-flow
 * measurement div BEFORE committing to the sticky layout. Once we know
 * the natural content height, the sticky render uses that height.
 *
 * Last card: the last section in the stack has no next card to slide up
 * over it, so we skip the release animation and the negative margin. It
 * just pins for its content and then un-pins, like a normal section.
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
  const isFirst = index === 0;
  const isLast = index === total - 1;

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
  // 'end start' means: progress = 1 when container bottom hits viewport top,
  // which is one full containerHeight past progress 0.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth the scroll progress with a spring for an organic, physics feel.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Transforms applied to the inner element as the user scrolls.
  //
  // Container = contentHeight + 100vh. Sticky pins from 0 to contentHeight
  // (the first `contentHeight` pixels of scroll). Within that pinned range:
  //   - First (contentHeight - 100vh) pixels: content translates from 0 to
  //     -(contentHeight - 100vh), so every line of the content passes
  //     through the sticky window.
  //   - Last 100vh pixels: content sits at its bottom position while the
  //     release animation plays (scale, opacity, border-radius, brightness).
  //
  // For the last card we collapse the release range to [1, 1] so the
  // transforms stay at their initial values — there's no next card to
  // hand off to, so no scale/opacity change is wanted.
  //
  // These hooks MUST run on every render in the same order — including
  // before the content height is known — so the hook order stays stable
  // through the measurement → sticky layout transition.
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const releaseZone = vh;
  const hasMeasured = contentHeight > 0;
  const containerHeight = hasMeasured ? contentHeight + releaseZone : releaseZone;
  // Fraction of scroll for the content-scroll phase (the first
  // (contentHeight - 100vh) of the container). Clamped to [0, 1].
  const contentScrollEnd = Math.max(
    0,
    Math.min(1, (contentHeight - releaseZone) / containerHeight)
  );
  // Distance the content translates up. 0 when contentHeight <= 100vh.
  const contentTranslate = -(Math.max(0, contentHeight - releaseZone));
  // Release range — the LAST 100vh of the sticky pinning (not the last
  // 100vh of the container, which would be after the sticky un-pinned and
  // invisible). For the last card, collapse to [1, 1] (no release).
  const releaseStart = isLast
    ? 1
    : Math.max(0, (contentHeight - releaseZone) / containerHeight);
  const releaseEnd = isLast ? 1 : Math.min(1, contentHeight / containerHeight);
  // Mid-point of the release range, for the opacity animation curve.
  const releaseMid = (releaseStart + releaseEnd) / 2;

  const contentY = useTransform(
    smoothProgress,
    [0, contentScrollEnd],
    [0, contentTranslate],
    { clamp: true }
  );
  // Scale the card down to targetScale during the release.
  const scale = useTransform(
    smoothProgress,
    [releaseStart, releaseEnd],
    [1, targetScale],
    { clamp: true }
  );
  const opacity = useTransform(
    smoothProgress,
    [releaseStart, releaseMid, releaseEnd],
    [1, 0.92, 0.7],
    { clamp: true }
  );
  const brightness = useTransform(
    smoothProgress,
    [releaseStart, releaseEnd],
    [1, 0.78],
    { clamp: true }
  );
  const borderRadius = useTransform(
    smoothProgress,
    [releaseStart, releaseStart + 0.05, releaseEnd],
    ['0px', '20px', '32px'],
    { clamp: true }
  );
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  // Reduced motion: render a normal, non-stacking section. Content height
  // flows naturally so the user still scrolls through everything.
  if (isReducedMotion) {
    return <section className={className}>{children}</section>;
  }

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

  // Phase 2: real sticky layout. The container is contentHeight + 100vh
  // tall. The sticky is exactly 100vh tall with overflow:hidden, so the
  // content (which is contentHeight tall) overflows the sticky and we
  // translate it up as the user scrolls to reveal every line.
  //
  // Each card after the first has marginTop: -100vh, so its container
  // starts 100vh before the previous card's container ends. That overlap
  // is what makes the next card's sticky slide up from the bottom of
  // the viewport during the current card's release — the deck-of-cards
  // transition. Z-index decreases per card so the releasing card paints
  // on top.

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: `${containerHeight}px`,
        // Negative margin on every non-first, non-last card so the next
        // card overlaps the previous one by 100vh. The last card skips
        // the margin (nothing to overlap with).
        marginTop: isFirst || isLast ? 0 : `-${releaseZone}px`,
        // Z-index decreases per card. During a card's release, the
        // releasing card has the higher z-index of the two visible
        // cards, so its scale/opacity animation is on top.
        zIndex: 100 - index * 10,
      }}
    >
      {/* Outer sticky element — 100vh tall, overflow hidden, NO transforms
          on this element so sticky works. The content overflows below and
          is pulled up by the inner motion.div. */}
      <div
        className={`sticky top-0 w-full overflow-hidden ${cardClassName}`}
        style={{ height: `${releaseZone}px` }}
      >
        {/* Inner element receives the transforms. transformOrigin: top center
            keeps the top edge of the card visually pinned while the rest
            scales during the release. The motion.div is contentHeight tall
            — taller than the sticky — so the content can scroll up through
            the sticky window as the user scrolls the page. */}
        <motion.div
          style={{
            y: contentY,
            scale,
            opacity,
            filter,
            borderRadius,
            transformOrigin: 'top center',
            height: `${contentHeight}px`,
            width: '100%',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
