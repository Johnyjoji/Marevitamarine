import { useEffect, useRef, useState } from 'react';

/**
 * useScrollDirection - Tracks scroll direction (up/down)
 * @param {Object} options
 * @param {number} options.threshold - Minimum scroll distance before direction change registers (default: 10)
 * @param {number} options.initialDirection - Initial direction assumption (default: 'up')
 * @returns {'up' | 'down'} Current scroll direction
 */
export function useScrollDirection({ threshold = 10, initialDirection = 'up' } = {}) {
  const [direction, setDirection] = useState(initialDirection);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      if (Math.abs(delta) < 1) {
        lastScrollY.current = currentScrollY;
        return;
      }

      accumulatedDelta.current += delta;

      if (Math.abs(accumulatedDelta.current) >= threshold) {
        if (accumulatedDelta.current > 0) {
          setDirection('down');
        } else {
          setDirection('up');
        }
        accumulatedDelta.current = 0;
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    // Initialize
    lastScrollY.current = window.scrollY;
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}

export default useScrollDirection;