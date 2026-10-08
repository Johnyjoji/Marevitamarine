import { useState, useEffect } from 'react';

/**
 * useVideoProgress - Returns normalized playback progress (0-1) of a video element.
 * Only updates when the video is the active scene.
 */
export function useVideoProgress(videoRef, isActive) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onTimeUpdate = () => {
      if (video.duration > 0) {
        setProgress(video.currentTime / video.duration);
      }
    };

    const onEnded = () => {
      setProgress(1);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    // Initialize in case video is already playing
    if (video.duration > 0) {
      setProgress(video.currentTime / video.duration);
    }

    // Cleanup function
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [videoRef]);

  // Reset progress when video becomes inactive
  useEffect(() => {
    if (!isActive) {
      setProgress(0);
    }
  }, [isActive]);

  return progress;
}

/**
 * Smoothstep easing for organic reveal curves.
 * t: 0-1 input, returns 0-1 eased.
 */
export function smoothstep(t) {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Calculate layer progress from video progress using choreography config.
 * Returns 0-1 progress for a specific text layer.
 */
export function getLayerProgress(videoProgress, choreography) {
  const { at = 0, duration = 0.5 } = choreography;
  const start = at;
  const end = at + duration;
  if (videoProgress <= start) return 0;
  if (videoProgress >= end) return 1;
  return (videoProgress - start) / (end - start);
}