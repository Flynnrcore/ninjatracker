import { useTrainings } from '@/context/TrainingContext';
import { TimeStatistic } from './TimeStatistic';
import { TrainTypeStatistic } from './TrainTypeStatistic';

const DashboardPageContent = () => {
  const { stats } = useTrainings();
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-stone-50 px-4 py-6 pt-25 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      <div className="mx-auto flex w-full max-w-7xl items-start">
        <h2 className="text-2xl font-semibold">Дашборд</h2>
      </div>
      <div className="flex h-max w-full flex-col gap-4 sm:flex-row">
        <TimeStatistic stats={stats} />
        <TrainTypeStatistic stats={stats} />
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default DashboardPageContent;
