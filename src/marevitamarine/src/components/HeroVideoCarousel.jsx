import { useEffect, useRef, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroVideoCarousel — Sequential video carousel with per-scene editorial compositions.
 *
 * Each scene declares its own copy (eyebrow, headline, body, cta) and its own
 * composition (alignment, scale, motion). Consumers pass a render function as
 * children; it receives `{ scene, isTransitioning }` and renders the typography
 * for the current scene. The carousel crossfades the video AND the typography
 * in lockstep, so the hero reads as three different editorial covers — not one
 * paragraph floating over three ambient clips.
 *
 * Accepts a ref via forwardRef to allow scroll tracking from Header component.
 */

export const SCENES = [
  {
    id: 'departure',
    src: '',
    label: 'Departure',
    subtitle: 'Setting COURSE',
    eyebrow: 'Marevita Marine · New era of marine services',
    headline: ['Setting', 'COURSE'],
    body: 'A new team built to move tonnage, crews and cargoes — from the pilot boarding to the last line thrown.',
    cta: { label: 'Talk to operations', href: '/contact' },
    composition: 'left',
  },
  {
    id: 'open-sea',
    src: '',
    label: 'Open Sea',
    subtitle: 'Mid-voyage',
    eyebrow: 'Currently at sea',
    headline: ['The world’s fleets,', 'in safe hands.'],
    body: 'Full technical, crew and operational management — across flag states, class societies, and every trade route that matters.',
    cta: { label: 'See a voyage', href: '/services' },
    composition: 'center',
  },
  {
    id: 'arrival',
    src: '',
    label: 'Arrival',
    subtitle: 'Port operations',
    eyebrow: 'In port · worldwide',
    headline: ['Safe harbor,', 'every time.'],
    body: 'Twenty-four-hour port agency. From berth allocation to bunkers, customs to crew change — the harbor work that nobody sees, made effortless.',
    cta: { label: 'Plan your port call', href: '/services' },
    composition: 'right',
  },
];

const CROSSFADE_DURATION = 1.0; // seconds — matches the video fade for an in-lockstep handoff

export default forwardRef(function HeroVideoCarousel({ children, className = '' }, ref) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Preload every video up front so the first cycle has no buffer starvation.
  useEffect(() => {
    SCENES.forEach((_, i) => {
      if (videoRefs.current[i]) videoRefs.current[i].load();
    });
  }, []);

  // Advance to the next scene when the current video ends.
  const handleEnded = (index) => {
    const next = (index + 1) % SCENES.length;
    setCurrentIndex(next);
    setTimeout(() => {
      const nextVideo = videoRefs.current[next];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }
    }, 50);
  };

  // Allow the user to pin a specific scene manually.
  const selectScene = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    const nextVideo = videoRefs.current[index];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
  };

  // Pause on tab hidden, resume on visible. Saves bandwidth on backgrounded tabs.
  useEffect(() => {
    const handleVisibilityChange = () => {
      const activeVideo = videoRefs.current[currentIndex];
      if (!activeVideo) return;
      if (document.hidden) {
        activeVideo.pause();
      } else {
        activeVideo.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentIndex]);

  return (
    <div
      ref={ref}
      className={`relative w-full min-h-[640px] lg:min-h-[720px] xl:min-h-[800px] overflow-hidden bg-navy-950 ${className}`}
    >
      {/* Video layer — all scenes stacked, only the current is visible */}
      {SCENES.map((scene, i) => (
        <motion.video
          key={scene.id}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={scene.src}
          autoPlay={i === 0}
          muted
          loop={false}
          playsInline
          disablePictureInPicture
          preload="auto"
          onEnded={() => handleEnded(i)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === currentIndex ? 1 : 0 }}
          transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
        />
      ))}

      {/* Editorial overlays.
          Left-side dim for the safe text band, full-frame top/bottom vignette,
          and a deep navy at the very bottom to seat the scene picker. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/50 via-navy-transparent via-40% to-navy-950/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/10 via-transparent to-navy-950/85" />

      {/* Content layer — the consumer renders the typography per scene. */}
      <div className="relative z-10 w-full h-full">
        {children({ scene: SCENES[currentIndex], index: currentIndex })}
      </div>

      {/* Scene picker at the bottom — the "table of contents" for the carousel. */}
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

/**
 * HeroText — Layout container helper for hero content.
 * Sets the minimum height and the centered safe-band column.
 */
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
