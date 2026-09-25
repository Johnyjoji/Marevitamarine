import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Zap, TrendingUp, BookOpen, Shield, Users, Anchor, ArrowRight, GraduationCap, Ship } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';

export default function News() {
  const newsItems = [
    {
      id: 1,
      date: 'September 15, 2026',
      title: 'Marevita Marine Achieves DNV GL Certification for Environmental Management',
      excerpt: 'Our commitment to sustainable operations has been recognized with the latest DNV GL environmental management certification, reinforcing our position as an industry leader in eco-conscious maritime services.',
      icon: Shield,
      color: 'marine-500'
    },
    {
      id: 2,
      date: 'August 30, 2026',
      title: 'New Crew Training Program Launches Across Asian Hubs',
      excerpt: 'We have launched an enhanced competency development program for seafarers, incorporating the latest IMO standards and digital learning platforms for improved accessibility.',
      icon: GraduationCap,
      color: 'marine-500'
    },
    {
      id: 3,
      date: 'July 22, 2026',
      title: 'Fleet Expansion: Addition of Two Eco-Friendly Tankers',
      excerpt: 'Our managed fleet grows with the addition of two modern LR2 tankers equipped with energy-saving devices and compliant with IMO 2023 regulations.',
      icon: Ship,
      color: 'marine-500'
    },
    {
      id: 4,
      date: 'June 10, 2026',
      title: 'Marevita Marine Recognized for Excellence in Port Agency Services',
      excerpt: 'Received the "Best Port Agent" award at the Maritime Logistics Excellence Awards for our 24-hour coordination capabilities and customer-centric approach.',
      icon: Anchor,
      color: 'marine-500'
    }
  ];

  return (
    <div>
      {/* Hero — Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4">Company News</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">News<br/><span className="text-marine-400">and insights.</span></h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">
            Stay updated with our latest developments, industry insights, and company achievements.
          </p>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* News Grid — White */}
      <section className="bg-white text-navy-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] mb-12">Latest Updates</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <div key={item.id} className="group p-8 rounded-2xl border border-navy-100 hover:border-marine-200 hover:shadow-xl transition-all bg-gradient-to-b from-white to-navy-50/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-10 w-10 flex-shrink-0 bg-${item.color}/20 text-${item.color} flex items-center justify-center rounded-full mt-0.5`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{item.title}</h3>
                    <p className="text-navy-600 text-sm mb-2">{item.date}</p>
                    <p className="text-navy-600 leading-relaxed">{item.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="ripple" flip />

      {/* CTA — Navy */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">Want to stay informed?<br/><span className="text-marine-400">Subscribe to our updates.</span></h2>
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-marine-500 pl-7 pr-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-marine-950/50 hover:bg-marine-400 transition-colors mt-8"><span>Get in touch</span><ArrowRight className="h-4 w-4"/></Link>
        </div>
      </section>
    </div>
  );
}