
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  Compass,
  Ship,
  Waves,
} from 'lucide-react';

import HeroVideoCarousel from '../components/HeroVideoCarousel';
import CountUp from '../components/CountUp';
import { useHeroScroll } from '../context/HeroScrollContext';

import {
  TrigParallax,
  TrigReveal,
  TrigFloating,
  TrigWaveDivider,
  TrigScrollRotate,
  TrigScrollIndicator,
  TrigBackgroundWave,
  TrigAmbientFloat,
  TrigAmbientDrift,
} from '../components/TrigScrollAnimations';


/* ===================== HERO COMPOSITION ===================== */

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


/* ===================== HERO TEXT ===================== */

function HeroComposition({ scene, isExiting = false }) {
  return (
    <div
      className={`flex flex-col gap-5 ${COMPOSITION_ALIGN[scene.composition]} ${COMPOSITION_WIDTH[scene.composition]}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id + '-eyebrow'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-marine-950/60 border border-marine-400/30 text-marine-300 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md"
        >
          {scene.eyebrow}
        </motion.div>
      </AnimatePresence>

      <h1
        className={`erica-one text-white drop-shadow-md text-4xl sm:text-6xl lg:text-7xl ${HEADLINE_STYLE[scene.composition]}`}
      >
        {scene.headline.map((line, i) => (
          <span key={i} className="block">
            {i === scene.headline.length - 1 ? (
              <span className="font-space font-bold text-marine-300">
                {line}
              </span>
            ) : (
              <span className="erica-one">{line}</span>
            )}
          </span>
        ))}
      </h1>

      <p className="text-base prompt sm:text-lg text-slate-200 leading-relaxed max-w-xl font-light drop-shadow">
        {scene.body}
      </p>

      <div className="mt-4">
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
    </div>
  );
}


/* ===================== HOME CONTENT ===================== */

function HomeContent() {
  const { heroRef } = useHeroScroll();

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
      <TrigScrollIndicator color="#0ea5e9" height={3} />

      {/* Decorative floating icons */}

      <TrigFloating
        amplitude={15}
        period={6000}
        className="fixed top-1/3 left-8 w-8 h-8 text-marine-400/20 pointer-events-none z-0 hidden lg:block"
      >
        <Anchor className="w-full h-full" strokeWidth={1} />
      </TrigFloating>

      <TrigFloating
        amplitude={20}
        period={7000}
        horizontal
        horizontalAmplitude={10}
        className="fixed top-2/3 right-12 w-10 h-10 text-marine-400/15 pointer-events-none z-0 hidden lg:block"
      >
        <Waves className="w-full h-full" strokeWidth={1} />
      </TrigFloating>

      <TrigScrollRotate
        maxDegrees={10}
        easing="organic"
        className="fixed top-1/2 right-1/4 w-6 h-6 text-marine-400/20 pointer-events-none z-0 hidden lg:block"
      >
        <TrigFloating amplitude={12} period={5500} horizontal>
          <Compass className="w-full h-full" strokeWidth={1} />
        </TrigFloating>
      </TrigScrollRotate>

      {/* Ambient floating elements */}

      <TrigAmbientFloat
        amplitude={2}
        period={25000}
        className="fixed top-1/3 left-8 w-8 h-8 text-marine-400/15 pointer-events-none z-0 hidden lg:block"
      >
        <Anchor className="w-full h-full" strokeWidth={1} />
      </TrigAmbientFloat>

      <TrigAmbientFloat
        amplitude={2}
        period={30000}
        horizontal
        horizontalAmplitude={2}
        className="fixed top-2/3 right-12 w-10 h-10 text-marine-400/10 pointer-events-none z-0 hidden lg:block"
      >
        <Waves className="w-full h-full" strokeWidth={1} />
      </TrigAmbientFloat>

      <TrigAmbientDrift
        amplitudeX={1}
        amplitudeY={1}
        periodX={20000}
        periodY={25000}
        className="fixed top-1/2 right-1/4 w-6 h-6 text-marine-400/15 pointer-events-none z-0 hidden lg:block"
      >
        <Compass className="w-full h-full" strokeWidth={1} />
      </TrigAmbientDrift>


      {/* ===================== HERO ===================== */}

      <HeroVideoCarousel ref={heroRef}>
        {({ scene, isExiting }) => (
          <HeroComposition scene={scene} isExiting={isExiting} />
        )}
      </HeroVideoCarousel>


      {/* ===================== HERO WAVE DIVIDER ===================== */}

      <TrigWaveDivider
        fromColor="#0f1318"
        toColor="white"
        height={140}
        baseSpeed={1.5}
        layers={[
          { frequency: 1.3, amplitude: 22, speed: 0.014, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.1, amplitude: 14, speed: 0.026, phaseOffset: 1.2, opacity: 0.55 },
          { frequency: 3.8, amplitude: 8, speed: 0.042, phaseOffset: 2.5, opacity: 0.30 },
        ]}
      />


      {/* ===================== WHAT WE DO ===================== */}

      <section className="bg-white text-navy-900 relative overflow-hidden">

        <TrigBackgroundWave
          className="opacity-20"
          baseColor="rgba(14, 165, 233, 0.03)"
          amplitude={25}
          frequency={0.4}
          speed={0.00025}
          layerCount={2}
        />

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">

          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* LEFT: TEXT */}

            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-marine-600 mb-4">
                What We Do
              </span>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-navy-900 mb-6">
                Navigating Maritime Needs.<br />
                Delivering Marine Solutions.
              </h2>

              <p className="text-base sm:text-lg text-navy-600 leading-relaxed max-w-xl">
                We are dedicated to providing marine services and solutions that support the evolving needs of the maritime industry. Through a practical, client-focused approach, we aim to make maritime operations more efficient and reliable.
              </p>

              <div className="mt-8">
                <Link
                  to="/services"
                  className="relative z-40 pointer-events-auto inline-flex items-center gap-2 rounded-full bg-marine-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-marine-950/20 hover:bg-marine-400 transition-all"
                >
                  <span>Explore Our Services →</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>


            {/* RIGHT: LOGO ON LIGHT BACKGROUND */}

            <div className="relative flex items-center justify-center">

              <img
                src="/logo-with-name.png"
                alt="Marevita Marine Private Limited logo"
                className="
                  block
                  w-full
                  max-w-[650px]
                  h-auto
                  object-contain
                  bg-transparent
                "
              />

            </div>

          </div>
        </div>
      </section>


      {/* ===================== WAVE DIVIDER ===================== */}

      <TrigWaveDivider
        fromColor="white"
        toColor="#0f1318"
        height={140}
        baseSpeed={1.3}
        layers={[
          { frequency: 1.1, amplitude: 20, speed: 0.012, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.3, amplitude: 13, speed: 0.024, phaseOffset: 1.5, opacity: 0.55 },
          { frequency: 4.0, amplitude: 7, speed: 0.038, phaseOffset: 2.8, opacity: 0.30 },
        ]}
      />


      {/* ===================== STATS ===================== */}

      <section className="bg-navy-900 text-white relative overflow-hidden">

        <TrigParallax
          strength={-40}
          easing="organic"
          className="absolute top-10 right-10 w-32 h-32 text-marine-400/10 pointer-events-none"
        >
          <Compass className="w-full h-full" strokeWidth={0.5} />
        </TrigParallax>

        <TrigParallax
          strength={30}
          easing="sine"
          className="absolute bottom-10 left-10 w-24 h-24 text-marine-400/8 pointer-events-none"
        >
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
                  <CountUp
                    to={stat.value}
                    delay={0.1 + i * 0.12}
                    duration={1.1}
                  />
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


      {/* ===================== STATS WAVE DIVIDER ===================== */}

      <TrigWaveDivider
        fromColor="#0f1318"
        toColor="white"
        height={140}
        baseSpeed={1.4}
        layers={[
          { frequency: 1.4, amplitude: 19, speed: 0.013, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.2, amplitude: 12, speed: 0.025, phaseOffset: 1.3, opacity: 0.55 },
          { frequency: 3.6, amplitude: 7, speed: 0.040, phaseOffset: 2.6, opacity: 0.30 },
        ]}
      />


      {/* ===================== WHY CHOOSE US ===================== */}

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

          <div className="max-w-3xl mb-16">

            <TrigReveal direction="up" amplitude={30} duration={0.8}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                Why operators partner long term.
              </h2>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.7}>
              <p className="mt-6 text-lg text-navy-600 max-w-2xl leading-relaxed">
                The maritime industry rewards quiet, disciplined, and reliable service. We bring hands-on marine command directly into shore operations.
              </p>
            </TrigReveal>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

            {differentiators.map((item, i) => (
              <TrigReveal
                key={item.title}
                direction="up"
                amplitude={25}
                delay={i * 0.1}
                duration={0.6}
              >
                <div className="p-8 rounded-2xl border border-navy-100 bg-navy-50/30 hover:border-marine-200 transition-colors">

                  <div className="flex items-center gap-4 mb-4">

                    <div className="w-10 h-10 rounded-xl bg-marine-50 text-marine-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <h3 className="text-xl font-bold text-navy-900">
                      {item.title}
                    </h3>

                  </div>

                  <p className="text-navy-600 leading-relaxed text-sm sm:text-base pl-14">
                    {item.description}
                  </p>

                </div>
              </TrigReveal>
            ))}

          </div>
        </div>
      </section>


      {/* ===================== WHITE TO BLACK WAVE ===================== */}

      <TrigWaveDivider
        fromColor="white"
        toColor="#0f1318"
        height={120}
        baseSpeed={1.2}
        layers={[
          { frequency: 1.0, amplitude: 17, speed: 0.011, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.5, amplitude: 11, speed: 0.023, phaseOffset: 1.6, opacity: 0.55 },
          { frequency: 4.2, amplitude: 6, speed: 0.036, phaseOffset: 3.0, opacity: 0.30 },
        ]}
      />


      {/* ===================== CTA ===================== */}

      <section className="bg-navy-900 text-white relative overflow-hidden">

        <TrigFloating
          amplitude={25}
          period={8000}
          className="absolute top-20 left-20 w-16 h-16 text-marine-400/10 pointer-events-none"
        >
          <Ship className="w-full h-full" strokeWidth={0.5} />
        </TrigFloating>

        <TrigFloating
          amplitude={20}
          period={6500}
          horizontal
          horizontalAmplitude={15}
          className="absolute bottom-32 right-32 w-20 h-20 text-marine-400/8 pointer-events-none"
        >
          <Waves className="w-full h-full" strokeWidth={0.5} />
        </TrigFloating>

        <TrigScrollRotate
          maxDegrees={15}
          easing="organic"
          className="absolute top-1/2 left-1/3 w-12 h-12 text-marine-400/10 pointer-events-none"
        >
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
                  Contact our team

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
              24/7 Support: info@marevitamarine.com
            </p>
          </TrigReveal>

        </div>
      </section>

    </div>
  );
}


/* ===================== EXPORT ===================== */

export default function Home() {
  return <HomeContent />;
}
