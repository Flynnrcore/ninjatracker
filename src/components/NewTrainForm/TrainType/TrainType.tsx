import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const TrainType = () => {
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
      <legend>Тип тренировки:</legend>
      <div className="grid grid-cols-2 rounded-lg border border-gray-200 p-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {options.map(({ id, label }) => (
          <div key={id} className="flex items-center space-x-2 p-1">
            <Checkbox
              checked={trainTypes.includes(id)}
              onCheckedChange={() => handleToggleCheckbox(id)}
              id={id}
              name={id}
              className="cursor-pointer h-7 w-7 sm:h-4 sm:w-4"
            />
            <Label htmlFor={id} className="cursor-pointer m-2 text-md sm:text-sm sm:m-0">
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
