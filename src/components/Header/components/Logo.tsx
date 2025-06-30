import { PATH } from '@/constants/paths';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex min-h-[40px] items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
      aria-label="На главную">
      <img className="h-10 w-10 md:h-12 md:w-12" src={PATH.LOGO} alt="Логотип NinjaTracker" />
      <h1 className="font-logo text-2xl font-bold md:text-3xl">NinjaTracker</h1>
    </Link>
  );
};
