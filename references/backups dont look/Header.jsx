import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Header — Floating pill capsule navbar.
 *
 * The container is a single rounded-full pill, horizontally centered with
 * generous side margins, sitting on top of the page with a soft shadow.
 * On scroll, the pill stays in place; on the home page it floats over the
 * hero video, on inner pages it floats over a flat surface.
 *
 * Layout (left → right):
 *   - Brand logo (the logo-with-name asset)
 *   - 7 inline nav items (About, Services, Fleet, Safety, Careers, News, Contact)
 *   - Right: ghost "Client portal" + filled dark-navy "Get a quote"
 *
 * "Home" is intentionally absent from the inline nav — the logo IS the
 * home link, matching the etail.me reference.
 *
 * Mobile: the pill collapses to a single rounded square button on the
 * right (hamburger); tapping it opens a full-width sheet beneath the
 * pill that contains the same nav in a stacked layout.
 */

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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Tighten the shadow a touch once the user has scrolled past the hero.
  // On inner pages this fires immediately because the page is short.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on route change.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-black/5 bg-white/95 pl-5 pr-2 py-2 backdrop-blur-xl transition-shadow ${
          scrolled
            ? 'shadow-[0_8px_28px_-12px_rgba(15,23,42,0.18),0_2px_6px_-2px_rgba(15,23,42,0.08)]'
            : 'shadow-[0_10px_40px_-12px_rgba(15,23,42,0.22),0_2px_8px_-2px_rgba(15,23,42,0.06)]'
        }`}
      >
        {/* Brand logo — the full logo-with-name asset. Same path as the
            Footer references. Sized to fit the pill (h-7/28px on mobile,
            h-8/32px on sm+); no invert since the pill background is white. */}
        <Link
          to="/"
          className="flex items-center shrink-0"
          aria-label="Marevita Marine — Home"
        >
          <img
            className="h-10 w-auto sm:h-12"
            src="/logo-with-name.png"
            alt="Marevita Marine"
          />
        </Link>

        {/* Inline nav — 7 items on one row, hidden on small screens.
            The mobile sheet carries the same items in a stacked layout. */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-navy-900'
                    : 'text-navy-700 hover:text-navy-900 hover:bg-white transition-all duration-500'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side: ghost + filled CTAs (desktop). On small screens
            only the filled CTA is visible, plus the hamburger. */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Filled CTA — the dark-navy pill, the page's primary action. */}
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-navy-900 px-4 sm:px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
          >
            Contact Us
          </Link>
          {/* Mobile hamburger — matches the pill's rounded language. */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full bg-navy-50 text-navy-900 hover:bg-navy-100 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-[18px] w-[18px]" strokeWidth={2.25} />
            ) : (
              <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet — drops down beneath the pill, mirrors the
          reference's clean centered aesthetic in a stacked form. */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl rounded-3xl border border-black/5 bg-white/95 backdrop-blur-xl shadow-[0_18px_40px_-12px_rgba(15,23,42,0.18)] p-2">
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
