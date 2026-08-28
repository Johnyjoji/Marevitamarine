import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { motionValue, useScroll } from 'framer-motion';

const fallbackProgress = motionValue(0);

const HeroScrollContext = createContext({
  heroRef: () => {},
  scrollYProgress: fallbackProgress,
  isHeroPage: false,
});

export function HeroScrollProvider({ children }) {
  const heroRef = useRef(null);
  const [heroEl, setHeroEl] = useState(null);

  const setHeroRef = useCallback((node) => {
    heroRef.current = node;
    setHeroEl(node);
  }, []);

  // Only track the hero element when it is mounted. Passing a never-hydrated
  // ref to useScroll throws ("Target ref is defined but not hydrated").
  const { scrollYProgress } = useScroll(
    heroEl
      ? { target: heroRef, offset: ['start start', 'end start'] }
      : {},
  );

  return (
    <HeroScrollContext.Provider
      value={{ heroRef: setHeroRef, scrollYProgress, isHeroPage: Boolean(heroEl) }}
    >
      {children}
    </HeroScrollContext.Provider>
  );
}

export function useHeroScroll() {
  return useContext(HeroScrollContext);
}

export default HeroScrollContext;
