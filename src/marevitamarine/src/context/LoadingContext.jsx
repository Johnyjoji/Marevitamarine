import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  // Starts in loading state when visiting the site
  const [isLoading, setIsLoading] = useState(true);
  const [videoFinished, setVideoFinished] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [targetPath, setTargetPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Monitor online / offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // If internet comes back and the video already completed its full play,
      // dismiss loading screen immediately.
      setVideoFinished((prevFinished) => {
        if (prevFinished) {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
        return prevFinished;
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Called when video completes playing full (3.4s)
  const onVideoEnded = useCallback(() => {
    setVideoFinished(true);

    const currentlyOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    if (currentlyOnline) {
      // Internet is active: dismiss loading screen smoothly
      setIsLoading(false);
      setIsInitialLoad(false);
    } else {
      // Internet is down: stay in loading state so the skeleton is shown!
      setIsLoading(true);
    }
  }, []);

  // Trigger loading screen on navigation when there is a network issue
  const triggerOfflineLoading = useCallback((path) => {
    setTargetPath(path || window.location.pathname);
    setVideoFinished(false);
    setIsLoading(true);
  }, []);

  // Manual retry handler (e.g. user clicks "Retry" on skeleton screen)
  const retryConnection = useCallback(() => {
    const currentlyOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    setIsOnline(currentlyOnline);
    if (currentlyOnline) {
      setIsLoading(false);
      setIsInitialLoad(false);
    } else {
      // Still offline — replay video transition to check
      setVideoFinished(false);
      setIsLoading(true);
    }
  }, []);

  const value = {
    isLoading,
    videoFinished,
    isOnline,
    isInitialLoad,
    targetPath,
    setTargetPath,
    onVideoEnded,
    triggerOfflineLoading,
    retryConnection,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
