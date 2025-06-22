import { useState } from 'react';
import { DESKTOP_BREAKPOINT } from '@/constants/consts';

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(() =>
    window.innerWidth >= DESKTOP_BREAKPOINT ? 'table' : 'cards',
  );

  return {
    viewMode,
    setViewMode,
  };
};
