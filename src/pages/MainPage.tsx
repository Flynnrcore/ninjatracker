//import LoaderFallback from '@/components/LoaderFallback';
import { lazy } from 'react';

const MainPageContent = lazy(() => import('@/components/MainPageContent'));

const MainPage = () => {
  return (
    //<Suspense fallback={<LoaderFallback />}>
      <MainPageContent />
    //</Suspense>
  );
};

export default MainPage;