import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Users, Truck, Globe } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';

export default function Safety() {
  const safetyPoints = [
    { icon: Shield, title: 'Zero-Incident Culture', desc: 'Every incident investigated as a systems failure; learning embedded in SOPs.' },
    { icon: CheckCircle2, title: 'Class & Statutory Compliance', desc: 'DNV, ABS, LR, BV, NK — audit-ready year-round.' },
    { icon: Users, title: 'Qualified & Trained Crew', desc: 'Continuous competency, flag-state endorsements, simulator training.' },
    { icon: Truck, title: 'Vessel Maintenance Excellence', desc: 'Condition-based planning, class-supervised dry docks, OEM partnerships.' },
    { icon: Globe, title: 'Environmental Responsibility', desc: 'IMO 2020, EEXI, CII compliance; ballast water, waste management.' },
  ];

  return (
    <div>
      {/* Hero — Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4">Our Commitment</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">Safety<br/><span className="text-marine-400">and quality.</span></h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">Safety is not luck — it’s a system we own, audit, and improve every single day.</p>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* Safety Details — White */}
      <section className="bg-white text-navy-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyPoints.map((p) => (
              <div key={p.title} className="group p-8 rounded-2xl border border-navy-100 hover:border-marine-200 hover:shadow-xl transition-all bg-gradient-to-b from-white to-navy-50/30">
                <div className="h-12 w-12 rounded-xl bg-marine-50 text-marine-600 flex items-center justify-center mb-6"><p.icon className="h-6 w-6"/></div>
                <h3 className="text-xl font-bold tracking-tight mb-2">{p.title}</h3>
                <p className="text-navy-600 leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="coast" flip />

      {/* CTA — Navy */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">Ready to sail safely?<br/><span className="text-marine-400">Start the conversation.</span></h2>
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-8"><span>Get in touch</span><ArrowRight className="h-4 w-4"/></Link>
        </div>
      </section>
    </div>
  );
}