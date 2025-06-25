import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { INSTRUMENTS } from '@/constants/consts';
import { getFormattedTime } from '@/lib/TimeFn';
import { TrainingDifficultyStars } from './TrainingDifficultyStars';
import { TrainingTypeTags } from './TrainingTypeTags';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { TTraining } from '@/types';

interface TrainingTableProps {
  trainings: TTraining[];
  onDeleteTraining: (id: number | string) => void;
}

const TABLE_HEADERS = [
  { label: 'Дата', className: 'min-w-[120px]' },
  { label: 'Название', className: 'min-w-[180px]' },
  { label: 'Описание', className: 'min-w-[240px]' },
  { label: 'Тип', className: 'min-w-[120px]' },
  { label: 'Инструмент', className: 'min-w-[120px]' },
  { label: 'Сложность', className: 'min-w-[120px]' },
  { label: 'Время', className: 'min-w-[100px]' },
  { label: '', className: 'w-16' },
] as const;

export const TrainingTable = ({ trainings, onDeleteTraining }: TrainingTableProps) => {
  if (trainings.length === 0) {
    return (
      <div className="h-[calc(80vh-120px)] overflow-y-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th
                    key={index}
                    className={cn('px-4 py-3 text-left text-sm font-medium text-gray-700', header.className)}>
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-4 py-6 text-center text-sm text-gray-500">
                  Нет данных для отображения
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Фиксированная шапка таблицы */}
      <div className="overflow-x-auto border-b border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={cn('px-4 py-3 text-left text-sm font-medium text-gray-700', header.className)}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Прокручиваемое тело таблицы */}
      <ScrollArea className="h-[calc(100%-60px)] w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {trainings.map(train => (
                <tr key={train.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {format(new Date(train.date), 'dd.MM.yyy')}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-yellow-600 hover:underline">{train.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="line-clamp-2">{train.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <TrainingTypeTags types={train.type} />
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
                  </td>
                  <td className="px-4 py-3">
                    <TrainingDifficultyStars difficulty={train.difficulty} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{getFormattedTime(train.timer) || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Удалить тренировку ${train.name}`}
                      onClick={() => onDeleteTraining(train.id!)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
