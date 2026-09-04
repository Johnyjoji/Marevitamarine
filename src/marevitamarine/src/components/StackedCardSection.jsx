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
 * scrolls. The sticky element stays pinned at the top of the viewport while
 * the inner element scales, dims, and rounds its corners. The next section
 * is a separate sibling with a higher z-index, so it slides up and visually
 * covers the card beneath it — like a deck of cards.
 *
 * IMPORTANT: We separate the sticky positioning from the transforms.
 * Applying `transform` to the same element as `position: sticky` makes
 * the element a containing block for itself, which can break sticky
 * behavior. So the OUTER element is sticky, and the INNER element
 * receives the transforms.
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

  // Transforms applied to the inner element as the user scrolls
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
                  y: yOffset,
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
