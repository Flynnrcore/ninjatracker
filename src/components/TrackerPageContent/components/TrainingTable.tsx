import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { INSTRUMENTS } from '@/constants/consts';
import { getFormattedTime } from '@/lib/TimeFn';
import { TrainingDifficultyStars } from './TrainingDifficultyStars';
import { TrainingTypeTags } from './TrainingTypeTags';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { TTrainingTable } from '@/types';

const TABLE_HEADERS = [
  { label: 'Дата', className: 'min-w-[120px]' },
  { label: 'Название', className: 'min-w-[180px]' },
  { label: 'Описание', className: 'min-w-[240px]' },
  { label: 'Тип', className: 'min-w-[100px]' },
  { label: 'Инструмент', className: 'min-w-[120px]' },
  { label: 'Сложность', className: 'min-w-[120px]' },
  { label: 'Время', className: 'min-w-[100px]' },
  { label: '', className: 'min-w-[40px]' },
] as const;

export const TrainingTable = ({ trainings, onDeleteTraining }: TTrainingTable) => {
  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <ScrollArea className="h-full w-full rounded-t-lg">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              {TABLE_HEADERS.map(header => (
                <th
                  key={header.label}
                  scope="col"
                  className={cn('px-4 py-3 text-left text-sm font-medium text-gray-700', header.className)}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainings.length === 0 && (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-4 py-6 text-center text-sm text-gray-500">
                  Нет данных для отображения
                </td>
              </tr>
            )}
            {trainings.length > 0 &&
              trainings.map(train => (
                <tr key={train.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {format(new Date(train.date), 'dd.MM.yyyy')}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-yellow-600 hover:underline">{train.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="line-clamp-2">{train.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <TrainingTypeTags types={train.type} />
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {INSTRUMENTS[(train.instrument as keyof typeof INSTRUMENTS) || 'other']}
                  </td>
                  <td className="px-4 py-3">
                    <TrainingDifficultyStars difficulty={train.difficulty} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{getFormattedTime(train.timer) || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Удалить тренировку ${train.name}`}
                      onClick={() => onDeleteTraining(train.id || '')}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        {/* Фиксированная шапка таблицы */}
        <div className="rounded-t-lg border-b border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={cn('px-4 py-3 text-left text-sm font-medium text-gray-700', header.className)}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
        </div>

        {/* Прокручиваемое тело таблицы */}
        <ScrollArea className="h-[calc(100%-60px)] w-full">
          <tbody className="divide-y divide-gray-200">
            {trainings.length == 0 && (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-4 py-6 text-center text-sm text-gray-500">
                  Нет данных для отображения
                </td>
              </tr>
            )}
            {trainings.length > 0 &&
              trainings.map(train => (
                <tr key={train.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {format(new Date(train.date), 'dd.MM.yyyy')}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-yellow-600 hover:underline">{train.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="line-clamp-2">{train.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <TrainingTypeTags types={train.type} />
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {INSTRUMENTS[(train.instrument as keyof typeof INSTRUMENTS) || 'other']}
                  </td>
                  <td className="px-4 py-3">
                    <TrainingDifficultyStars difficulty={train.difficulty} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{getFormattedTime(train.timer) || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Удалить тренировку ${train.name}`}
                      onClick={() => onDeleteTraining(train.id || '')}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </table>
    </div>
  );
};
