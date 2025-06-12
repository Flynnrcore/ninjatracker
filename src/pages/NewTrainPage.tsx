import { lazy, Suspense } from 'react';

const NewTrainForm = lazy(() => import('@/components/NewTrainForm/NewTrainForm'));

const NewTrainPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <NewTrainForm />
    </Suspense>
  );
};

export default NewTrainPage;
