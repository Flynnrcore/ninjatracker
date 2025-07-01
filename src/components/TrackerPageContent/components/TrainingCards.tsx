import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { INSTRUMENTS } from '@/constants/consts';
import { getFormattedTime } from '@/lib/TimeFn';
import { withBaseUrl } from '@/constants/paths';
import { TrainingDifficultyStars } from './TrainingDifficultyStars';
import { TrainingTypeTags } from './TrainingTypeTags';
import type { TTrainingCards } from '@/types';

export const TrainingCards = ({ trainings, onDeleteTraining }: TTrainingCards) => {
  if (trainings.length === 0) {
    return (
      <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-gray-500">Нет данных для отображения</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trainings.map(train => (
        <div
          key={train.id}
          className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
          {/* Верхняя часть - изображение инструмента */}
          <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
            <img
              src={withBaseUrl(`trainType/${train.instrument}.webp`)}
              alt={INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Нижняя часть - информация о тренировке */}
          <div className="flex flex-1 flex-col p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">{format(new Date(train.date), 'dd.MM.yyy')}</span>
              <button
                className="text-gray-400 hover:text-red-500"
                aria-label={`Удалить тренировку ${train.name}`}
                onClick={() => onDeleteTraining(train.id!)}>
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="mt-2 block text-lg font-medium text-yellow-600 hover:underline">{train.name}</h3>
            <p className="line-clamp-3 text-sm text-gray-600">{train.description}</p>

            <TrainingTypeTags types={train.type} className="mt-3 pb-2" />

            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
              </span>
              <TrainingDifficultyStars difficulty={train.difficulty} />
            </div>
            <div className="mt-2 text-sm text-gray-500">Время тренировки: {getFormattedTime(train.timer) || '-'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
