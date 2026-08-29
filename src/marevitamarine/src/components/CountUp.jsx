/**
 * CountUp — Animates a numeric or numeric-with-suffix string from 0 to its
 * target value when the element scrolls into view. Pure transform of text
 * content, no DOM measurement, so it stays cheap and SSR-friendly.
 *
 * Library policy: Motion.dev. Uses the `motion` `useInView` primitive so the
 * counter fires once and respects `viewport={{ once: true }}` like the rest
 * of the page.
 *
 * Props:
 *   - to:       the final string or number, e.g. "100%" or 24
 *   - duration: seconds (default 1.2)
 *   - delay:    seconds before the counter starts (default 0)
 *   - className: passed through to the wrapper span
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Split a target string into a numeric portion and a trailing suffix.
 * "100%"  -> { num: 100, suffix: "%" }
 * "24/7"  -> { num: 24,  suffix: "/7" }
 * "BIMCO" -> { num: 0,   suffix: "BIMCO" }  (counter skipped, label shown as-is)
 * "Global"-> { num: 0,   suffix: "Global" }
 */
function splitNumeric(value) {
  if (typeof value === 'number') return { num: value, suffix: '' };
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: String(value) };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export default function CountUp({ to, duration = 1.2, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { num, suffix } = splitNumeric(to);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (num === 0) return; // Non-numeric values (BIMCO, Global) just appear
    let raf;
    const start = performance.now() + delay * 1000;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = Math.max(0, (now - start) / 1000);
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      setDisplay(num * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(num);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, duration, delay]);

  const formatted =
    num === 0
      ? String(to)
      : Number.isInteger(num)
        ? Math.round(display).toString()
        : display.toFixed(1);

  return (
    <motion.span
      ref={ref}
      className={className}
      // Subtle fade ties the number's arrival to the rest of the section reveal
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {num === 0 ? formatted : `${formatted}${suffix}`}
    </motion.span>
  );
}
