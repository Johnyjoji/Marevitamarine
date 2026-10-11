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
 * useViewportHeight — tracks window.innerHeight for layout math.
 */
function useViewportHeight() {
  const [vh, setVh] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return vh;
}

/**
 * StackedCardSection
 * ------------------
 * Deck-of-cards scroll stacking where every section's full content is
 * reachable — even when taller than the viewport.
 *
 *   1. Sticky window is always exactly one viewport tall (overflow hidden).
 *      The inner content is the section's natural height and translates up
 *      as the user scrolls, so every line passes through the sticky window.
 *
 *   2. Container height = contentHeight + 100vh (content scroll + release).
 *      During the last 100vh the card scales/dims while the next card's
 *      sticky slides up from the bottom.
 *
 *   3. Non-first cards use marginTop: -100vh so their sticky overlaps the
 *      previous card's release zone — the visible deck-of-cards handoff.
 *
 *   4. Z-index increases per card so the incoming card paints on top.
 *
 * Transforms live on the inner motion.div, never on the sticky element
 * (transform on sticky creates a containing block and breaks pinning).
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
  const vh = useViewportHeight();
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const [contentHeight, setContentHeight] = useState(0);

  // Measure the content's natural height. offsetHeight/scrollHeight report
  // the full box even when a sticky ancestor clips with overflow:hidden.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      if (!contentRef.current) return;
      const h = Math.max(
        contentRef.current.scrollHeight,
        contentRef.current.offsetHeight
      );
      if (h > 0) {
        setContentHeight((prev) => (Math.abs(prev - h) > 0.5 ? h : prev));
      }
    };

    measure();

    let rafId = null;
    const schedule = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        measure();
      });
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    // Images / fonts can change height after first paint.
    el.querySelectorAll?.('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', schedule, { once: true });
    });
    window.addEventListener('resize', schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Direct progress for content scrubbing (1:1 with scroll — reading content
  // should not lag). Spring only on the release polish transforms.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
    restDelta: 0.001,
  });

  const releaseZone = vh;
  // Layout height is at least one viewport so short cards still get a full
  // pin + release cycle.
  const layoutHeight = Math.max(contentHeight || vh, vh);
  const containerHeight = isLast ? layoutHeight : layoutHeight + releaseZone;

  // Derived scroll geometry. Kept in refs so useTransform function
  // callbacks always read the latest measured values (array-range
  // useTransform can stale-close over the pre-measure 0-height state).
  const geometryRef = useRef({
    layoutHeight,
    containerHeight,
    contentHeight: contentHeight || 0,
    releaseZone,
    isLast,
    targetScale,
  });
  geometryRef.current = {
    layoutHeight,
    containerHeight,
    contentHeight: contentHeight || 0,
    releaseZone,
    isLast,
    targetScale,
  };

  // Content scrub: translate 1:1 with scroll so every line is readable.
  const contentY = useTransform(scrollYProgress, (p) => {
    const g = geometryRef.current;
    const scrollable = Math.max(0, g.contentHeight - g.releaseZone);
    if (scrollable <= 0 || g.containerHeight <= 0) return 0;
    const contentScrollEnd = scrollable / g.containerHeight;
    const t = Math.min(1, Math.max(0, p / Math.max(contentScrollEnd, 0.0001)));
    return -scrollable * t;
  });

  // Release polish: scale / dim / round during the last 100vh of pin.
  const scale = useTransform(smoothProgress, (p) => {
    const g = geometryRef.current;
    if (g.isLast || g.containerHeight <= 0) return 1;
    const start = Math.max(0, (g.layoutHeight - g.releaseZone) / g.containerHeight);
    const end = Math.min(1, g.layoutHeight / g.containerHeight);
    if (end <= start) return 1;
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
    return 1 + (g.targetScale - 1) * t;
  });
  const opacity = useTransform(smoothProgress, (p) => {
    const g = geometryRef.current;
    if (g.isLast || g.containerHeight <= 0) return 1;
    const start = Math.max(0, (g.layoutHeight - g.releaseZone) / g.containerHeight);
    const end = Math.min(1, g.layoutHeight / g.containerHeight);
    if (end <= start) return 1;
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
    if (t < 0.5) return 1 + (0.92 - 1) * (t / 0.5);
    return 0.92 + (0.7 - 0.92) * ((t - 0.5) / 0.5);
  });
  const brightness = useTransform(smoothProgress, (p) => {
    const g = geometryRef.current;
    if (g.isLast || g.containerHeight <= 0) return 1;
    const start = Math.max(0, (g.layoutHeight - g.releaseZone) / g.containerHeight);
    const end = Math.min(1, g.layoutHeight / g.containerHeight);
    if (end <= start) return 1;
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
    return 1 + (0.78 - 1) * t;
  });
  const borderRadius = useTransform(smoothProgress, (p) => {
    const g = geometryRef.current;
    if (g.isLast || g.containerHeight <= 0) return '0px';
    const start = Math.max(0, (g.layoutHeight - g.releaseZone) / g.containerHeight);
    const end = Math.min(1, g.layoutHeight / g.containerHeight);
    if (end <= start) return '0px';
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
    if (t < 0.1) {
      const u = t / 0.1;
      return `${20 * u}px`;
    }
    const u = (t - 0.1) / 0.9;
    return `${20 + (32 - 20) * u}px`;
  });
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  if (isReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: `${containerHeight}px`,
        // Pull each non-first card up so its sticky overlaps the previous
        // card's release zone (deck-of-cards handoff).
        marginTop: isFirst ? 0 : `-${releaseZone}px`,
        zIndex: (index + 1) * 10,
      }}
    >
      <div
        className={`sticky top-0 w-full overflow-hidden ${cardClassName}`}
        style={{ height: `${releaseZone}px` }}
      >
        <motion.div
          ref={contentRef}
          style={{
            y: contentY,
            scale,
            opacity,
            filter,
            borderRadius,
            transformOrigin: 'top center',
            width: '100%',
            // Natural content height; falls back to auto until measured.
            minHeight: contentHeight ? undefined : '100%',
            height: contentHeight ? `${contentHeight}px` : 'auto',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
