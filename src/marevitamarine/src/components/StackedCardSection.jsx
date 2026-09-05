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
 *   2. Cards stack vertically: each container starts where the previous
 *      one ended (no negative margin). During the last `100vh` of a
 *      container, the next card's sticky slides up from the bottom of
 *      the viewport into view — that's the deck-of-cards transition.
 *      The previous card plays a release animation (scale, opacity,
 *      border-radius, brightness) during that same window.
 *
 *   3. Z-index increases per card so the new card paints on top once
 *      the two stickies meet at the top of the viewport.
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
  //
  // The container is contentHeight + 100vh tall. Of that, the first
  // (contentHeight - 100vh) / containerHeight portion of scrollYProgress
  // is the "content scroll" — during it, we translate the content up
  // inside the sticky so the user can read every line. The last
  // 100vh / containerHeight portion is the "release" — the content sits
  // at its bottom position, and we apply scale/opacity/border-radius to
  // shrink the card while the next card slides up from below.
  //
  // These hooks MUST run on every render in the same order — including
  // before the content height is known — so the hook order stays stable
  // through the measurement → sticky layout transition.
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const releaseZone = vh;
  const hasMeasured = contentHeight > 0;
  const containerHeight = hasMeasured ? contentHeight + releaseZone : releaseZone;
  // Progress at which the content has finished scrolling and the release begins.
  // For contentHeight <= 100vh, this clamps to 0 and the content never translates.
  const contentScrollEnd = Math.max(
    0,
    Math.min(1, (contentHeight - releaseZone) / containerHeight)
  );
  // Distance the content translates up. 0 when contentHeight <= 100vh.
  const contentTranslate = -(Math.max(0, contentHeight - releaseZone));
  // Release range: the last 100vh of the container.
  const releaseStart = contentHeight / containerHeight;

  const contentY = useTransform(
    smoothProgress,
    [0, contentScrollEnd],
    [0, contentTranslate],
    { clamp: true }
  );
  // Scale the card down to targetScale during the release.
  const scale = useTransform(smoothProgress, [releaseStart, 1], [1, targetScale], {
    clamp: true,
  });
  const opacity = useTransform(
    smoothProgress,
    [releaseStart, releaseStart + 0.6, 1],
    [1, 0.92, 0.7],
    { clamp: true }
  );
  const brightness = useTransform(
    smoothProgress,
    [releaseStart, 1],
    [1, 0.78],
    { clamp: true }
  );
  const borderRadius = useTransform(
    smoothProgress,
    [releaseStart, releaseStart + 0.1, 1],
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
  // During the first (contentHeight - 100vh) pixels of container scroll,
  // the content translates from translateY(0) to translateY(-(contentHeight
  // - 100vh)), exposing the bottom of the content. During the last 100vh
  // pixels, the content stays at its bottom position and we apply the
  // release animation (scale, opacity, border-radius, brightness) so the
  // card shrinks while the next card slides up from below.
  //
  // No negative margin: cards stack vertically, each container starts
  // right after the previous one ends. The next card's sticky naturally
  // slides up from the bottom of the viewport during the release.

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: `${containerHeight}px`,
        zIndex: (index + 1) * 10,
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
