import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollState } from '../hooks/useScrollState';

const NAV = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Safety', href: '/safety' },
  { name: 'Careers', href: '/careers' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === '/' || location.pathname === '/about';
  const [isExpanded, setIsExpanded] = useState(!isHeroPage); // collapsed on hero pages, expanded elsewhere
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const ignoreScrollTimeoutRef = useRef(null);
  const { direction, isAtTop } = useScrollState({ directionThreshold: 12, topThreshold: 10 });

  // Fixed logo dimensions (Boss's preferred values: 50px expanded, 42px collapsed)
  const expandedHeight = 50;
  const collapsedSize = 42;
  const containerPadding = 0;

  // Scroll direction logic: down = collapse, up = expand
  useEffect(() => {
    if (ignoreScroll) {
      return;
    }
    // On hero pages at top: stay collapsed (cinematic hero)
    if (isHeroPage && isAtTop) {
      return;
    }
    // On inner pages at top: always expand
    if (isAtTop) {
      setIsExpanded(true);
      return;
    }

    if (direction === 'down' && isExpanded) {
      setIsExpanded(false);
      setMobileMenuOpen(false); // close mobile menu when collapsing
    } else if (direction === 'up' && !isExpanded) {
      setIsExpanded(true);
    }
  }, [direction, isAtTop, isExpanded, isHeroPage, ignoreScroll]);

  const handlePillClick = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    if (!nextState) {
      setMobileMenuOpen(false);
    }
    setIgnoreScroll(true);
    // Clear existing timeout
    if (ignoreScrollTimeoutRef.current) {
      clearTimeout(ignoreScrollTimeoutRef.current);
    }
    // Set new timeout
    ignoreScrollTimeoutRef.current = setTimeout(() => {
      setIgnoreScroll(false);
    }, 4000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (ignoreScrollTimeoutRef.current) {
        clearTimeout(ignoreScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-100 px-4 sm:px-6 pointer-events-auto">
      <motion.nav
        initial={false}
        animate={{
          width: isExpanded ? 'min(100%, 80rem)' : '4rem',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={() => {
          if (!isExpanded) {
            handlePillClick();
          }
        }}
        className={`relative mx-auto flex items-center overflow-hidden rounded-full border border-black/5 bg-white/95 backdrop-blur-xl ${
          isExpanded ? 'h-14 sm:h-16 px-2 cursor-default' : 'h-12 sm:h-14 px-0 cursor-pointer'
        } ${
          isExpanded
            ? 'shadow-[0_10px_40px_-12px_rgba(15,23,42,0.22),0_2px_8px_-2px_rgba(15,23,42,0.06)]'
            : 'shadow-[0_8px_28px_-12px_rgba(15,23,42,0.18),0_2px_6px_-2px_rgba(15,23,42,0.08)]'
        }`}
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
              className="flex-shrink-0 flex items-center pr-2"
              style={{ paddingLeft: `${containerPadding}px` }}
            >
              <Link
                to="/"
                className="pointer-events-auto flex items-center"
                aria-label="Marevita Marine — Home"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="w-auto object-contain"
                  style={{ height: `${expandedHeight}px` }}
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
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <img
                src="/logo-dark.png"
                style={{ height: `${collapsedSize}px`, width: `${collapsedSize}px` }}
                className="object-contain"
                alt="Marevita Marine Logo"
              />
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
                      `pointer-events-auto rounded-full px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
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
              className="hidden md:flex items-center shrink-0 pr-2"
            >
              <Link
                to="/contact"
                className="pointer-events-auto inline-flex items-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors whitespace-nowrap shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                Contact Us
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu toggle (only visible on small screens AND when expanded) */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.button
              key="mobile-toggle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', damping: 18, stiffness: 280 }}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((v) => !v);
              }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden ml-auto mr-2 inline-flex items-center justify-center h-10 w-10 rounded-full bg-navy-50 text-navy-900 hover:bg-navy-100 transition-colors pointer-events-auto"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                  >
                    <X className="h-5 w-5" strokeWidth={2.25} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                  >
                    <Menu className="h-5 w-5" strokeWidth={2.25} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile sheet — animated slide (outside nav so it's not clipped) */}
      <AnimatePresence>
        {mobileMenuOpen && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -16, height: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280, duration: 0.3 }}
            className="md:hidden mt-2 mx-auto max-w-7xl px-4 sm:px-6 rounded-3xl border border-black/5 bg-white/95 backdrop-blur-xl shadow-[0_18px_40px_-12px_rgba(15,23,42,0.18)] p-2 pointer-events-auto overflow-hidden z-50"
          >
            <nav aria-label="Mobile" className="flex flex-col p-3 items-center justify-center gap-3">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 280, delay: 0.05 + i * 0.04 }}
                >
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `pointer-events-auto rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-marine-50 text-marine-700'
                          : 'text-navy-800 hover:bg-navy-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
