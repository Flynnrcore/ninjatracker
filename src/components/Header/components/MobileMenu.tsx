import { Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Navigation } from './Navigation';
import type { TMenuItem } from '@/types';

type TMobileMenu = {
  isOpen: boolean;
  onToggle: () => void;
  menuItems: TMenuItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  loading?: boolean;
};

export const MobileMenu = ({
  isOpen,
  onToggle,
  menuItems,
  isAuthenticated,
  onLogout,
  loading = false,
}: TMobileMenu) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (document.querySelector('[data-slot="dialog-content"]')) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) onToggle();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={menuRef} className="md:hidden">
      <button className="md:hidden" onClick={onToggle} aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg md:hidden">
          <Navigation
            menuItems={menuItems}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
            onItemClick={onToggle}
            loading={loading}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
};
