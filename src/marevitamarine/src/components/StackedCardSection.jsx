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
 * Renders a section that physically stacks over the next section as the user
 * scrolls. The current card stays pinned at the top of the viewport while
 * scaling down, dimming, and rounding its corners. The next section is
 * rendered as a separate sibling with a higher z-index, so it slides up and
 * visually covers the card beneath it — like a deck of cards.
 *
 * IMPORTANT: The outer wrapper has NO overflow constraints and NO
 * transform/filter/will-change on itself; only the inner `motion.div`
 * has transforms, so sticky positioning behaves predictably.
 */
export function StackedCardSection({
  children,
  index = 0,
  total = 1,
  targetScale = 0.88,
  cardClassName = '',
  className = '',
}) {
  const containerRef = useRef(null);
  const isReducedMotion = useReducedMotion();

  // Track scroll progress of this section's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth the scroll progress with a spring for organic, physics feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
    restDelta: 0.001,
  });

  const isLast = index === total - 1;

  // Transforms applied to the current card
  const scale = useTransform(smoothProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.95, 0.7]);
  const brightness = useTransform(smoothProgress, [0, 1], [1, 0.78]);
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.2, 1],
    ['0px', '24px', '40px']
  );
  const yOffset = useTransform(smoothProgress, [0, 1], ['0px', '24px']);

  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  if (isReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isLast ? 'h-screen' : 'h-[160vh]'} ${className}`}
      style={{ zIndex: (index + 1) * 10 }}
    >
      <motion.div
        style={
          isLast
            ? {}
            : {
                scale,
                opacity,
                filter,
                borderRadius,
                y: yOffset,
                transformOrigin: 'top center',
              }
        }
        className={`sticky top-0 h-screen w-full overflow-hidden transition-shadow duration-300 ${cardClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default StackedCardSection;
