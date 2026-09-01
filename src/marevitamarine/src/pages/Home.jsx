import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Anchor,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Ship,
  Users,
  Waves,
} from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import HeroVideoCarousel, { HeroText } from '../components/HeroVideoCarousel';
import CountUp from '../components/CountUp';
import { useHeroScroll } from '../context/HeroScrollContext';
import {
  TrigParallax,
  TrigReveal,
  TrigFloating,
  TrigWaveDivider,
  TrigScrollRotate,
  TrigScaleReveal,
  TrigScrollIndicator,
  TrigBackgroundWave,
  TrigSectionWrapper,
} from '../components/TrigScrollAnimations';

/**
 * Per-scene layout: where the typography sits inside the safe band.
 * - left   = flush to the left edge, italic-anchored departure feel
 * - center = centered column, large condensed display
 * - right  = right-aligned, all-caps letterspaced
 */
const COMPOSITION_ALIGN = {
  left: 'items-start text-left mr-auto',
  center: 'items-center text-center mx-auto',
  right: 'items-end text-right ml-auto',
};

const COMPOSITION_WIDTH = {
  left: 'max-w-2xl',
  center: 'max-w-3xl',
  right: 'max-w-2xl',
};

const HEADLINE_STYLE = {
  left: 'italic font-extralight leading-[0.95] tracking-tight',
  center: 'font-black leading-[0.95] tracking-[-0.04em]',
  right: 'font-light leading-[1.0] tracking-[0.04em] uppercase',
};

/**
 * HeroComposition — Renders the per-scene typography inside the safe band.
 * Crossfades eyebrow, headline, body, and CTA in lockstep with the video.
 */
function HeroComposition({ scene }) {
  return (
    <div
      className={`flex flex-col gap-5 ${COMPOSITION_ALIGN[scene.composition]} ${COMPOSITION_WIDTH[scene.composition]}`}
    >
      {/* Eyebrow — small, all caps, tracks the scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id + '-eyebrow'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marine-950/60 border border-marine-400/30 text-marine-300 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-marine-400 animate-pulse" />
          {scene.eyebrow}
        </motion.div>
      </AnimatePresence>

      {/* Headline — the editorial centerpiece */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={scene.id + '-headline'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className={`erica-one text-white drop-shadow-md text-4xl sm:text-6xl lg:text-7xl ${HEADLINE_STYLE[scene.composition]}`}
        >
          {scene.headline.map((line, i) => (
            <span key={i} className="block">
              {i === scene.headline.length - 1 ? (
                <span className="text-marine-400 erica-one">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>
      </AnimatePresence>

      {/* Body — the proof */}
      <AnimatePresence mode="wait">
        <motion.p
          key={scene.id + '-body'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="text-base prompt sm:text-lg text-slate-200 leading-relaxed max-w-xl font-light drop-shadow"
        >
          {scene.body}
        </motion.p>
      </AnimatePresence>

      {/* Single primary CTA per scene — spring hover/tap for a premium tactile feel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id + '-cta'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mt-4"
        >
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97, y: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 320 }}
            className="inline-block"
          >
            <Link
              to={scene.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-marine-500 pl-5 pr-3 py-3 text-sm text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 hover:shadow-marine-500/40 transition-colors"
            >
              {scene.cta.label}
              <motion.span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"
                // Inner chevron glides on hover
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
              >
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * CaseStudyCard — One vessel/port/crew moment, rendered as a bold editorial
 * spread. Photographic backgrounds are out of scope until licensing is set,
 * so the cards use brand-toned geometric SVG illustrations instead.
 */
function CaseStudyCard({ kind, name, meta, fact, href, index }) {
  return (
    <motion.article
      // Stagger + slight scale-down "settle" — feels like editorial covers being
      // placed rather than boxes fading in. Keeps the section premium.
      initial={{ opacity: 0, y: 40, scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      className="group relative overflow-hidden rounded-sm bg-navy-950 text-white aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
    >
      <CaseStudyIllustration kind={kind} />

      {/* Bottom-anchored caption — magazine-spread feel */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-marine-300">
          <span className="w-6 h-px bg-marine-400" />
          {kind}
        </div>
        <div>
          <p className="text-xs font-mono tracking-widest text-marine-300/80 mb-2">
            {meta}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold leading-[1.05] tracking-tight">
            {name}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
            {fact}
          </p>
          <Link
            to={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-marine-300 group-hover:translate-x-2 group-hover:scale-x-120 hover:text-white transition-colors"
          >
            Read the case
            <ArrowRight className="h-4 w-4 group-hover:translate-x-2 group-hover:scale-120 transition-all" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * CaseStudyIllustration — Geometric SVG composition for each card.
 * Different for each kind, but always in the marine/navy palette.
 */
function CaseStudyIllustration({ kind }) {
  if (kind === 'Vessel') {
    return (
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#seaGrad)" />
        {/* Horizon line */}
        <line x1="0" y1="220" x2="400" y2="220" stroke="#0ea5e9" strokeOpacity="0.35" strokeWidth="0.5" />
        {/* Sun */}
        <circle cx="290" cy="180" r="32" fill="#38bdf8" fillOpacity="0.18" />
        <circle cx="290" cy="180" r="18" fill="#7dd3fc" fillOpacity="0.35" />
        {/* Hull */}
        <path d="M 40 310 L 360 310 L 340 350 L 60 350 Z" fill="#e2e8f0" />
        {/* Superstructure */}
        <rect x="120" y="270" width="160" height="40" fill="#cbd5e1" />
        <rect x="200" y="240" width="60" height="30" fill="#cbd5e1" />
        {/* Funnel */}
        <rect x="220" y="210" width="20" height="30" fill="#0f172a" />
        <rect x="218" y="208" width="24" height="6" fill="#0ea5e9" />
        {/* Masts */}
        <line x1="100" y1="270" x2="100" y2="210" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="280" y1="270" x2="280" y2="220" stroke="#cbd5e1" strokeWidth="1" />
        {/* Waves */}
        {[360, 390, 420, 450].map((y, i) => (
          <path
            key={y}
            d={`M 0 ${y} Q 100 ${y - 6} 200 ${y} T 400 ${y}`}
            stroke="#0ea5e9"
            strokeOpacity={0.15 + i * 0.07}
            strokeWidth="0.8"
            fill="none"
          />
        ))}
      </svg>
    );
  }

  if (kind === 'Port') {
    return (
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="portGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#portGrad)" />
        {/* Sky grid lines */}
        <line x1="0" y1="80" x2="400" y2="80" stroke="#0ea5e9" strokeOpacity="0.1" strokeWidth="0.5" />
        <line x1="0" y1="140" x2="400" y2="140" stroke="#0ea5e9" strokeOpacity="0.1" strokeWidth="0.5" />
        {/* Cranes */}
        {[80, 160, 240, 320].map((x, i) => (
          <g key={x} opacity={0.6 - i * 0.05}>
            <line x1={x} y1="80" x2={x} y2="320" stroke="#475569" strokeWidth="2" />
            <line x1={x} y1="80" x2={x + 60} y2="110" stroke="#475569" strokeWidth="2" />
            <line x1={x + 60} y1="110" x2={x + 60} y2="140" stroke="#64748b" strokeWidth="1" />
            <rect x={x + 50} y="140" width="20" height="14" fill="#0ea5e9" fillOpacity="0.6" />
          </g>
        ))}
        {/* Dock */}
        <rect x="0" y="320" width="400" height="40" fill="#1e293b" />
        <line x1="0" y1="340" x2="400" y2="340" stroke="#0ea5e9" strokeOpacity="0.4" strokeWidth="0.5" />
        {/* Water reflections */}
        {[380, 410, 440, 470].map((y, i) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#0ea5e9"
            strokeOpacity={0.08 + i * 0.05}
            strokeWidth="0.5"
          />
        ))}
      </svg>
    );
  }

  if (kind === 'Crew') {
    return (
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crewGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#crewGrad)" />
        {/* Compass rose */}
        <g transform="translate(200, 230)">
          <circle r="120" fill="none" stroke="#0ea5e9" strokeOpacity="0.15" strokeWidth="0.5" />
          <circle r="90" fill="none" stroke="#0ea5e9" strokeOpacity="0.2" strokeWidth="0.5" />
          <circle r="60" fill="none" stroke="#0ea5e9" strokeOpacity="0.3" strokeWidth="0.5" />
          <circle r="3" fill="#7dd3fc" />
          {/* Cardinal points */}
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path d="M 0 -110 L -4 -90 L 0 -85 L 4 -90 Z" fill="#7dd3fc" fillOpacity="0.7" />
            </g>
          ))}
          {/* Minor points */}
          {[45, 135, 225, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path d="M 0 -100 L -2 -88 L 0 -85 L 2 -88 Z" fill="#0ea5e9" fillOpacity="0.5" />
            </g>
          ))}
        </g>
        {/* Coordinate text */}
        <text x="20" y="470" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7dd3fc" fillOpacity="0.4">
          19°04′N · 72°52′E
        </text>
        <text x="290" y="40" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7dd3fc" fillOpacity="0.4">
          MMPL · NEW START
        </text>
      </svg>
    );
  }

  return null;
}

/**
 * DecorativeIcon - Floating decorative icon with trig-based scroll rotation
 */
function DecorativeIcon({ Icon, className, style, amplitude = 20, period = 5000, rotateStrength = 8 }) {
  return (
    <TrigScrollRotate maxDegrees={rotateStrength} easing="organic" className={className} style={style}>
      <TrigFloating amplitude={amplitude} period={period}>
        <Icon className="w-full h-full" strokeWidth={1} />
      </TrigFloating>
    </TrigScrollRotate>
  );
}

function HomeContent() {
  const { heroRef } = useHeroScroll();
  const caseStudies = [
    {
      kind: 'Vessel',
      meta: 'MV NORTHERN STAR · BULK CARRIER · 82,000 DWT',
      name: 'A six-week Atlantic crossing, single-point accountability.',
      fact: 'Full technical, crew and commercial management for a Kamsarmax bulker — from Singapore charter to Rotterdam discharge. Zero off-hire, zero port-state detentions.',
      href: '/services',
    },
    {
      kind: 'Port',
      meta: 'MUMBAI · JNPT · TURNAROUND 38 HOURS',
      name: 'Twelve cranes, one ship, a hundred moving parts.',
      fact: 'Cargo, customs, crew change, bunkers, fresh provisions, surveys — coordinated around the clock for a container ship on a tight schedule.',
      href: '/services',
    },
    {
      kind: 'Crew',
      meta: 'CHIEF OFFICER · PLACEMENT · 72 HOURS',
      name: 'The right rank, the right vessel, in three days.',
      fact: 'When the previous Chief Officer signed off mid-voyage, we had a fully-certified replacement stepping off the helicopter in 72 hours. Sign-on, sign-off, sea-time continuity intact.',
      href: '/careers',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Operations support', sub: 'round-the-clock coverage' },
    { value: '100%', label: 'Client-focused', sub: 'every voyage, every port call' },
    { value: 'BIMCO', label: 'Aligned contracts', sub: 'industry-standard crew agreements' },
    { value: 'Global', label: 'Network reach', sub: 'with vetted local partners' },
  ];

  const differentiators = [
    {
      title: 'Zero-Incident Commitment',
      description: 'Every voyage planned, every risk assessed. Our safety management system is built around a culture that treats any incident as a systems failure to be learned from.',
    },
    {
      title: 'Global Reach, Local Knowledge',
      description: 'Vetted partners at every major port — we deliver consistent service wherever you sail, with the cultural fluency local operations demand.',
    },
    {
      title: 'Modern Technology',
      description: 'Digital fleet monitoring, predictive maintenance scheduling, and data-driven decisions that keep your operations ahead of the regulatory curve.',
    },
    {
      title: 'Cost Efficiency',
      description: 'Streamlined processes and deep industry relationships translate into measurable savings passed directly to our clients.',
    },
  ];

  return (
    <div>
      {/* Scroll progress indicator — uses sine wave for subtle lateral drift */}
      <TrigScrollIndicator color="#0ea5e9" height={3} />

      {/* Decorative floating icons in the hero zone */}
      <TrigFloating amplitude={15} period={6000} className="fixed top-1/3 left-8 w-8 h-8 text-marine-400/20 pointer-events-none z-0 hidden lg:block">
        <Anchor className="w-full h-full" strokeWidth={1} />
      </TrigFloating>
      <TrigFloating amplitude={20} period={7000} horizontal horizontalAmplitude={10} className="fixed top-2/3 right-12 w-10 h-10 text-marine-400/15 pointer-events-none z-0 hidden lg:block">
        <Waves className="w-full h-full" strokeWidth={1} />
      </TrigFloating>
      <TrigScrollRotate maxDegrees={10} easing="organic" className="fixed top-1/2 right-1/4 w-6 h-6 text-marine-400/20 pointer-events-none z-0 hidden lg:block">
        <TrigFloating amplitude={12} period={5500} horizontal>
          <Compass className="w-full h-full" strokeWidth={1} />
        </TrigFloating>
      </TrigScrollRotate>

      {/* ===================== HERO with per-scene compositions ===================== */}
      <HeroVideoCarousel ref={heroRef}>
        {({ scene }) => (
          <HeroText>
            <HeroComposition scene={scene} />
          </HeroText>
        )}
      </HeroVideoCarousel>

      {/* Animated wave divider: hero (dark) → white — pulses with scroll */}
      <TrigWaveDivider
        fromColor="#0f172a"
        toColor="white"
        height={140}
        baseFrequency={1.5}
        frequencyRange={0.8}
        baseAmplitude={35}
        amplitudeRange={15}
        phaseSpeed={0.4}
      />

      {/* ===================== CASE STUDIES (White) ===================== */}
      <section className="bg-white text-navy-900 relative overflow-hidden">
        {/* Subtle background wave */}
        <TrigBackgroundWave
          className="opacity-30"
          baseColor="rgba(14, 165, 233, 0.04)"
          amplitude={30}
          frequency={0.3}
          speed={0.0002}
          layerCount={2}
        />

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <div className="max-w-3xl mb-16">
            <TrigReveal direction="up" amplitude={20} duration={0.7}>
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-600">
                Selected work
              </span>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                Three vessels, one harbor, one watch.
                <span className="text-marine-500"> Right now, today.</span>
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-6 text-lg text-navy-600 max-w-2xl">
                We don't sell services — we run voyages. Three recent operations, the kind that go right because every moving part was owned by one accountable team.
              </p>
            </TrigReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((c, i) => (
              <CaseStudyCard key={c.meta} {...c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Animated wave divider: white → black */}
      <TrigWaveDivider
        fromColor="white"
        toColor="#0f172a"
        height={140}
        baseFrequency={2.2}
        frequencyRange={1}
        baseAmplitude={40}
        amplitudeRange={20}
        phaseSpeed={0.5}
      />

      {/* ===================== STATS (Black) — provenanced ===================== */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        {/* Subtle parallax decorative element */}
        <TrigParallax strength={-40} easing="organic" className="absolute top-10 right-10 w-32 h-32 text-marine-400/10 pointer-events-none">
          <Compass className="w-full h-full" strokeWidth={0.5} />
        </TrigParallax>
        <TrigParallax strength={30} easing="sine" className="absolute bottom-10 left-10 w-24 h-24 text-marine-400/8 pointer-events-none">
          <Anchor className="w-full h-full" strokeWidth={0.5} />
        </TrigParallax>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-left"
              >
                <div className="text-5xl lg:text-6xl font-extrabold text-marine-400 leading-none">
                  <CountUp to={stat.value} delay={0.1 + i * 0.12} duration={1.1} />
                </div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-navy-300 leading-relaxed">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated wave divider: black → white */}
      <TrigWaveDivider
        fromColor="#0f172a"
        toColor="white"
        height={140}
        baseFrequency={1.8}
        frequencyRange={0.7}
        baseAmplitude={30}
        amplitudeRange={18}
        phaseSpeed={0.45}
      />

      {/* ===================== WHY CHOOSE US (White) ===================== */}
      <section className="bg-white text-navy-900 relative overflow-hidden">
        <TrigBackgroundWave
          className="opacity-40"
          baseColor="rgba(14, 165, 233, 0.03)"
          amplitude={25}
          frequency={0.4}
          speed={0.00025}
          layerCount={2}
        />

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <TrigParallax strength={-20} easing="sine">
              <div>
                <TrigReveal direction="left" amplitude={20} duration={0.6}>
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-600">
                    Why owners stay
                  </span>
                </TrigReveal>
                <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                  <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                    Four reasons operators sign long.
                  </h2>
                </TrigReveal>
                <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
                  <p className="mt-6 text-lg text-navy-600 max-w-xl">
                    The maritime industry doesn't reward novelty. It rewards the quiet, methodical, never-anything-went-wrong kind of service. That's what we sell.
                  </p>
                </TrigReveal>
              </div>
            </TrigParallax>

            <div className="space-y-8">
              {differentiators.map((item, i) => (
                <TrigReveal
                  key={item.title}
                  direction="right"
                  amplitude={25}
                  delay={i * 0.1}
                  duration={0.6}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-7 w-7 text-marine-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-navy-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </TrigReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated wave divider: white → black */}
      <TrigWaveDivider
        fromColor="white"
        toColor="#0f172a"
        height={120}
        baseFrequency={2}
        frequencyRange={0.6}
        baseAmplitude={25}
        amplitudeRange={12}
        phaseSpeed={0.4}
      />

      {/* ===================== CTA (Black) ===================== */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        {/* Floating decorative shapes */}
        <TrigFloating amplitude={25} period={8000} className="absolute top-20 left-20 w-16 h-16 text-marine-400/10 pointer-events-none">
          <Ship className="w-full h-full" strokeWidth={0.5} />
        </TrigFloating>
        <TrigFloating amplitude={20} period={6500} horizontal horizontalAmplitude={15} className="absolute bottom-32 right-32 w-20 h-20 text-marine-400/8 pointer-events-none">
          <Waves className="w-full h-full" strokeWidth={0.5} />
        </TrigFloating>
        <TrigScrollRotate maxDegrees={15} easing="organic" className="absolute top-1/2 left-1/3 w-12 h-12 text-marine-400/10 pointer-events-none">
          <TrigFloating amplitude={15} period={7000} horizontal>
            <Compass className="w-full h-full" strokeWidth={0.5} />
          </TrigFloating>
        </TrigScrollRotate>

        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32 text-center relative z-10">
          <TrigReveal direction="up" amplitude={30} duration={0.8}>
            <h2 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
              One accountable team.
              <br />
              From the pilot to the port.
            </h2>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.7}>
            <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto">
              Tell us about your fleet, your voyage, your next challenge. We respond within one business day, with a named point of contact.
            </p>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.3} duration={0.7}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 hover:shadow-marine-500/40 transition-colors"
                >
                  Request a quote
                  <motion.span
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                  >
                    <motion.span
                      className="inline-flex"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={15} delay={0.4} duration={0.6}>
            <p className="mt-6 text-xs text-navy-400 font-mono tracking-widest uppercase">
              24 / 7 · operations@marevitamarine.com
            </p>
          </TrigReveal>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}