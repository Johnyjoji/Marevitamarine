import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

/**
 * NavigationOfflineHandler
 * Monitors navigation attempts and network issues.
 * When a user attempts to navigate to another page while offline or when
 * a network error occurs, it triggers the full video loading screen,
 * which will transition into the destination page's skeleton loader if
 * the internet has not returned.
 */
export default function NavigationOfflineHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerOfflineLoading, setTargetPath } = useLoading();

  // Keep targetPath in sync with current location
  useEffect(() => {
    setTargetPath(location.pathname);
  }, [location.pathname, setTargetPath]);

  // Intercept link clicks when offline
  useEffect(() => {
    const handleClick = (e) => {
      // If online, regular SPA navigation proceeds
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        return;
      }

      // Check if clicked element is an internal navigation link
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Ignore external, anchors, tel/mailto
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // Intercept offline navigation:
      // 1. Prevent default
      e.preventDefault();
      // 2. Trigger loading screen with video
      triggerOfflineLoading(href);
      // 3. Update router location so skeleton matches the target page
      navigate(href);
    };

    // Capture phase so it intercepts before React Router Link
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [navigate, triggerOfflineLoading]);

  // Catch dynamic import / chunk load failures caused by network outage
  useEffect(() => {
    const handleError = (e) => {
      const message = e?.message || '';
      if (
        message.includes('Failed to fetch dynamically imported module') ||
        message.includes('Loading chunk') ||
        message.includes('network')
      ) {
        triggerOfflineLoading(window.location.pathname);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, [triggerOfflineLoading]);

  return null;
}
