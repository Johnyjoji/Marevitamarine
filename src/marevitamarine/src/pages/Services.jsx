import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Anchor,
  Users,
  Ship,
  CheckCircle2,
  Wrench,
  Compass,
  GraduationCap,
  ClipboardCheck,
  ServerCog,
  RefreshCw,
  Briefcase,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigFloating,
  TrigScrollRotate,
  TrigBackgroundWave,
  TrigAmbientFloat,
  TrigAmbientDrift,
  TrigAmbientBreath,
  TrigAmbientScale,
  TrigAmbientRotate,
  TrigAmbientGradientShift,
  TrigCardHover,
  MOTION,
} from '../components/TrigScrollAnimations';
import StackedCardSection from '../components/StackedCardSection';

export default function Services() {
  const navigate = useNavigate();
  const [coreRef, coreInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [extendedRef, extendedInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [diffRef, diffInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Enable smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const coreServices = [
    {
      icon: Users,
      title: 'CREW MANNING',
      desc: 'Professional recruitment and placement of qualified seafarers across all ranks and vessel types.',
      eyebrow: 'People'
    },
    {
      icon: Wrench,
      title: 'TECHNICAL MANAGEMENT & GUIDANCE',
      desc: 'Expert oversight and technical support for vessel maintenance, dry-docking, and class compliance.',
      eyebrow: 'Engineering'
    },
    {
      icon: Ship,
      title: 'VESSEL OPERATIONS & SUPPORT',
      desc: 'Streamlining operational efficiency for seamless voyages — from port planning to voyage optimization.',
      eyebrow: 'Operations'
    },
    {
      icon: GraduationCap,
      title: 'MARITIME TRAINING',
      desc: 'Comprehensive training solutions delivered on-board, ashore, and online for continuous competency.',
      eyebrow: 'Training'
    },
    {
      icon: ClipboardCheck,
      title: 'MARINE CONSULTANCY & INSPECTIONS',
      desc: 'High-level advisory and rigorous vessel inspections for pre-purchase, condition, and class surveys.',
      eyebrow: 'Consultancy'
    },
    {
      icon: CheckCircle2,
      title: 'SAFETY, COMPLIANCE & DOCUMENTATION',
      desc: 'Ensuring full adherence to international maritime laws, flag state requirements, and safety standards.',
      eyebrow: 'Safety'
    },
  ];

  const enhancedServices = [
    {
      icon: ServerCog,
      title: 'DIGITAL SOLUTIONS & MONITORING',
      desc: 'Advanced fleet monitoring, predictive maintenance scheduling, and data-driven operational insights.',
      eyebrow: 'Digital'
    },
    {
      icon: RefreshCw,
      title: 'LIFECYCLE SUPPORT',
      desc: 'End-to-end vessel management from acquisition through operation to responsible recycling.',
      eyebrow: 'Lifecycle'
    },
    {
      icon: Briefcase,
      title: 'PROJECT MANAGEMENT',
      desc: 'Guaranteed safe, timely, regulation‑compliant project completion with experienced teams.',
      eyebrow: 'Projects'
    },
    {
      icon: ShieldCheck,
      title: '24/7 EMERGENCY RESPONSE',
      desc: 'Round-the-clock support for critical situations, crisis management, and immediate assistance.',
      eyebrow: 'Response'
    },
  ];

  const differentiators = [
    { icon: Shield, title: '24/7 Global Support', desc: 'Round-the-clock monitoring across all time zones.' },
    { icon: Users, title: 'Experienced Team', desc: 'Certified professionals with decades of combined expertise.' },
    { icon: CheckCircle2, title: 'Cost Efficiency', desc: 'Optimized processes delivering measurable savings.' },
  ];

  return (
    <div>
      {/* ============================================================
          SECTION 0: HERO (Dark #0f1318)
          ============================================================ */}
      <StackedCardSection index={0} total={6} targetScale={0.88} cardClassName="bg-navy-950">
        <section className="relative bg-navy-900 text-white overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
          {/* Ambient background glow */}
          <TrigAmbientGradientShift
            amplitudeX={4}
            amplitudeY={2}
            period={MOTION.duration.ambientSlowest}
            className="absolute inset-0 opacity-15 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-marine-600/30 via-transparent to-marine-900/40" />
          </TrigAmbientGradientShift>

          {/* Ambient floating decorative icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <TrigAmbientDrift
              amplitudeX={MOTION.amplitude.small}
              amplitudeY={MOTION.amplitude.small}
              periodX={MOTION.duration.ambientSlow}
              periodY={MOTION.duration.ambientSlower}
              className="absolute top-24 right-12 w-14 h-14 text-marine-400/10 hidden md:block"
            >
              <Compass className="w-full h-full" strokeWidth={1} />
            </TrigAmbientDrift>
            <TrigAmbientRotate
              maxDegrees={5}
              period={MOTION.duration.ambientSlowest}
              className="absolute bottom-20 left-10 w-12 h-12 text-marine-400/10 hidden md:block"
            >
              <Anchor className="w-full h-full" strokeWidth={1} />
            </TrigAmbientRotate>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
            <TrigAmbientFloat amplitude={1.5} period={25000}>
              <div className="relative z-40 pointer-events-auto inline-flex items-center gap-2 rounded-full bg-marine-500/10 border border-marine-400/20 px-4 py-1.5 text-xs font-mono tracking-widest text-marine-300 uppercase mb-6 backdrop-blur-sm">
                <Anchor className="h-3.5 w-3.5 text-marine-400" />
                <span>Marevita Marine Services</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                Comprehensive Marine Services <br />
                <span className="text-marine-400">
                  for Every Voyage.
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-3xl leading-relaxed">
                From technical management to crew solutions, we provide accountable, end-to-end marine services that ensure safe, efficient, and compliant operations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#core-services"
                  className="relative z-40 pointer-events-auto inline-flex items-center gap-2 rounded-full bg-marine-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-marine-950/60 hover:bg-marine-400 transition-all"
                >
                  <span>Explore Core Services</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="relative z-40 pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </TrigAmbientFloat>
          </div>
        </section>
      </StackedCardSection>

      {/* Core Services — White (index=1 of stacked deck) */}
      <StackedCardSection
        index={1}
        total={6}
        targetScale={0.92}
        cardClassName="bg-white shadow-[0_-35px_80px_rgba(0,0,0,0.35)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-navy-100"
      >
        <section ref={coreRef} className="relative overflow-hidden">
          <TrigBackgroundWave
            className="opacity-20"
            baseColor="rgba(14, 165, 233, 0.03)"
            amplitude={25}
            frequency={0.4}
            speed={0.00015}
            layerCount={2}
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24 relative z-10">
            <div className="mb-12 text-center">
              <TrigReveal direction="up" amplitude={20} duration={0.7}>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-marine-600">
                  Core Services
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                  The Foundation of Our Expertise<br/><span className="text-marine-400">What We Do Best</span>
                </h2>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
                <p className="mt-6 text-lg text-navy-600 max-w-xl text-center">
                  These services form the backbone of Marevita Marine's offerings, refined through years of industry experience and client partnerships.
                </p>
              </TrigReveal>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {coreServices.map((service, i) => {
                const slug = service.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={service.title} to={`/services#${slug}`} className="block">
                    <TrigCardHover
                      initial={{ opacity: 0, y: 30 }}
                      animate={coreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group relative bg-white rounded-xl border border-navy-100/50 p-6 hover:border-navy-200/75 overflow-hidden"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-marine-500 flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-navy-900 leading-tight">{service.title}</h3>
                        </div>
                      </div>
                      <p className="text-navy-700 leading-relaxed mt-3">{service.desc}</p>
                    </TrigCardHover>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </StackedCardSection>

      <TrigWaveDivider
        fromColor="#ffffff"
        toColor="#0f1318"
        height={100}
        baseSpeed={1.5}
        flip={true}
        layers={[
          { frequency: 1.4, amplitude: 18, speed: 0.014, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.1, amplitude: 12, speed: 0.026, phaseOffset: 1.2, opacity: 0.55 },
        ]}
      />

      {/* Enhanced Services — Navy (index=2 of stacked deck) */}
      <StackedCardSection
        index={2}
        total={6}
        targetScale={0.92}
        cardClassName="bg-navy-900 shadow-[0_-35px_80px_rgba(0,0,0,0.55)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10"
      >
        <section ref={extendedRef} className="relative overflow-hidden">
          <TrigBackgroundWave
            className="opacity-15"
            baseColor="rgba(56, 189, 248, 0.02)"
            amplitude={20}
            frequency={0.3}
            speed={0.0001}
            layerCount={3}
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24 relative z-10">
            <div className="mb-12 text-center">
              <TrigReveal direction="up" amplitude={20} duration={0.7}>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-marine-400">
                  Extended Capabilities
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                  <span className="text-white">Comprehensive Marine Solutions</span><br/><span className="text-marine-400">Beyond the Basics</span>
                </h2>
              </TrigReveal>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {enhancedServices.map((service, i) => (
                <TrigCardHover
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={extendedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-600/20 p-6 hover:bg-navy-800/75 overflow-hidden"
                >
                  <div className="flex items-center justify-start mb-3 gap-3">
                    <div className="h-8 w-8 rounded-full bg-marine-500/20 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-marine-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-navy-200 text-sm leading-relaxed mt-3">{service.desc}</p>
                </TrigCardHover>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-navy-800/20">
              <TrigReveal direction="up" amplitude={25} duration={0.7}>
                <div className="text-center">
                  <p className="text-navy-300 text-base max-w-xl mx-auto">
                    Ready to enhance your maritime operations with our full suite of services?
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-6">
                    Get a Custom Solution
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </TrigReveal>
            </div>
          </div>
        </section>
      </StackedCardSection>

      <TrigWaveDivider
        fromColor="#0f1318"
        toColor="#ffffff"
        height={100}
        baseSpeed={1.2}
        flip={true}
        layers={[
          { frequency: 1.0, amplitude: 17, speed: 0.011, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.5, amplitude: 11, speed: 0.023, phaseOffset: 1.6, opacity: 0.55 },
        ]}
      />

      {/* Differentiators — White (index=3 of stacked deck) */}
      <StackedCardSection
        index={3}
        total={6}
        targetScale={0.92}
        cardClassName="bg-white shadow-[0_-35px_80px_rgba(0,0,0,0.35)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-navy-100"
      >
        <section ref={diffRef} className="relative overflow-hidden">
          <TrigBackgroundWave
            className="opacity-10"
            baseColor="rgba(14, 165, 233, 0.02)"
            amplitude={15}
            frequency={0.5}
            speed={0.0002}
            layerCount={2}
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24 relative z-10">
            <div className="space-y-12">
              <div className="text-center">
                <TrigReveal direction="up" amplitude={20} duration={0.6}>
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-600">
                    Why Marevita Marine
                  </span>
                </TrigReveal>
                <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                  <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.05]">
                    The Marevita Difference<br/><span className="text-marine-400">What Sets Us Apart</span>
                  </h2>
                </TrigReveal>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* 24/7 Global Support */}
                <TrigReveal key="support" direction="up" amplitude={15} delay={0.1} duration={0.5}>
                  <TrigCardHover
                    initial={{ opacity: 0, y: 20 }}
                    animate={diffInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    className="flex flex-col items-start text-left p-6 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"
                  >
                    <TrigAmbientBreath scaleAmplitude={0.008} opacityAmplitude={0.05} period={4000}>
                      <Anchor className="h-10 w-10 text-marine-500" />
                    </TrigAmbientBreath>
                    <h3 className="mt-4 text-lg font-semibold text-navy-900">24/7 Global Support</h3>
                    <p className="mt-2 text-sm text-navy-600 max-w-xs leading-relaxed">
                      Round-the-clock monitoring and immediate response capability across all time zones.
                    </p>
                  </TrigCardHover>
                </TrigReveal>

                {/* Experienced Team */}
                <TrigReveal key="experience" direction="up" amplitude={15} delay={0.2} duration={0.5}>
                  <TrigCardHover
                    initial={{ opacity: 0, y: 20 }}
                    animate={diffInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-start text-left p-6 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"
                  >
                    <TrigAmbientFloat amplitude={1} period={5000}>
                      <Users className="h-10 w-10 text-marine-500" />
                    </TrigAmbientFloat>
                    <h3 className="mt-4 text-lg font-semibold text-navy-900">Experienced Team</h3>
                    <p className="mt-2 text-sm text-navy-600 max-w-xs leading-relaxed">
                      Certified maritime professionals with decades of combined industry expertise.
                    </p>
                  </TrigCardHover>
                </TrigReveal>

                {/* Cost Efficiency */}
                <TrigReveal key="efficiency" direction="up" amplitude={15} delay={0.3} duration={0.5}>
                  <TrigCardHover
                    initial={{ opacity: 0, y: 20 }}
                    animate={diffInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-start text-left p-6 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"
                  >
                    <TrigAmbientDrift amplitudeX={1} amplitudeY={1} periodX={8000} periodY={12000}>
                      <CheckCircle2 className="h-10 w-10 text-marine-500" />
                    </TrigAmbientDrift>
                    <h3 className="mt-4 text-lg font-semibold text-navy-900">Cost Efficiency</h3>
                    <p className="mt-2 text-sm text-navy-600 max-w-xs leading-relaxed">
                      Optimized processes delivering measurable operational savings.
                    </p>
                  </TrigCardHover>
                </TrigReveal>
              </div>
            </div>
          </div>
        </section>
      </StackedCardSection>

      <TrigWaveDivider
        fromColor="#ffffff"
        toColor="#0f1318"
        height={100}
        baseSpeed={1.5}
        flip={true}
        layers={[
          { frequency: 1.4, amplitude: 18, speed: 0.014, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.1, amplitude: 12, speed: 0.026, phaseOffset: 1.2, opacity: 0.55 },
        ]}
      />

      {/* Core Service Details — Human, worthy (index=4 of stacked deck) */}
      <StackedCardSection
        index={4}
        total={6}
        targetScale={0.92}
        cardClassName="bg-[#060d1a] text-[#f2f0eb]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0f1318] to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#0ea5e9]/[0.07] blur-[5rem] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-28 lg:py-36 relative z-10">
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-marine-400 mb-4">Service Details</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.04em] text-[#f2f0eb]">Inside Each <span className="italic font-serif text-marine-400">Service</span></h2>
            <p className="mt-6 text-[#a8b8c8] text-lg leading-relaxed">What we deliver, how we do it, and the people behind it — not a brochure, just the real substance.</p>
          </div>
          <div className="grid gap-14 lg:grid-cols-2">
            {coreServices.map((s, i) => {
              const slug = s.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <section key={s.title} id={slug} className="group scroll-mt-28 bg-white/5 border border-white/10 rounded-2xl p-7 lg:p-8 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-marine-400/20 flex items-center justify-center">
                        <s.icon className="h-6 w-6 text-marine-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight leading-tight">{s.title}</h3>
                      <span className="inline-block mt-1 text-xs font-medium text-marine-400 tracking-widest uppercase">{s.eyebrow}</span>
                    </div>
                  </div>
                  <p className="text-navy-200 leading-relaxed mb-4">{s.desc}</p>
                  <p className="text-sm text-navy-300 leading-relaxed mb-5">Our approach pairs deep technical expertise with rigorous compliance checking. Each engagement begins with a structured needs assessment, followed by tailored delivery, continuous reporting, and post-completion review — ensuring measurable results and long-term operational improvement.</p>
                                    <div className="mt-8 h-px bg-gradient-to-r from-marine-400/30 via-white/10 to-transparent" />
                </section>
              );
            })}
          </div>
        </div>
      </StackedCardSection>

      <TrigWaveDivider
        fromColor="#0f1318"
        toColor="#ffffff"
        height={100}
        baseSpeed={1.2}
        flip={true}
        layers={[
          { frequency: 1.1, amplitude: 16, speed: 0.012, phaseOffset: 0, opacity: 1.0 },
          { frequency: 2.4, amplitude: 11, speed: 0.024, phaseOffset: 1.4, opacity: 0.55 },
        ]}
      />

      {/* Final CTA — Navy (index=5 of stacked deck) */}
      <StackedCardSection
        index={5}
        total={6}
        targetScale={0.92}
        cardClassName="bg-navy-900 text-white"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24 lg:py-32 text-center relative overflow-hidden">
          <TrigAmbientFloat amplitude={1.5} period={25000}>
            <TrigReveal direction="up" amplitude={30} duration={0.8}>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">
                Partner with Marevita Marine<br/><span className="text-marine-400">for Complete Maritime Solutions</span>
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.7}>
              <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto">
                Our comprehensive service portfolio ensures every aspect of your maritime operation is handled with expertise, accountability, and the highest standards of service.
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
                    Request a Proposal
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
          </TrigAmbientFloat>
        </div>
      </StackedCardSection>
    </div>
  );
}