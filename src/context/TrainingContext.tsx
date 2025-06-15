import { mockData } from '@/assets/mockData';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type TTrainingType = 'exercises' | 'rhythm' | 'theory' | 'recording' | 'improvisation' | 'songs';
export type TDifficulty = 0 | 1 | 2 | 3 | 4 | 5;

export type TTraining = {
  id: string;
  name: string;
  date: string;
  description: string;
  difficulty: TDifficulty;
  instrument: string;
  timer: number;
  type: TTrainingType[];
};

type TStatistic = {
  alltime: number;
  timeTrainings: { date: string; time: number }[];
  difficulty: Record<TDifficulty, number>;
  trainTypes: Record<TTrainingType, number>;
};

type TTrainingContext = {
  trainings: TTraining[];
  stats: TStatistic;
  addTraining: (training: TTraining) => void;
  removeTraining: (id: string) => void;
};

const TrainingContext = createContext<TTrainingContext | undefined>(undefined);

export const TrainingsProvider = ({ children }: { children: ReactNode }) => {
  const [trainings, setTrainings] = useState<TTraining[]>(mockData.tableData);
  const [stats, setStats] = useState<TStatistic>(mockData.stats);

  const updateStats = useCallback(
    (prevStats: TStatistic, training: TTraining, operation: 'add' | 'remove'): TStatistic => {
      const diff = operation === 'add' ? 1 : -1;

      const newDifficulty = { ...prevStats.difficulty };
      const key = training.difficulty as keyof typeof newDifficulty;
      newDifficulty[key] = Math.max((newDifficulty[key] || 0) + diff, 0);

      const newTrainTypes = { ...prevStats.trainTypes };
      training.type.forEach(t => {
        const typeKey = t as keyof typeof newTrainTypes;
        newTrainTypes[typeKey] = Math.max((newTrainTypes[typeKey] || 0) + diff, 0);
      });

      let newTimeTrainings;
      if (operation === 'add') {
        newTimeTrainings = [...prevStats.timeTrainings, { date: training.date, time: training.timer }];
      } else {
        let removed = false;
        newTimeTrainings = prevStats.timeTrainings.filter(t => {
          if (!removed && t.date === training.date && t.time === training.timer) {
            removed = true;
            return false;
          }
          return true;
        });
      }

      const newAllTime =
        operation === 'add'
          ? prevStats.alltime + (training?.timer || 0)
          : Math.max(prevStats.alltime - (training?.timer || 0), 0);

      return {
        alltime: newAllTime,
        timeTrainings: newTimeTrainings,
        difficulty: newDifficulty,
        trainTypes: newTrainTypes,
      };
    },
    [trainings, stats],
  );

  const addTraining = useCallback((training: TTraining) => {
    setTrainings(prev => [training, ...prev]);
    setStats(prevStats => updateStats(prevStats, training, 'add'));
  }, []);

  const removeTraining = useCallback(
    (id: string) => {
      const removedTraining = trainings.find(train => train.id == id);

      const filterData = trainings.filter(training => training.id !== id);
      setTrainings(filterData);

      if (!removedTraining) return;
      setStats(prevStats => updateStats(prevStats, removedTraining, 'remove'));
    },
    [trainings, stats],
  );

  const value = useMemo(
    () => ({
      trainings,
      stats,
      addTraining,
      removeTraining,
    }),
    [trainings, stats, addTraining, removeTraining],
  );

  return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>;
};

export const useTrainings = () => {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error('useTrainings должен использоваться внутри TrainingsProvider');
  return ctx;
};
