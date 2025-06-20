import { formatTimeUnit } from '@/utils/TimeFn';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { TTimeInput } from '@/types';

const TimeInput = ({ id, value, min, max, label, onChange, className }: TTimeInput) => (
  <div className={cn('flex w-full flex-col justify-center sm:w-1/3 lg:h-[100px] lg:w-[100px]', className)}>
    <div className="relative h-full">
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
        className="timer"
      />
    </div>
    <label htmlFor={id} className="mt-1 block text-center text-sm font-medium text-gray-600 sm:mb-0 sm:text-base">
      {label}
    </label>
  </div>
);

export default TimeInput;
