import { useState, useEffect, useCallback } from 'react';

interface UseScrollEffectOptions {
  threshold?: number;
  throttleMs?: number;
}

export const useScrollEffect = ({ threshold = 10, throttleMs = 16 }: UseScrollEffectOptions = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    let timeoutId: number | undefined;

    const throttledHandleScroll = () => {
      if (timeoutId) return;

      timeoutId = window.setTimeout(() => {
        handleScroll();
        timeoutId = undefined;
      }, throttleMs);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [handleScroll, throttleMs]);

  return isScrolled;
};
