import * as React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
const DatePickerDemo = ({ id }: { id: string }) => {
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon />
          {date ? format(date, 'PPP', { locale: ru }) : <span>Выбери дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;
