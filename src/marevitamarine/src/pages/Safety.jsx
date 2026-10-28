import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flame,
  Anchor,
  Shield,
  AlertTriangle,
  ChevronDown,
  Navigation,
  Scale,
} from 'lucide-react';
import {
  TrigReveal,
  TrigAmbientFloat,
  TrigAmbientDrift,
  TrigArrowSlide,
  MOTION,
} from '../components/TrigScrollAnimations';
import SectionDivider from '../components/SectionDivider';

/* ─────────────────────────────────────────────────────────────
   Safety Page — Editorial Maritime Safety Narrative
   Sections: Hero → Introduction → Past Challenges (Timeline)
   → Transition → Present Challenges → Geopolitical → CTA
   ───────────────────────────────────────────────────────────── */

/* ── Timeline data for Past Challenges ── */
const PAST_CHALLENGES = [
  {
    id: 'standards',
    letter: 'A',
    icon: BookOpen,
    title: 'Lack of International Safety Standards',
    year: '1912–1914',
    body: 'Before the development of comprehensive international maritime regulations, safety requirements varied considerably between countries and shipping companies. The sinking of the Titanic in 1912 exposed serious shortcomings in lifeboat capacity, emergency preparedness, and radio communications. These events contributed to the adoption of the first International Convention for the Safety of Life at Sea (SOLAS) in 1914.',
    highlight: 'SOLAS (1914)',
  },
  {
    id: 'navigation',
    letter: 'B',
    icon: Compass,
    title: 'Limitations in Navigation Technology',
    year: 'Pre-Modern Era',
    body: 'Mariners relied heavily on celestial navigation, compasses, charts, and visual observations. The absence of modern radar, satellite navigation, and electronic chart systems made it more difficult to detect hazards, avoid collisions, and determine a vessel\'s position accurately.',
    highlight: null,
  },
  {
    id: 'fire',
    letter: 'C',
    icon: Flame,
    title: 'Ship Design and Fire Safety',
    year: '1934',
    body: 'Earlier vessels often had less sophisticated fire-detection systems, limited firefighting arrangements, and fewer advanced methods of compartmentalisation. Major casualties, including the Morro Castle disaster in 1934, highlighted the need for stronger fire prevention and emergency response measures.',
    highlight: 'Morro Castle disaster',
  },
  {
    id: 'training',
    letter: 'D',
    icon: Anchor,
    title: 'Human Factors and Training',
    year: '1978',
    body: 'Formalised international training and certification standards were less developed. Fatigue, inadequate supervision, poor communication, and inconsistent emergency training contributed to maritime accidents.',
    body2: 'The adoption of the International Convention on Standards of Training, Certification and Watchkeeping for Seafarers (STCW) in 1978 marked a major step towards establishing internationally recognised training and competency requirements.',
    highlight: 'STCW (1978)',
  },
];

const CONVENTIONS = [
  { abbr: 'SOLAS', full: 'Safety of Life at Sea' },
  { abbr: 'MARPOL', full: 'Prevention of Pollution from Ships' },
  { abbr: 'STCW', full: 'Standards of Training, Certification and Watchkeeping' },
  { abbr: 'ISM Code', full: 'International Safety Management' },
  { abbr: 'ISPS Code', full: 'International Ship and Port Facility Security' },
  { abbr: 'MLC, 2006', full: 'Maritime Labour Convention' },
];

const CONFLICT_REGIONS = [
  {
    name: 'Strait of Hormuz',
    description: 'Critical chokepoint for global energy transport.',
  },
  {
    name: 'Red Sea and Gulf of Aden',
    description: 'Key corridor connecting Europe, Asia, and East Africa.',
  },
  {
    name: 'Black Sea',
    description: 'Affected by ongoing regional conflict impacting merchant shipping.',
  },
];

/* ── Reusable: Section label ── */
function SectionLabel({ children, dark = false }) {
  return (
    <span
      className={`inline-block text-xs font-mono uppercase tracking-[0.25em] mb-6 ${
        dark ? 'text-marine-400' : 'text-marine-600'
      }`}
    >
      {children}
    </span>
  );
}

/* ── Reusable: Timeline item ── */
function TimelineItem({ item, index, isLast }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const isEven = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div ref={ref} className="relative">
      {/* Desktop: alternating layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0 lg:gap-0 items-start">
        {/* Left column (content on even, empty on odd) */}
        <div className={`${isEven ? '' : 'hidden lg:block'}`}>
          {isEven && (
            <TrigReveal direction="right" amplitude={30} duration={0.7}>
              <div className="lg:text-right lg:pr-12 pb-8 lg:pb-0">
                <TimelineContent item={item} inView={inView} alignRight />
              </div>
            </TrigReveal>
          )}
        </div>

        {/* Center spine */}
        <div className="hidden lg:flex flex-col items-center relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-marine-300/60 via-marine-400/40 to-marine-300/20 origin-top"
          />
          {/* Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-marine-400 shadow-lg shadow-marine-500/10"
          >
            <Icon className="w-6 h-6 text-marine-600" strokeWidth={1.5} />
          </motion.div>
          {/* Year tag */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-xs font-mono text-marine-500 tracking-wider whitespace-nowrap"
          >
            {item.year}
          </motion.span>
          {/* Continuation line */}
          {!isLast && (
            <div className="flex-1 w-px bg-gradient-to-b from-marine-300/40 to-transparent mt-4" />
          )}
        </div>

        {/* Right column (content on odd, empty on even) */}
        <div className={`${!isEven ? '' : 'hidden lg:block'}`}>
          {!isEven && (
            <TrigReveal direction="left" amplitude={30} duration={0.7}>
              <div className="lg:pl-12 pb-8 lg:pb-0">
                <TimelineContent item={item} inView={inView} />
              </div>
            </TrigReveal>
          )}
        </div>
      </div>

      {/* Mobile: simple vertical layout (visible below lg) */}
      <div className="lg:hidden">
        <TrigReveal direction="up" amplitude={20} duration={0.6}>
          <div className="flex gap-4 items-start">
            {/* Mobile spine */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-marine-400 shadow-md">
                <Icon className="w-5 h-5 text-marine-600" strokeWidth={1.5} />
              </div>
              {!isLast && <div className="flex-1 w-px bg-marine-200 mt-2" />}
            </div>
            <div className="pb-12 flex-1 min-w-0">
              <span className="text-xs font-mono text-marine-500 tracking-wider">{item.year}</span>
              <TimelineContent item={item} inView={inView} mobile />
            </div>
          </div>
        </TrigReveal>
      </div>
    </div>
  );
}

function TimelineContent({ item, inView, alignRight = false, mobile = false }) {
  return (
    <div className={alignRight ? 'lg:text-right' : ''}>
      {!mobile && (
        <span className="text-xs font-mono text-marine-500 tracking-wider lg:hidden">
          {item.year}
        </span>
      )}
      <h3
        className={`text-xl sm:text-2xl font-bold text-navy-900 mt-1 mb-3 ${
          mobile ? '' : 'lg:mt-0'
        }`}
      >
        {item.title}
      </h3>
      <p className="text-navy-600 leading-relaxed text-[15px] sm:text-base font-light">
        {item.body}
      </p>
      {item.body2 && (
        <p className="text-navy-600 leading-relaxed text-[15px] sm:text-base font-light mt-3">
          {item.body2}
        </p>
      )}
      {item.highlight && (
        <motion.span
          initial={{ opacity: 0, x: alignRight ? 10 : -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-marine-50 border border-marine-200 text-xs font-semibold text-marine-700 tracking-wide"
        >
          <Shield className="w-3 h-3" />
          {item.highlight}
        </motion.span>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function Safety() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [presentRef, presentInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [geoRef, geoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative bg-white">
      {/* ─── Section A: Editorial Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-end overflow-hidden bg-navy-950"
      >
        {/* Background image with parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/assets/aboutuspics/wikimediaimages-arco-humber-883867_1920.jpg"
            alt="Commercial vessel navigating open waters"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16 sm:pb-24 pt-32">
            <div className="max-w-4xl">
              <TrigReveal direction="up" amplitude={20} duration={0.6}>
                <SectionLabel dark>Maritime Safety &amp; Security</SectionLabel>
              </TrigReveal>

              <TrigReveal direction="up" amplitude={40} delay={0.1} duration={0.9}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.92] text-white mb-6">
                  MARITIME SAFETY:
                  <br />
                  <span className="text-marine-400">
                    PAST AND PRESENT
                    <br className="hidden sm:block" />
                    {' '}CHALLENGES
                  </span>
                </h1>
              </TrigReveal>

              <TrigReveal direction="up" amplitude={20} delay={0.25} duration={0.7}>
                <p className="text-lg sm:text-xl text-navy-200 max-w-2xl leading-relaxed font-light italic">
                  From Traditional Navigation Risks to Modern Warfare and Global Maritime Security
                </p>
              </TrigReveal>

              {/* Scroll cue */}
              <TrigReveal direction="up" amplitude={10} delay={0.5} duration={0.6}>
                <a
                  href="#introduction"
                  className="inline-flex items-center gap-2 mt-10 text-sm text-marine-400/70 hover:text-marine-300 transition-colors group"
                  aria-label="Scroll to introduction"
                >
                  <span className="font-mono tracking-wider text-xs uppercase">Read more</span>
                  <TrigAmbientFloat amplitude={4} period={2000}>
                    <ChevronDown className="w-4 h-4" />
                  </TrigAmbientFloat>
                </a>
              </TrigReveal>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Divider: Hero → Introduction ─── */}
      <SectionDivider type="coast" fromColor="#080a0d" toColor="white" height={100} />

      {/* ─── Section B: Introduction ─── */}
      <section
        id="introduction"
        ref={introRef}
        className="relative bg-white py-20 sm:py-28 lg:py-36"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <TrigReveal direction="up" amplitude={20} duration={0.6}>
            <SectionLabel>1. Introduction</SectionLabel>
          </TrigReveal>

          <div className="space-y-8">
            <TrigReveal direction="up" amplitude={25} delay={0.1} duration={0.7}>
              <p className="text-lg sm:text-xl text-navy-700 leading-relaxed font-light">
                Maritime safety has evolved significantly over the past century. In the early days of
                commercial shipping, safety measures were often introduced in response to major
                accidents and loss of life. Today, international conventions, advanced navigation
                systems, and improved emergency procedures have made shipping considerably safer.
              </p>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={25} delay={0.15} duration={0.7}>
              <p className="text-lg sm:text-xl text-navy-700 leading-relaxed font-light">
                However, modern shipping faces challenges that extend beyond traditional accidents.
                Geopolitical conflicts, attacks on commercial vessels, cyber threats, climate change,
                human fatigue, and the introduction of alternative marine fuels have created a more
                complex maritime environment.
              </p>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={25} delay={0.2} duration={0.7}>
              <p className="text-lg sm:text-xl text-navy-700 leading-relaxed font-light">
                The ongoing conflicts affecting the Middle East, the Red Sea, and the Black Sea
                demonstrate that merchant shipping is increasingly exposed to risks beyond the control
                of individual vessels and their crews. The International Maritime Organization (IMO)
                has repeatedly warned that attacks on merchant ships endanger civilian seafarers and
                disrupt international trade.
              </p>
            </TrigReveal>
          </div>

          {/* Pull quote */}
          <TrigReveal direction="up" amplitude={20} delay={0.25} duration={0.8}>
            <blockquote className="relative mt-14 sm:mt-16 pl-6 sm:pl-8 border-l-[3px] border-marine-400">
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-navy-900 leading-snug tracking-tight">
                "Maritime safety is no longer just about preventing accidents at sea; it is also about
                protecting human life in an increasingly unpredictable world."
              </p>
            </blockquote>
          </TrigReveal>
        </div>
      </section>

      {/* ─── Divider: Introduction → Past Challenges ─── */}
      <SectionDivider type="deep" fromColor="white" toColor="#0f1318" height={110} />

      {/* ─── Section C: Past Challenges — Timeline ─── */}
      <section className="relative bg-navy-900 pt-20 sm:pt-28 lg:pt-36 pb-6">
        {/* Section heading */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mb-16 sm:mb-20">
          <TrigReveal direction="up" amplitude={20} duration={0.6}>
            <SectionLabel dark>2. Historical Context</SectionLabel>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05] mb-4">
              PAST CHALLENGES:
              <br />
              <span className="text-marine-400">THE EARLY ERA OF MARITIME SAFETY</span>
            </h2>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
            <p className="text-lg sm:text-xl text-navy-300 font-light leading-relaxed max-w-3xl">
              In the past, maritime safety was largely reactive, with important improvements often
              following major accidents.
            </p>
          </TrigReveal>
        </div>
      </section>

      {/* ─── Divider: Navy heading → White timeline ─── */}
      <SectionDivider type="rugged" fromColor="#0f1318" toColor="white" height={90} />

      {/* Timeline on white */}
      <section className="relative bg-white py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {PAST_CHALLENGES.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === PAST_CHALLENGES.length - 1}
            />
          ))}
        </div>

        {/* Past lessons takeaway */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-16 sm:mt-20">
          <TrigReveal direction="up" amplitude={20} duration={0.7}>
            <div className="relative p-8 sm:p-10 rounded-2xl bg-navy-50 border border-navy-200 text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-marine-500 flex items-center justify-center shadow-md shadow-marine-500/20">
                <Navigation className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <p className="text-lg sm:text-xl font-semibold text-navy-800 leading-snug">
                The lesson from the past: Maritime safety improved when accidents were investigated,
                weaknesses were identified, and regulations were strengthened.
              </p>
            </div>
          </TrigReveal>
        </div>
      </section>

      {/* ─── Section D: Transition — Past to Present ─── */}
      <section className="relative bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          <TrigReveal direction="up" amplitude={20} duration={0.7}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl shadow-navy-900/10 border border-navy-100">
              {/* Past side */}
              <div className="relative bg-navy-900 p-8 sm:p-12 flex flex-col justify-center min-h-[220px]">
                <TrigAmbientDrift
                  amplitudeX={2}
                  amplitudeY={1}
                  periodX={8000}
                  periodY={12000}
                  className="absolute top-6 right-6 text-marine-500/15"
                >
                  <Compass className="w-16 h-16" strokeWidth={0.8} />
                </TrigAmbientDrift>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-3">
                  Then
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                  Reactive Safety
                </h3>
                <p className="text-navy-300 font-light leading-relaxed text-sm sm:text-base">
                  Regulations born from tragedy. Standards written after lives were lost. A world where
                  safety followed disaster.
                </p>
              </div>

              {/* Present side */}
              <div className="relative bg-white p-8 sm:p-12 flex flex-col justify-center min-h-[220px]">
                <TrigAmbientDrift
                  amplitudeX={2}
                  amplitudeY={1}
                  periodX={10000}
                  periodY={14000}
                  className="absolute top-6 right-6 text-marine-400/10"
                >
                  <Shield className="w-16 h-16" strokeWidth={0.8} />
                </TrigAmbientDrift>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-marine-600 mb-3">
                  Now
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 leading-tight mb-3">
                  Proactive Resilience
                </h3>
                <p className="text-navy-600 font-light leading-relaxed text-sm sm:text-base">
                  Comprehensive regulatory frameworks. But new threats emerge faster than policy:
                  geopolitics, cyber warfare, and environmental disruption.
                </p>
              </div>
            </div>
          </TrigReveal>
        </div>
      </section>

      {/* ─── Divider: White → Navy (Present Challenges) ─── */}
      <SectionDivider type="ripple" fromColor="white" toColor="#0f1318" height={110} />

      {/* ─── Section E: Present Challenges — 2026 ─── */}
      <section ref={presentRef} className="relative bg-navy-900 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <TrigReveal direction="up" amplitude={20} duration={0.6}>
            <SectionLabel dark>3. Modern Landscape</SectionLabel>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.05] mb-4">
              PRESENT CHALLENGES:
              <br />
              <span className="text-marine-400">THE MARITIME INDUSTRY IN 2026</span>
            </h2>
          </TrigReveal>

          <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
            <div className="max-w-3xl space-y-6 mt-8 sm:mt-10">
              <p className="text-lg sm:text-xl text-navy-200 font-light leading-relaxed">
                Modern shipping operates under an extensive regulatory framework that includes SOLAS,
                MARPOL, STCW, the ISM Code, the ISPS Code, and the Maritime Labour Convention, 2006.
              </p>
              <p className="text-lg sm:text-xl text-navy-200 font-light leading-relaxed">
                Nevertheless, the existence of regulations does not eliminate every risk. The
                challenges of modern shipping increasingly involve the interaction of human
                performance, advanced technology, commercial interests, environmental
                responsibilities, and geopolitical instability.
              </p>
            </div>
          </TrigReveal>

          {/* Conventions grid */}
          <div className="mt-14 sm:mt-16">
            <TrigReveal direction="up" amplitude={15} duration={0.6}>
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-6">
                International Conventions &amp; Frameworks
              </h3>
            </TrigReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONVENTIONS.map((conv, i) => (
                <TrigReveal
                  key={conv.abbr}
                  direction="up"
                  amplitude={20}
                  delay={0.05 * i}
                  duration={0.6}
                >
                  <div className="p-5 rounded-xl bg-navy-800/50 border border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-2">
                      <Scale className="w-4 h-4 text-marine-400 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm font-bold text-white tracking-wide">
                        {conv.abbr}
                      </span>
                    </div>
                    <p className="text-sm text-navy-400 font-light">{conv.full}</p>
                  </div>
                </TrigReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider: Navy → Dark Navy (Geopolitical) ─── */}
      <SectionDivider type="coast" fromColor="#0f1318" toColor="white" height={100} />

      {/* ─── Section F: War, Geopolitics, Maritime Security ─── */}
      <section ref={geoRef} className="relative bg-white py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: image + accent */}
            <TrigReveal direction="left" amplitude={30} duration={0.8}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy-900/15">
                  <img
                    src="/assets/aboutuspics/papazachariasa-ship-6282376_1920.jpg"
                    alt="Merchant vessel at sea illustrating the maritime security environment"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                {/* Floating accent */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-navy-900 text-white rounded-xl p-4 sm:p-5 shadow-xl max-w-[200px] sm:max-w-[240px]">
                  <AlertTriangle className="w-5 h-5 text-marine-400 mb-2" strokeWidth={1.5} />
                  <p className="text-xs sm:text-sm font-light text-navy-200 leading-snug">
                    Armed conflicts threaten merchant vessels and civilian crews worldwide.
                  </p>
                </div>
              </div>
            </TrigReveal>

            {/* Right: editorial content */}
            <div>
              <TrigReveal direction="up" amplitude={20} duration={0.6}>
                <SectionLabel>3A. Geopolitical Security</SectionLabel>
              </TrigReveal>

              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.05] mb-6">
                  War, Geopolitical Conflicts, and Maritime Security
                </h2>
              </TrigReveal>

              <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
                <p className="text-lg text-navy-600 font-light leading-relaxed mb-4">
                  One of the most serious contemporary challenges is the impact of armed conflicts on
                  international shipping.
                </p>
              </TrigReveal>

              <TrigReveal direction="up" amplitude={20} delay={0.25} duration={0.7}>
                <p className="text-lg text-navy-600 font-light leading-relaxed mb-8">
                  The Strait of Hormuz, the Red Sea and Gulf of Aden, and the Black Sea have
                  demonstrated how regional conflicts can threaten merchant vessels and civilian crews.
                </p>
              </TrigReveal>

              {/* Conflict regions */}
              <div className="space-y-4">
                {CONFLICT_REGIONS.map((region, i) => (
                  <TrigReveal
                    key={region.name}
                    direction="up"
                    amplitude={15}
                    delay={0.3 + i * 0.08}
                    duration={0.6}
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50 border border-navy-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-marine-400" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-900 text-sm sm:text-base">
                          {region.name}
                        </h4>
                        <p className="text-sm text-navy-500 font-light mt-0.5">
                          {region.description}
                        </p>
                      </div>
                    </div>
                  </TrigReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider: White → Navy (CTA) ─── */}
      <SectionDivider type="deep" fromColor="white" toColor="#0f1318" height={100} />

      {/* ─── CTA Section ─── */}
      <section className="relative bg-navy-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <TrigReveal direction="up" amplitude={25} duration={0.7}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Ready to sail safely?
              <br />
              <span className="text-marine-400">Start the conversation.</span>
            </h2>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.6}>
            <p className="text-navy-300 font-light text-lg max-w-xl mx-auto mb-8">
              Get in touch with our team to learn more about our maritime safety and operational
              standards.
            </p>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={15} delay={0.25} duration={0.6}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-all"
            >
              <span>Get in touch</span>
              <motion.span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <TrigArrowSlide distance={3}>
                  <ArrowRight className="h-4 w-4" />
                </TrigArrowSlide>
              </motion.span>
            </Link>
          </TrigReveal>
        </div>
      </section>
    </div>
  );
}
