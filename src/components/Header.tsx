import { PATH } from '@/constants/paths';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import AuthForm from './AuthForm';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useAuthContext } from '@/context/AuthContext';
import type { AuthContextType } from '@/types';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuthContext() as AuthContextType;
  const { logout } = useAuth();

  const menuItems = useMemo(
    () => [
      { path: '/dashboard', label: 'Дашборд' },
      { path: '/tracker', label: 'Тренировки' },
    ],
    [],
  );

  const menuItemStyle = cn(
    'text-lg font-medium transition-colors hover:text-yellow-600',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400',
    'py-2 px-1 rounded-md',
  );

  const handleLogout = useCallback(async () => {
    await logout();
    setIsMobileMenuOpen(false);
  }, [logout]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md',
        'transition-all duration-300',
        isScrolled ? 'shadow-md' : 'shadow-sm',
      )}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          aria-label="На главную">
          <img className="h-10 md:h-12" src={PATH.LOGO} alt="Логотип NinjaTracker" />
          <h1 className="font-[LogoFont] text-2xl font-bold md:text-3xl">NinjaTracker</h1>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-4 lg:space-x-6">
            {menuItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} className={menuItemStyle} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="list-none">
              {user ? (
                <Button className="bg-yellow-500 text-lg text-white hover:bg-yellow-600" onClick={handleLogout}>
                  Выйти
                </Button>
              ) : (
                <AuthForm mode="login" className={menuItemStyle} loader={loading} />
              )}
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <nav>
              <ul className="flex flex-col space-y-2 p-4">
                {menuItems.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(menuItemStyle, 'block w-full px-4 py-3 hover:bg-gray-50')}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="list-none">
                  {user ? (
                    <Button variant="outline" onClick={handleLogout} className={`${menuItemStyle} ml-4 px-4`}>
                      Выйти
                    </Button>
                  ) : (
                    <AuthForm mode="login" className={menuItemStyle} loader={loading} />
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
