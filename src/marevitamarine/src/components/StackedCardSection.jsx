import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Custom hook to detect if user prefers reduced motion
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
 * StackedCardSection Component
 * Implements physical card-stacking scroll animation.
 *
 * Each card stays pinned at `top-0` while the user scrolls through its height.
 * As the user scrolls down, the current card scales down (`scale: 1 -> 0.88`),
 * dims slightly (`brightness: 1 -> 0.78`), and rounds its top/side corners.
 * The next section (with higher z-index) slides directly up from below and stacks on top of it.
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

  // Physics-based spring interpolation for continuous, organic scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 25,
    mass: 0.2,
    restDelta: 0.001,
  });

  const isLast = index === total - 1;

  // Transforms applied to current card as next card stacks over it
  const scale = useTransform(smoothProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.92, 0.72]);
  const brightness = useTransform(smoothProgress, [0, 1], [1, 0.78]);
  const borderRadius = useTransform(smoothProgress, [0, 0.25, 1], ['0px', '24px', '40px']);
  const yOffset = useTransform(smoothProgress, [0, 1], ['0px', '24px']);

  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isLast ? 'min-h-screen' : 'min-h-[140vh] sm:min-h-[150vh]'} ${className}`}
      style={{ zIndex: (index + 1) * 10 }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col justify-start overflow-hidden">
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
          className={`w-full min-h-screen relative overflow-hidden transition-shadow duration-300 ${cardClassName}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
