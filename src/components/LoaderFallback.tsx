import { withBaseUrl } from '@/constants/paths';

const LoaderFallback = () => (
  <div className="flex h-svh items-center justify-center px-4">
    <img
      className="h-1/3 max-h-60 w-auto max-w-full sm:max-h-72 md:max-h-96 lg:max-h-[50rem] xl:max-h-[60rem]"
      src={withBaseUrl('loader.webp')}
      alt="Загрузка..."
    />
  </div>
);

export default LoaderFallback;
