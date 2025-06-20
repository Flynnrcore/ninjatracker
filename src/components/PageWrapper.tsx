import { Link } from 'react-router-dom';

const PageWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="mt-18 min-h-screen bg-stone-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        {/* Заголовок и кнопка */}
        <div className="mb-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="mb-0 text-center text-2xl font-bold sm:text-3xl">{title}</h2>
          <Link to="/new" className="w-full sm:w-auto">
            <button className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-lg font-medium text-white transition-all hover:bg-yellow-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-6 sm:py-3 sm:text-xl">
              + новая тренировка
            </button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
