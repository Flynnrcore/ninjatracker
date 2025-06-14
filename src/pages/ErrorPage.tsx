import type { TErrorPage } from '@/components/ErrorPageContent';
import LoaderFallback from '@/components/LoaderFallback';
import { lazy, Suspense } from 'react';

const ErrorPageContent = lazy(() => import('@/components/ErrorPageContent'));

const ErrorPage = (props: TErrorPage) => (
  <Suspense fallback={<LoaderFallback />}>
    <ErrorPageContent {...props} />
  </Suspense>
);

export default ErrorPage;
