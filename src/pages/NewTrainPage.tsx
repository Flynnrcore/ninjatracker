import LoaderFallback from '@/components/LoaderFallback';
import { lazy, Suspense } from 'react';

const NewTrainForm = lazy(() => import('@/components/NewTrainForm/NewTrainForm'));

const NewTrainPage = () => {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <NewTrainForm />
    </Suspense>
  );
};

export default NewTrainPage;
