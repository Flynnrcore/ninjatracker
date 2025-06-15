'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ru } from 'react-day-picker/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());
  console.log(date.toISOString());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button id="trainDate" variant="outline" data-empty={!date} className="input justify-between text-start">
          {date ? format(date, 'dd.MM.yyy') : <span>Выберите дату</span>}
          <CalendarIcon />
          <input type="hidden" name="date" value={date.toISOString()} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar required mode="single" selected={date} onSelect={setDate} locale={ru} />
      </PopoverContent>
    </Popover>
  );
}
