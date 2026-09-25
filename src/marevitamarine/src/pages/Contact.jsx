import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Mail, Phone, MapPin, Globe, Ship, Anchor } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/emailjs.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    // Replace these with your actual EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const userID = 'YOUR_USER_ID'; // EmailJS public key

    const form = e.target;
    const templateParams = {
      from_name: form.from_name.value,
      from_email: form.from_email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    // Send the email
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(
        (result) => {
          setIsLoading(false);
          setMessage('Your message has been sent successfully!');
          setMessageType('success');
          form.reset();
        },
        (error) => {
          setIsLoading(false);
          setMessage('Failed to send message. Please try again later.');
          setMessageType('error');
          console.error('EmailJS error:', error);
        }
      );
  };

  return (
    <div>
      {/* Hero — Navy */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32 relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-marine-400 mb-4">Get in Touch</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95]">Contact<br/><span className="text-marine-400">Us</span></h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">
            We respond within one business day. For urgent matters, please call.
          </p>
        </div>
      </section>

      <SectionDivider fromColor="#0f1318" toColor="#ffffff" height={120} type="deep" />

      {/* Contact Form — White */}
      <section className="bg-white text-navy-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  className="w-full px-4 py-3 rounded-full border border-navy-200 bg-white/95 backdrop-blur-sm focus:border-marine-500 focus:ring-2 focus:ring-marine-500/20 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className="w-full px-4 py-3 rounded-full border border-navy-200 bg-white/95 backdrop-blur-sm focus:border-marine-500 focus:ring-2 focus:ring-marine-500/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-full border border-navy-200 bg-white/95 backdrop-blur-sm focus:border-marine-500 focus:ring-2 focus:ring-marine-500/20 transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-full border border-navy-200 bg-white/95 backdrop-blur-sm focus:border-marine-500 focus:ring-2 focus:ring-marine-500/20 transition-colors"
                placeholder="Tell us about your fleet, voyage, or challenge..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-marine-500 text-white font-medium hover:bg-marine-400 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm font-medium text-center rounded-full px-4 py-2 ${
              messageType === 'success'
                ? 'bg-marine-50 text-marine-700'
                : 'bg-navy-50 text-navy-700'
            }`}>
              {message}
            </p>
          )}
        </div>
      </section>

      <SectionDivider fromColor="#ffffff" toColor="#0f1318" height={120} type="coast" flip />

      {/* Contact Info — Navy (optional, can be removed if footer is sufficient) */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em]">Other Ways to Reach Us</h2>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl">
            You can also find our contact details in the footer of every page.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <Mail className="h-5 w-5 text-marine-400" />
              <a href="mailto:info@marevitamarine.com" className="hover:text-marine-400 transition-colors">
                info@marevitamarine.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Phone className="h-5 w-5 text-marine-400" />
              <a href="tel:+914842XXXXXX" className="hover:text-marine-400 transition-colors">
                +91 (484) 2XX XXXX
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <MapPin className="h-5 w-5 text-marine-400" />
              <span>Ernakulam, Kochi, Kerala, India</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}