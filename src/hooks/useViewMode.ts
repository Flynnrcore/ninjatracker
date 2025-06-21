import { useState, useEffect } from 'react';
import { DESKTOP_BREAKPOINT } from '@/constants/consts';

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(() =>
    window.innerWidth >= DESKTOP_BREAKPOINT ? 'table' : 'cards',
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setViewMode('table');
      } else {
        setViewMode('cards');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    viewMode,
    setViewMode,
  };
};
