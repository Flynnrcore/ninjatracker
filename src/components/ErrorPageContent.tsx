import type { TErrorPage } from '@/types';
import { Link } from 'react-router-dom';

const ErrorPageContent = ({ picUrl, message, children }: TErrorPage) => (
  <div className="flex h-screen flex-col items-center justify-center bg-stone-50 px-4 py-8 sm:px-8">
    <img
      src={picUrl}
      alt="Error img"
      loading="lazy"
      className="mb-6 h-40 w-auto max-w-xs object-contain sm:h-1/2 sm:max-w-md md:max-w-lg"
    />
    <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">{message}</h1>
    {children}
    <Link
      to="/"
      className="mt-6 block w-full max-w-xs rounded-md px-4 py-2 text-center text-base font-medium text-yellow-500 transition hover:underline sm:text-lg">
      Вернуться на главную
    </Link>
  </div>
);

export default ErrorPageContent;
