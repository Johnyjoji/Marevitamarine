import { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Anchor,
  Ship,
  Users,
  Target,
  Flag,
  Sparkles,
  Shield,
  Compass,
  Wrench,
  GraduationCap,
  ClipboardCheck,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigParallax,
  TrigFloating,
  TrigScrollRotate,
  TrigBackgroundWave,
} from '../components/TrigScrollAnimations';
import TeamShowcase from '../components/TeamShowcase';
import StackedCardSection from '../components/StackedCardSection';

/**
 * AboutUsHero — Split layout hero inspired by aboutUs.webp reference
 * Large "ABOUT US" text on left, descriptive content on right with image
 */
function AboutUsHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative bg-white text-navy-900 overflow-hidden min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-20 right-10 w-64 h-64 bg-marine-500/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-navy-500/5 rounded-full blur-3xl"
        />

        {/* Floating decorative icons */}
        <TrigFloating amplitude={18} period={6500} className="absolute top-32 right-1/4 w-10 h-10 text-marine-400/15">
          <Compass className="w-full h-full" strokeWidth={1} />
        </TrigFloating>
        <TrigScrollRotate maxDegrees={12} easing="organic" className="absolute bottom-40 right-20 w-8 h-8 text-marine-400/15">
          <TrigFloating amplitude={12} period={5500} horizontal>
            <Anchor className="w-full h-full" strokeWidth={1} />
          </TrigFloating>
        </TrigScrollRotate>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column — Large "ABOUT US" text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex items-start gap-4 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-xl bg-marine-500 flex items-center justify-center">
                  <Anchor className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-marine-600">
                  Marevita Marine
                </p>
                <p className="text-xs text-navy-500 mt-1">Est. Ernakulam, Kochi</p>
              </div>
            </div>

            <h1 className="text-[80px] sm:text-[100px] lg:text-[120px] font-black tracking-[-0.03em] leading-[0.85] text-navy-900">
              ABOUT
              <br />
              <span className="text-marine-500">US</span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 h-1 bg-gradient-to-r from-marine-500 to-transparent"
            />
          </motion.div>

          {/* Right Column — Content & Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
                Masters and Chief Engineers<br />
                <span className="text-marine-500">leading from experience.</span>
              </h2>
              <p className="text-lg text-navy-600 leading-relaxed">
                Marevita Marine Private Limited is a premier shipping company based in Ernakulam, Kochi. Founded and operated by experienced Masters and Chief Engineers, we bring the authentic perspective of the sea to the shore.
              </p>
              <p className="text-base text-navy-600 leading-relaxed">
                With decades of combined sailing experience across diverse vessel types, we deeply understand the real-world challenges faced both at sea and ashore. Our mission is to provide reliable, safe, and efficient marine solutions rooted in a seafarer's perspective.
              </p>
            </div>

            {/* Image placeholder */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-navy-100 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.2)]">
              <div className="aspect-[16/10] relative">
                <img
                  src="/assets/placeholder.png"
                  alt="Marevita Marine Company Overview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#our-philosophy"
                className="group inline-flex items-center gap-3 rounded-full bg-marine-500 pl-6 pr-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-marine-500/30 hover:bg-marine-600 hover:shadow-marine-600/40 transition-all"
              >
                Discover our philosophy
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * OurPhilosophy — Mission, Vision, Values in card format
 */
function OurPhilosophy() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const cards = [
    {
      icon: Target,
      label: 'Our Vision',
      title: 'To be a trusted partner in the global maritime industry',
      description: 'Recognized for technical excellence and a seafarer-centric approach.',
    },
    {
      icon: Flag,
      label: 'Our Mission',
      title: 'To provide safe, efficient, and ethical marine services',
      description: 'That add tangible value to our clients\' operations.',
    },
    {
      icon: Sparkles,
      label: 'Our Values',
      title: 'Unwavering professionalism. Safety-first culture.',
      description: 'Honest, transparent service. These aren\'t slogans — they\'re the watch-standing principles we live by.',
    },
  ];

  return (
    <section id="our-philosophy" className="bg-white text-navy-900 relative overflow-hidden">
      <TrigBackgroundWave
        className="opacity-40"
        baseColor="rgba(14, 165, 233, 0.04)"
        amplitude={28}
        frequency={0.35}
        speed={0.00022}
        layerCount={2}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
        <div className="max-w-3xl mb-16">
          <TrigReveal direction="up" amplitude={20} duration={0.6}>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-600">
              Our Philosophy
            </span>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
              Three principles.<br />
              <span className="text-marine-500">One course.</span>
            </h2>
          </TrigReveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-navy-100 bg-gradient-to-b from-white to-navy-50/50 hover:border-marine-200 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.15)] transition-all duration-500"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-marine-50 text-marine-600 mb-6">
                <card.icon className="h-7 w-7" />
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-marine-600 mb-3">
                {card.label}
              </p>
              <h3 className="text-xl font-bold text-navy-900 mb-3">
                {card.title}
              </h3>
              <p className="text-navy-600 leading-relaxed">
                {card.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-marine-500 to-marine-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * OurEdge — Why choose us section with image
 */
function OurEdge() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const differentiators = [
    {
      icon: Anchor,
      title: 'Operated by Experts',
      description: 'Led by Masters and Chief Engineers with extensive real sea-time. Every decision is grounded in command-level experience.',
    },
    {
      icon: Shield,
      title: 'Safety-First Approach',
      description: 'We prioritize vessel safety, crew welfare, and environmental compliance above all. Zero-incident culture, not zero-incident luck.',
    },
    {
      icon: Wrench,
      title: 'Practical Solutions',
      description: 'We move beyond theory to provide workable, cost-effective solutions learned in the engine room and on the bridge.',
    },
    {
      icon: Compass,
      title: 'Integrity & Transparency',
      description: 'As lifelong seafarers, we value trust, commitment, and honest communication. What we promise, we deliver — no surprises.',
    },
  ];

  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      {/* Floating decorative icons */}
      <TrigFloating amplitude={22} period={7000} horizontal horizontalAmplitude={12} className="absolute top-20 right-10 w-12 h-12 text-marine-400/15 pointer-events-none">
        <Compass className="w-full h-full" strokeWidth={1} />
      </TrigFloating>
      <TrigParallax strength={-30} easing="sine" className="absolute bottom-32 left-10 w-10 h-10 text-marine-400/10 pointer-events-none">
        <Anchor className="w-full h-full" strokeWidth={0.5} />
      </TrigParallax>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="aspect-[4/3] relative">
                <img
                  src="/assets/placeholder.png"
                  alt="Marevita Marine Operations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div ref={ref}>
            <TrigReveal direction="up" amplitude={20} duration={0.6}>
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-400">
                Our Edge
              </span>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                Hands-on expertise<br />
                <span className="text-marine-400">beats shore theory.</span>
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-6 text-lg text-navy-300 max-w-xl">
                Having sailed across the globe and led vessels through the most demanding conditions, we provide hands-on expertise rather than just shore-based management. We know exactly what ship owners, managers, and seafarers truly need because we have been in their shoes.
              </p>
            </TrigReveal>

            <div className="mt-10 space-y-6">
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
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-marine-400">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-navy-300 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </TrigReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * WhatWeDo — Services section inspired by aboutUs.webp reference
 * Left side: heading and description
 * Right side: services list with icons and descriptions
 */
function WhatWeDo() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const services = [
    {
      icon: Users,
      title: 'CREW MANNING',
      description: 'Professional recruitment and placement of qualified seafarers across all ranks and vessel types.',
    },
    {
      icon: Wrench,
      title: 'TECHNICAL MANAGEMENT & GUIDANCE',
      description: 'Expert oversight and technical support for vessel maintenance, dry-docking, and class compliance.',
    },
    {
      icon: Ship,
      title: 'VESSEL OPERATIONS & SUPPORT',
      description: 'Streamlining operational efficiency for seamless voyages — from port planning to voyage optimization.',
    },
    {
      icon: GraduationCap,
      title: 'MARITIME TRAINING',
      description: 'Comprehensive training solutions delivered on-board, ashore, and online for continuous competency.',
    },
    {
      icon: ClipboardCheck,
      title: 'MARINE CONSULTANCY & INSPECTIONS',
      description: 'High-level advisory and rigorous vessel inspections for pre-purchase, condition, and class surveys.',
    },
    {
      icon: CheckCircle2,
      title: 'SAFETY, COMPLIANCE & DOCUMENTATION',
      description: 'Ensuring full adherence to international maritime laws, flag state requirements, and safety standards.',
    },
  ];

  return (
    <section className="bg-white text-navy-900 relative overflow-hidden">
      <TrigBackgroundWave
        className="opacity-30"
        baseColor="rgba(14, 165, 233, 0.04)"
        amplitude={30}
        frequency={0.3}
        speed={0.00018}
        layerCount={2}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column — Heading + Image (Sticky) */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Our Services
              </h2>
              <p className="mt-4 text-sm text-navy-600 leading-relaxed">
                Bring your interior design vision to life. Each service is tailored to meet the unique needs of our clients, ensuring a seamless and satisfying experience.
              </p>
            </div>

            {/* Decorative Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3]">
                <img
                  src="/assets/placeholder.png"
                  alt="Marine Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column — Services List */}
          <div ref={ref} className="space-y-8">
            {services.map((service, i) => (
              <TrigReveal
                key={service.title}
                direction="up"
                amplitude={20}
                delay={i * 0.08}
                duration={0.6}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-navy-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </TrigReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * MeetThePrincipals — Leadership section inspired by aboutUs.webp reference
 * Uses the TeamShowcase component from myteam reference
 */
function MeetThePrincipals() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const teamMembers = [
    {
      id: '1',
      name: 'Capt. Jayan Nair',
      role: 'MASTER MARINER',
      image: '/assets/placeholder.png',
    },
    {
      id: '2',
      name: 'Capt. Eldose P. Paul',
      role: 'MASTER MARINER',
      image: '/assets/placeholder.png',
    },
    {
      id: '3',
      name: 'C/E Sanu Paul',
      role: 'CHIEF ENGINEER',
      image: '/assets/placeholder.png',
    },
    {
      id: '4',
      name: 'C/E George Kutty',
      role: 'CHIEF ENGINEER',
      image: '/assets/placeholder.png',
    },
    {
      id: '5',
      name: 'Stoney Olivero',
      role: 'MARINE CREWING OFFICER',
      image: '/assets/placeholder.png',
    },
    {
      id: '6',
      name: 'Anil Antony',
      role: 'TECHNICAL OFFICER',
      image: '/assets/placeholder.png',
    },
  ];

  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative floating anchors */}
      <TrigScrollRotate maxDegrees={8} easing="organic" className="absolute top-16 left-1/4 w-10 h-10 text-marine-400/12 pointer-events-none">
        <TrigFloating amplitude={18} period={7500} horizontal>
          <Compass className="w-full h-full" strokeWidth={1} />
        </TrigFloating>
      </TrigScrollRotate>
      <TrigFloating amplitude={20} period={8000} className="absolute bottom-20 right-16 w-12 h-12 text-marine-400/10 pointer-events-none">
        <Anchor className="w-full h-full" strokeWidth={0.5} />
      </TrigFloating>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <TrigReveal direction="up" amplitude={20} duration={0.6}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-marine-500/10 border border-marine-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-marine-400" />
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-marine-400">
                Leadership
              </span>
            </div>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-6">
              <span className="text-white">MEET THE</span><br />
              <span className="text-marine-400">PRINCIPALS</span>
            </h2>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
            <p className="text-lg text-navy-300 max-w-2xl mx-auto">
              Our strength lies in our people. Marevita Marine is led by seasoned mariners who have commanded and managed vessels worldwide.
            </p>
          </TrigReveal>
        </motion.div>

        {/* Team Showcase Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TeamShowcase members={teamMembers} />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Headquarters — Location section
 */
function Headquarters() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const contactItems = [
    { icon: Globe, text: 'Ernakulam, Kochi, Kerala, India' },
    { icon: Mail, text: 'operations@marevitamarine.com' },
    { icon: Phone, text: '+91 (484) 2XX XXXX' },
  ];

  return (
    <section className="bg-white text-navy-900 relative overflow-hidden">
      <TrigBackgroundWave
        className="opacity-35"
        baseColor="rgba(14, 165, 233, 0.04)"
        amplitude={26}
        frequency={0.4}
        speed={0.00022}
        layerCount={2}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <TrigReveal direction="up" amplitude={20} duration={0.6}>
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-600">
                Headquarters
              </span>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
                Ernakulam, Kerala.<br />
                <span className="text-marine-500">India's emerging maritime hub.</span>
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
              <p className="mt-6 text-lg text-navy-600 max-w-xl">
                Strategically positioned at the crossroads of international shipping lanes, our Ernakulam headquarters connects us to the Arabian Sea, the Indian Ocean, and the global maritime network.
              </p>
            </TrigReveal>
            <div className="mt-8 space-y-4">
              {contactItems.map((item, i) => (
                <TrigReveal
                  key={item.text}
                  direction="left"
                  amplitude={20}
                  delay={i * 0.1}
                  duration={0.5}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-center gap-3 text-navy-700"
                  >
                    <item.icon className="h-5 w-5 text-marine-500 flex-shrink-0" />
                    <span>{item.text}</span>
                  </motion.div>
                </TrigReveal>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-navy-200"
          >
            <img
              src="/assets/placeholder.png"
              alt="Marevita Marine Headquarters Location"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * CTASection — Final call to action
 */
function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <TrigFloating amplitude={20} period={8000} className="absolute top-24 left-20 w-14 h-14 text-marine-400/12 pointer-events-none">
        <Ship className="w-full h-full" strokeWidth={0.5} />
      </TrigFloating>
      <TrigScrollRotate maxDegrees={12} easing="organic" className="absolute bottom-32 right-20 w-12 h-12 text-marine-400/12 pointer-events-none">
        <TrigFloating amplitude={16} period={6500} horizontal>
          <Compass className="w-full h-full" strokeWidth={0.5} />
        </TrigFloating>
      </TrigScrollRotate>

      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32 text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <TrigReveal direction="up" amplitude={30} duration={0.8}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
              Ready to sail with<br />
              <span className="text-marine-400">a team that knows the sea?</span>
            </h2>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.7}>
            <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto">
              Tell us about your fleet, your voyage, your next challenge. We respond within one business day, with a named point of contact.
            </p>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={20} delay={0.3} duration={0.7}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 hover:shadow-marine-500/40 transition-all"
              >
                Get in touch
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </TrigReveal>
          <TrigReveal direction="up" amplitude={15} delay={0.4} duration={0.6}>
            <p className="mt-6 text-xs text-navy-400 font-mono tracking-widest uppercase">
              24 / 7 · operations@marevitamarine.com
            </p>
          </TrigReveal>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Main About Page
 *
 * Uses fast, multi-layered animated wave dividers (TrigWaveDivider) between
 * every section. Each layer is a sine wave with its own frequency, amplitude
 * and scrollY-driven phase speed — so dividers feel like fast moving water.
 */
/**
 * Main About Page
 *
 * Implements a reactive, physics-based scroll stacking card interaction.
 * As the user scrolls down, the Hero and subsequent sections recede and scale down
 * while lower sections slide gracefully on top, creating a tactile 3D layer stack.
 */
export default function About() {
  const TOTAL_SECTIONS = 7;

  return (
    <div className="relative bg-navy-950 text-white">
      {/* 0. Hero Section */}
      <StackedCardSection
        index={0}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-white shadow-xl"
      >
        <AboutUsHero />
      </StackedCardSection>

      {/* 1. Our Philosophy */}
      <StackedCardSection
        index={1}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-white shadow-[0_-35px_80px_rgba(0,0,0,0.35)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-navy-100"
      >
        <TrigWaveDivider
          fromColor="white"
          toColor="white"
          height={80}
          baseSpeed={1.0}
          layers={[
            { frequency: 0.9, amplitude: 12, speed: 0.008, phaseOffset: 0, opacity: 0.6 },
          ]}
        />
        <OurPhilosophy />
      </StackedCardSection>

      {/* 2. Our Edge (Dark) */}
      <StackedCardSection
        index={2}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-navy-900 shadow-[0_-35px_80px_rgba(0,0,0,0.55)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10"
      >
        <TrigWaveDivider
          fromColor="white"
          toColor="#0f1318"
          height={100}
          baseSpeed={1.4}
          layers={[
            { frequency: 1.2, amplitude: 20, speed: 0.013, phaseOffset: 0, opacity: 1.0 },
            { frequency: 2.0, amplitude: 13, speed: 0.024, phaseOffset: 1.3, opacity: 0.55 },
          ]}
        />
        <OurEdge />
      </StackedCardSection>

      {/* 3. What We Do (Light) */}
      <StackedCardSection
        index={3}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-white shadow-[0_-35px_80px_rgba(0,0,0,0.35)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-navy-100"
      >
        <TrigWaveDivider
          fromColor="#0f1318"
          toColor="white"
          height={100}
          baseSpeed={1.3}
          layers={[
            { frequency: 1.1, amplitude: 19, speed: 0.012, phaseOffset: 0, opacity: 1.0 },
            { frequency: 2.3, amplitude: 12, speed: 0.025, phaseOffset: 1.5, opacity: 0.55 },
          ]}
        />
        <WhatWeDo />
      </StackedCardSection>

      {/* 4. Meet The Principals (Dark) */}
      <StackedCardSection
        index={4}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-navy-900 shadow-[0_-35px_80px_rgba(0,0,0,0.55)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10"
      >
        <TrigWaveDivider
          fromColor="white"
          toColor="#0f1318"
          height={100}
          baseSpeed={1.2}
          layers={[
            { frequency: 1.0, amplitude: 17, speed: 0.011, phaseOffset: 0, opacity: 1.0 },
            { frequency: 2.5, amplitude: 11, speed: 0.023, phaseOffset: 1.6, opacity: 0.55 },
          ]}
        />
        <MeetThePrincipals />
      </StackedCardSection>

      {/* 5. Headquarters (Light) */}
      <StackedCardSection
        index={5}
        total={TOTAL_SECTIONS}
        targetScale={0.88}
        cardClassName="bg-white shadow-[0_-35px_80px_rgba(0,0,0,0.35)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-navy-100"
      >
        <TrigWaveDivider
          fromColor="#0f1318"
          toColor="white"
          height={100}
          baseSpeed={1.5}
          layers={[
            { frequency: 1.4, amplitude: 18, speed: 0.014, phaseOffset: 0, opacity: 1.0 },
            { frequency: 2.1, amplitude: 12, speed: 0.026, phaseOffset: 1.2, opacity: 0.55 },
          ]}
        />
        <Headquarters />
      </StackedCardSection>

      {/* 6. CTA Section (Dark - Final Card) */}
      <StackedCardSection
        index={6}
        total={TOTAL_SECTIONS}
        cardClassName="bg-navy-900 shadow-[0_-35px_80px_rgba(0,0,0,0.6)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10"
      >
        <TrigWaveDivider
          fromColor="white"
          toColor="#0f1318"
          height={100}
          baseSpeed={1.2}
          layers={[
            { frequency: 1.1, amplitude: 16, speed: 0.012, phaseOffset: 0, opacity: 1.0 },
            { frequency: 2.4, amplitude: 11, speed: 0.024, phaseOffset: 1.4, opacity: 0.55 },
          ]}
        />
        <CTASection />
      </StackedCardSection>
    </div>
  );
}