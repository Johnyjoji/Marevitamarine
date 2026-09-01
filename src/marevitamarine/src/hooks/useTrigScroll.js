import { useEffect, useRef, useState } from 'react';

/**
 * useTrigScroll - A custom hook for creating beautiful, organic scroll animations
 * using sine and cosine functions. Provides smooth, wave-like motion that feels
 * natural and premium.
 *
 * @param {Object} options
 * @param {number} options.speed - Base scroll speed multiplier (default: 1)
 * @param {number} options.amplitude - Base amplitude for wave motion (default: 1)
 * @param {number} options.frequency - Wave frequency (default: 1)
 * @param {number} options.phase - Initial phase offset in radians (default: 0)
 * @param {number} options.damping - Damping factor for spring-like return (default: 0)
 * @returns {Object} Scroll animation values and helpers
 */

export function useTrigScroll({
  speed = 1,
  amplitude = 1,
  frequency = 1,
  phase = 0,
  damping = 0,
} = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 1000
  );
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);

  // Calculate scroll progress (0 to 1) based on element position
  const getScrollProgress = (elementTop, elementHeight, offset = 0) => {
    const scrollTop = scrollY + offset;
    const elementBottom = elementTop + elementHeight;
    const start = elementTop - viewportHeight;
    const end = elementBottom;
    const progress = (scrollTop - start) / (end - start);
    return Math.max(0, Math.min(1, progress));
  };

  // Sine wave function - creates smooth oscillating motion
  const sineWave = (progress, { freq = frequency, amp = amplitude, ph = phase } = {}) => {
    return Math.sin(progress * Math.PI * 2 * freq + ph) * amp;
  };

  // Cosine wave function - phase-shifted sine for complementary motion
  const cosineWave = (progress, { freq = frequency, amp = amplitude, ph = phase } = {}) => {
    return Math.cos(progress * Math.PI * 2 * freq + ph) * amp;
  };

  // Organic wave with varying frequency - creates coastline-like motion
  const organicWave = (progress, { baseFreq = frequency, variation = 0.5, amp = amplitude } = {}) => {
    const modulatedFreq = baseFreq * (1 + variation * Math.sin(progress * Math.PI * 3));
    return Math.sin(progress * Math.PI * 2 * modulatedFreq) * amp;
  };

  // Parallax offset using trig for smooth easing
  const parallaxOffset = (progress, { strength = 100, curve = 'sine' } = {}) => {
    const easedProgress = curve === 'sine'
      ? Math.sin(progress * Math.PI * 0.5)
      : curve === 'cosine'
        ? 1 - Math.cos(progress * Math.PI * 0.5)
        : progress;
    return easedProgress * strength;
  };

  // Staggered reveal delay based on index
  const staggerDelay = (index, { baseDelay = 0.1, maxDelay = 0.8 } = {}) => {
    return Math.min(baseDelay * index, maxDelay);
  };

  // Elastic/spring-like return using sine with decay
  const elasticReturn = (progress, { stiffness = 100, damping: d = 10 } = {}) => {
    const omega = Math.sqrt(stiffness);
    const decay = Math.exp(-d * progress);
    return Math.sin(omega * progress) * decay;
  };

  // Morphing wave - transitions between two wave shapes
  const morphWave = (progress, { fromFreq = 1, toFreq = 2, amp = amplitude } = {}) => {
    const currentFreq = fromFreq + (toFreq - fromFreq) * progress;
    return Math.sin(progress * Math.PI * 2 * currentFreq) * amp;
  };

  // Breathing animation - slow, subtle scale/opacity pulse
  const breathe = (time, { period = 4000, amp = 0.02 } = {}) => {
    return 1 + Math.sin((time / period) * Math.PI * 2) * amp;
  };

  // Floating motion - gentle up/down drift
  const float = (time, { amplitude: a = 10, period = 3000 }) => {
    return Math.sin((time / period) * Math.PI * 2) * a;
  };

  // Scroll-linked rotation using trig
  const scrollRotation = (progress, { maxDegrees = 10, easing = 'sine' } = {}) => {
    const eased = easing === 'sine'
      ? Math.sin(progress * Math.PI * 0.5)
      : easing === 'easeOut'
        ? 1 - Math.pow(1 - progress, 3)
        : progress;
    return eased * maxDegrees;
  };

  // Wave path generator for SVG dividers
  const generateWavePath = (width, height, {
    frequency: freq = 2,
    amplitude: amp = 20,
    phase: ph = 0,
    segments = 100,
  } = {}) => {
    let path = `M 0 ${height / 2}`;
    for (let i = 0; i <= segments; i++) {
      const x = (width / segments) * i;
      const progress = i / segments;
      const y = height / 2 + Math.sin(progress * Math.PI * 2 * freq + ph) * amp;
      path += ` L ${x} ${y}`;
    }
    path += ` L ${width} ${height} L 0 ${height} Z`;
    return path;
  };

  // Animated wave path that responds to scroll
  const animatedWavePath = (width, height, scrollProgress, {
    baseFrequency = 2,
    frequencyRange = 1,
    baseAmplitude = 20,
    amplitudeRange = 10,
    phaseSpeed = 0.5,
  } = {}) => {
    const freq = baseFrequency + Math.sin(scrollProgress * Math.PI * 2) * frequencyRange;
    const amp = baseAmplitude + Math.cos(scrollProgress * Math.PI * 2) * amplitudeRange;
    const ph = scrollProgress * Math.PI * 2 * phaseSpeed;
    return generateWavePath(width, height, { frequency: freq, amplitude: amp, phase: ph });
  };

  // Update scroll position with RAF for smooth tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      velocityRef.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Initial measurement
    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Compute derived values
  const scrollProgress = viewportHeight > 0
    ? scrollY / (document.documentElement.scrollHeight - viewportHeight)
    : 0;

  const scrollVelocity = velocityRef.current;

  return {
    // Raw values
    scrollY,
    scrollProgress,
    scrollVelocity,
    viewportHeight,

    // Trig wave functions
    sineWave,
    cosineWave,
    organicWave,
    morphWave,

    // Animation helpers
    parallaxOffset,
    staggerDelay,
    elasticReturn,
    breathe,
    float,
    scrollRotation,
    getScrollProgress,

    // SVG wave generators
    generateWavePath,
    animatedWavePath,
  };
}

/**
 * useElementScrollProgress - Track scroll progress of a specific element
 * @param {React.RefObject} elementRef - Ref to the element to track
 * @param {Object} options
 * @param {number} options.offsetTop - Offset from top of viewport to start (default: 0)
 * @param {number} options.offsetBottom - Offset from bottom of viewport to end (default: 0)
 * @returns {number} Progress from 0 to 1
 */
export function useElementScrollProgress(elementRef, { offsetTop = 0, offsetBottom = 0 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = -rect.height - offsetTop;
      const end = viewportHeight + offsetBottom;
      const current = rect.top;
      const p = 1 - (current - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, p)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef, offsetTop, offsetBottom]);

  return progress;
}

/**
 * useScrollParallax - Create parallax transforms using trig easing
 * @param {number} strength - Parallax strength in pixels
 * @param {Object} options
 * @param {string} options.easing - 'sine' | 'cosine' | 'cubic' | 'quart'
 * @param {boolean} options.reverse - Reverse parallax direction
 * @returns {Object} Transform style object
 */
export function useScrollParallax(strength, { easing = 'sine', reverse = false } = {}) {
  const { scrollY, viewportHeight } = useTrigScroll();
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const updateTransform = () => {
      const progress = scrollY / viewportHeight;
      let easedProgress;

      switch (easing) {
        case 'sine':
          easedProgress = Math.sin(progress * Math.PI * 0.5);
          break;
        case 'cosine':
          easedProgress = 1 - Math.cos(progress * Math.PI * 0.5);
          break;
        case 'cubic':
          easedProgress = progress * progress * progress;
          break;
        case 'quart':
          easedProgress = progress * progress * progress * progress;
          break;
        default:
          easedProgress = progress;
      }

      const offset = (reverse ? -1 : 1) * easedProgress * strength;
      setTransform(`translate3d(0, ${offset}px, 0)`);
    };

    updateTransform();
    window.addEventListener('scroll', updateTransform, { passive: true });
    window.addEventListener('resize', updateTransform, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTransform);
      window.removeEventListener('resize', updateTransform);
    };
  }, [scrollY, viewportHeight, strength, easing, reverse]);

  return { transform };
}

export default useTrigScroll;