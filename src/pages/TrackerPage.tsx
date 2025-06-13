import { EXERCISE_TYPES, INSTRUMENTS } from '@/assets/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Trash2, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { withBaseUrl } from '@/constants/paths';
import { useTrainings } from '@/context/TrainingContext';

const TrackerPage = () => {
  const { trainings, removeTraining } = useTrainings();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>(() => (window.innerWidth >= 1024 ? 'table' : 'cards'));
  const [selectedInstrument, setSelectedInstrument] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Определение начального режима просмотра по размеру экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewMode('table');
      } else {
        setViewMode('cards');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredData = trainings.filter(train => {
    const instrumentMatch =
      selectedInstrument === 'all' || !selectedInstrument || train.instrument === selectedInstrument;
    const typeMatch = selectedType === 'all' || !selectedType || train.type.includes(selectedType);
    return instrumentMatch && typeMatch;
  });

  return (
    <div className="mt-15 min-h-screen bg-stone-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Заголовок и кнопка */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Журнал тренировок</h2>
          <Link to="/new" className="w-full sm:w-auto">
            <button className="w-full rounded-lg bg-yellow-500 px-4 py-2 text-lg font-medium text-white transition-all hover:bg-yellow-400 hover:shadow-md focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-6 sm:py-3 sm:text-xl">
              Начать новую тренировку
            </button>
          </Link>
        </div>

        {/* Фильтры и переключение вида */}
        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-stone-200 pb-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:gap-4">
            <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
              <SelectTrigger className="w-full min-w-[180px] rounded-md bg-stone-100 px-4 py-2 shadow-sm sm:w-[250px]">
                <SelectValue placeholder="Все инструменты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все инструменты</SelectItem>
                {Object.entries(INSTRUMENTS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full min-w-[180px] rounded-md bg-stone-100 px-4 py-2 shadow-sm sm:w-[250px]">
                <SelectValue placeholder="Все типы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                {Object.entries(EXERCISE_TYPES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'px-3 py-1.5 text-sm font-medium transition-colors',
                viewMode === 'table' ? 'border-b-2 border-yellow-400 text-black' : 'text-stone-500 hover:text-black',
              )}
              aria-label="Табличный вид">
              Таблица
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                'px-3 py-1.5 text-sm font-medium transition-colors',
                viewMode === 'cards' ? 'border-b-2 border-yellow-400 text-black' : 'text-stone-500 hover:text-black',
              )}
              aria-label="Вид карточек">
              Карточки
            </button>
          </div>
        </div>

        {/* Контент */}
        {viewMode === 'table' ? (
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { label: 'Дата', className: 'min-w-[120px]' },
                    { label: 'Название', className: 'min-w-[180px]' },
                    { label: 'Описание', className: 'min-w-[240px]' },
                    { label: 'Тип', className: 'min-w-[120px]' },
                    { label: 'Инструмент', className: 'min-w-[120px]' },
                    { label: 'Сложность', className: 'min-w-[120px]' },
                    { label: 'Время', className: 'min-w-[100px]' },
                    { label: '', className: 'w-16' },
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={cn('px-4 py-3 text-left text-sm font-medium text-gray-700', header.className)}>
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((train, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">{train.date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-yellow-600">
                        <Link to={`/train/${train.id}`} className="hover:underline">
                          {train.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="line-clamp-2">{train.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {train.type.map(
                            type =>
                              type && (
                                <span key={type} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium">
                                  {EXERCISE_TYPES[type as keyof typeof EXERCISE_TYPES]}
                                </span>
                              ),
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                        {INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map(level => (
                            <Star
                              key={level}
                              size={16}
                              className={cn(
                                'fill-current',
                                level <= train.difficulty ? 'text-yellow-500' : 'text-gray-300',
                              )}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{train.timer || '-'}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                          aria-label={`Удалить тренировку ${train.name}`}
                          onClick={() => removeTraining(train.id)}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">
                      Нет данных для отображения
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.length > 0 ? (
              filteredData.map(train => (
                <div
                  key={train.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                  {/* Верхняя часть - изображение инструмента */}
                  <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
                    <img
                      src={withBaseUrl(`/trainType/${train.instrument}.webp`)}
                      alt={INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Нижняя часть - информация о тренировке */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{train.date}</span>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Удалить тренировку ${train.name}`}
                        onClick={() => removeTraining(train.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <Link to={`/train/${train.id}`} className="mt-2 block">
                      <h3 className="text-lg font-medium text-yellow-600 hover:underline">{train.name}</h3>
                    </Link>

                    <p className="line-clamp-3 text-sm text-gray-600">{train.description}</p>

                    <div className="mt-3 flex flex-wrap gap-1 pb-2">
                      {train.type.map(
                        type =>
                          type && (
                            <span
                              key={type}
                              className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-gray-700">
                              {EXERCISE_TYPES[type as keyof typeof EXERCISE_TYPES]}
                            </span>
                          ),
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(level => (
                          <Star
                            key={level}
                            size={16}
                            className={cn(
                              'fill-current',
                              level <= train.difficulty ? 'text-yellow-500' : 'text-gray-300',
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">Время тренировки: {train.timer || '-'}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
                <p className="text-gray-500">Нет данных для отображения</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
