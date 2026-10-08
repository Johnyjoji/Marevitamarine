import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Anchor,
  GraduationCap,
  Compass,
  CheckCircle2,
  Wrench,
  Users,
  Ship,
  ClipboardCheck,
  ServerCog,
  RefreshCw,
  Briefcase,
  ShieldCheck,
  Radio,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigBackgroundWave,
  TrigAmbientFloat,
  TrigAmbientBreath,
  TrigAmbientDrift,
  TrigCardHover,
} from '../components/TrigScrollAnimations';

export default function Services() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [coreRef, coreInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [extendedRef, extendedInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [diffRef, diffInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');

  // Smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const coreServices = [
    {
      icon: Users,
      title: 'Crew Manning & Placement',
      tagline: 'Competent hands on deck, vetted for skill and safety culture.',
      desc: 'Precision recruitment, vetting, and placement of certified officers and ratings across all vessel classes — from tankers and bulkers to specialized offshore tugs.',
      eyebrow: 'Seafarers First',
      category: 'manning',
      highlights: ['STCW & MLC 2006 Compliant', '98% Seafarer Retention Rate', 'Multicultural Crew Coordination'],
      fieldNote: '“A ship is only as sound as the crew operating her. We prioritize proven sea-time, competency checks, and genuine crew welfare to ensure seamless bridge-to-engine harmony.”',
      leadTime: 'Immediate pool dispatch',
    },
    {
      icon: Wrench,
      title: 'Technical Management & Guidance',
      tagline: 'Minimizing off-hire days through preventive engineering.',
      desc: 'Comprehensive oversight for vessel maintenance, dry-docking superintendence, machinery overhaul, and classification society survey compliance.',
      eyebrow: 'Precision Engineering',
      category: 'technical',
      highlights: ['Predictive Maintenance Schedules', 'Drydock Superintendency', 'Class & Flag State Compliance'],
      fieldNote: '“Unplanned downtime costs fortunes. Our superintendents stay ahead of machinery wear, spares logistics, and class requirements before a minor defect becomes a voyage halt.”',
      leadTime: 'Dedicated superintendent assigned',
    },
    {
      icon: Ship,
      title: 'Vessel Operations & Voyage Support',
      tagline: 'Optimizing sea passages, bunker consumption, and port turnarounds.',
      desc: 'Round-the-clock commercial and operational support: weather routing, bunkering logistics, port agency coordination, and voyage performance monitoring.',
      eyebrow: 'Voyage Execution',
      category: 'operations',
      highlights: ['Bunker Quality & Fuel Optimization', 'Port Clearance & Husbandry', 'Real-time Voyage Weather Routing'],
      fieldNote: '“Every nautical mile counts. We continuously balance speed, fuel burn, and seasonal weather windows to protect both your cargo timeline and operating margin.”',
      leadTime: '24/7 Global desk monitoring',
    },
    {
      icon: GraduationCap,
      title: 'Maritime Training & Competency',
      tagline: 'Continuous skill building tailored to modern bridge & engine tech.',
      desc: 'Tailored on-board assessments, shore-based simulator drills, and continuous e-learning modules covering bridge resource management, safety protocols, and new environmental rules.',
      eyebrow: 'Skill Development',
      category: 'training',
      highlights: ['Bridge Resource Management (BRM)', 'Engine Room Simulator Drills', 'ISM/ISPS Drills & Audits'],
      fieldNote: '“Regulations evolve constantly. We prepare your mariners for real-world scenarios — electronic navigation failures, emergency response, and new MARPOL standards.”',
      leadTime: 'Custom curriculums on demand',
    },
    {
      icon: ClipboardCheck,
      title: 'Marine Consultancy & Surveys',
      tagline: 'Independent, rigorous technical clarity before major capital decisions.',
      desc: 'Expert pre-purchase condition inspections, damage assessments, safety audits, and valuation surveys conducted with complete objectivity and forensic detail.',
      eyebrow: 'Advisory & Inspections',
      category: 'consultancy',
      highlights: ['Pre-Purchase Condition Surveys', 'On-Hire / Off-Hire Inspections', 'Insurance Claim Assessments'],
      fieldNote: '“Whether acquiring a bulk carrier or evaluating hull condition, we provide an unvarnished, data-backed assessment of actual vessel worth and immediate maintenance liabilities.”',
      leadTime: 'Global surveyor deployment within 48h',
    },
    {
      icon: CheckCircle2,
      title: 'Safety, Quality & ISM Compliance',
      tagline: 'Zero-incident culture and pristine Port State Control audit readiness.',
      desc: 'Document of Compliance (DOC) stewardship, ISM/ISPS/MLC system design, emergency drill structuring, and ongoing regulatory compliance support.',
      eyebrow: 'Regulatory Defense',
      category: 'compliance',
      highlights: ['Document of Compliance (DOC)', 'Zero Port State Detentions Goal', 'Environmental Compliance (MARPOL Tier III)'],
      fieldNote: '“Safety isn’t a binder on a shelf — it is the lived routine on watch. We instill proactive safety protocols that pass port state control audits cleanly on first boarding.”',
      leadTime: 'Full system audit & gap analysis',
    },
  ];

  const enhancedServices = [
    {
      icon: ServerCog,
      title: 'Digital Fleet & Telemetry Solutions',
      desc: 'Remote IoT data logging, fuel flow telemetry, and automated maintenance triggers delivered to your operations dashboard.',
      badge: 'Smart Fleet',
      metric: 'Real-time telemetry'
    },
    {
      icon: RefreshCw,
      title: 'Full Lifecycle Vessel Management',
      desc: 'End-to-end asset stewardship from newbuild design review through decades of commercial voyaging to green recycling.',
      badge: 'Asset Life',
      metric: 'Cradle-to-grave'
    },
    {
      icon: Briefcase,
      title: 'Specialized Project & Conversion Management',
      desc: 'Dedicated engineering teams for scrubber retrofits, ballast water treatment installations, and major structural re-fits.',
      badge: 'Zero-Incident',
      metric: 'Turnkey execution'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Global Marine Crisis Response',
      desc: 'Immediate dispatch coordination for machinery casualties, towage agreements, salvage advisory, and emergency crew relief.',
      badge: 'Always On',
      metric: '< 15min response time'
    },
  ];

  const differentiators = [
    {
      icon: Clock,
      title: 'Unbroken 24/7 Watchkeeping',
      desc: 'Our operations center never sleeps. Duty superintendents and crewing coordinators monitor every vessel in real-time across all global maritime zones.',
      metric: '100% Active Coverage'
    },
    {
      icon: Award,
      title: 'Master Mariners & Chief Engineers',
      desc: 'Our onshore management team is staffed by seasoned mariners with decades of actual command experience on international commercial vessels.',
      metric: 'Deep Sea DNA'
    },
    {
      icon: Shield,
      title: 'Transparent & Accountable Operations',
      desc: 'No hidden procurement markups. Detailed variance reporting, audited vessel accounts, and direct superintendent access for ship owners.',
      metric: 'Audit-Proof Governance'
    },
  ];

  const filteredServices = activeCategory === 'all'
    ? coreServices
    : coreServices.filter(s => s.category === activeCategory);

  return (
    <div className="bg-[#080a0d] text-navy-50 font-sans selection:bg-marine-500 selection:text-white">

      {/* 1. Hero Section — Apple-Tier Cinematic Navy */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[700px] lg:min-h-[820px] flex items-center pt-24 pb-16 bg-gradient-to-b from-[#080a0d] via-[#0b1726] to-[#0f1318]">

        {/* Ambient Subtle Radial Mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-marine-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-marine-400/5 rounded-full blur-[100px] pointer-events-none" />

        <TrigAmbientFloat amplitude={2} period={28000}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl ml-0 mr-auto">

              {/* Eyebrow Pill */}
              <TrigReveal direction="up" amplitude={16} duration={0.6}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-marine-400 animate-pulse" />
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-marine-200">
                    Bespoke Ship Management & Marine Services
                  </span>
                </div>
              </TrigReveal>

              {/* Main Display Headline */}
              <TrigReveal direction="up" amplitude={25} delay={0.1} duration={0.7}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[1.02] text-white">
                  Built for the Realities <br className="hidden sm:block" />
                  of the <span className="bg-gradient-to-r from-marine-300 via-marine-400 to-sky-200 bg-clip-text text-transparent">Open Ocean</span>
                </h1>
              </TrigReveal>

              {/* Authentic Human Subtitle */}
              <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
                <p className="mt-8 text-lg sm:text-xl text-navy-200 max-w-3xl font-normal leading-relaxed">
                  From certified crew manning and drydock superintendency to round-the-clock voyage monitoring,
                  we deliver transparent, high-accountability marine solutions engineered to eliminate downtime and safeguard your vessel's commercial viability.
                </p>
              </TrigReveal>

              {/* Quick Operational Metrics Row */}
              <TrigReveal direction="up" amplitude={20} delay={0.3} duration={0.7}>
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                  <div className="p-3">
                    <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">24/7/365</div>
                    <div className="text-xs text-navy-300 mt-1 uppercase tracking-wider font-medium">Global Ops Desk</div>
                  </div>
                  <div className="p-3">
                    <div className="text-2xl lg:text-3xl font-bold text-marine-400 tracking-tight">98.4%</div>
                    <div className="text-xs text-navy-300 mt-1 uppercase tracking-wider font-medium">Crew Retention</div>
                  </div>
                  <div className="p-3">
                    <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Zero</div>
                    <div className="text-xs text-navy-300 mt-1 uppercase tracking-wider font-medium">PSC Detentions Target</div>
                  </div>
                  <div className="p-3">
                    <div className="text-2xl lg:text-3xl font-bold text-marine-400 tracking-tight">&lt; 48h</div>
                    <div className="text-xs text-navy-300 mt-1 uppercase tracking-wider font-medium">Surveyor Mobilization</div>
                  </div>
                </div>
              </TrigReveal>

              {/* Interactive Anchor Jump Links */}
              <TrigReveal direction="up" amplitude={20} delay={0.4} duration={0.7}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-navy-300 uppercase tracking-widest mr-2">Jump to:</span>
                  {coreServices.slice(0, 4).map((s) => {
                    const slug = s.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <a
                        key={s.title}
                        href={`#${slug}`}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-navy-200 hover:text-white hover:bg-marine-500/20 hover:border-marine-400/30 transition-all duration-300"
                      >
                        {s.eyebrow}
                      </a>
                    );
                  })}
                </div>
              </TrigReveal>

            </div>
          </div>
        </TrigAmbientFloat>
      </section>

      {/* Organic Wave Transition to Light Surface */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={110} type="deep" />

      {/* 2. Core Services Matrix — Light, Pristine & Double-Bezel Hardware Aesthetics */}
      <section ref={coreRef} className="bg-white text-navy-900 relative overflow-hidden py-24 lg:py-32">
        <TrigBackgroundWave
          className="opacity-25"
          baseColor="rgba(45, 95, 141, 0.04)"
          amplitude={20}
          frequency={0.35}
          speed={0.00015}
          layerCount={2}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          {/* Section Heading with Editorial Polish */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <TrigReveal direction="up" amplitude={16} duration={0.6}>
                <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-marine-600 mb-3">
                  Primary Maritime Disciplines
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={24} delay={0.1} duration={0.7}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-navy-900 leading-tight">
                  Core Management & <br />
                  <span className="text-marine-600">Operational Capabilities</span>
                </h2>
              </TrigReveal>
            </div>

            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="text-navy-600 text-base sm:text-lg max-w-md font-normal leading-relaxed">
                Refined across decades of deep-sea voyaging and drydock campaigns. Click any service to inspect our exact technical standard of care.
              </p>
            </TrigReveal>
          </div>

          {/* Cards Grid — Double-Bezel Nested Architecture */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service, i) => {
              const slug = service.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <a
                  key={service.title}
                  href={`#${slug}`}
                  className="block group h-full focus:outline-none"
                >
                  {/* Outer Hardware Shell */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                    className="h-full p-2 rounded-[2rem] bg-gradient-to-b from-navy-100/80 to-navy-50/50 border border-navy-200/60 shadow-sm hover:shadow-xl hover:shadow-marine-900/5 hover:border-marine-400/40 transition-all duration-500"
                  >
                    {/* Inner Core Plate */}
                    <div className="h-full flex flex-col justify-between p-7 rounded-[calc(2rem-0.5rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border border-navy-100/80">
                      <div>

                        {/* Header with Icon + Eyebrow */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="h-12 w-12 rounded-2xl bg-marine-50 border border-marine-100/60 flex items-center justify-center flex-shrink-0 group-hover:bg-marine-500 group-hover:border-marine-500 transition-colors duration-500">
                            <service.icon className="h-6 w-6 text-marine-600 group-hover:text-white transition-colors duration-500" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-navy-50 text-navy-600 group-hover:bg-marine-50 group-hover:text-marine-700 transition-colors">
                            {service.eyebrow}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-xl font-bold text-navy-950 tracking-tight leading-snug group-hover:text-marine-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-xs font-semibold text-marine-600">
                          {service.tagline}
                        </p>

                        {/* Description */}
                        <p className="mt-3 text-sm text-navy-600 leading-relaxed">
                          {service.desc}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="mt-5 pt-4 border-t border-navy-100 space-y-2">
                          {service.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-navy-700 font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5 text-marine-500 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tactile Button-in-Button Link Action */}
                      <div className="mt-6 pt-4 flex items-center justify-between border-t border-navy-100/80">
                        <span className="text-xs font-medium text-navy-500">
                          {service.leadTime}
                        </span>

                        <div className="inline-flex items-center gap-2 text-xs font-bold text-marine-600 group-hover:text-marine-700">
                          <span>Inspect Details</span>
                          <div className="w-6 h-6 rounded-full bg-marine-50 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-all transform group-hover:translate-x-1 duration-300">
                            <ChevronRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </a>
              );
            })}
          </div>

        </div>
      </section>

      {/* Organic Wave Transition to Dark Section */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0b1726" height={110} type="coast" flip />

      {/* 3. Extended Capabilities — High-End Glassmorphic Navy Grid */}
      <section ref={extendedRef} className="bg-[#0b1726] text-white relative overflow-hidden py-24 lg:py-32">
        <TrigBackgroundWave
          className="opacity-15"
          baseColor="rgba(74, 123, 167, 0.05)"
          amplitude={18}
          frequency={0.3}
          speed={0.0001}
          layerCount={3}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          <div className="max-w-3xl mb-16">
            <TrigReveal direction="up" amplitude={16} duration={0.6}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marine-500/10 border border-marine-400/20 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-marine-400 mb-4">
                <Radio className="w-3 h-3 animate-pulse text-marine-400" />
                Extended Scope
              </div>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={24} delay={0.1} duration={0.7}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight">
                Supplementary Capabilities & <br />
                <span className="text-marine-300">Specialized Interventions</span>
              </h2>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-4 text-navy-200 text-base sm:text-lg font-normal leading-relaxed">
                Modern ship operations extend beyond basic crewing and maintenance. We integrate specialized engineering projects, crisis support, and telemetry to protect complex maritime assets.
              </p>
            </TrigReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enhancedServices.map((service, i) => (
              <TrigCardHover
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                animate={extendedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-marine-400/40 hover:bg-white/[0.07] transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-marine-500/20 border border-marine-400/30 flex items-center justify-center text-marine-400 group-hover:scale-110 group-hover:bg-marine-500 group-hover:text-white transition-all duration-300">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-marine-400/10 text-marine-300 border border-marine-400/20">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-navy-300 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-navy-400">
                  <span>Standard:</span>
                  <span className="text-marine-300 font-mono">{service.metric}</span>
                </div>
              </TrigCardHover>
            ))}
          </div>

          {/* Inline Quote / Operational Creed */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-marine-950/60 via-navy-900/80 to-marine-950/60 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-marine-400 font-bold block mb-2">Our Operating Creed</span>
                <p className="text-lg sm:text-xl font-medium text-white italic leading-relaxed">
                  “We do not treat ship management as an office exercise. Every superintendent has walked the tank tops, overseen drydockings, and knows what it means to keep a vessel seaworthy in all conditions.”
                </p>
              </div>
              <Link
                to="/contact"
                className="group flex-shrink-0 inline-flex items-center gap-3 rounded-full bg-marine-500 hover:bg-marine-400 text-white px-7 py-4 text-sm font-semibold shadow-xl shadow-marine-950/50 transition-all duration-300"
              >
                <span>Inquire About Services</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Organic Wave Transition to White */}
      <TrigWaveDivider fromColor="#0b1726" toColor="#ffffff" height={110} type="ripple" />

      {/* 4. Why Marevita — The Human Differentiators */}
      <section ref={diffRef} className="bg-white text-navy-900 relative overflow-hidden py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <TrigReveal direction="up" amplitude={16} duration={0.6}>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-marine-600 block mb-3">
                Why Shipowners Choose Marevita
              </span>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={24} delay={0.1} duration={0.7}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-navy-950 leading-tight">
                Accountability Over Bureaucracy
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-4 text-navy-600 text-lg leading-relaxed">
                In an industry frequently crowded with rigid management conglomerates, we provide agile, transparent, and high-touch superintendent oversight for every vessel under our care.
              </p>
            </TrigReveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {differentiators.map((diff, i) => (
              <TrigCardHover
                key={diff.title}
                initial={{ opacity: 0, y: 25 }}
                animate={diffInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-navy-50/60 border border-navy-100 hover:border-marine-400/40 hover:bg-white hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-marine-500/10 border border-marine-500/20 flex items-center justify-center mb-6">
                    <diff.icon className="h-6 w-6 text-marine-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 tracking-tight mb-3">
                    {diff.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-navy-200/60 flex items-center justify-between text-xs font-bold text-marine-600">
                  <span>Standard Metric:</span>
                  <span className="font-mono bg-white px-2.5 py-1 rounded-md border border-navy-200/80">{diff.metric}</span>
                </div>
              </TrigCardHover>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Deep-Dive Section — "Inside Each Service" (OLED Night Palette) */}
      <section className="bg-[#05080c] text-[#f2f0eb] relative overflow-hidden py-28 lg:py-36 border-t border-navy-800/40">

        {/* Glow Spheres */}
        <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-marine-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-[30rem] h-[30rem] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          <div className="max-w-3xl mb-20">
            <span className="inline-block text-xs font-mono font-semibold tracking-[0.25em] uppercase text-marine-400 mb-4">
              Detailed Scope of Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.98] tracking-[-0.04em] text-white">
              Inside Each <span className="italic font-serif text-marine-300">Discipline</span>
            </h2>
            <p className="mt-6 text-navy-300 text-lg leading-relaxed max-w-2xl">
              Concrete deliverables, exact methodologies, and operational protocols. Transparent execution with zero guesswork.
            </p>
          </div>

          <div className="space-y-12">
            {coreServices.map((service, i) => {
              const slug = service.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <section
                  key={service.title}
                  id={slug}
                  className="group scroll-mt-28 p-8 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-marine-400/30 transition-colors duration-500 backdrop-blur-xl shadow-2xl shadow-black/40"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Identification & Key Scope */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-marine-500/20 border border-marine-400/30 flex items-center justify-center text-marine-400">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono tracking-widest uppercase text-marine-300 font-semibold">
                          {service.eyebrow}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm font-medium text-marine-400 mb-6">
                        {service.tagline}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-white/10">
                        <span className="text-xs font-mono uppercase tracking-wider text-navy-400 block mb-2">Core Deliverables:</span>
                        {service.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-navy-200 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-marine-400 flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-marine-300 hover:text-white transition-colors"
                        >
                          <span>Request service terms & SLA</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Execution Methodology & Field Insight */}
                    <div className="lg:col-span-7 lg:pl-6 lg:border-l lg:border-white/10 flex flex-col justify-between h-full">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-navy-400 block mb-2">Operational Protocol:</span>
                        <p className="text-sm sm:text-base text-navy-200 leading-relaxed mb-6 font-normal">
                          {service.desc}
                        </p>
                      </div>

                      {/* Field Note / Human Quote Box */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
                        <div className="text-xs text-navy-300 italic leading-relaxed">
                          {service.fieldNote}
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-navy-400 pt-2 border-t border-white/5">
                          <span>Standard Deployment:</span>
                          <span className="text-marine-400 font-semibold">{service.leadTime}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </section>

      {/* Organic Wave Transition to Final Dark Navy CTA */}
      <TrigWaveDivider fromColor="#05080c" toColor="#0b1726" height={100} type="rugged" flip />

      {/* 6. Final Call to Action — Apple Island Button & Direct Access */}
      <section className="bg-[#0b1726] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <TrigAmbientFloat amplitude={1.5} period={25000}>

            <TrigReveal direction="up" amplitude={20} duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-marine-300 mb-6">
                Start a Vessel Consultation
              </span>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight text-white">
                Ready to Optimize Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-marine-300 via-marine-400 to-sky-200">
                  Maritime Operations?
                </span>
              </h2>
            </TrigReveal>

            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-6 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto leading-relaxed">
                Whether you need a full turnkey technical management agreement, immediate crew placement, or independent pre-purchase surveys, our superintendents are on standby.
              </p>
            </TrigReveal>

            {/* Tactile Island CTA Button */}
            <TrigReveal direction="up" amplitude={20} delay={0.3} duration={0.7}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-4 rounded-full bg-marine-500 hover:bg-marine-400 pl-8 pr-3 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-marine-950/80 transition-all duration-300"
                  >
                    <span>Speak with a Fleet Superintendent</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>

                <Link
                  to="/fleet"
                  className="px-6 py-3.5 rounded-full text-sm font-semibold text-navy-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                >
                  View Managed Fleet
                </Link>
              </div>
            </TrigReveal>

            <div className="mt-12 text-xs font-mono text-navy-400 flex items-center justify-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Operations Desk: Active
              </span>
              <span>•</span>
              <span>ISO 9001 / ISM Certified Management</span>
            </div>

          </TrigAmbientFloat>
        </div>
      </section>

    </div>
  );
}
