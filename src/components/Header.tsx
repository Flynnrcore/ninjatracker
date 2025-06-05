import { PATH } from '@/constants/paths';
import { Link } from 'react-router-dom';

const Header = () => {
  const menuItemStyle = 'hover:underline text-lg';
  return (
    <header className="flex items-center justify-between border-b-1 border-gray-200 bg-white p-4 shadow-sm">
      <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-110 active:scale-95">
        <img className="h-12" src={PATH.LOGO} />
        <h1 className="font-[LogoFont] text-2xl font-bold">NinjaTracker</h1>
      </Link>
      <nav className="pr-12">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className={menuItemStyle}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={menuItemStyle}>
              Дашборд
            </Link>
          </li>
          <li>
            <Link to="/tracker" className={menuItemStyle}>
              Тренировки
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
