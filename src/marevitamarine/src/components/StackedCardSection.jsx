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
 * Creates a physical layer/card stacking scroll interaction.
 * As the user scrolls down, this section stays sticky while scaling down,
 * dimming slightly, and letting the subsequent card stack cleanly on top of it.
 *
 * Props:
 * - index: number (0-based index of section in stack)
 * - total: number (total count of sections)
 * - targetScale: number (how much to scale down as next card covers it, default 0.92)
 * - cardClassName: string (additional styling for the inner card element)
 * - className: string (additional styling for the outer wrapper)
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

  // Track scroll progress of this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Physics-based smooth spring interpolation for continuous, fluid scroll reactivity
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Calculate scaling, opacity, and brightness transforms as the next card stacks over this one
  const scale = useTransform(smoothProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.95, 0.78]);
  const brightness = useTransform(smoothProgress, [0, 1], [1, 0.84]);
  const borderRadius = useTransform(smoothProgress, [0, 0.4, 1], ['0px', '20px', '32px']);
  const yOffset = useTransform(smoothProgress, [0, 1], ['0px', '-12px']);

  // Compose brightness filter string
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const isLast = index === total - 1;

  // Fallback for reduced motion preference
  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isLast ? 'min-h-screen' : 'min-h-[130vh] sm:min-h-[140vh] lg:min-h-[145vh]'} ${className}`}
      style={{ zIndex: (index + 1) * 10 }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden">
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
                }
          }
          className={`w-full min-h-screen flex flex-col justify-center relative transition-shadow duration-300 ${cardClassName}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedCardSection;
