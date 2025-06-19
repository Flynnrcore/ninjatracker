import { Link } from 'react-router-dom';

export type TErrorPage = { picUrl: string; message: string };
const ErrorPageContent = ({ picUrl, message }: TErrorPage) => (
  <div className="flex h-screen flex-col items-center justify-center bg-stone-50 px-4 py-8 sm:px-8">
    <img
      src={picUrl}
      alt="Error img"
      className="mb-6 h-40 w-auto sm:h-1/2 max-w-xs sm:max-w-md md:max-w-lg object-contain"
    />
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">{message}</h1>
    <Link
      to="/"
      className="mt-6 text-yellow-500 hover:underline px-4 py-2 rounded-md text-base sm:text-lg font-medium transition block text-center w-full max-w-xs"
    >
      Вернуться на главную
    </Link>
  </div>
);

export default ErrorPageContent;
