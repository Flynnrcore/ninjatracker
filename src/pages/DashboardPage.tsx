import LoaderFallback from '@/components/LoaderFallback';
import { lazy, Suspense } from 'react';

const DashboardPageContent = lazy(() => import('@/components/DashboardPageContent/DashboardPageContent'));

const DashboardPage = () => {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <DashboardPageContent />
    </Suspense>
  );
};

export default DashboardPage;
