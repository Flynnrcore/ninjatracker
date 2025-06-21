import { EXERCISE_TYPES, INSTRUMENTS } from '@/constants/consts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrainingFiltersProps {
  selectedInstrument: string;
  selectedType: string;
  onInstrumentChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export const TrainingFilters = ({
  selectedInstrument,
  selectedType,
  onInstrumentChange,
  onTypeChange,
}: TrainingFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:gap-4">
      <Select value={selectedInstrument} onValueChange={onInstrumentChange}>
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

      <Select value={selectedType} onValueChange={onTypeChange}>
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
  );
};
