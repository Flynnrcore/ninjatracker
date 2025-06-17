import { useTrainings } from '@/context/TrainingContext';
import { TimeStatistic } from './TimeStatistic';
import { TrainTypeStatistic } from './TrainTypeStatistic';
import { DifficultyStatistic } from './DifficultyStatistic';

const DashboardPageContent = () => {
  const { stats, trainings } = useTrainings();
  return (
    <div className="flex min-h-screen gap-4 flex-col bg-stone-50 px-4 py-6 pt-25 sm:gap-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
      <div className="flex w-full max-w-7xl items-start">
        <h2 className="text-2xl font-bold sm:text-3xl">Дашборд</h2>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex h-max w-full flex-col gap-4 sm:flex-row">
          <TimeStatistic stats={stats} trainings={trainings} />
          <TrainTypeStatistic stats={stats} />
        </div>
        <DifficultyStatistic trainings={trainings} />
      </div>
    </div>
  );
};

export default DashboardPageContent;
