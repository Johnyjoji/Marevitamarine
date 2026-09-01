import { useState, useRef, useEffect } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

/**
 * LeadershipCardStack
 * -------------------
 * A draggable, physics-based card stack showcasing the leadership team.
 * Built with @react-spring/web (v9) and @use-gesture/react.
 *
 * Interactions:
 *   - Drag a card left/right to dismiss it; spring physics fling it off-screen.
 *   - Cards behind follow with a parallax scale/translate derived from the
 *     front card's drag progress, so the stack feels "alive."
 *   - On dismiss, the stack recycles: the next card is promoted to the front.
 *   - Keyboard accessible: arrow keys cycle, pagination dots for direct access.
 *   - Reduced motion users get instant transitions without fling physics.
 *
 * Card visual:
 *   Each card is a vertical split — portrait/initials side, role + name side.
 *   Premium maritime feel: marine-500 accents, navy text, subtle grid bg.
 */

const TEAM = [
  {
    name: 'Capt. Jayan Nair',
    role: 'Master Mariner',
    initials: 'JN',
    bio: 'Master Mariner with command experience across bulk carriers and container vessels. Decades of safe watch-keeping on the world\'s busiest trade lanes.',
    accent: 'from-marine-500 to-marine-700',
  },
  {
    name: 'Capt. Eldose P. Paul',
    role: 'Master Mariner',
    initials: 'EP',
    bio: 'Master Mariner specialising in vessel operations and crew leadership. Brings deep navigational judgment earned on long-haul ocean passages.',
    accent: 'from-marine-600 to-marine-800',
  },
  {
    name: 'C/E Sanu Paul',
    role: 'Chief Engineer',
    initials: 'SP',
    bio: 'Chief Engineer with extensive sea-time on complex power plants. Hands-on expertise in engine room reliability, fuel efficiency, and class compliance.',
    accent: 'from-navy-700 to-navy-900',
  },
  {
    name: 'C/E George Kutty',
    role: 'Chief Engineer',
    initials: 'GK',
    bio: 'Chief Engineer with a maintenance-first mindset. Trusted advisor to owners on technical management, dry-dock planning, and lifecycle overhauls.',
    accent: 'from-marine-700 to-marine-900',
  },
  {
    name: 'Stoney Olivero',
    role: 'Marine Crewing Officer',
    initials: 'SO',
    bio: 'Marine Crewing Officer with an extensive network of qualified seafarers. Matches the right rank to the right vessel — fast, fairly, and fully compliant.',
    accent: 'from-navy-800 to-marine-700',
  },
  {
    name: 'Anil Antony',
    role: 'Technical Officer',
    initials: 'AA',
    bio: 'Technical Officer bridging sea experience and shore-side oversight. Owns inspections, audits, and the documentation that keeps vessels in class.',
    accent: 'from-marine-500 to-navy-700',
  },
];

const CARD_W = 340;
const CARD_H = 460;
const STACK_OFFSET = 14; // px between stacked cards
const SWIPE_THRESHOLD = 120; // px drag before a card is dismissed
const VELOCITY_THRESHOLD = 0.6; // px/ms

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export default function LeadershipCardStack() {
  const reducedMotion = usePrefersReducedMotion();
  // Top-of-stack index
  const [topIndex, setTopIndex] = useState(0);
  // Animation state: cards track their own {x, rot} progress
  const containerRef = useRef(null);

  const [{ x, rot }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    config: { tension: 260, friction: 26, mass: 0.9 },
  }));

  // The gesture handler drives the top card. On release, if drag distance or
  // velocity exceeds the threshold, fly it off and increment topIndex.
  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx], velocity: [vx], direction: [dx] }) => {
        if (reducedMotion) {
          api.start({ x: 0, rot: 0, immediate: true });
          return;
        }
        const trigger = Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD;
        if (!down && trigger) {
          // Fly off in the drag direction. Off-screen is ~2× card width.
          const flyX = (dx > 0 ? 1 : -1) * (CARD_W * 2.5);
          api.start({
            x: flyX,
            rot: (dx > 0 ? 1 : -1) * 30,
            immediate: false,
            config: { tension: 180, friction: 22 },
            onRest: () => {
              // Recycle: dismiss the front card and bring the next to the front.
              setTopIndex((i) => (i + 1) % TEAM.length);
              api.start({ x: 0, rot: 0, immediate: true });
            },
          });
        } else {
          // Snap back (still pressed, or released below threshold)
          api.start({
            x: down ? mx : 0,
            rot: down ? mx / 18 : 0,
            immediate: down,
          });
        }
      },
    },
    { drag: { filterTaps: true, axis: 'x' } },
  );

  // Render the stack. Up to 3 cards visible at a time (top + 2 behind).
  const visibleCount = 3;
  const stackCards = [];
  for (let depth = 0; depth < Math.min(visibleCount, TEAM.length); depth++) {
    const idx = (topIndex + depth) % TEAM.length;
    stackCards.push({ ...TEAM[idx], depth, key: `${topIndex}-${idx}` });
  }

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setTopIndex((i) => (i + 1) % TEAM.length);
      api.start({ x: 0, rot: 0, immediate: true });
    } else if (e.key === 'ArrowLeft') {
      setTopIndex((i) => (i - 1 + TEAM.length) % TEAM.length);
      api.start({ x: 0, rot: 0, immediate: true });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none"
      style={{ width: CARD_W, height: CARD_H + 40 }}
      role="region"
      aria-label="Leadership team — swipe to browse"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Instruction hint */}
      <div className="absolute -top-9 left-0 right-0 text-center text-xs font-mono uppercase tracking-[0.2em] text-navy-500">
        Drag to explore · ← → keys
      </div>

      {/* The stack — render in reverse so the front card paints last (on top) */}
      {stackCards
        .slice()
        .reverse()
        .map((card) => (
          <StackCard
            key={card.key}
            card={card}
            isTop={card.depth === 0}
            x={x}
            rot={rot}
            bind={bind}
          />
        ))}

      {/* Pagination dots — show which card is at the front */}
      <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2">
        {TEAM.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setTopIndex(i);
              api.start({ x: 0, rot: 0, immediate: true });
            }}
            aria-label={`Go to team member ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === topIndex
                ? 'w-8 bg-marine-500'
                : 'w-1.5 bg-navy-300 hover:bg-navy-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * TopCard — The draggable front card.
 *
 * Uses two animated values (x, rot) and a `to` interpolation to build
 * a single transform string for the front card. Bound to gestures.
 */
function TopCard({ card, x, rot, bind }) {
  return (
    <animated.div
      {...bind()}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CARD_W,
        height: CARD_H,
        // Compose x + rot into a single transform string
        transform: to(
          [x, rot],
          (xVal, rotVal) =>
            `translate3d(${xVal}px, 0, 0) rotate(${rotVal}deg)`,
        ),
        zIndex: 30,
        cursor: 'grab',
        touchAction: 'pan-y',
        willChange: 'transform',
      }}
      className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.15)]"
    >
      <CardContent card={card} />

      {/* Lifted shadow that intensifies on drag */}
      <animated.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: x.to((v) => {
            const mag = Math.min(Math.abs(v) / 200, 1);
            return `0 ${30 + mag * 30}px ${60 + mag * 40}px -10px rgba(14,165,233,${0.25 + mag * 0.4})`;
          }),
        }}
      />
    </animated.div>
  );
}

/**
 * BehindCard — A card that follows the top card with parallax.
 *
 * Uses derived values (to interpolation) from the top card's animated `x`
 * instead of a separate spring. This is more performant and idiomatic in
 * react-spring v9: the behind cards' transforms are computed directly from
 * the physics-driven `x` value, so they inherit the spring feel automatically.
 */
function BehindCard({ card, x }) {
  const depth = card.depth;
  const followRatio = depth === 1 ? 0.5 : 0.25;
  const baseY = -depth * STACK_OFFSET;
  const baseScale = 1 - depth * 0.04;

  // Derive transform directly from the top card's animated `x` value.
  // This avoids a separate spring and rAF polling — the parallax is
  // computed on each frame by react-spring's animation loop.
  const transform = x.to((v) => {
    const mag = Math.min(Math.abs(v) / 400, 1);
    const newX = -v * followRatio;
    const newScale = baseScale + mag * 0.03 * (depth === 1 ? 1 : 0.5);
    // Subtle vertical breathing: first card lifts slightly, second pushes down
    const newY = baseY + Math.abs(v) * 0.02 * (depth === 1 ? -1 : 0.4);
    return `translate3d(${newX}px, ${newY}px, 0) scale(${newScale})`;
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CARD_W,
        height: CARD_H,
        transform,
        zIndex: 10 - depth,
        willChange: 'transform',
      }}
      className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]"
    >
      <CardContent card={card} />
    </animated.div>
  );
}

/**
 * StackCard — Routes to the right card variant based on depth.
 */
function StackCard({ card, isTop, x, rot, bind }) {
  if (isTop) {
    return <TopCard card={card} x={x} rot={rot} bind={bind} />;
  }
  return <BehindCard card={card} x={x} />;
}

/**
 * CardContent — The visual content shared by all stack cards.
 */
function CardContent({ card }) {
  return (
    <div className="grid grid-cols-1 h-full">
      {/* Portrait / initials block — gradient hero side */}
      <div
        className={`relative h-40 bg-gradient-to-br ${card.accent} flex items-center justify-center`}
      >
        {/* Subtle technical grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 340 160"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`grid-${card.key}`}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="340" height="160" fill={`url(#grid-${card.key})`} />
        </svg>
        {/* Initials monogram */}
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
          <span className="text-4xl font-black text-white tracking-tight">
            {card.initials}
          </span>
        </div>
        {/* Role chip bottom-left */}
        <div className="absolute bottom-3 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
            {card.role}
          </span>
        </div>
      </div>

      {/* Text block */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-navy-900">
            {card.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-600">
            {card.bio}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-marine-600">
          <span className="inline-block h-px w-6 bg-marine-500" />
          <span className="uppercase tracking-widest">Marevita Marine</span>
        </div>
      </div>
    </div>
  );
}