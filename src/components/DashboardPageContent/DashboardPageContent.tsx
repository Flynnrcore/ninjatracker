import { TimeStatistic } from './TimeStatistic';
import { TrainTypeStatistic } from './TrainTypeStatistic';
import { DifficultyStatistic } from './DifficultyStatistic';
import LoaderFallback from '../LoaderFallback';
import ErrorPageContent from '../ErrorPageContent';
import { PATH } from '@/constants/paths';
import { useAuthContext, type AuthContextType } from '@/context/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import { AuthForm } from '../AuthForm';

const DashboardPageContent = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { statistics, trainings, loading: dataLoading } = useUserData();

  if (dataLoading) return <LoaderFallback />;
  if (!user)
    return (
      <ErrorPageContent
        picUrl={PATH.LOCK_IMG}
        message="Пожалуйста, войдите в аккаунт"
        children={<AuthForm mode="login" />}
      />
    );
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-stone-50 px-4 py-6 pt-25 sm:gap-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      <div className="flex w-full max-w-7xl items-start">
        <h2 className="text-2xl font-bold sm:text-3xl">Дашборд</h2>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex h-max w-full flex-col gap-4 sm:flex-row">
          <TimeStatistic stats={statistics} trainings={trainings} />
          <TrainTypeStatistic stats={statistics} />
        </div>
        <DifficultyStatistic trainings={trainings} />
      </div>
    </div>
  );
};

export default DashboardPageContent;
