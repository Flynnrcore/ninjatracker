import { withBaseUrl } from '@/constants/paths';

const LoaderFallback = () => (
  <div className="flex h-svh items-center justify-center">
    <img className="h-1/3" src={withBaseUrl('/loader.webp')} alt="Загрузка..." />
  </div>
);

export default LoaderFallback;
