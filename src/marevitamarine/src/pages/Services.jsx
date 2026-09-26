import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Anchor, GraduationCap, Compass, CheckCircle2, Wrench, Users, Ship, Sparkles } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigParallax,
  TrigFloating,
  TrigScrollRotate,
  TrigBackgroundWave,
} from '../components/TrigScrollAnimations';

export default function Services() {
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
    <div>
      {/* Hero — Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4">What we do</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">Services<br/><span className="text-marine-400">that move.</span></h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">From the pilot to the port — one accountable team owns every moving part of your voyage.</p>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* Services List — White */}
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
            {/* Left Column — Heading + Image */}
            <div className="space-y-6">
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
                    src="/assets/aboutuspics/offshore-marine-service.jpg"
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

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="coast" flip />

      {/* CTA — Navy */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">Need a service?<br/><span className="text-marine-400">Start with a quote.</span></h2>
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-8"><span>Request a quote</span><ArrowRight className="h-4 w-4"/></Link>
        </div>
      </section>
    </div>
  );
}
