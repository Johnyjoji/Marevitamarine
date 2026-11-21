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
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 lg:grid-cols-6">
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
          <div className="min-w-0">
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 min-w-0">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@marevitamarine.com"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors min-w-0 leading-tight sm:leading-normal"
                >
                  <span className="block sm:inline lg:block xl:inline">info@</span>
                  <span className="block sm:inline lg:block xl:inline break-all sm:break-normal">marevitamarine.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 min-w-0">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+919142673145"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  (+91) 91426 73145
                </a>
              </li>
              <li className="flex items-start space-x-2 min-w-0">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-400">
                  Kerala, India
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0">
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
          <div className="min-w-0">
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
          <div className="min-w-0">
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
