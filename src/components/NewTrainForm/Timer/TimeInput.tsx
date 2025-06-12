import { formatTimeUnit } from '@/utils/TimeFn';
import { Input } from '../../ui/input';

type TTimeInput = {
  id: string;
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
};

const TimeInput = ({ id, value, min, max, label, onChange }: TTimeInput) => (
  <div className="w-1/3">
    <Input
      id={id}
      type="number"
      min={min}
      max={max}
      value={formatTimeUnit(value)}
      onChange={e => onChange(Number(e.target.value))}
      className="h-12 w-full bg-white text-center text-2xl"
    />
    <label htmlFor={id} className="block text-center font-medium text-gray-600">
      {label}
    </label>
  </div>
);

export default TimeInput;
