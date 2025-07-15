import { useState } from 'react';
import { Checkbox, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

const TrainType = ({ className = '' }: { className?: string }) => {
  const [trainTypes, setTrainTypes] = useState<string[]>([]);

  const handleToggleCheckbox = (trainName: string) => {
    const dataSet = new Set(trainTypes);
    if (dataSet.has(trainName)) {
      dataSet.delete(trainName);
    } else {
      dataSet.add(trainName);
    }
    setTrainTypes([...dataSet]);
  };

  const options = [
    { id: 'exercises', label: 'Упражения' },
    { id: 'rhythm', label: 'Ритмика' },
    { id: 'theory', label: 'Теория' },
    { id: 'recording', label: 'Запись' },
    { id: 'improvisation', label: 'Джем' },
    { id: 'songs', label: 'Песни' },
  ];

  return (
    <fieldset className="mt-4">
      <legend>
        Тип тренировки
        <span className="required-dot">*</span>:
      </legend>
      <div className={cn("grid grid-cols-2 rounded-lg border border-gray-200 p-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3", className)}>
        {options.map(({ id, label }) => (
          <div key={id} className="flex items-center space-x-2 p-1">
            <Checkbox
              checked={trainTypes.includes(id)}
              onCheckedChange={() => handleToggleCheckbox(id)}
              id={id}
              name={id}
              className="h-7 w-7 cursor-pointer sm:h-4 sm:w-4"
            />
            <Label htmlFor={id} className="text-md m-2 cursor-pointer sm:m-0 sm:text-sm">
              {label}
            </Label>
          </div>
        ))}
        <textarea name="type" value={trainTypes.join(',')} readOnly hidden />
      </div>
    </fieldset>
  );
};

export default TrainType;
