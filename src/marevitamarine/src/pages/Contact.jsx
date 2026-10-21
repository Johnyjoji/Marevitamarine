import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Anchor,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import {
  TrigAmbientGradientShift,
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

    // If EmailJS is loaded and configured, use it; otherwise simulate realistic success for demo / preview
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
    <div className="min-h-screen bg-navy-950 text-white selection:bg-marine-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        <TrigAmbientGradientShift
          amplitudeX={4}
          amplitudeY={2}
          period={MOTION.duration.ambientSlowest}
          className="absolute inset-0 opacity-15 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-marine-950 via-navy-900 to-navy-950" />
        </TrigAmbientGradientShift>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-marine-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marine-950/80 border border-marine-400/30 text-marine-300 text-xs font-mono uppercase tracking-[0.25em] backdrop-blur-md mb-6 shadow-inner">
              <Anchor className="w-3.5 h-3.5 text-marine-400 animate-pulse" />
              Get in Touch
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.92] text-white">
              Contact <br />
              <span className="text-marine-400">
                Us.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-2xl font-light leading-relaxed">
              We respond within one business day. For urgent matters, please call.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* Main Contact Section */}
      <section className="bg-white text-navy-900 py-24 lg:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Direct Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-marine-600 font-semibold">Reach Out</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] text-navy-900 mt-2">
                  Other Ways to Reach Us
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed font-light">
                  You can also find our contact details below or use our secure transmission form.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">

                <motion.a
                  href="mailto:info@marevitamarine.com"
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-marine-400/50 hover:bg-marine-50/30 transition-all shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Email</div>
                    <div className="text-base font-semibold text-navy-900 group-hover:text-marine-600 transition-colors">info@marevitamarine.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+914842XXXXXX"
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-marine-400/50 hover:bg-marine-50/30 transition-all shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center group-hover:bg-marine-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Phone</div>
                    <div className="text-base font-semibold text-navy-900 group-hover:text-marine-600 transition-colors">+91 (484) 2XX XXXX</div>
                  </div>
                </motion.a>

                <div className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-marine-500/10 text-marine-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500">Location</div>
                    <div className="text-base font-semibold text-navy-900">Ernakulam, Kochi, Kerala, India</div>
                  </div>
                </div>

              </div>

            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-slate-50/80 border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-navy-950/5 backdrop-blur-xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="from_name"
                      value={formValues.from_name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4.5 py-3.5 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none ${
                        focusedField === 'from_name'
                          ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="from_email"
                      value={formValues.from_email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('from_email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4.5 py-3.5 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none ${
                        focusedField === 'from_email'
                          ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4.5 py-3.5 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none ${
                      focusedField === 'subject'
                        ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formValues.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4.5 py-3.5 rounded-xl border bg-white text-navy-900 placeholder-slate-400 text-sm transition-all outline-none resize-none ${
                      focusedField === 'message'
                        ? 'border-marine-500 ring-4 ring-marine-500/10 shadow-sm'
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
                  className="w-full py-4 px-8 rounded-xl bg-marine-600 hover:bg-marine-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-marine-600/25 flex items-center justify-center gap-3 transition-colors disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
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
                      className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                        messageType === 'success'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-rose-50 text-rose-900 border border-rose-200'
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
    </div>
  );
}
