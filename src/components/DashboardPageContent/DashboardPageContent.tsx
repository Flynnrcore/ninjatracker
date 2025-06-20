import { TimeStatistic } from './TimeStatistic';
import { TrainTypeStatistic } from './TrainTypeStatistic';
import { DifficultyStatistic } from './DifficultyStatistic';
import LoaderFallback from '../LoaderFallback';
import ErrorPageContent from '../ErrorPageContent';
import { PATH } from '@/constants/paths';
import { useAuthContext } from '@/context/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import AuthForm from '../AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import PageWrapper from '../PageWrapper';
import { getFormattedTime } from '@/utils/TimeFn';
import type { AuthContextType } from '@/types';

const StatsCard = ({ title, value }: { title: string; value?: number | string }) => {
  return (
    <Card className="flex flex-col justify-between w-full gap-0 border-none">
      <CardHeader>
        <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-center text-2xl font-bold text-yellow-500 sm:text-3xl">{value}</p>
      </CardContent>
    </Card>
  );
};

const DashboardPageContent = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { statistics, loading: dataLoading } = useUserData();

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
