import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const TrainType = () => {
  const [trainTypes, setTrainTypes] = useState<string[]>([]);

  const handleToggleCheckbox = (trainName: string) => {
    const dataSet = new Set(trainTypes);
    dataSet.has(trainName) ? dataSet.delete(trainName) : dataSet.add(trainName);
    setTrainTypes([...dataSet]);
  };

  const options = [
    { id: 'improvisation', label: 'Импровизация' },
    { id: 'rhythm', label: 'Ритмика' },
    { id: 'exercises', label: 'Упражения' },
    { id: 'theory', label: 'Теория/Анализ' },
    { id: 'recording', label: 'Запись' },
    { id: 'songs', label: 'Песни' },
  ];

  return (
    <fieldset className="mt-4">
      <legend>Тип тренировки:</legend>
      <div className="flex flex-wrap gap-2 rounded-lg border-1 border-gray-200 p-3">
        {options.map(({ id, label }) => (
          <div key={id} className="flex space-x-2">
            <Checkbox
              checked={trainTypes.includes(id)}
              onCheckedChange={() => handleToggleCheckbox(id)}
              id={id}
              name={id}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
        <textarea name="trainTypes" value={trainTypes.join(',')} readOnly hidden />
      </div>
    </fieldset>
  );
};

export default TrainType;
