import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ship,
  ArrowRight,
  ShieldCheck,
  Globe,
  Anchor,
  Compass,
  CheckCircle2,
  Layers,
  Sparkles,
  Gauge,
  LifeBuoy,
  Fuel,
  Boxes,
  Waves,
  Award,
  Users,
  Clock,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigAmbientFloat,
  TrigAmbientDrift,
  TrigAmbientRotate,
  TrigAmbientGradientShift,
  TrigCardHover,
  MOTION,
} from '../components/TrigScrollAnimations';

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVessel, setSelectedVessel] = useState(null);

  const categories = [
    { id: 'all', label: 'All Fleet Types' },
    { id: 'cargo', label: 'Dry & Bulk Cargo' },
    { id: 'tanker', label: 'Tankers & Liquid' },
    { id: 'offshore', label: 'Offshore & Logistics' },
    { id: 'passenger', label: 'Passenger & Cruise' },
  ];

  const fleetVessels = [
    {
      id: 'container-vessel',
      type: 'Container Vessel',
      category: 'cargo',
      fullName: 'Ultra-Large & Feeder Container Ships',
      shortDesc: 'Transportation of containerized cargo across critical international trade routes and major global hub ports.',
      highlight: 'High Schedule Reliability',
      icon: Boxes,
      crewingFocus: ['Master Mariner (Container Experience)', 'Chief Engineer (Large 2-Stroke Engines)', 'Reefer Cargo Technicians', 'Deck & Engine Officers'],
      specs: [
        { label: 'Primary Cargo', value: 'TEU & FEU Containers, Dangerous Goods' },
        { label: 'Key Manpower', value: 'Reefer Engineers, Heavy Lift Certified Officers' },
        { label: 'Vessel Scale', value: 'Feeder (1,000 TEU) to ULCV (24,000+ TEU)' },
        { label: 'Compliance', value: 'IMDG Code, SOLAS, MARPOL Annex I-VI' },
      ],
      description: 'Our container fleet operations demand pinpoint scheduling, fast port turnarounds, and meticulous cargo care. We provide highly disciplined crew proficient in dangerous goods handling, reefer container maintenance, and high-efficiency voyage management.'
    },
    {
      id: 'bulk-carrier',
      type: 'Bulk Carrier',
      category: 'cargo',
      fullName: 'Handysize to Capesize Dry Bulk Carriers',
      shortDesc: 'Transportation of dry bulk commodities including iron ore, coal, grains, fertilizers, and bauxite worldwide.',
      highlight: 'Heavy Cargo Expertise',
      icon: Ship,
      crewingFocus: ['Masters skilled in IMSBC Code', 'Chief Officers (Stability & Draft Survey)', 'Winch & Crane Operators', 'Fitters & Engine Watchkeepers'],
      specs: [
        { label: 'Primary Cargo', value: 'Grains, Coal, Iron Ore, Minerals' },
        { label: 'Key Manpower', value: 'Self-Discharge Crane Technicians, Hold Prep Crew' },
        { label: 'Vessel Scale', value: 'Handysize (35k DWT) to Capesize (200k+ DWT)' },
        { label: 'Compliance', value: 'IMSBC, Grain Code, BLU Code Compliance' },
      ],
      description: 'Handling solid bulk cargoes requires precise calculation of stability, hold cleanliness, and stress factors during rapid loading and de-ballasting. Our crew members are extensively seasoned in bulk cargo hold preparation and grain loading standards.'
    },
    {
      id: 'oil-chemical-tanker',
      type: 'Oil Tanker / Chemical Tanker',
      category: 'tanker',
      fullName: 'Product, Crude Oil & Chemical Tankers',
      shortDesc: 'Safe, zero-incident transportation of liquid energy, refined petroleum, petrochemicals, and hazardous bulk liquids.',
      highlight: 'SIRE & CDI Standardized',
      icon: Fuel,
      crewingFocus: ['Tanker Endorsed Master & Chief Officer', 'Gas/Chemical Certified Engineers', 'Pumpman & Certified Fitters', 'Dangerous Cargo Endorsement (DCE)'],
      specs: [
        { label: 'Primary Cargo', value: 'Crude Oil, Clean Petroleum, Petrochemicals' },
        { label: 'Key Manpower', value: 'Framo Certified Technicians, Experienced Pumpmen' },
        { label: 'Vessel Scale', value: 'MR Tankers to VLCCs (300,000+ DWT)' },
        { label: 'Compliance', value: 'ISGOTT, IBC Code, OCIMF SIRE, TMSA 3' },
      ],
      description: 'Operating in the stringent liquid cargo sector demands zero compromise on safety and environmental protection. Marevita Marine recruits top-tier tanker professionals holding valid DCE endorsements with exemplary safety and inspection records.'
    },
    {
      id: 'offshore-vessel',
      type: 'Offshore Vessel / PSV',
      category: 'offshore',
      fullName: 'Platform Supply Vessels & AHTS',
      shortDesc: 'Critical support for offshore oil, gas, and renewable platforms, dynamic positioning operations, and subsea logistics.',
      highlight: 'DP-2 / DP-3 Specialists',
      icon: Anchor,
      crewingFocus: ['DPO (Dynamic Positioning Officers)', 'Chief Engineers (Diesel-Electric)', 'Rigging & Deck Bosun', 'Offshore Safety Officers'],
      specs: [
        { label: 'Primary Cargo', value: 'Drill Mud, Deck Cargo, Pipes, Fuel, Potable Water' },
        { label: 'Key Manpower', value: 'DP Certified Navigators, Crane Operators' },
        { label: 'Vessel Scale', value: 'PSV, AHTS, OCV, Crew Boats' },
        { label: 'Compliance', value: 'IMCA Guidelines, DPVOA, Solas Chapter IX' },
      ],
      description: 'Offshore operations demand extraordinary seamanship and precision ship-handling in close quarters with production platforms. Our DP operators and offshore technicians are vetted to strict IMCA and oil major matrix guidelines.'
    },
    {
      id: 'ro-ro-vessel',
      type: 'RO-RO Vessels',
      category: 'cargo',
      fullName: 'Roll-On / Roll-Off & Pure Car Carriers (PCTC)',
      shortDesc: 'Engineered transport of motorized vehicles, construction machinery, project cargo, and wheeled freight worldwide.',
      highlight: 'Precision Vehicle Lashing',
      icon: Layers,
      crewingFocus: ['Masters (High Freeboard Maneuvering)', 'Lashing Supervisors & Bosun', 'Ventilation & Ramp Technicians', 'Deck Watchkeepers'],
      specs: [
        { label: 'Primary Cargo', value: 'Automobiles, Heavy Machinery, Rolling Freight' },
        { label: 'Key Manpower', value: 'Ramp Mechanics, Lashing Specialists' },
        { label: 'Vessel Scale', value: '2,000 CEU to 8,500+ CEU Pure Car Carriers' },
        { label: 'Compliance', value: 'CSS Code, Fire Safety Standards for Ro-Ro Decks' },
      ],
      description: 'Ro-Ro and vehicle carriers require acute attention to ramp operations, deck ventilation, fire prevention, and rapid vehicle lashing. We supply crew trained in heavy vehicle stowage and specialized internal ramp mechanics.'
    },
    {
      id: 'cruise-ship',
      type: 'Cruise Ship / Passenger Vessel',
      category: 'passenger',
      fullName: 'Luxury Cruise Liners & Passenger Ferries',
      shortDesc: 'Luxury passenger vessels requiring seamless synergy between maritime navigation, engineering, and 5-star hotel hospitality.',
      highlight: '5-Star Hospitality & Crowd Mgmt',
      icon: Waves,
      crewingFocus: ['Passenger Ship Certified Officers', 'Environmental Officers', 'Executive Chefs & Culinary Staff', 'Hotel, Housekeeping & Guest Services'],
      specs: [
        { label: 'Capacity', value: '500 to 5,000+ Guests & Crew' },
        { label: 'Key Manpower', value: 'Crowd & Crisis Management Certified Team' },
        { label: 'Vessel Scale', value: 'Expedition Yachts to Mega Cruise Ships' },
        { label: 'Compliance', value: 'SOLAS Safe Return to Port (SRtP), USPH, MLC 2006' },
      ],
      description: 'Passenger vessels demand excellence in both seamanship and hospitality. We supply maritime deck/engine officers holding Crowd & Crisis Management certifications as well as bilingual, service-oriented hotel and culinary personnel.'
    },
  ];

  const filteredVessels = activeCategory === 'all'
    ? fleetVessels
    : fleetVessels.filter((v) => v.category === activeCategory);

  const stats = [
    { label: 'Vessel Types Crewed', value: '6+', sub: 'Comprehensive Matrix' },
    { label: 'Global Trade Routes', value: '100%', sub: 'Worldwide Coverage' },
    { label: 'Certified & Compliant', value: '100%', sub: 'STCW & IMO Verified' },
    { label: 'Mobilization Readiness', value: '24/7', sub: 'Rapid Port Deployment' },
  ];

  const commitments = [
    {
      icon: ShieldCheck,
      title: 'Full Regulatory Compliance',
      desc: 'All crew deployments rigorously adhere to STCW 2010 (with Manila amendments), MLC 2006, ISM/ISPS, and Flag State requirements.',
    },
    {
      icon: Award,
      title: 'Thorough Vetting & Document Check',
      desc: 'Multistage screening including authentic sea-time verification, competency interviews by master mariners, and DG-approved medical fitness.',
    },
    {
      icon: Clock,
      title: 'Rapid Crew Mobilization',
      desc: 'Strategic talent pools and experienced logistics personnel enable swift crew changeovers across primary ports in Asia, Europe, and Middle East.',
    },
    {
      icon: LifeBuoy,
      title: 'Continuous Seafarer Welfare',
      desc: 'Comprehensive insurance, transparent employment agreements, on-time wage remittances, and dedicated family support channels.',
    },
  ];

  return (
    <div className="bg-navy-900 text-white min-h-screen">
      {/* ============================================================
          SECTION 1: HERO (Dark #0f1318)
          ============================================================ */}
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
            <div className="inline-flex items-center gap-2 rounded-full bg-marine-500/10 border border-marine-400/20 px-4 py-1.5 text-xs font-mono tracking-widest text-marine-300 uppercase mb-6 backdrop-blur-sm">
              <Ship className="h-3.5 w-3.5 text-marine-400" />
              <span>Marevita Fleet Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Our Fleet <br />
              <span className="text-marine-400">
                Manned With Precision.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-3xl leading-relaxed">
              Our fleet support encompasses modern and well-maintained vessels operated with a strong focus on safety, operational efficiency, reliability, and environmental responsibility. We supply qualified, vetted, and certified crew across key global maritime sectors.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#fleet-categories"
                className="inline-flex items-center gap-2 rounded-full bg-marine-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-marine-950/60 hover:bg-marine-400 transition-all"
              >
                <span>Explore Vessel Categories</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <span>Request Crew Manning</span>
              </Link>
            </div>
          </TrigAmbientFloat>
        </div>
      </section>

      {/* Organic Divider: Navy to White */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={110} type="rugged" />

      {/* ============================================================
          SECTION 2: FLEET CATEGORIES (Light #ffffff)
          ============================================================ */}
      <section id="fleet-categories" className="bg-white text-navy-900 py-20 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-marine-600 uppercase mb-3">
                <Filter className="h-3.5 w-3.5" />
                <span>Vessel Types We Provide Crew For</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-navy-900">
                Specialized Fleet Sectors
              </h2>
              <p className="mt-3 text-base text-navy-600 max-w-xl">
                Select a category to view vessel specifications, crewing profiles, and regulatory compliance standards.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-navy-100/80 text-navy-700 hover:bg-navy-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid: 3 Cols on Desktop */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVessels.map((vessel) => {
                const IconComponent = vessel.icon;
                return (
                  <motion.div
                    key={vessel.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col bg-navy-50/50 border border-navy-100 rounded-2xl p-7 hover:border-marine-300 hover:shadow-xl hover:shadow-marine-900/5 transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="h-14 w-14 rounded-xl bg-marine-500/10 border border-marine-500/20 text-marine-600 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-colors">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="inline-block text-[11px] font-mono uppercase tracking-wider font-bold bg-white px-2.5 py-1 rounded-md text-marine-700 border border-navy-100 shadow-2xs">
                        {vessel.highlight}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-navy-900 mb-1">
                      {vessel.type}
                    </h3>
                    <p className="text-xs font-mono font-medium text-marine-600 mb-4">
                      {vessel.fullName}
                    </p>

                    <p className="text-sm text-navy-600 leading-relaxed mb-6 flex-1">
                      {vessel.shortDesc}
                    </p>

                    {/* Crewing Key Roles Tags */}
                    <div className="mb-6 pt-4 border-t border-navy-200/60">
                      <span className="block text-xs font-bold uppercase tracking-wider text-navy-400 mb-2">
                        Key Positions Deployed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {vessel.crewingFocus.slice(0, 3).map((role, idx) => (
                          <span
                            key={idx}
                            className="inline-block text-[11px] bg-white text-navy-700 px-2.5 py-1 rounded-md border border-navy-200/70"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedVessel(vessel)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-navy-200 py-3 text-xs font-bold text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all cursor-pointer shadow-2xs"
                    >
                      <span>View Vessel Profile & Specs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Detail Modal / Drawer */}
      <AnimatePresence>
        {selectedVessel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-navy-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-navy-100 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedVessel(null)}
                className="absolute top-6 right-6 h-9 w-9 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center hover:bg-navy-200 font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-marine-500 text-white flex items-center justify-center">
                  <selectedVessel.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-marine-600">
                    Vessel Profile
                  </span>
                  <h3 className="text-2xl font-black text-navy-900 leading-none">
                    {selectedVessel.type}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-navy-600 leading-relaxed mt-4 mb-6">
                {selectedVessel.description}
              </p>

              {/* Specs Table */}
              <div className="bg-navy-50 rounded-2xl p-5 border border-navy-100 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">
                  Technical & Manning Specifications
                </h4>
                <div className="space-y-2.5">
                  {selectedVessel.specs.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs py-1 border-b border-navy-200/50 last:border-none">
                      <span className="font-semibold text-navy-500">{item.label}</span>
                      <span className="font-bold text-navy-900 text-left sm:text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crewing Requirements */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">
                  Standard Manning Roles Supplied
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedVessel.crewingFocus.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2.5 rounded-lg border border-navy-200 text-navy-800">
                      <CheckCircle2 className="h-3.5 w-3.5 text-marine-500 flex-shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-navy-100">
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-marine-500 py-3.5 text-xs font-bold text-white hover:bg-marine-400 transition-colors"
                >
                  <span>Inquire for this Vessel Type</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => setSelectedVessel(null)}
                  className="px-6 py-3.5 rounded-xl border border-navy-200 text-xs font-bold text-navy-700 hover:bg-navy-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Organic Divider: White to Navy */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0f1318" height={110} type="coast" flip />

      {/* ============================================================
          SECTION 3: COMMITMENT & SAFETY STANDARDS (Dark #0f1318)
          ============================================================ */}
      <section className="bg-navy-900 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-marine-400 font-bold">
              Our Safety Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">
              Built on Safety. <br />
              <span className="text-marine-400">Driven by Maritime Excellence.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-navy-200 leading-relaxed">
              Every vessel in our management and manning network is backed by certified marine professionals who uphold the highest global standards of safety, environmental stewardship, and vessel care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((c, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-marine-400/40 hover:bg-white/8 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-marine-500/20 text-marine-400 flex items-center justify-center mb-6">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-3">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy-300 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-[11px] font-mono text-marine-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-marine-400 mr-2" />
                  Verified Standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Divider: Navy to White */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={110} type="deep" />

      {/* ============================================================
          SECTION 4: OPERATIONAL HIGHLIGHTS (Light #ffffff)
          ============================================================ */}
      <section className="bg-white text-navy-900 py-20 lg:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-marine-600 font-bold">
              Global Scale
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-navy-900 mt-2">
              Fleet Coverage & Key Metrics
            </h2>
            <p className="mt-3 text-sm text-navy-600">
              Reliable, end-to-end maritime crewing and technical support spanning primary maritime corridors.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-navy-50/70 border border-navy-100 rounded-2xl p-6 sm:p-8 text-center hover:border-marine-300 transition-all shadow-2xs"
              >
                <div className="text-4xl sm:text-5xl font-black text-navy-900 tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-navy-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs font-mono text-marine-600">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Divider: White to Navy */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0f1318" height={110} type="ripple" flip />

      {/* ============================================================
          SECTION 5: CTA (Dark #0f1318)
          ============================================================ */}
      <section className="bg-navy-900 text-white py-24 lg:py-32 relative overflow-hidden text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <TrigAmbientFloat amplitude={1.5} period={25000}>
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4 font-bold">
              Crew Your Fleet
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Looking for Qualified Crew <br />
              <span className="text-marine-400">
                for Your Vessel Operations?
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto leading-relaxed">
              Whether you operate container ships, bulk carriers, product tankers, or specialized offshore support vessels, Marevita Marine delivers certified, experienced, and dependable crews.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-8 pr-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-all"
              >
                <span>Request Manning Proposal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-7 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                <span>Join As Seafarer</span>
              </Link>
            </div>
          </TrigAmbientFloat>
        </div>
      </section>
    </div>
  );
}