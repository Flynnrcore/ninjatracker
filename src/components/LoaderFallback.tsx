import { withBaseUrl } from '@/constants/paths';

const LoaderFallback = () => (
  <div className="flex items-center justify-center h-svh">
    <img className="h-1/3" src={withBaseUrl('loader.webp')} alt="Загрузка..." />
  </div>
);

export default LoaderFallback;
