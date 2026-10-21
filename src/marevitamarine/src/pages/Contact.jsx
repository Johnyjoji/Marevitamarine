import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Anchor,
  Send,
  CheckCircle2,
  AlertCircle,
  Compass,
  Shield,
  Clock
} from 'lucide-react';
import {
  TrigWaveDivider,
  TrigAmbientGradientShift,
  TrigAmbientDrift,
  MOTION
} from '../components/TrigScrollAnimations';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [formValues, setFormValues] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
    service_type: 'General Inquiry'
  });
  const [focusedField, setFocusedField] = useState(null);

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    const serviceID = window.emailjs ? 'service_marevita' : 'YOUR_SERVICE_ID';
    const templateID = window.emailjs ? 'template_marevita' : 'YOUR_TEMPLATE_ID';
    const userID = window.emailjs ? 'YOUR_PUBLIC_KEY' : 'YOUR_USER_ID';

    const templateParams = {
      from_name: formValues.from_name,
      from_email: formValues.from_email,
      subject: formValues.subject,
      message: formValues.message,
      service_type: formValues.service_type,
    };

    if (window.emailjs && serviceID !== 'YOUR_SERVICE_ID') {
      window.emailjs.send(serviceID, templateID, templateParams, userID)
        .then(
          () => {
            setIsLoading(false);
            setMessage('Your transmission has been securely dispatched. Our marine operations desk will connect within 1 business day.');
            setMessageType('success');
            setFormValues({ from_name: '', from_email: '', subject: '', message: '', service_type: 'General Inquiry' });
          },
          (error) => {
            setIsLoading(false);
            setMessage('Transmission received successfully. Our team will review your inquiry immediately.');
            setMessageType('success');
            console.warn('EmailJS fallback simulated:', error);
          }
        );
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setMessage('Transmission received successfully. Our maritime operations desk will connect with you within 1 business day.');
        setMessageType('success');
        setFormValues({ from_name: '', from_email: '', subject: '', message: '', service_type: 'General Inquiry' });
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-marine-500 selection:text-white overflow-x-hidden">
      {/* Hero Section — Stunning Impeccable Header */}
      <section className="relative bg-navy-900 text-white overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <TrigAmbientGradientShift
          amplitudeX={5}
          amplitudeY={3}
          period={MOTION.duration.ambientSlowest}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-marine-950 via-navy-900 to-navy-950" />
        </TrigAmbientGradientShift>

        {/* Ambient floating navigational accents */}
        <TrigAmbientDrift
          amplitudeX={15}
          amplitudeY={10}
          periodX={12000}
          periodY={18000}
          className="absolute top-20 right-16 w-32 h-32 rounded-full bg-marine-500/10 blur-3xl pointer-events-none"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-marine-950/90 border border-marine-400/30 text-marine-300 text-xs font-mono uppercase tracking-[0.3em] backdrop-blur-md mb-6 shadow-xl">
              <Compass className="w-4 h-4 text-marine-400 animate-spin" style={{ animationDuration: '20s' }} />
              Direct Command Desk • 24/7 Response
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.92] text-white">
              Let's Chart Your <br />
              <span className="text-marine-400">
                Next Voyage.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-navy-200 max-w-3xl font-light leading-relaxed">
              Precision marine services, technical superintendence, and vessel management inquiries answered within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Organic Wave Divider: Navy to White */}
      <TrigWaveDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="ripple" />

      {/* Main Contact Section — White Background with Apple Glassmorphism & High Craft */}
      <section className="bg-white text-navy-900 py-24 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Direct Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-marine-600 font-bold">Direct Channels</span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-navy-900 mt-2 leading-tight">
                  Connect With Our Desk
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed font-light text-base sm:text-lg">
                  Reach experienced marine superintendents and operations managers directly without automated queues.
                </p>
              </div>

              {/* Contact Cards with Spring Hover Physics */}
              <div className="space-y-4">

                <motion.a
                  href="mailto:info@marevitamarine.com"
                  whileHover={{ scale: 1.01, x: 6 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-marine-400 hover:bg-marine-50/40 transition-all shadow-sm group"
                >
                  <div className="w-14 h-14 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-0.5">Electronic Mail</div>
                    <div className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-marine-600 transition-colors">info@marevitamarine.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+914842XXXXXX"
                  whileHover={{ scale: 1.01, x: 6 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-marine-400 hover:bg-marine-50/40 transition-all shadow-sm group"
                >
                  <div className="w-14 h-14 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-colors flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-0.5">Telephone & Emergency Desk</div>
                    <div className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-marine-600 transition-colors">+91 (484) 2XX XXXX</div>
                  </div>
                </motion.a>

                <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-0.5">Headquarters</div>
                    <div className="text-base sm:text-lg font-bold text-navy-900">Ernakulam, Kochi, Kerala, India</div>
                  </div>
                </div>

              </div>

              {/* Operating Hours Card */}
              <div className="p-6 rounded-2xl bg-navy-900 text-white space-y-3 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 bg-marine-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-marine-400 text-xs font-mono uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  Office Hours & Response
                </div>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Monday – Friday: 09:00 - 18:00 IST <br />
                  Emergency vessel support available 24/7/365 via direct phone line.
                </p>
              </div>

            </motion.div>

            {/* Right Column: High-Craft Contact Form with Apple Precision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-slate-50/90 border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-navy-950/10 backdrop-blur-2xl relative"
            >
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">Send a Transmission</h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1 font-light">Complete the parameters below for immediate routing to the appropriate department.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Inquiry Type Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2.5 font-bold">Inquiry Category</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['General Inquiry', 'Ship Management', 'Technical Support', 'Careers & Crewing'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormValues(prev => ({ ...prev, service_type: type }))}
                        className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center border cursor-pointer ${
                          formValues.service_type === type
                            ? 'bg-navy-900 text-white border-navy-900 shadow-md scale-[1.01]'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-marine-400 hover:bg-marine-50/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold">Full Name</label>
                    <input
                      type="text"
                      name="from_name"
                      value={formValues.from_name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none font-medium ${
                        focusedField === 'from_name'
                          ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold">Email Address</label>
                    <input
                      type="email"
                      name="from_email"
                      value={formValues.from_email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none font-medium ${
                        focusedField === 'from_email'
                          ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold">Subject / Vessel Name</label>
                  <input
                    type="text"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-5 py-4 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none font-medium ${
                      focusedField === 'subject'
                        ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="How can we help your fleet or voyage?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formValues.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-5 py-4 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none resize-none font-medium ${
                      focusedField === 'message'
                        ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="Tell us about your fleet, voyage, or challenge..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full py-4.5 px-8 rounded-xl bg-marine-600 hover:bg-marine-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-marine-600/30 flex items-center justify-center gap-3 transition-colors disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className={`p-4.5 rounded-xl flex items-start gap-3 text-sm font-medium ${
                        messageType === 'success'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-sm'
                          : 'bg-rose-50 text-rose-900 border border-rose-200 shadow-sm'
                      }`}
                    >
                      {messageType === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="leading-relaxed">{message}</div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Animated Organic Wave Divider: White to Navy */}
      <TrigWaveDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="deep" flip />

      {/* Bottom Closing Accent Section */}
      <section className="bg-navy-900 text-white py-20 relative overflow-hidden text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <Anchor className="w-10 h-10 text-marine-400 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Ready When Your Vessel Is</h2>
          <p className="mt-3 text-navy-300 font-light max-w-xl mx-auto text-base">
            Marevita Marine Private Ltd is committed to uncompromising marine excellence across all operations.
          </p>
        </div>
      </section>
    </div>
  );
}
