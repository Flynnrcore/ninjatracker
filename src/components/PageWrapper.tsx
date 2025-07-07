import { Link } from 'react-router-dom';

const PageWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="mt-18 min-h-screen bg-stone-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        {/* Заголовок и кнопка */}
        <div className="mb-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="mb-0 text-center text-2xl font-bold sm:text-3xl">{title}</h2>
          <Link to="/new" className="w-full sm:w-auto">
            <button className="button">+ новая тренировка</button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
