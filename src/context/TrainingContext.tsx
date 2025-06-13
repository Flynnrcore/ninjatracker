import { mockData } from '@/assets/mockData';
import { createContext, useContext, useState, type ReactNode } from 'react';

export type TTraining = {
  id: string;
  name: string;
  date: string;
  description: string;
  difficulty: number;
  instrument: string;
  timer?: string;
  type: string[];
};

type TTrainingContext = {
  trainings: TTraining[];
  addTraining: (training: TTraining) => void;
  removeTraining: (id: string) => void;
};

const TrainingContext = createContext<TTrainingContext | undefined>(undefined);

export const TrainingsProvider = ({ children }: { children: ReactNode }) => {
  const [trainings, setTrainings] = useState<TTraining[]>(mockData.tableData);

  const addTraining = (training: TTraining) => {
    setTrainings(prev => [...prev, training]);
  };

  const removeTraining = (id: string) => {
    const filterData = trainings.filter(training => training.id !== id);
    setTrainings(filterData);
  };

  return (
    <TrainingContext.Provider value={{ trainings, addTraining, removeTraining }}>{children}</TrainingContext.Provider>
  );
};

export const useTrainings = () => {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error('useTrainings должен использоваться внутри TrainingsProvider');
  return ctx;
};
