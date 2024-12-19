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
import { WidgetProps } from '../types';
import { getDateFnsLocale } from '../utils';

type DateOptions = {
  fromDate?: Date;
  toDate?: Date;
  fromYear?: number;
  toYear?: number;
};

/**
 * Looks up a date-fns locale from the Expo localization object.  This falls back to `en-US`
 * @param localization Expo Localization object containing the locale and region.
 * @returns date-fns locale.
 */

const getDateRange = (uiOptions: DateOptions) => {
  const { fromDate, toDate, fromYear, toYear } = uiOptions;

  const defaultFromYear =
    fromDate?.getFullYear() ?? fromYear ?? new Date().getFullYear();
  const defaultToYear =
    toDate?.getFullYear() ?? toYear ?? new Date().getFullYear() + 100;
  const defaultFromDate = fromDate ?? new Date(defaultFromYear, 0, 1);
  const defaultToDate = toDate ?? new Date(defaultToYear, 11, 31);
  return {
    fromDate: defaultFromDate,
    toDate: defaultToDate,
    fromYear: defaultFromYear,
    toYear: defaultToYear,
  };
};

export const CustomDate = (props: WidgetProps) => {
  const { value, uiSchema, onChange, disabled, required, formContext } = props;
  const uiOptions = uiSchema?.['ui:options'] ?? {};
  const { fromDate, toDate, fromYear, toYear } = getDateRange(
    uiOptions as DateOptions
  );
  const placeholder =
    uiSchema?.['ui:placeholder']?.toString() ||
    uiOptions?.['ui:placeholder']?.toString() ||
    'Pick a date';
  const locale = formContext?.locale || 'en';
  // Handle invalid date value
  const initialDate =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(value)
      : new Date(fromDate);

  const [date, setDate] = useState<Date>(initialDate);
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
          {date ? (
            format(date, 'PPP', { locale: getDateFnsLocale({ locale }) })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          key={props.id}
          required={required}
          locale={getDateFnsLocale({ locale })}
          mode="single"
          disabled={{
            before: fromDate,
            after: toDate,
          }}
          fromYear={fromYear}
          toYear={toYear}
          defaultMonth={date}
          selected={date}
          initialFocus
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
              onChange(selectedDate.toISOString());
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
