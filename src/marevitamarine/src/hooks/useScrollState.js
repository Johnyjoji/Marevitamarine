import { useEffect, useRef, useState } from 'react';

/**
 * useScrollState - Unified scroll tracking for direction and position
 * Single listener, no race conditions, smooth direction detection
 */
export function useScrollState({
  directionThreshold = 10,
  topThreshold = 10,
} = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState('up');
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Update position state
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY <= topThreshold);

      // Direction detection with hysteresis
      if (Math.abs(delta) >= 1) {
        accumulatedDelta.current += delta;

        if (Math.abs(accumulatedDelta.current) >= directionThreshold) {
          const newDirection = accumulatedDelta.current > 0 ? 'down' : 'up';
          setDirection(newDirection);
          accumulatedDelta.current = 0;
        }
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
    setScrollY(window.scrollY);
    setIsAtTop(window.scrollY <= topThreshold);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [directionThreshold, topThreshold]);

  return { scrollY, direction, isAtTop };
}

export default useScrollState;