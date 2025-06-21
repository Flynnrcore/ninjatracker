import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import AuthForm from '../../AuthForm';
import type { MenuItem } from '../types';

interface NavigationProps {
  menuItems: MenuItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  onItemClick?: () => void;
  loading?: boolean;
  isMobile?: boolean;
}

export const Navigation = ({ 
  menuItems, 
  isAuthenticated, 
  onLogout, 
  onItemClick,
  loading = false,
  isMobile = false 
}: NavigationProps) => {
  const containerClass = isMobile 
    ? 'flex flex-col space-y-2 p-4' 
    : 'flex items-center space-x-4 lg:space-x-6';

  const itemClass = isMobile 
    ? 'block w-full px-4 py-3 hover:bg-gray-50' 
    : 'menu-item';

  return (
    <nav className={isMobile ? '' : 'hidden md:flex'}>
      <ul className={containerClass}>
        {menuItems.map(item => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={itemClass} 
              onClick={onItemClick}>
              {item.label}
            </Link>
          </li>
        ))}
        <li className="list-none">
          {isAuthenticated ? (
            <Button 
              className={isMobile ? "menu-item ml-4 px-4" : "bg-yellow-500 text-lg text-white hover:bg-yellow-600"}
              variant={isMobile ? "outline" : "default"}
              onClick={onLogout}>
              Выйти
            </Button>
          ) : (
            <AuthForm mode="login" className="menu-item" loader={loading} />
          )}
        </li>
      </ul>
    </nav>
  );
}; 