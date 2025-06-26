import { lazy } from 'react';
import { withBaseUrl } from '@/constants/paths';

const MainPageContent = lazy(() => import('@/components/MainPageContent/MainPageContent'));

const MainPage = () => {
  return (
    <>
      <MainPageContent />
      <img
        src={withBaseUrl('loader.webp')}
        alt=""
        style={{ display: 'none', width: 0, height: 0 }}
        aria-hidden="true"
        loading="eager"
      />
    </>
  );
};

export default MainPage;
