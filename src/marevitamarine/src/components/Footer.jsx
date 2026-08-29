import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Ship, Anchor } from 'lucide-react';

export default function Footer() {
  const services = [
    { name: 'Ship Management', href: '/services' },
    { name: 'Crew Management', href: '/services' },
    { name: 'Port Agency', href: '/services' },
    { name: 'Technical Services', href: '/services' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Fleet', href: '/fleet' },
    { name: 'Safety & Quality', href: '/safety' },
    { name: 'Careers', href: '/careers' },
  ];

  const resources = [
    { name: 'News & Insights', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="brightness-0 invert rounded-lg p-2 mb-4">
              <img
                className="h-12 w-auto"
                src="/logo-with-name.png"
                alt="Marevita Marine"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Excellence in Marine Services. Your trusted maritime partner for global operations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Website">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Fleet network">
                <Ship className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Maritime portal">
                <Anchor className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@marevitamarine.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@marevitamarine.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Mumbai, India
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Marevita Marine Private Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
