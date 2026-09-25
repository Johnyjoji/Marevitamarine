import { Link } from 'react-router-dom';
import { Users, Anchor, GraduationCap, Shield, Globe, Heart, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';

export default function Careers() {
  return (
    <div>
      {/* Hero — Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4">Join Our Team</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">Careers<br/><span className="text-marine-400">at Marevita</span></h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">
            We are passionate about maritime excellence and seek talented individuals who share our commitment to safety, quality, and innovation.
          </p>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* Why Work With Us — White */}
      <section className="bg-white text-navy-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] mb-12">Why Choose Marevita Marine?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl border border-navy-100 hover:border-marine-200 transition-all">
              <Users className="h-10 w-10 text-marine-500 mb-4" />
              <h3 className="text-xl font-bold tracking-tight mb-2">Expert Team</h3>
              <p className="text-navy-600">Work alongside industry veterans and maritime specialists.</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-navy-100 hover:border-marine-200 transition-all">
              <Anchor className="h-10 w-10 text-marine-500 mb-4" />
              <h3 className="text-xl font-bold tracking-tight mb-2">Global Impact</h3>
              <p className="text-navy-600">Contribute to operations that keep global trade moving.</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-navy-100 hover:border-marine-200 transition-all">
              <GraduationCap className="h-10 w-10 text-marine-500 mb-4" />
              <h3 className="text-xl font-bold tracking-tight mb-2">Professional Growth</h3>
              <p className="text-navy-600">Continuous training, certifications, and career advancement opportunities.</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-navy-100 hover:border-marine-200 transition-all">
              <Shield className="h-10 w-10 text-marine-500 mb-4" />
              <h3 className="text-xl font-bold tracking-tight mb-2">Safety First</h3>
              <p className="text-navy-600">Unwavering commitment to zero-incident operations and crew welfare.</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="coast" flip />

      {/* Open Positions — Navy */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] text-center mb-12">Current Opportunities</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Position 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-navy-700/30 p-6">
              <h3 className="text-2xl font-bold mb-4">Marine Superintendent</h3>
              <p className="text-navy-200 mb-4">Kochi, India • Senior Level • Full-time</p>
              <ul className="space-y-2 text-navy-300">
                <li>• Oversee vessel operations and maintenance schedules</li>
                <li>• Ensure class and statutory compliance</li>
                <li>• Liaise with shipowners, charterers, and port authorities</li>
                <li>• Minimum 5 years experience in marine superintendency</li>
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-marine-500 px-5 py-2 text-sm font-semibold text-white hover:bg-marine-400 transition-colors">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Position 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-navy-700/30 p-6">
              <h3 className="text-2xl font-bold mb-4">Junior Marine Engineer</h3>
              <p className="text-navy-200 mb-4">Multiple Locations • Entry Level • Full-time</p>
              <ul className="space-y-2 text-navy-300">
                <li>• Assist in maintenance and repair operations</li>
                <li>• Support dry-dock planning and execution</li>
                <li>• Learn from senior engineers on diverse vessel types</li>
                <li>• Marine engineering degree or equivalent certification</li>
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-marine-500 px-5 py-2 text-sm font-semibold text-white hover:bg-marine-400 transition-colors">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Position 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-navy-700/30 p-6">
              <h3 className="text-2xl font-bold mb-4">Operations Coordinator</h3>
              <p className="text-navy-200 mb-4">Ernakulam, India • Mid Level • Full-time</p>
              <ul className="space-y-2 text-navy-300">
                <li>• Coordinate crew changes and port logistics</li>
                <li>• Manage documentation and compliance reporting</li>
                <li>• Liaise with vessels, agents, and service providers</li>
                <li>• Strong organizational and communication skills</li>
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-marine-500 px-5 py-2 text-sm font-semibold text-white hover:bg-marine-400 transition-colors">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="ripple" flip />

      {/* CTA — Navy */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">Ready to embark on your maritime career?<br/><span className="text-marine-400">Get in touch.</span></h2>
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-8"><span>Contact Us</span><ArrowRight className="h-4 w-4"/></Link>
        </div>
      </section>
    </div>
  );
}