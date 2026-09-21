import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to trigger hidden admin portal access upon 7 consecutive taps within 3 seconds.
 * Strictly navigates to /admin/login without bypassing authentication.
 */
export function useLogoTap() {
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogoTap = useCallback((e) => {
    // Prevent default jump if wrapped in an anchor
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setTapCount((prev) => {
      const nextCount = prev + 1;

      // Clear any existing reset timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Reset tap count if user stops tapping for 3 seconds
      timerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 3000);

      // Trigger navigation when exactly 7 taps are registered
      if (nextCount >= 7) {
        clearTimeout(timerRef.current);
        setTapCount(0);
        navigate('/admin/login');
      }

      return nextCount >= 7 ? 0 : nextCount;
    });
  }, [navigate]);

  return { handleLogoTap, tapCount };
}
