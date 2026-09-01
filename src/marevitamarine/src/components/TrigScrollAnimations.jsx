import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTrigScroll, useElementScrollProgress } from '../hooks/useTrigScroll';

/**
 * TrigParallax - Parallax element with trig-based easing
 * Creates smooth, organic parallax motion using sine/cosine curves
 */
export function TrigParallax({
  children,
  strength = 100,
  easing = 'sine',
  reverse = false,
  className = '',
  style = {},
}) {
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
        case 'organic':
          easedProgress = Math.sin(progress * Math.PI * 2 * (1 + 0.3 * Math.sin(progress * Math.PI * 4)));
          break;
        case 'cubic':
          easedProgress = progress * progress * progress;
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

  return (
    <div className={className} style={{ ...style, transform, willChange: 'transform' }}>
      {children}
    </div>
  );
}

/**
 * TrigReveal - Element that reveals with organic wave motion
 * Uses sine waves for staggered, natural-feeling entrance animations
 */
export function TrigReveal({
  children,
  delay = 0,
  duration = 0.8,
  amplitude = 30,
  direction = 'up',
  className = '',
  style = {},
  triggerOnce = true,
}) {
  const ref = useRef(null);
  const progress = useElementScrollProgress(ref, { offsetTop: 100, offsetBottom: 100 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (progress > 0.05 && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [progress, hasAnimated]);

  const initialY = direction === 'up' ? amplitude : direction === 'down' ? -amplitude : 0;
  const initialX = direction === 'left' ? amplitude : direction === 'right' ? -amplitude : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={hasAnimated ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: initialY, x: initialX }}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * TrigFloating - Gentle floating animation using sine wave
 * Perfect for decorative elements, icons, background shapes
 */
export function TrigFloating({
  children,
  amplitude = 15,
  period = 4000,
  horizontal = false,
  horizontalAmplitude = 10,
  className = '',
  style = {},
}) {
  const [transform, setTransform] = useState('');

  useEffect(() => {
    let rafId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const verticalOffset = Math.sin((elapsed / period) * Math.PI * 2) * amplitude;
      const horizontalOffset = horizontal
        ? Math.cos((elapsed / period) * Math.PI * 2) * horizontalAmplitude
        : 0;
      setTransform(`translate3d(${horizontalOffset}px, ${verticalOffset}px, 0)`);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [amplitude, period, horizontal, horizontalAmplitude]);

  return (
    <div
      className={className}
      style={{
        ...style,
        transform,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * TrigWaveDivider - Animated SVG wave divider that responds to scroll
 * Creates organic, coastline-like dividers between sections
 */
export function TrigWaveDivider({
  fromColor = '#0f172a',
  toColor = 'white',
  height = 120,
  baseFrequency = 2,
  frequencyRange = 1,
  baseAmplitude = 30,
  amplitudeRange = 15,
  phaseSpeed = 0.5,
  className = '',
}) {
  const { scrollProgress } = useTrigScroll();
  const [path, setPath] = useState('');
  const containerRef = useRef(null);
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.offsetWidth);
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const freq = baseFrequency + Math.sin(scrollProgress * Math.PI * 2) * frequencyRange;
    const amp = baseAmplitude + Math.cos(scrollProgress * Math.PI * 2) * amplitudeRange;
    const ph = scrollProgress * Math.PI * 2 * phaseSpeed;

    let newPath = `M 0 ${height / 2}`;
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const x = (width / segments) * i;
      const p = i / segments;
      const y = height / 2 + Math.sin(p * Math.PI * 2 * freq + ph) * amp;
      newPath += ` L ${x} ${y}`;
    }
    newPath += ` L ${width} ${height} L 0 ${height} Z`;
    setPath(newPath);
  }, [scrollProgress, width, height, baseFrequency, frequencyRange, baseAmplitude, amplitudeRange, phaseSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full leading-[0] ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: fromColor }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path d={path} fill={toColor} fillOpacity="1" />
      </svg>
    </div>
  );
}

/**
 * TrigScrollRotate - Element that rotates based on scroll progress
 * Uses trig easing for smooth, natural rotation
 */
export function TrigScrollRotate({
  children,
  maxDegrees = 15,
  easing = 'sine',
  reverse = false,
  className = '',
  style = {},
}) {
  const { scrollY, viewportHeight } = useTrigScroll();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateRotation = () => {
      const progress = scrollY / viewportHeight;
      let easedProgress;

      switch (easing) {
        case 'sine':
          easedProgress = Math.sin(progress * Math.PI * 0.5);
          break;
        case 'cosine':
          easedProgress = 1 - Math.cos(progress * Math.PI * 0.5);
          break;
        case 'organic':
          easedProgress = Math.sin(progress * Math.PI * 2 * (1 + 0.2 * Math.sin(progress * Math.PI * 3)));
          break;
        default:
          easedProgress = progress;
      }

      const deg = (reverse ? -1 : 1) * easedProgress * maxDegrees;
      setRotation(deg);
    };

    updateRotation();
    window.addEventListener('scroll', updateRotation, { passive: true });
    window.addEventListener('resize', updateRotation, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateRotation);
      window.removeEventListener('resize', updateRotation);
    };
  }, [scrollY, viewportHeight, maxDegrees, easing, reverse]);

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * TrigScaleReveal - Element that scales in with elastic/spring feel
 * Uses sine wave with decay for organic entrance
 */
export function TrigScaleReveal({
  children,
  delay = 0,
  stiffness = 120,
  damping = 12,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const progress = useElementScrollProgress(ref, { offsetTop: 100 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (progress > 0.1 && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [progress, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness,
        damping,
        delay,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * TrigMorphingText - Text that morphs/transforms based on scroll
 * Creates wave-like letter spacing, opacity, or transform changes
 */
export function TrigMorphingText({
  children,
  morphType = 'letterSpacing',
  intensity = 1,
  className = '',
  style = {},
}) {
  const { scrollProgress, sineWave } = useTrigScroll();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const morphValue = sineWave(scrollProgress, { freq: 1, amp: intensity });
    setValue(morphValue);
  }, [scrollProgress, sineWave, intensity]);

  const textStyle = { ...style };

  switch (morphType) {
    case 'letterSpacing':
      textStyle.letterSpacing = `${0.02 + value * 0.1}em`;
      break;
    case 'opacity':
      textStyle.opacity = 1 - Math.abs(value) * 0.3;
      break;
    case 'scale':
      textStyle.transform = `scale(${1 + value * 0.05})`;
      break;
    case 'wave':
      textStyle.transform = `translateY(${value * 5}px)`;
      break;
  }

  return (
    <span className={className} style={textStyle}>
      {children}
    </span>
  );
}

/**
 * TrigScrollIndicator - Visual scroll progress indicator with wave motion
 */
export function TrigScrollIndicator({
  className = '',
  style = {},
  color = '#0ea5e9',
  height = 3,
}) {
  const { scrollProgress, sineWave } = useTrigScroll();
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const wave = sineWave(scrollProgress * 2, { freq: 3, amp: 10 });
    setWaveOffset(wave);
  }, [scrollProgress, sineWave]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none ${className}`}
      style={{ ...style, height: `${height}px` }}
    >
      <div
        style={{
          width: `${scrollProgress * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          transform: `translateX(${waveOffset}px)`,
          transition: 'width 0.1s linear',
          willChange: 'width, transform',
        }}
      />
    </div>
  );
}

/**
 * TrigBackgroundWave - Animated background wave pattern
 * Creates mesmerizing, subtle background motion
 */
export function TrigBackgroundWave({
  className = '',
  style = {},
  baseColor = 'rgba(14, 165, 233, 0.05)',
  amplitude = 50,
  frequency = 0.5,
  speed = 0.0003,
  layerCount = 3,
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let rafId;
    const animate = () => {
      setTime(t => t + 16);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const layers = Array.from({ length: layerCount }, (_, i) => {
    const layerAmplitude = amplitude * (1 - i * 0.2);
    const layerFrequency = frequency * (1 + i * 0.3);
    const layerSpeed = speed * (1 + i * 0.2);

    return (
      <svg
        key={i}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 - i * 0.25 }}
        preserveAspectRatio="none"
      >
        <path
          d={`M 0 50 ${Array.from({ length: 100 }, (_, j) => {
            const x = j / 99;
            const y = 50 + Math.sin((time * layerSpeed + x * Math.PI * 2 * layerFrequency)) * layerAmplitude;
            return `L ${x * 100} ${y}`;
          }).join(' ')} L 100 100 L 0 100 Z`}
          fill={baseColor}
        />
      </svg>
    );
  });

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style}>
      {layers}
    </div>
  );
}

/**
 * TrigSectionWrapper - Wraps a section with trig-based entrance and parallax
 * Provides a unified scroll-animated section experience
 */
export function TrigSectionWrapper({
  children,
  parallaxStrength = 0,
  revealType = 'fade',
  revealDirection = 'up',
  revealAmount = 30,
  className = '',
  style = {},
}) {
  const { getScrollProgress, sineWave } = useTrigScroll();
  const ref = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = window.scrollY + rect.top;
      const elementHeight = rect.height;
      const progress = getScrollProgress(elementTop, elementHeight, 200);

      setRevealProgress(progress);

      if (parallaxStrength > 0) {
        const parallaxValue = sineWave(progress, { freq: 1, amp: parallaxStrength });
        setParallax(parallaxValue);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [getScrollProgress, sineWave, parallaxStrength]);

  // Map reveal progress to transform
  const eased = Math.max(0, Math.min(1, revealProgress * 1.5 - 0.2));
  const opacity = Math.min(1, eased * 2);

  let x = 0, y = 0, scale = 1;
  if (eased < 1) {
    const remaining = 1 - eased;
    switch (revealType) {
      case 'fade':
        // just opacity
        break;
      case 'slide':
        switch (revealDirection) {
          case 'up': y = remaining * revealAmount; break;
          case 'down': y = -remaining * revealAmount; break;
          case 'left': x = remaining * revealAmount; break;
          case 'right': x = -remaining * revealAmount; break;
        }
        break;
      case 'scale':
        scale = 0.9 + eased * 0.1;
        break;
      default:
        break;
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(${x}px, ${y - parallax}px, 0) scale(${scale})`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

export default {
  TrigParallax,
  TrigReveal,
  TrigFloating,
  TrigWaveDivider,
  TrigScrollRotate,
  TrigScaleReveal,
  TrigMorphingText,
  TrigScrollIndicator,
  TrigBackgroundWave,
  TrigSectionWrapper,
};