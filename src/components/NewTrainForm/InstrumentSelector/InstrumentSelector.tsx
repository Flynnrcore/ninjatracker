import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PATH } from '@/constants/paths';
import { useMemo, useState } from 'react';

const InstrumentSelector = () => {
  const [instrument, setInstrument] = useState('eguitar');

  const instruments = useMemo(
    () => [
      { value: 'piano', label: 'Клавишные', src: PATH.INSTRUMENT.PIANO, maxH: '100px' },
      { value: 'drums', label: 'Барабаны', src: PATH.INSTRUMENT.DRUMS, maxH: '100px' },
      { value: 'bass', label: 'Бас', src: PATH.INSTRUMENT.BASS, maxH: '100px' },
      { value: 'eguitar', label: 'Электрогитара', src: PATH.INSTRUMENT.EGUITAR, maxH: '80px' },
      { value: 'acguitar', label: 'Акустическая гитара', src: PATH.INSTRUMENT.AGUITAR, maxH: '80px' },
      { value: 'vocal', label: 'Вокал', src: PATH.INSTRUMENT.MICROPHONE, maxH: '90px' },
      { value: 'other', label: 'Другие инструменты', src: PATH.INSTRUMENT.OTHER, maxH: '100px' },
    ],
    [],
  );

  return (
    <fieldset className="mt-3 flex flex-col items-center justify-center">
      <legend className="text-center">Инструмент:</legend>
      <ToggleGroup variant="outline" value={instrument} onValueChange={setInstrument} type="single">
        {instruments.map(({ value, label, src, maxH }) => (
          <ToggleGroupItem key={value} className="h-[100px]" value={value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <img className={`max-h-[${maxH}]`} src={src} alt={value} />
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <input type="hidden" name="instrument" value={instrument} />
    </fieldset>
  );
};

export default InstrumentSelector;
