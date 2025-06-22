import LoaderFallback from '../LoaderFallback';
import ErrorPageContent from '../ErrorPageContent';
import { PATH } from '@/constants/paths';
import { useAuthContext } from '@/context/AuthContext';
import { useUserData } from '@/hooks';
import AuthForm from '../AuthForm';
import PageWrapper from '../PageWrapper';
import { getFormattedTime } from '@/utils/TimeFn';
import { StatsCard, TimeStatistic, TrainTypeStatistic, DifficultyStatistic } from '.';

const DashboardPageContent = () => {
  const authContext = useAuthContext();
  const { statistics, loading: dataLoading } = useUserData();

  if (dataLoading) return <LoaderFallback />;
  if (!authContext?.user)
    return (
      <ErrorPageContent
        picUrl={PATH.LOCK_IMG}
        message="Пожалуйста, войдите в аккаунт"
        children={<AuthForm mode="login" loader={authContext?.loading} />}
      />
    );

  return (
    <PageWrapper title="Дашборд">
      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <StatsCard title="Общее количество тренировок" value={statistics?.totalCount || 0} />
          <StatsCard title="Среднее время тренировки" value={getFormattedTime(statistics?.avgDuration || 0)} />
          <StatsCard title="Максимальное время тренировки" value={getFormattedTime(statistics?.maxDuration || 0)} />
          <StatsCard title="Серия тренировок подряд" value={statistics?.streak || 0} />
        </div>
        <div className="flex h-max w-full flex-col gap-4 sm:flex-row">
          <TimeStatistic statistic={statistics} />
          <TrainTypeStatistic statistic={statistics} />
        </div>
        <DifficultyStatistic statistic={statistics} />
      </div>
    </PageWrapper>
  );
};

export default DashboardPageContent;
