import { useRef, useState, useEffect } from 'react';
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
 *   1. The container is 200vh tall. The OUTER sticky element pins to the top
 *      of the viewport for the first 100vh of the container's scroll, then
 *      releases. That gives us 100vh of "overlap zone" per card.
 *
 *   2. Every container after the first pulls itself UP by 100vh with a
 *      negative margin, so the next card's container starts at the same Y
 *      as the previous card's top. The sticky inside the new container
 *      pins to top:0 immediately, covering the previous card.
 *
 *   3. Z-index increases per card, so later cards always paint on top.
 *
 * The transform (scale/opacity/border-radius/filter) lives on a child of the
 * sticky element. Putting `transform` on the same element as `position: sticky`
 * would create a new containing block and break sticky behavior — so we
 * keep them on separate layers.
 *
 * Why per-container useScroll (not page scroll)? Because each container
 * owns its own 200vh range, the progress curve (0 at container start, 1 at
 * container end) is the natural fit.
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
  const isReducedMotion = useReducedMotion();

  // Track scroll progress of this section's container.
  // The 'end start' means: progress = 1 when container bottom hits viewport top,
  // which lines up with when the sticky element is about to release.
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

  const isLast = index === total - 1;

  // Transforms applied to the inner element as the user scrolls.
  // We only apply transforms while the sticky is actually pinned (the first
  // ~0.5 of progress), so the card finishes shrinking by the time the next
  // card has fully covered it.
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

  if (isReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    // 200vh container gives the sticky 100vh of pinned scroll.
    // The negative top margin on all but the first container makes the next
    // card overlap the previous one, creating the deck-of-cards effect.
    <div
      ref={containerRef}
      className={`relative h-[200vh] ${className}`}
      style={{
        zIndex: (index + 1) * 10,
        marginTop: index === 0 ? 0 : '-100vh',
      }}
    >
      {/* Outer sticky element — NO transforms on this element so sticky works */}
      <div
        className={`sticky top-0 h-screen w-full overflow-hidden ${cardClassName}`}
      >
        {/* Inner element receives the transforms. transformOrigin: top center
            keeps the top edge of the card visually pinned while the rest scales. */}
        <motion.div
          style={
            isLast
              ? { height: '100%', width: '100%' }
              : {
                  scale,
                  opacity,
                  filter,
                  borderRadius,
                  transformOrigin: 'top center',
                  height: '100%',
                  width: '100%',
                }
          }
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
