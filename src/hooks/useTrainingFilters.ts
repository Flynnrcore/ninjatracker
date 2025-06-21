import { useState, useMemo } from 'react';
import { EXERCISE_TYPES } from '@/constants/consts';
import type { TTraining } from '@/types';

export const useTrainingFilters = (trainings: TTraining[]) => {
  const [selectedInstrument, setSelectedInstrument] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredTrainings = useMemo(() => {
    return trainings.filter(train => {
      const instrumentMatch =
        selectedInstrument === 'all' || !selectedInstrument || train.instrument === selectedInstrument;
      const typeMatch =
        selectedType === 'all' || !selectedType || train.type.includes(selectedType as keyof typeof EXERCISE_TYPES);
      return instrumentMatch && typeMatch;
    });
  }, [trainings, selectedInstrument, selectedType]);

  return {
    selectedInstrument,
    selectedType,
    setSelectedInstrument,
    setSelectedType,
    filteredTrainings,
  };
};
