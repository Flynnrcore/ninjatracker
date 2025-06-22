import LoaderFallback from '@/components/LoaderFallback';
import type { TErrorPage } from '@/types';
import { lazy, Suspense } from 'react';

const ErrorPageContent = lazy(() => import('@/components/ErrorPageContent'));

const ErrorPage = (props: TErrorPage) => (
  <Suspense fallback={<LoaderFallback />}>
    <ErrorPageContent {...props} />
  </Suspense>
);

export default ErrorPage;
