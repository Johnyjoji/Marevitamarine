import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Safety from './pages/Safety';
import Careers from './pages/Careers';
import News from './pages/News';
import Contact from './pages/Contact';
import { HeroScrollProvider } from './context/HeroScrollContext';
import { useScrollState } from './hooks/useScrollState';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function App() {
  const location = useLocation();
  const isHeroPage = location.pathname === '/' || location.pathname === '/about';
  const { direction, isAtTop } = useScrollState({ directionThreshold: 12, topThreshold: 10 });

  const [isExpanded, setIsExpanded] = useState(!isHeroPage); // collapsed on hero pages, expanded elsewhere
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const ignoreScrollTimeoutRef = useRef(null);

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
    } else if (direction === 'up' && !isExpanded) {
      setIsExpanded(true);
    }
  }, [direction, isAtTop, isExpanded, isHeroPage, ignoreScroll]);

  const handlePillClick = () => {
    setIsExpanded(!isExpanded);
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

  // Compute header height based on expansion state and screen size
  const getHeaderHeight = () => {
    // Check if we're on small screens (mobile breakpoint)
    const isSm = typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches;
    if (isExpanded) {
      // Expanded header height: sm:h-16 (4rem = 64px) on lg+, h-14 (3.5rem = 56px) on sm
      return isSm ? 64 : 56;
    } else {
      // Collapsed header height: sm:h-14 (3.5rem = 56px) on lg+, h-12 (3rem = 48px) on sm
      return isSm ? 56 : 48;
    }
  };

  return (
    <Router>
      <HeroScrollProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main
            className="flex-1"
            style={{ marginTop: `${getHeaderHeight()}px` }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HeroScrollProvider>
    </Router>
  );
}

export default App;