import { EXERCISE_TYPES } from '@/constants/consts';
import type { TTrainingTypeTags } from '@/types';

export const TrainingTypeTags = ({ types, className = '' }: TTrainingTypeTags) => {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {types.map(
        type =>
          type && (
            <span key={type} className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-gray-700">
              {EXERCISE_TYPES[type as keyof typeof EXERCISE_TYPES]}
            </span>
          ),
      )}
    </div>
  );
};
