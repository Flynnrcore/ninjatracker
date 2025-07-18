import { ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { PATH } from '@/constants/paths';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';

const InstrumentSelector = ({ className = '' }: { className?: string }) => {
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
      <legend className="text-center">
        Инструмент
        <span className="required-dot">*</span>:
      </legend>
      <ToggleGroup
        variant="outline"
        value={instrument}
        onValueChange={setInstrument}
        type="single"
        className={cn("grid grid-cols-2 sm:flex sm:flex-row", className)}
        aria-label="Выберите инструмент"
        aria-required="true">
        {instruments.map(({ value, label, src, maxH }) => (
          <ToggleGroupItem
            key={value}
            className="border-1 h-[120px] rounded-md border-stone-200 p-8 sm:h-[100px] sm:rounded-none sm:p-0"
            value={value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <img className={`max-h-[${maxH}] sm:max-h-[${maxH}]`} loading="lazy" src={src} alt={value} />
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
