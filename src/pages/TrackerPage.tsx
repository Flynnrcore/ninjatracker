import LoaderFallback from '@/components/LoaderFallback';
import { lazy, Suspense } from 'react';

const TrackerPageContent = lazy(() => import('@/components/TrackerPageContent/TrackerPageContent'));

const TrackerPage = () => {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <TrackerPageContent />
    </Suspense>
  );
};

export default TrackerPage;
