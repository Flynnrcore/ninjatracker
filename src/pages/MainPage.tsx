//import LoaderFallback from '@/components/LoaderFallback';
import { lazy } from 'react';

const MainPageContent = lazy(() => import('@/components/MainPageContent'));

const MainPage = () => {
  return (
    //<Suspense fallback={<LoaderFallback />}>
    <>
      <MainPageContent />
      <img
        src="/ninjatracker/loader.webp"
        alt=""
        style={{ display: 'none', width: 0, height: 0 }}
        aria-hidden="true"
        loading="eager"
      />
    </>
    //</Suspense>
  );
};

export default MainPage;
