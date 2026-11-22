import { useEffect, useRef } from 'react';

/**
 * LoadingTopSlider
 * - Precision-engineered loading progress slider for the top of the loading screen.
 * - Hardware-accelerated 60/120fps direct DOM manipulation (zero React re-renders during load).
 * - Multi-stop marine gradient with specular shimmer sheen and glowing beacon pip.
 * - Bridge telemetry readout in mono typography matching Marevita's "Operations Bridge" identity.
 */
export default function LoadingTopSlider({ videoRef, isLoading, videoFinished }) {
  const barRef = useRef(null);
  const pipRef = useRef(null);
  const percentRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;

    let rafId = null;
    const startTime = performance.now();
    const EXPECTED_DURATION = 3400; // Exact length of loading-logo.webm
    let lastProgress = 0;

    const updateSlider = (now) => {
      let progress;

      if (videoFinished) {
        progress = 1;
      } else {
        const video = videoRef?.current;
        if (video && video.duration > 0 && video.currentTime > 0) {
          progress = video.currentTime / video.duration;
        } else {
          // Fallback / initial ramp before video metadata is active
          const elapsed = now - startTime;
          progress = Math.min(elapsed / EXPECTED_DURATION, 0.98);
        }
      }

      // Ensure progress is monotonic (never steps backwards) and clamped to [0, 1]
      progress = Math.max(lastProgress, Math.min(progress, 1));
      lastProgress = progress;

      // 1. Direct hardware-accelerated transform on the progress bar
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }

      // 2. Position the leading glowing pip at the tip of the slider
      if (pipRef.current) {
        pipRef.current.style.left = `${progress * 100}%`;
      }

      // 3. Numeric percentage readout
      const percentInt = Math.min(Math.round(progress * 100), 100);
      if (percentRef.current) {
        percentRef.current.textContent = `${percentInt}%`;
      }

      // 4. Nautical bridge status stage
      if (statusRef.current) {
        if (progress >= 0.99 || videoFinished) {
          statusRef.current.textContent = 'SYSTEM READY';
        } else if (progress >= 0.65) {
          statusRef.current.textContent = 'SYNCHRONIZING';
        } else if (progress >= 0.28) {
          statusRef.current.textContent = 'CHARTING COURSE';
        } else {
          statusRef.current.textContent = 'INITIALIZING';
        }
      }

      // Continue the frame loop unless finished and capped
      if (!videoFinished && progress < 1 && isLoading) {
        rafId = requestAnimationFrame(updateSlider);
      }
    };

    rafId = requestAnimationFrame(updateSlider);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isLoading, videoFinished, videoRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading progress"
    >
      {/* ============================================================
          1 / PRECISION TRACK & SLIDER BAR
          ============================================================ */}
      <div className="relative h-[3px] w-full bg-navy-950/10 backdrop-blur-xs">
        {/* Active progress fill */}
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-navy-950 via-marine-700 via-marine-500 to-marine-400 relative overflow-hidden"
          style={{ transform: 'scaleX(0)' }}
        >
          {/* Moving specular light shimmer beam */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-loading-shimmer" />

          {/* Leading edge bright highlight */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-white/90" />
        </div>

        {/* Leading edge beacon pip & glow aura (hangs gracefully below the track, never clipped) */}
        <div
          ref={pipRef}
          className="absolute top-0 pointer-events-none transition-opacity duration-300"
          style={{ left: '0%' }}
        >
          {/* Ambient soft glow flare */}
          <div className="absolute top-0 -left-4 w-8 h-4 bg-marine-400/30 rounded-full blur-[4px] pointer-events-none" />

          {/* Precision nautical bridge indicator needle / pip */}
          <div className="absolute top-0 -left-[1px] w-[2px] h-[6px] rounded-b-full bg-white shadow-[0_2px_8px_rgba(56,189,248,0.9),0_0_12px_rgba(14,165,233,0.6)]" />

          {/* Micro accent center dot */}
          <div className="absolute top-[2.5px] -left-[0.75px] w-[1.5px] h-[1.5px] rounded-full bg-marine-500" />
        </div>
      </div>

      {/* ============================================================
          2 / OPERATIONS BRIDGE TELEMETRY ROW
          ============================================================ */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pt-3.5 sm:pt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase">
        {/* Left: Vessel / System Identification */}
        <div className="flex items-center gap-2 text-navy-800/80 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marine-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-marine-500" />
          </span>
          <span className="tracking-[0.25em]">MAREVITA MARINE</span>
          <span className="hidden sm:inline text-navy-400/50 font-normal">/</span>
          <span className="hidden sm:inline text-navy-600/70 text-[10px] tracking-[0.25em]">
            OPERATIONS BRIDGE
          </span>
        </div>

        {/* Right: Telemetry status phase & live percentage */}
        <div className="flex items-center gap-2 sm:gap-3 text-navy-700/80 font-semibold">
          <span
            ref={statusRef}
            className="text-marine-700 font-bold tracking-[0.22em] transition-colors duration-200"
          >
            INITIALIZING
          </span>
          <span className="text-navy-300">•</span>
          <span
            ref={percentRef}
            className="text-navy-950 font-bold tabular-nums min-w-[3.5ch] text-right font-mono"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
