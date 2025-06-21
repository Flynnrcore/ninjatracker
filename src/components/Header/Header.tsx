import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useAuthContext } from '@/context/AuthContext';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import { HEADER_MENU_ITEMS, HEADER_CONSTANTS } from '@/constants/header';
import { Logo, Navigation, MobileMenu } from '.';
import type { HeaderProps } from './types';

const Header = ({ className }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authContext = useAuthContext();
  const { logout } = useAuth();
  
  const isScrolled = useScrollEffect({
    threshold: HEADER_CONSTANTS.SCROLL_THRESHOLD,
    throttleMs: HEADER_CONSTANTS.THROTTLE_MS,
  });

  const handleLogout = useCallback(async () => {
    await logout();
    setIsMobileMenuOpen(false);
  }, [logout]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const isAuthenticated = Boolean(authContext?.user);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md',
        'transition-all duration-300',
        isScrolled ? 'shadow-md' : 'shadow-sm',
        className,
      )}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Logo />

        <Navigation
          menuItems={HEADER_MENU_ITEMS}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          loading={authContext?.loading}
        />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
          menuItems={HEADER_MENU_ITEMS}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          loading={authContext?.loading}
        />
      </div>
    </header>
  );
};

export default Header; 