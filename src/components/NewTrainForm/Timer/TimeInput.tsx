import { formatTimeUnit } from '@/utils/TimeFn';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type TTimeInput = {
  id: string;
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
  className?: string;
};

const TimeInput = ({ id, value, min, max, label, onChange, className }: TTimeInput) => (
  <div className={cn('w-full sm:w-1/3 lg:h-[100px] lg:w-[100px]', className)}>
    <div className="relative">
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={formatTimeUnit(value)}
        onChange={e => {
          const val = Math.min(max, Math.max(min, Number(e.target.value)));
          onChange(val);
        }}
        className={cn(
          'h-12 bg-white text-center text-xl sm:text-2xl',
          '[appearance:textfield] px-2 py-1',
          '[&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
          '[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none',
          'focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2',
        )}
      />
    </div>
    <label htmlFor={id} className="mt-1 block text-center text-sm font-medium text-gray-600 sm:text-base">
      {label}
    </label>
  </div>
);

export default TimeInput;
