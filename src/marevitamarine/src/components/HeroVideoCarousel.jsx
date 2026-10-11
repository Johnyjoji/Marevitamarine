import { useEffect, useRef, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroVideoCarousel — Full-card 3D flip using AnimatePresence for proper exit/enter.
 * Exiting card: 0° → -90° (rotates away)
 * Entering card: +90° → 0° (rotates in)
 */

export const SCENES = [
  {
    id: 'departure',
    src: 'https://media.marevitamarine.com/harbor1.mp4',
    label: 'Departure',
    subtitle: 'Setting COURSE',
    eyebrow: 'New era of marine services',
    headline: ['Setting', 'COURSE'],
    body: 'A dedicated team built to move tonnage, crews and cargoes from pilot boarding to the last line cast.',
    cta: { label: 'Get in touch', href: '/contact' },
    composition: 'left',
  },
  {
    id: 'open-sea',
    src: 'https://media.marevitamarine.com/harbor2.mp4',
    label: 'Open Sea',
    subtitle: 'Mid-voyage',
    eyebrow: 'Currently at sea',
    headline: [‘The world\’s fleets,’, ‘in safe hands.’],
    body: ‘Full technical, crew and operational management across flag states, class societies, and key global routes.’,
    cta: { label: ‘Explore services’, href: ‘/services’ },
    composition: 'center',
  },
  {
    id: 'arrival',
    src: 'https://media.marevitamarine.com/hero-ship-video.mp4',
    label: 'Arrival',
    subtitle: 'Port operations',
    eyebrow: 'In port worldwide',
    headline: ['Safe harbor,', 'every time.'],
    body: 'Round-the-clock port agency covering berth allocation, bunkers, customs, and smooth crew handoffs.',
    cta: { label: 'View fleet', href: '/fleet' },
    composition: 'right',
  },
];

const FLIP_DURATION = 0.6;
const FLIP_EASE = [0.23, 1, 0.32, 1];

export default forwardRef(function HeroVideoCarousel({ children, className = '' }, ref) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);
  const videoRefs = useRef([]);

  useEffect(() => {
    SCENES.forEach((_, i) => {
      if (videoRefs.current[i]) videoRefs.current[i].load();
    });
  }, []);

  const handleEnded = (index) => {
    const next = (index + 1) % SCENES.length;
    setFlipDirection(1);
    setCurrentIndex(next);
    const nextVideo = videoRefs.current[next];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
  };

  const selectScene = (index) => {
    if (index === currentIndex) return;
    const direction = index > currentIndex ? 1 : -1;
    setFlipDirection(direction);
    setCurrentIndex(index);
    const nextVideo = videoRefs.current[index];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      const activeVideo = videoRefs.current[currentIndex];
      if (!activeVideo) return;
      if (document.hidden) activeVideo.pause();
      else activeVideo.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentIndex]);

  const prevIndex = (currentIndex - 1 + SCENES.length) % SCENES.length;
  const prevScene = SCENES[prevIndex];
  const currScene = SCENES[currentIndex];

  const gradientStyles = {
    vignette: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgb(15 19 24 / 0.5) 0%, transparent 40%, rgb(15 19 24 / 0.1) 100%)',
    },
    bottomFade: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgb(15 19 24 / 0.1) 0%, transparent 50%, rgb(15 19 24 / 0.85) 100%)',
    },
  };

  const cardStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4rem 1.5rem 6rem',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    transformOrigin: 'center center',
  };

  const videoStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: -10,
    backfaceVisibility: 'hidden',
  };

  return (
    <div
      ref={ref}
      className={`relative w-full min-h-[640px] lg:min-h-[720px] xl:min-h-[800px] overflow-hidden bg-navy-950 ${className}`}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* 3D Flip Container */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {/* AnimatePresence handles exit animation of previous card */}
        <AnimatePresence mode="wait" initial={false}>
          {/* PREVIOUS CARD — exits by rotating to -90° */}
          <motion.div
            key={`prev-${prevScene.id}`}
            style={cardStyle}
            initial={false}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipDirection * -90, opacity: 0 }}
            transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
          >
            <video
              ref={(el) => { videoRefs.current[prevIndex] = el; }}
              src={prevScene.src}
              autoPlay
              muted
              loop={false}
              playsInline
              disablePictureInPicture
              preload="auto"
              style={videoStyle}
            />
            <div style={gradientStyles.vignette} />
            <div style={gradientStyles.bottomFade} />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
              {children({ scene: prevScene, index: prevIndex, isExiting: true })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CURRENT CARD — enters by rotating from +90° to 0° */}
        <motion.div
          key={`curr-${currScene.id}`}
          style={cardStyle}
          initial={{ rotateY: flipDirection * 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
        >
          <video
            ref={(el) => { videoRefs.current[currentIndex] = el; }}
            src={currScene.src}
            autoPlay
            muted
            loop={false}
            playsInline
            disablePictureInPicture
            preload="auto"
            onEnded={() => handleEnded(currentIndex)}
            style={videoStyle}
          />
          <div style={gradientStyles.vignette} />
          <div style={gradientStyles.bottomFade} />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
            {children({ scene: currScene, index: currentIndex, isExiting: false })}
          </div>
        </motion.div>
      </div>

      {/* Scene picker — outside 3D flip */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center sm:gap-2 bg-navy-950/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
        {SCENES.map((scene, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={scene.id}
              onClick={() => selectScene(i)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-marine-500 text-white shadow-sm'
                  : 'text-navy-300 hover:text-white hover:bg-white/10'
              }`}
              title={scene.subtitle}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-navy-400'}`} />
              <span>{scene.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export function HeroText({ className = '', children, ...props }) {
  return (
    <div
      className={`mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col justify-center min-h-[640px] lg:min-h-[720px] xl:min-h-[800px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}