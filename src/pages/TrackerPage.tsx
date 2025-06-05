import { EXERCISE_TYPES, INSTRUMENTS, mockData } from '@/assets/mockData';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { PATH, withBaseUrl } from '@/constants/paths';
import { SelectTrigger } from '@radix-ui/react-select';

const TrackerPage = () => {
  return (
    <div className="flex size-full min-h-screen flex-col gap-6 bg-stone-50 p-18 pt-6">
      <div className="flex items-center justify-between">
        <h2>Журнал тренировок</h2>
        <a href={withBaseUrl("/newtrain")}>
          <button className="rounded-lg bg-yellow-500 px-6 py-3 text-xl text-white transition-colors hover:scale-101 hover:bg-yellow-400">
            Начать новую тренировку
          </button>
        </a>
      </div>
      <div>
        <div className="flex items-center justify-between border-b border-stone-200">
          <div className="flex space-x-4">
            <Select>
              <SelectTrigger className="w-[250px] rounded-md bg-stone-100 p-2 px-6 shadow-md">
                <SelectValue placeholder="Инструмент" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INSTRUMENTS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[250px] rounded-md bg-stone-100 p-2 px-6 shadow-md">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EXERCISE_TYPES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <button className="flex flex-col items-center justify-center gap-1 border-b-[3px] border-b-yellow-400 pt-2.5 pb-[7px] text-black">
              Таблица
            </button>
            <button className="flex flex-col items-center justify-center gap-1 border-b-[3px] pt-2.5 pb-[7px] text-black">
              Карточки
            </button>
          </div>
        </div>
        <table className="radius mt-2 flex-1 rounded-xl border border-gray-200 bg-white">
          <thead>
            <tr className="bg-white">
              <th className="w-[400px] px-4 py-3  text-sm leading-normal font-medium text-black">Дата</th>
              <th className="w-[400px] px-4 py-3  text-sm leading-normal font-medium text-black">Название</th>
              <th className="w-[400px] px-4 py-3  text-sm leading-normal font-medium text-black">Описание</th>
              <th className="w-60 px-4 py-3  text-sm leading-normal font-medium text-black">Тип</th>
              <th className="w-60 px-4 py-3  text-sm leading-normal font-medium text-black">Инструмент</th>
              <th className="w-60 px-4 py-3  text-sm leading-normal font-medium text-black">Сложность</th>
              <th className="w-60 px-4 py-3  text-sm leading-normal font-medium text-black">Удалить</th>
            </tr>
          </thead>
          <tbody>
            {mockData.tableData.length !== 0 &&
              mockData.tableData.map((train, index) => (
                <tr key={index} className="border-t border-t-gray-200">
                  <td className="h-[72px] w-[400px] px-4 py-2 text-center text-sm leading-normal font-normal text-black">
                    {train.date}
                  </td>
                  <td className="h-[72px] w-[400px] px-4 py-2 text-center text-sm leading-normal font-normal text-yellow-600">
                    {train.name}
                  </td>
                  <td className="h-[72px] w-[400px] px-4 py-2 text-center text-sm leading-normal font-normal text-black">
                    {train.description}
                  </td>
                  <td className="h-[72px] w-60 px-4 py-2 text-center text-sm leading-normal font-normal">
                    <button className="flex h-8 w-full max-w-[480px] min-w-[84px] items-center justify-center rounded-lg bg-stone-100 px-4 text-sm leading-normal font-medium text-black">
                      <span className="truncate">
                        {train.type
                          .map(trainType => EXERCISE_TYPES[trainType as keyof typeof EXERCISE_TYPES])
                          .join(', ')}
                      </span>
                    </button>
                  </td>
                  <td className="h-[72px] w-60 px-4 py-2 text-center text-sm leading-normal font-normal">
                    <button className="flex h-8 w-full max-w-[480px] min-w-[84px] items-center justify-center rounded-lg bg-stone-100 px-4 text-sm leading-normal font-medium text-black">
                      <span className="truncate">{INSTRUMENTS[train.instrument as keyof typeof INSTRUMENTS]}</span>
                    </button>
                  </td>
                  <td className="h-[72px] w-60 px-4 py-2 text-center text-sm leading-normal font-normal">
                    <div className="flex h-8 w-full max-w-[480px] min-w-[84px] items-center justify-center rounded-lg bg-stone-100 px-4 text-sm leading-normal font-medium text-black">
                      <span className="truncate">
                        {[1, 2, 3, 4, 5].map(level => (
                          <span key={level} className={level <= train.difficulty ? 'text-yellow-500' : 'text-gray-400'}>
                            ★
                          </span>
                        ))}
                      </span>
                    </div>
                  </td>
                  <td className="p-2"><button className="p-6 hover:scale-110 active:scale-90"><img src={PATH.REMOVE_BTN_IMG} /></button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackerPage;
