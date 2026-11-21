import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';
import { getSkeletonForRoute } from './LoadingSkeletons';

// Exact sampled color of the video background to ensure zero visible seam
const VIDEO_BG_COLOR = '#DDDFE1';

/**
 * LoadingScreen
 * - Full-screen branded loading experience matching the exact video background color (#DDDFE1).
 * - Always plays the video to completion (3.4s).
 * - If online: smoothly transitions out to reveal the active page.
 * - If offline: seamlessly switches into the page-specific skeleton loader
 *   until internet connectivity is restored.
 */
export default function LoadingScreen() {
  const {
    isLoading,
    videoFinished,
    isOnline,
    targetPath,
    onVideoEnded,
    retryConnection,
  } = useLoading();

  const videoRef = useRef(null);

  // Play video whenever a loading cycle begins and video is not yet finished
  useEffect(() => {
    if (!isLoading || videoFinished) return;

    let endedHandled = false;

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Loading video autoplay notice:', err?.message);
        });
      }
    }

    const markEnded = () => {
      if (!endedHandled) {
        endedHandled = true;
        onVideoEnded();
      }
    };

    // Fallback safety timer: video duration is ~3.4s. At 3.8s, guarantee onVideoEnded
    // fires so the user is never trapped in a frozen state under any browser condition.
    const safetyTimer = setTimeout(() => {
      markEnded();
    }, 3800);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [isLoading, videoFinished, onVideoEnded]);

  const handleEnded = () => {
    onVideoEnded();
  };

  // Resolve the appropriate skeleton component for the current / target path
  const SkeletonComponent = getSkeletonForRoute(targetPath || window.location.pathname);
  const showSkeleton = videoFinished && !isOnline;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] overflow-y-auto"
          style={{ backgroundColor: VIDEO_BG_COLOR }}
          role="status"
          aria-label="Loading application"
          aria-busy="true"
        >
          {/* ============================================================
              1 / VIDEO LAYER: Seamless background matching video's #DDDFE1
              ============================================================ */}
          {!showSkeleton && (
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: VIDEO_BG_COLOR }}
            >
              <video
                ref={videoRef}
                src="/loading-logo.webm"
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                onEnded={handleEnded}
                className="w-full h-full object-contain pointer-events-none"
                style={{ backgroundColor: VIDEO_BG_COLOR }}
              />
            </div>
          )}

          {/* ============================================================
              2 / SKELETON LAYER: Appears if internet is still down
              ============================================================ */}
          {showSkeleton && (
            <motion.div
              key="skeleton-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-screen w-full bg-white text-navy-900 px-4 sm:px-8 pt-24 pb-32"
            >
              {/* Offline notification banner */}
              <div className="mx-auto max-w-2xl mb-10 rounded-2xl bg-navy-50 border border-navy-200 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-10 w-10 rounded-xl bg-marine-50 text-marine-600 flex items-center justify-center shrink-0">
                    <WifiOff className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 tracking-wide">
                      Connection interrupted
                    </h4>
                    <p className="text-xs text-navy-600">
                      Displaying cached blueprint. Will reconnect automatically once online.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={retryConnection}
                  className="inline-flex items-center gap-2 rounded-full bg-marine-500 hover:bg-marine-400 text-white px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry</span>
                </button>
              </div>

              {/* Page-specific skeleton layout */}
              <div className="w-full max-w-7xl mx-auto">
                <SkeletonComponent />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
