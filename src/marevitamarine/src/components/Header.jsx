import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useHeroScroll } from '../context/HeroScrollContext';

const NAV = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Safety', href: '/safety' },
  { name: 'Careers', href: '/careers' },
  { name: 'News', href: '/news' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useHeroScroll();

  const isHomePage = location.pathname === '/';

  // On home page mount, start collapsed. On inner pages, start expanded.
  useEffect(() => {
    if (isHomePage) {
      setIsManuallyExpanded(false);
      setIsExpanded(false);
    } else {
      setIsManuallyExpanded(false);
      setIsExpanded(true);
    }
  }, [isHomePage]);

  // Track hero scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!isHomePage) return;
    if (progress > 0.5) {
      // Past the hero midpoint: always expand (whether triggered by scroll or click)
      setIsExpanded(true);
    } else if (progress <= 0.5) {
      // Back in the top half of the hero: collapse, and reset the manual
      // expansion flag so future scroll-ups re-collapse and future scroll-downs
      // re-expand as normal.
      setIsExpanded(false);
      setIsManuallyExpanded(false);
    }
  });

  // Close mobile sheet on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handlePillClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsManuallyExpanded(true);
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-50 px-4 sm:px-6 pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
          width: isExpanded ? 'min(100%, 80rem)' : '4rem',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={handlePillClick}
        className={`relative mx-auto flex items-center overflow-hidden rounded-full border border-black/5 bg-white/95 backdrop-blur-xl ${
          isExpanded ? 'h-14 sm:h-16 px-2' : 'h-12 sm:h-14 px-0'
        } ${
          isExpanded
            ? 'shadow-[0_10px_40px_-12px_rgba(15,23,42,0.22),0_2px_8px_-2px_rgba(15,23,42,0.06)]'
            : 'shadow-[0_8px_28px_-12px_rgba(15,23,42,0.18),0_2px_6px_-2px_rgba(15,23,42,0.08)]'
        } pointer-events-auto`}
      >
        {/* Logo with name - expanded state */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ type: 'spring', damping: 18, stiffness: 280 }}
              className="flex-shrink-0 flex items-center pl-3 sm:pl-4 pr-2"
            >
              <Link
                to="/"
                className="flex items-center"
                aria-label="Marevita Marine — Home"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="h-7 w-auto sm:h-9"
                  src="/logo-with-name.png"
                  alt="Marevita Marine"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo icon only - collapsed state (centered) */}
        <AnimatePresence initial={false}>
          {!isExpanded && (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', damping: 18, stiffness: 280, delay: 0.1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              <img src="/logo-dark.png" className="h-7 w-7 sm:h-9 sm:w-9" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav items */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="nav-items"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="hidden md:flex justify-center items-center gap-0.5 flex-1"
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -16, scale: 0.95 },
                    show: { opacity: 1, x: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', damping: 18, stiffness: 280 }}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'text-navy-900'
                          : 'text-navy-700 hover:text-navy-900 hover:bg-navy-50'
                      }`
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact CTA */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ type: 'spring', damping: 18, stiffness: 280, delay: 0.1 }}
              className="hidden md:flex items-center shrink-0 pr-1"
            >
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800 transition-colors whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                Contact Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu toggle (always visible on small screens) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((v) => !v);
          }}
          className="md:hidden ml-auto mr-2 inline-flex items-center justify-center h-9 w-9 rounded-full bg-navy-50 text-navy-900 hover:bg-navy-100 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {isExpanded && (
           <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} />
          )}
        </button>
      </motion.nav>

      {/* Mobile sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-3xl border border-black/5 bg-white/95 backdrop-blur-xl shadow-[0_18px_40px_-12px_rgba(15,23,42,0.18)] p-2 pointer-events-auto">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-marine-50 text-marine-700'
                      : 'text-navy-800 hover:bg-navy-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}