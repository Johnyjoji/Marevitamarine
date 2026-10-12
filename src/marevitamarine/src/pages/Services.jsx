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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import GlyphPortal from '../components/ui/GlyphPortal';
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
      {/* Hero — Navy (Standalone - NOT wrapped) */}
      <GlyphPortal
        word="MAREVITA"
        interactive={true}
        scrollLength={1.2} {/* Reduced from 2.4 to 1.2 for less scrolling */}
        enterLabel=""
        className="bg-navy-900 text-white relative w-full"
        style={{
          '--gp-paper': '#0f1318',
          '--gp-ink': '#ffffff',
          '--gp-field': '#0ea5e9',
          '--gp-foreground': '#f2f0eb',
          zIndex: 60
        }}
        front={
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
            <div className="max-w-4xl text-center">
              <TrigReveal direction="up" amplitude={20} duration={0.7}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-marine-500/10 border border-marine-400/20 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-marine-400 mb-8 mt-12 w-auto mx-auto justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-marine-400 animate-pulse" />
                  {/* Removed "Our Expertise" as requested */}
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-[-0.065em] leading-[0.88] lg:tracking-[-0.07em]">
                  Comprehensive Marine Services<br/><span className="text-marine-400">for Every Voyage</span>
                </h1>
              </TrigReveal>
            </div>
          </div>
        }
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center"> {/* Reduced py from 24 to 20 for more premium spacing */}
          <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
            <p className="mt-6 text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed"> {/* Reduced mt from 8 to 6 */}
              From technical management to crew solutions, we provide accountable, end-to-end marine services that ensure safe, efficient, and compliant operations.
            </p>
          </TrigReveal>
        </div>
      </GlyphPortal>

      {/* Core Services — White (index=0 of stacked deck) */}
      <StackedCardSection
        index={0}
        total={5}
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

          <div className="mx-auto max-w-7xl px-8 lg:px-10 py-24 lg:py-32 relative z-10"> {/* Increased px and py for premium spacing */}
            <div className="mb-16 text-center"> {/* Increased mb from 12 to 16 */}
              <TrigReveal direction="up" amplitude={20} duration={0.7}>
                <span className="text-base font-semibold tracking-[0.2em] uppercase text-marine-600"> {/* Increased from text-sm to text-base */}
                  Core Services
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05]"> {/* Increased from text-4xl to text-5xl */}
                  The Foundation of Our Expertise<br/><span className="text-marine-400">What We Do Best</span>
                </h2>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={20} delay={0.2} duration={0.7}>
                <p className="mt-8 text-xl text-navy-600 max-w-xl"> {/* Increased from text-lg to text-xl */}
                  These services form the backbone of Marevita Marine's offerings, refined through years of industry experience and client partnerships.
                </p>
              </TrigReveal>
            </div>

            <div className="grid gap-10 lg:grid-cols-3"> {/* Increased gap from 8 to 10 */}
              {coreServices.map((service, i) => {
                const slug = service.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={service.title} to={`/services#${slug}`} className="block">
                    <TrigCardHover
                      initial={{ opacity: 0, y: 30 }}
                      animate={coreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group relative bg-white rounded-xl border border-navy-100/50 p-8 hover:border-navy-200/75 overflow-hidden"> {/* Increased p from 6 to 8 */}
                      {/* Image placeholder */}
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6 overflow-hidden"> {/* Increased mb from 4 to 6 */}
                        <img
                          src="/content/placeholder-crew.jpg"
                          alt={`${service.title} illustration`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-start mb-6"> {/* Increased mb from 4 to 6 */}
                        <div className="h-12 w-12 rounded-full bg-marine-500 flex items-center justify-center mb-4"> {/* Increased from h-10 w-10 to h-12 w-12 */}
                          <service.icon className="h-7 w-7 text-white" /> {/* Increased from h-6 w-6 to h-7 w-7 */}
                        </div>
                        <h3 className="text-2xl font-semibold text-navy-900"> {/* Increased from text-xl to text-2xl */}
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-navy-700 leading-relaxed mb-8">{service.desc}</p> {/* Increased mb from 6 to 8 */}
                    </TrigCardHover>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </StackedCardSection>

      {/* Fixed consecutive color themes: White -> Navy -> White -> Navy -> White */}
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

      {/* Enhanced Services — Navy (index=1 of stacked deck) */}
      <StackedCardSection
        index={1}
        total={5}
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

          <div className="mx-auto max-w-7xl px-8 lg:px-10 py-24 lg:py-32 relative z-10"> {/* Increased px and py for premium spacing */}
            <div className="mb-16 text-center"> {/* Increased mb from 12 to 16 */}
              <TrigReveal direction="up" amplitude={20} duration={0.7}>
                <span className="text-base font-semibold tracking-[0.2em] uppercase text-marine-400"> {/* Increased from text-sm to text-base */}
                  Extended Capabilities
                </span>
              </TrigReveal>
              <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05]"> {/* Increased from text-4xl to text-5xl */}
                  Comprehensive Marine Solutions<br/><span className="text-marine-400">Beyond the Basics</span>
                </h2>
              </TrigReveal>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
              {enhancedServices.map((service, i) => (
                <TrigCardHover
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={extendedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-600/20 p-8 hover:bg-navy-800/75 overflow-hidden"> {/* Increased p from 6 to 8 */}
                  <div className="flex items-center justify-start mb-4"> {/* Increased mb from 3 to 4 */}
                    <div className="h-10 w-10 rounded-full bg-marine-500/20 flex items-center justify-center"> {/* Increased from h-8 w-8 to h-10 w-10 */}
                      <service.icon className="h-6 w-5 text-marine-400" /> {/* Increased from h-5 w-5 to h-6 w-6 */}
                    </div>
                    <h3 className="text-xl font-semibold text-white"> {/* Increased from text-lg to text-xl */}
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-navy-200 text-base leading-relaxed">{service.desc}</p> {/* Increased from text-sm to text-base */}
                </TrigCardHover>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-navy-800/20"> {/* Increased mt from 12 to 16, pt from 8 to 10 */}
              <TrigReveal direction="up" amplitude={25} duration={0.7}>
                <div className="text-center">
                  <p className="text-navy-300 text-base max-w-xl mx-auto"> {/* Increased from text-base to text-lg? keeping as text-base for consistency */}
                    Ready to enhance your maritime operations with our full suite of services?
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-4 rounded-full bg-marine-500 pl-8 pr-6 py-5 text-base font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-8"> {/* Increased pl/pr/py and mt */}
                    Get a Custom Solution
                    <ArrowRight className="h-5 w-5" /> {/* Increased from h-4 w-4 to h-5 w-5 */}
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

      {/* Differentiators — White (index=2 of stacked deck) */}
      <StackedCardSection
        index={2}
        total={5}
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

          <div className="mx-auto max-w-7xl px-8 lg:px-10 py-24 lg:py-32 relative z-10"> {/* Increased px and py for premium spacing */}
            <div className="space-y-16"> {/* Increased from space-y-12 to space-y-16 */}
              <div className="text-center">
                <TrigReveal direction="up" amplitude={20} duration={0.6}>
                  <span className="text-base font-semibold tracking-[0.2em] uppercase text-marine-600"> {/* Increased from text-sm to text-base */}
                    Why Marevita Marine
                  </span>
                </TrigReveal>
                <TrigReveal direction="up" amplitude={30} delay={0.1} duration={0.8}>
                  <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]"> {/* Increased from text-3xl to text-4xl */}
                    The Marevita Difference<br/><span className="text-marine-400">What Sets Us Apart</span>
                  </h2>
                </TrigReveal>
              </div>

              <div className="grid gap-10 lg:grid-cols-3"> {/* Increased gap from 8 to 10 */}
                {/* 24/7 Global Support */}
                <TrigReveal key="support" direction="up" amplitude={15} delay={0.1} duration={0.5}>
                  <TrigCardHover
                    initial={{ opacity: 0, y: 20 }}
                    animate={diffInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    className="flex flex-col items-start text-left p-8 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"> {/* Increased p from 6 to 8 */}
                    <TrigAmbientBreath scaleAmplitude={0.008} opacityAmplitude={0.05} period={4000}>
                      <Anchor className="h-12 w-12 text-marine-500" /> {/* Increased from h-10 w-10 to h-12 w-12 */}
                    </TrigAmbientBreath>
                    <h3 className="mt-5 text-xl font-semibold text-navy-900"> {/* Increased from mt-4 to mt-5 and text-lg to text-xl */}
                      24/7 Global Support
                    </h3>
                    <p className="mt-3 text-base text-navy-600 max-w-xs leading-relaxed"> {/* Increased from mt-2 to mt-3 and text-sm to text-base */}
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
                    className="flex flex-col items-start text-left p-8 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"> {/* Increased p from 6 to 8 */}
                    <TrigAmbientFloat amplitude={1} period={5000}>
                      <Users className="h-12 w-12 text-marine-500" /> {/* Increased from h-10 w-10 to h-12 w-12 */}
                    </TrigAmbientFloat>
                    <h3 className="mt-5 text-xl font-semibold text-navy-900"> {/* Increased from mt-4 to mt-5 and text-lg to text-xl */}
                      Experienced Team
                    </h3>
                    <p className="mt-3 text-base text-navy-600 max-w-xs leading-relaxed"> {/* Increased from mt-2 to mt-3 and text-sm to text-base */}
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
                    className="flex flex-col items-start text-left p-8 border border-navy-100/50 rounded-xl hover:border-navy-200/75 transition-all duration-500"> {/* Increased p from 6 to 8 */}
                    <TrigAmbientDrift amplitudeX={1} amplitudeY={1} periodX={8000} periodY={12000}>
                      <CheckCircle2 className="h-12 w-12 text-marine-500" /> {/* Increased from h-10 w-10 to h-12 w-12 */}
                    </TrigAmbientDrift>
                    <h3 className="mt-5 text-xl font-semibold text-navy-900"> {/* Increased from mt-4 to mt-5 and text-lg to text-xl */}
                      Cost Efficiency
                    </h3>
                    <p className="mt-3 text-base text-navy-600 max-w-xs leading-relaxed"> {/* Increased from mt-2 to mt-3 and text-sm to text-base */}
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

      {/* Core Service Details — Human, worthy (index=3 of stacked deck) */}
      <StackedCardSection
        index={3}
        total={5}
        targetScale={0.92}
        cardClassName="bg-[#060d1a] text-[#f2f0eb]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0f1318] to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#0ea5e9]/[0.07] blur-[5rem] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-8 lg:px-10 py-32 lg:py-40 relative z-10"> {/* Increased px and py for premium spacing */}
          <div className="max-w-2xl mb-20"> {/* Increased mb from 16 to 20 */}
            <span className="inline-block text-base font-semibold tracking-[0.2em] uppercase text-[#7ab3d6] mb-6"> {/* Increased from text-xs to text-base and mb from 4 to 6 */}
              Service Details
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] text-[#f2f0eb]"> {/* Increased from text-4xl to text-5xl */}
              Inside Each <span className="italic font-serif text-[#8fbde0]">Service</span>
            </h2>
            <p className="mt-8 text-[#a8b8c8] text-xl leading-relaxed"> {/* Increased from mt-6 to mt-8 and text-lg to text-xl */}
              What we deliver, how we do it, and the people behind it — not a brochure, just the real substance.
            </p>
          </div>
          <div className="grid gap-16 lg:grid-cols-2"> {/* Increased gap from 14 to 16 */}
            {coreServices.map((s, i) => {
              const slug = s.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <section key={s.title} id={slug} className="group scroll-mt-32 bg-white/5 border border-white/10 rounded-2xl p-10 lg:p-12 hover:border-white/20 transition-colors"> {/* Increased p from 7 to 10 and lg:p from 8 to 12 */}
                  <div className="flex items-start gap-8 mb-8"> {/* Increased gap from 6 to 8 and mb from 6 to 8 */}
                    {/* Image placeholder */}
                    <div className="flex-shrink-0 aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={`/content/placeholder-${slug}.jpg`}
                        alt={`${s.title} illustration`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{s.title}</h3> {/* Increased from text-xl to text-2xl */}
                      <span className="inline-block mt-2 text-base font-medium text-marine-400 tracking-widest uppercase">{s.eyebrow}</span> {/* Increased from mt-1 to mt-2 and text-xs to text-base */}
                    </div>
                  </div>
                  <p className="text-navy-200 leading-relaxed mb-6">{s.desc}</p> {/* Increased mb from 4 to 6 */}
                  <p className="text-sm text-navy-300 leading-relaxed mb-7">Our approach pairs deep technical expertise with rigorous compliance checking. Each engagement begins with a structured needs assessment, followed by tailored delivery, continuous reporting, and post-completion review — ensuring measurable results and long-term operational improvement.</p> {/* Increased mb from 5 to 7 */}
                                    <div className="mt-10 h-px bg-gradient-to-r from-marine-400/30 via-white/10 to-transparent" /> {/* Increased mt from 8 to 10 */
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

      {/* Final CTA — Navy (index=4 of stacked deck) */}
      <StackedCardSection
        index={4}
        total={5}
        targetScale={0.92}
        cardClassName="bg-navy-900 text-white"
      >
        <div className="mx-auto max-w-4xl px-8 lg:px-10 py-32 lg:py-40 text-center relative overflow-hidden"> {/* Increased px and py for premium spacing */}
          <TrigAmbientFloat amplitude={1.5} period={25000}>
            <TrigReveal direction="up" amplitude={30} duration={0.8}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em]"> {/* Increased from text-3xl to text-4xl */}
                Partner with Marevita Marine<br/><span className="text-marine-400">for Complete Maritime Solutions</span>
              </h2>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.15} duration={0.7}>
              <p className="mt-8 text-lg text-navy-200 max-w-2xl mx-auto"> {/* Increased from mt-6 to mt-8 */}
                Our comprehensive service portfolio ensures every aspect of your maritime operation is handled with expertise, accountability, and the highest standards of service.
              </p>
            </TrigReveal>
            <TrigReveal direction="up" amplitude={20} delay={0.3} duration={0.7}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-6"> {/* Increased mt from 10 to 14 and gap from 4 to 6 */}
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                  className="inline-block"
                >
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-6 rounded-full bg-marine-500 pl-9 pr-7 py-6 text-base font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 hover:shadow-marine-500/40 transition-colors" {/* Increased pl/pr/py and gap */}
                  >
                    Request a Proposal
                    <motion.span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                    >
                      <motion.span
                        className="inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                      >
                        <ArrowRight className="h-5 w-5" /> {/* Increased from h-4 w-4 to h-5 w-5 */}
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