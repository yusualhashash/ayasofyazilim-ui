import { WidgetProps } from '@rjsf/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const CustomDate = (props: WidgetProps) => {
  const { value, uiSchema, onChange, disabled } = props;
  const uiOptions = uiSchema?.['ui:options'];
  const placeholder =
    uiSchema?.['ui:placeholder']?.toString() ||
    uiOptions?.['ui:placeholder']?.toString() ||
    'Pick a date';
  const [date, setDate] = useState<Date>(new Date(value));
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal flex',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          disabled={
            uiOptions?.fromDate
              ? { before: uiOptions?.fromDate as Date }
              : undefined
          }
          fromYear={
            (uiOptions?.fromYear as number) || date
              ? date.getFullYear() - 100
              : new Date().getFullYear() - 100
          }
          toYear={
            (uiOptions?.toYear as number) || date
              ? date.getFullYear() + 100
              : new Date().getFullYear() + 100
          }
          month={date}
          selected={date}
          initialFocus
          onSelect={(e) => {
            if (!e) return;
            setDate(e);
            onChange(e.toISOString());
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
