import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const currentYear = new Date().getFullYear();
  const {
    fromDate,
    toDate,
    fromYear = currentYear - 100,
    toYear = currentYear + 100,
  } = uiOptions;
  return {
    fromDate: fromDate ?? new Date(fromYear, 0, 1),
    toDate: toDate ?? new Date(toYear, 11, 31),
    fromYear,
    toYear,
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
  const [date, setDate] = useState(initialDate);

  const month = date.getMonth();
  const year = date.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), 'MMMM', { locale: getDateFnsLocale({ locale }) })
  );

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value, 10);
    const newDate = new Date(year, newMonth, 1);
    setDate(newDate);
    onChange(newDate.toISOString());
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value, 10);
    const newDate = new Date(newYear, month, 1);
    setDate(newDate);
    onChange(newDate.toISOString());
  };

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
        <div className="flex justify-between p-4 gap-3">
          <Select
            defaultValue={month.toString()}
            onValueChange={handleMonthChange}
            disabled={disabled}
          >
            <SelectTrigger aria-label="Month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem
                  key={month}
                  value={months.indexOf(month).toString()}
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue={year.toString()}
            onValueChange={handleYearChange}
            disabled={disabled}
          >
            <SelectTrigger aria-label="Year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: toYear - fromYear + 1 }, (_, index) => (
                <SelectItem
                  key={fromYear + index}
                  value={(fromYear + index).toString()}
                >
                  {fromYear + index}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center text-center gap-3">
          <Calendar
            key={`${month}-${year}`}
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
        </div>
      </PopoverContent>
    </Popover>
  );
};
