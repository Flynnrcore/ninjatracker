import { Menu, X } from 'lucide-react';
import { Navigation } from './Navigation';
import type { MenuItem } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  menuItems: MenuItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  loading?: boolean;
}

export const MobileMenu = ({ 
  isOpen, 
  onToggle, 
  menuItems, 
  isAuthenticated, 
  onLogout,
  loading = false 
}: MobileMenuProps) => {
  return (
    <>
      <button
        className="md:hidden"
        onClick={onToggle}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
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
    </>
  );
}; 