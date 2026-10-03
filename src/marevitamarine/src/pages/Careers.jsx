import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Anchor,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Shield,
  Globe,
  Clock,
  Users,
  Ship,
  Wrench,
  Zap,
  ChefHat,
  Briefcase,
  Mail,
  FileText,
  Search,
  Award,
  LifeBuoy,
  Phone,
} from 'lucide-react';
import {
  TrigWaveDivider,
  TrigReveal,
  TrigAmbientFloat,
  TrigAmbientDrift,
  TrigAmbientRotate,
  TrigAmbientGradientShift,
  MOTION,
} from '../components/TrigScrollAnimations';

// ============================================================
// Data
// ============================================================

const departments = [
  { id: 'all', label: 'All Positions', icon: Globe },
  { id: 'deck', label: 'Deck Department', icon: Ship },
  { id: 'engine', label: 'Engine Department', icon: Wrench },
  { id: 'electro', label: 'Electro-Technical', icon: Zap },
  { id: 'galley', label: 'Galley & Hotel', icon: ChefHat },
  { id: 'cadet', label: 'Cadets', icon: GraduationCap },
  { id: 'shore', label: 'Shore-Based', icon: Briefcase },
];

const positions = [
  // Deck Department
  { id: 'd1', dept: 'deck', rank: 'Captain / Master', level: 'Senior Officer', desc: 'Responsible for overall safe navigation, crew management, flag state compliance, and cargo operations across diverse vessel types.', requirements: ['Valid Master Mariner (COC Class 1)', 'Minimum 2 years as Master experience', 'GMDSS GOC Certificate', 'Valid STCW 2010 certificates'] },
  { id: 'd2', dept: 'deck', rank: 'Chief Officer', level: 'Senior Officer', desc: 'Oversees cargo planning, deck department, stability calculations, and serves as the vessel\'s safety officer.', requirements: ['COC Chief Mate certificate', 'Advanced Cargo Handling certification', 'Safety Officer certificate', 'Proficiency in Survival Craft & Rescue Boats'] },
  { id: 'd3', dept: 'deck', rank: '2nd Officer', level: 'Junior Officer', desc: 'Responsible for navigation watch, GMDSS radio communications, and medical officer duties onboard.', requirements: ['COC OOW / 2nd Mate', 'Valid GMDSS General Operator certificate', 'Medical First Aid certification', 'STCW Basic Safety Training'] },
  { id: 'd4', dept: 'deck', rank: '3rd Officer', level: 'Junior Officer', desc: 'Maintains navigation equipment, fire safety equipment, and cargo watch duties.', requirements: ['COC Watchkeeping / 3rd Mate or OOW certificate', 'Firefighting Advanced certification', 'STCW Basic Training', 'Valid CDC/Seaman\'s book'] },
  { id: 'd5', dept: 'deck', rank: 'Bosun', level: 'Rating', desc: 'Leads the deck ratings team in painting, maintenance, mooring, anchoring, and gangway operations.', requirements: ['Approved seamanship training', 'Bosun or AB-advanced certification', 'Proficiency in Survival Craft', 'Minimum 5 years at sea'] },
  { id: 'd6', dept: 'deck', rank: 'Able Seaman (AB)', level: 'Rating', desc: 'Deck watch rating responsible for mooring operations, deck maintenance, and helm duty.', requirements: ['STCW Rating certificate - Able Seafarer (Deck)', 'Proficiency in Survival Craft', 'Minimum sea time as Ordinary Seaman', 'Valid CDC'] },
  { id: 'd7', dept: 'deck', rank: 'Ordinary Seaman (OS)', level: 'Rating', desc: 'Entry-level deck rating involved in deck maintenance, mooring, and watch assistance.', requirements: ['Basic Safety Training (STCW)', 'Valid CDC / Seaman\'s book', 'Basic watchkeeping training', 'Medical certificate'] },
  // Engine Department
  { id: 'e1', dept: 'engine', rank: 'Chief Engineer', level: 'Senior Officer', desc: 'Full technical oversight of the vessel\'s engine room, machinery, maintenance planning, and crew management.', requirements: ['COC Class 1 (Motor / Steam)', 'ISM Code awareness certification', 'Minimum 2 years as Chief Engineer', 'STCW Advanced Fire Fighting'] },
  { id: 'e2', dept: 'engine', rank: '2nd Engineer', level: 'Senior Officer', desc: 'Plans and supervises maintenance of main engine, auxiliary machinery, and all mechanical systems.', requirements: ['COC 2nd Engineer / OOW (Engineering)', 'Advanced Engine Room Management training', 'Approved engine room watchkeeping experience', 'STCW 2010 certificates'] },
  { id: 'e3', dept: 'engine', rank: '3rd / 4th Engineer', level: 'Junior Officer', desc: 'Engine room watchkeeping, machinery maintenance, and supporting 2nd Engineer in planned maintenance.', requirements: ['COC OOW (Engineering) / 3rd Engineer', 'Engine room watchkeeping certificate', 'STCW Basic Safety Training', 'Valid CDC'] },
  { id: 'e4', dept: 'engine', rank: 'Fitter / Machinist', level: 'Rating', desc: 'Skilled trades rating handling mechanical repairs, pipe fitting, and machinery component maintenance.', requirements: ['Engine Room Fitter certification', 'Trade certificate in mechanical engineering', 'Minimum sea time as Motorman / Oiler', 'STCW Basic Training'] },
  { id: 'e5', dept: 'engine', rank: 'Motorman / Oiler', level: 'Rating', desc: 'Assists engineers in engine room watch duties, machinery inspection, and lubrication upkeep.', requirements: ['STCW Rating certificate - Able Seafarer (Engine)', 'Engine room watchkeeping training', 'Valid CDC and medical certificate', 'Basic Safety Training'] },
  { id: 'e6', dept: 'engine', rank: 'Wiper', level: 'Rating', desc: 'Entry-level engine rating assisting in cleaning, lubricating machinery, and engine room maintenance.', requirements: ['Basic Safety Training (STCW)', 'Valid CDC', 'Basic engine room orientation training', 'Medical certificate'] },
  // Electro-Technical
  { id: 'et1', dept: 'electro', rank: 'Electro-Technical Officer (ETO)', level: 'Officer', desc: 'Responsible for vessel electrical systems, automation controls, navigation electronics, and GMDSS equipment.', requirements: ['ETO certificate as per STCW 2010 (A-III/6)', 'Diploma in Electronics & Electrical Engineering', 'GMDSS maintenance experience', 'Minimum 2 years ETO sea time'] },
  { id: 'et2', dept: 'electro', rank: 'Electrical Engineer', level: 'Officer', desc: 'Maintains high voltage switchboards, motors, generators, and vessel-wide electrical infrastructure.', requirements: ['Electrical Engineer certificate (COC Reg. III/6)', 'High voltage endorsement (where applicable)', 'PLC and automation system experience', 'STCW Basic Training'] },
  // Galley & Hotel
  { id: 'g1', dept: 'galley', rank: 'Chief Cook', level: 'Specialist', desc: 'Manages full galley operations including menu planning, provisioning, dietary requirements, and food safety compliance.', requirements: ['Ship Cook / Chief Cook certification', 'Food safety and hygiene certificate (HACCP)', 'Food Handler\'s certificate recognized by flag state', 'Experience cooking across cultures for multinational crew'] },
  { id: 'g2', dept: 'galley', rank: '2nd Cook / Assistant Cook', level: 'Specialist', desc: 'Supports chief cook in meal preparation, galley hygiene, and daily catering operations.', requirements: ['Basic Ship Cook certificate', 'Food safety training', 'STCW Basic Safety Training', 'Valid CDC'] },
  { id: 'g3', dept: 'galley', rank: 'General Steward', level: 'Specialist', desc: 'Provides mess room service, officers\' accommodation management, and general hospitality on board.', requirements: ['Basic training in maritime catering', 'Housekeeping & cabin service experience', 'STCW Basic Safety Training', 'Language proficiency (English essential)'] },
  { id: 'g4', dept: 'galley', rank: 'Housekeeping / Cruise Staff / Entertainers', level: 'Specialist', desc: 'Guest services, cabin maintenance, onboard entertainment, and passenger hospitality for cruise vessels.', requirements: ['Hospitality or tourism diploma preferred', 'Cruise ship / passenger vessel experience', 'Language proficiency and guest relation skills', 'STCW Crowd & Crisis Management (passenger vessels)'] },
  // Cadets
  { id: 'c1', dept: 'cadet', rank: 'Deck Cadet', level: 'Trainee', desc: 'Gaining required sea service towards Officer of the Watch certification under structured training program.', requirements: ['Enrollment in IMO-approved Maritime Academy', 'Approved Training Record Book (TRB)', 'STCW Basic Safety Training', 'Valid cadet medical certificate'] },
  { id: 'c2', dept: 'cadet', rank: 'Engine Cadet', level: 'Trainee', desc: 'Accumulating mandatory sea service and watchkeeping experience for marine engineering certification.', requirements: ['IMO-approved Marine Engineering program enrollment', 'Approved Training Record Book (TRB)', 'STCW Basic Safety Training', 'Valid cadet medical certificate'] },
  // Shore-Based
  { id: 's1', dept: 'shore', rank: 'Marine / Technical Superintendent', level: 'Shore-Based', desc: 'Oversees fleet technical management, superintends dry-docking and repairs, and ensures class & flag state compliance for assigned vessels.', requirements: ['Ex-Sea service as Master or Chief Engineer', 'ISM Internal Auditor certification', 'Experience in vessel dry-docking and repair management', 'Excellent report writing and vendor management skills'] },
  { id: 's2', dept: 'shore', rank: 'Crew Manning Officer', level: 'Shore-Based', desc: 'Manages seafarer recruitment pipeline, crew documentation processing, travel logistics, and flag state endorsements.', requirements: ['Background in maritime HR or crew management', 'Knowledge of STCW, MLC 2006, and DG requirements', 'Strong IT skills (Crew management software)', 'Excellent communication and organizational abilities'] },
  { id: 's3', dept: 'shore', rank: 'Port Captain / Fleet Inspector', level: 'Shore-Based', desc: 'Conducts pre-joining inspections, crew assessments, and port superintendency duties across nominated vessel calls.', requirements: ['Ex-Master Mariner preferred', 'PSC / Vetting inspection experience', 'Familiarity with SIRE, CDI, and RightShip audits', 'Willingness to travel extensively'] },
];

const pillars = [
  {
    icon: Globe,
    title: 'Global Fleet Placements',
    desc: 'Deployment opportunities across container ships, bulk carriers, chemical tankers, cruise vessels, and offshore support fleets covering global trade routes.',
  },
  {
    icon: Shield,
    title: 'MLC 2006 & STCW Compliant',
    desc: 'All employment agreements are fully compliant with the Maritime Labour Convention 2006 and STCW requirements with top-tier insurance and documented crew welfare standards.',
  },
  {
    icon: GraduationCap,
    title: 'Career Advancement Pathway',
    desc: 'Structured rank progression from cadet to senior officer, complemented by access to STCW training, endorsements, and flag state certification support.',
  },
  {
    icon: Clock,
    title: 'Reliable Rotations & Welfare',
    desc: 'Transparent sign-on/sign-off cycles, on-time wage remittances, 24/7 port support, and robust family liaison services for all our deployed seafarers.',
  },
];

const processSteps = [
  {
    number: '01',
    icon: FileText,
    title: 'Application Submission',
    desc: 'Submit your CV, Certificate of Competency, STCW certificates, and sea-time matrix either via our contact page or directly to our crewing department.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Document Verification & Screening',
    desc: 'Our qualified marine superintendents and crewing team verify all credentials, sea service records, and flag state endorsements for completeness and authenticity.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Technical Interview & Vessel Briefing',
    desc: 'Shortlisted candidates attend a competency interview with a senior maritime officer and receive a thorough briefing on vessel specifics and assignment terms.',
  },
  {
    number: '04',
    icon: Award,
    title: 'Medical Examination & Endorsements',
    desc: 'Completion of DG-approved ENG1/ML5 medical fitness examination and processing of any required flag state or port-state endorsements for the assigned vessel.',
  },
  {
    number: '05',
    icon: ArrowRight,
    title: 'Mobilization & Sign-On',
    desc: 'Our port logistics team arranges travel, coordinates with port agents for smooth embarkation, and provides a full pre-departure briefing document pack.',
  },
];

// ============================================================
// Level badge styling
// ============================================================
const levelStyle = {
  'Senior Officer': 'bg-navy-900 text-white',
  'Junior Officer': 'bg-navy-100 text-navy-900',
  'Officer': 'bg-marine-500/10 text-marine-700',
  'Rating': 'bg-navy-100 text-navy-700',
  'Specialist': 'bg-amber-50 text-amber-800',
  'Trainee': 'bg-green-50 text-green-800',
  'Shore-Based': 'bg-blue-50 text-blue-800',
};

// ============================================================
// Main Component
// ============================================================

export default function Careers() {
  const [activeDept, setActiveDept] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState(null);

  const filtered = activeDept === 'all'
    ? positions
    : positions.filter((p) => p.dept === activeDept);

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
          <div className="absolute inset-0 bg-gradient-to-br from-marine-600/25 via-transparent to-navy-950/60" />
        </TrigAmbientGradientShift>

        {/* Decorative ambient icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <TrigAmbientDrift
            amplitudeX={MOTION.amplitude.small}
            amplitudeY={MOTION.amplitude.small}
            periodX={MOTION.duration.ambientSlow}
            periodY={MOTION.duration.ambientSlower}
            className="absolute top-24 right-16 w-16 h-16 text-marine-400/10 hidden lg:block"
          >
            <Anchor className="w-full h-full" strokeWidth={1} />
          </TrigAmbientDrift>
          <TrigAmbientRotate
            maxDegrees={5}
            period={MOTION.duration.ambientSlowest}
            className="absolute bottom-24 left-14 w-10 h-10 text-marine-400/10 hidden lg:block"
          >
            <Ship className="w-full h-full" strokeWidth={1} />
          </TrigAmbientRotate>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <TrigAmbientFloat amplitude={1.5} period={25000}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-marine-500/10 border border-marine-400/20 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-marine-300 uppercase mb-6 backdrop-blur-sm">
              <Anchor className="h-3.5 w-3.5 text-marine-400" />
              <span>Marevita Marine — Careers at Sea</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Build Your <br />
              <span className="text-marine-400">Career at Sea.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-3xl leading-relaxed">
              We offer opportunities for qualified and motivated maritime professionals who want to build a rewarding career in the Merchant Navy. Join a global fleet crewed by Marevita Marine — trusted for certification, safety, and seafarer welfare.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-full bg-marine-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-marine-950/50 hover:bg-marine-400 transition-all"
              >
                <span>View Open Positions</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <span>Apply Directly</span>
              </a>
            </div>
          </TrigAmbientFloat>
        </div>
      </section>

      {/* Organic Divider: Navy to White */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={110} type="ripple" />

      {/* ============================================================
          SECTION 2: WHY SAIL WITH MAREVITA (Light #ffffff)
          ============================================================ */}
      <section className="bg-white text-navy-900 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-marine-600">
              Why Choose Marevita
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-navy-900 mt-2">
              Built for Seafarers. <br />Backed by Standards.
            </h2>
            <p className="mt-4 text-base text-navy-600 leading-relaxed">
              We don't just place crew — we build careers. Every seafarer who joins our network benefits from transparent employment, professional growth, and a company that genuinely invests in crew welfare at every level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="group bg-navy-50/60 border border-navy-100 rounded-2xl p-7 hover:border-marine-300 hover:shadow-xl hover:shadow-marine-900/5 transition-all flex flex-col"
              >
                <div className="h-13 w-13 rounded-xl bg-marine-500/10 border border-marine-500/20 text-marine-600 flex items-center justify-center mb-6 group-hover:bg-marine-500 group-hover:text-white transition-colors">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-navy-900 mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed flex-1">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Divider: White to Navy */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0f1318" height={110} type="coast" flip />

      {/* ============================================================
          SECTION 3: OPEN POSITIONS BY DEPARTMENT (Dark #0f1318)
          ============================================================ */}
      <section id="open-positions" className="bg-navy-900 text-white py-20 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header + Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-marine-400">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-2">
                Positions At Sea & Ashore
              </h2>
              <p className="mt-3 text-sm text-navy-300 max-w-lg">
                Filter by department to find relevant openings. Click any role to view full details and requirements.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDept(d.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeDept === d.id
                        ? 'bg-marine-500 text-white shadow-md'
                        : 'bg-white/10 border border-white/10 text-navy-200 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Positions List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((pos) => (
                <motion.div
                  key={pos.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-marine-400/40 hover:bg-white/8 transition-all flex flex-col group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-bold text-white leading-snug">
                      {pos.rank}
                    </h3>
                    <span className={`flex-shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${levelStyle[pos.level] || 'bg-white/10 text-white'}`}>
                      {pos.level}
                    </span>
                  </div>

                  <p className="text-xs text-navy-300 leading-relaxed mb-4 flex-1">
                    {pos.desc}
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => setSelectedPosition(pos)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-navy-200 hover:bg-marine-500 hover:border-marine-500 hover:text-white transition-all cursor-pointer"
                    >
                      <span>View Requirements</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Position Detail Modal */}
      <AnimatePresence>
        {selectedPosition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-navy-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-navy-100 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedPosition(null)}
                className="absolute top-6 right-6 h-9 w-9 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center hover:bg-navy-200 font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-5">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${levelStyle[selectedPosition.level] || 'bg-navy-100 text-navy-900'}`}>
                  {selectedPosition.level}
                </span>
                <h3 className="text-2xl font-black text-navy-900 mt-2 leading-tight">
                  {selectedPosition.rank}
                </h3>
              </div>

              <p className="text-sm text-navy-600 leading-relaxed mb-6 border-b border-navy-100 pb-5">
                {selectedPosition.desc}
              </p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-4">
                  Minimum Requirements
                </h4>
                <div className="space-y-2.5">
                  {selectedPosition.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-navy-800">
                      <CheckCircle2 className="h-4 w-4 text-marine-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-navy-100">
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-marine-500 py-3.5 text-xs font-bold text-white hover:bg-marine-400 transition-colors"
                  onClick={() => setSelectedPosition(null)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Apply for This Position</span>
                </Link>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="px-6 py-3.5 rounded-xl border border-navy-200 text-xs font-bold text-navy-700 hover:bg-navy-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Organic Divider: Navy to White */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={110} type="deep" />

      {/* ============================================================
          SECTION 4: RECRUITMENT PROCESS (Light #ffffff)
          ============================================================ */}
      <section className="bg-white text-navy-900 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-marine-600">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-navy-900 mt-2">
              The Recruitment & Joining Process
            </h2>
            <p className="mt-3 text-sm text-navy-600 leading-relaxed">
              A structured, transparent, and professional sign-on process designed to respect your time and ensure full regulatory compliance from Day 1.
            </p>
          </div>

          <div className="relative">
            {/* Connector line — Desktop */}
            <div className="hidden lg:block absolute top-[3.25rem] left-[5rem] right-[5rem] h-px bg-navy-100 z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center group"
                  >
                    {/* Step Number Circle */}
                    <div className="relative mb-5">
                      <div className="h-12 w-12 rounded-full bg-white border-2 border-navy-200 group-hover:border-marine-400 group-hover:shadow-md transition-all flex items-center justify-center text-navy-900 font-black text-xs relative z-10">
                        <Icon className="h-5 w-5 text-marine-600" />
                      </div>
                      <span className="absolute -top-2 -right-2 text-[10px] font-black font-mono text-marine-600 bg-white rounded-full border border-marine-200 px-1.5 leading-tight">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-navy-900 mb-2 group-hover:text-marine-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-navy-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Organic Divider: White to Navy */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0f1318" height={110} type="rugged" flip />

      {/* ============================================================
          SECTION 5: APPLY / CTA (Dark #0f1318)
          ============================================================ */}
      <section id="apply" className="bg-navy-900 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
          <TrigAmbientFloat amplitude={1.5} period={25000}>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              {/* Left — Messaging */}
              <div className="flex-1">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-marine-400 mb-4 block">
                  Ready to Join Our Fleet?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Start Your Next <br />
                  <span className="text-marine-400">Voyage With Us.</span>
                </h2>
                <p className="mt-5 text-base text-navy-200 leading-relaxed max-w-lg">
                  Send your resume, sea-time matrix, and certificates to our crewing department. Our team will review, verify, and respond within 72 working hours.
                </p>

                {/* Contact Methods */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-navy-200">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-marine-400" />
                    </div>
                    <span>crew@marevitamarine.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-navy-200">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-marine-400" />
                    </div>
                    <span>+91 (Crewing Desk — India Operations)</span>
                  </div>
                </div>

                {/* What to Include */}
                <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-marine-400 mb-3">
                    What to Include in Your Application
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Updated CV / Resume with sea service summary',
                      'Certificate of Competency (COC/COE) copies',
                      'STCW certificates (valid & attested)',
                      'Sea-time matrix / discharge book',
                      'Passport, CDC, and Medical certificate copy',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-navy-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-marine-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — CTA Card */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white text-navy-900 rounded-3xl p-7 shadow-2xl">
                  <div className="h-12 w-12 rounded-xl bg-marine-500 text-white flex items-center justify-center mb-5">
                    <LifeBuoy className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-navy-900 mb-2">
                    Apply Now
                  </h3>
                  <p className="text-sm text-navy-600 mb-6 leading-relaxed">
                    Fill out our contact form and attach your documents. Our crewing team will be in touch within 72 hours.
                  </p>

                  <Link
                    to="/contact"
                    className="block w-full text-center inline-flex items-center justify-center gap-2 rounded-xl bg-marine-500 py-3.5 text-sm font-bold text-white hover:bg-marine-400 transition-colors mb-3"
                  >
                    <span>Open Application Form</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <p className="text-[11px] text-center text-navy-400 font-mono">
                    All seafarer documents are treated with strict confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </TrigAmbientFloat>
        </div>
      </section>
    </div>
  );
}
