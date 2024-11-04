import React from 'react';
import { CalendarIcon, CheckIcon } from '@radix-ui/react-icons';

import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const classNames = {
  caption_label: 'text-sm font-medium flex items-center gap-2',
  vhidden: 'hidden',
  dropdown_month: 'flex relative items-center',
  dropdown_year: 'flex relative items-center',
  dropdown: 'absolute left-0 top-0 right-0 bottom-0 z-2 opacity-0',
  caption_dropdowns: 'flex gap-4',
};

let allLocales: { [key: string]: any } = {};
import('date-fns/locale').then((locales) => {
  allLocales = locales;
});

const getLocale = () => {
  const locale = navigator.language.replace('-', '');
  const rootLocale = locale.substring(0, 2);

  return allLocales[locale] || allLocales[rootLocale];
};

const dateOptions = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'yesterday',
    label: 'Yesterday',
  },
  {
    value: 'this-week',
    label: 'This Week',
  },
  {
    value: 'last-week',
    label: 'Last Week',
  },
  {
    value: 'this-month',
    label: 'This Month',
  },
  {
    value: 'last-month',
    label: 'Last Month',
  },
];

export type AdvancedCalendarProps = CalendarProps & {
  fromYear?: number;
  onSelect: (date: Date) => void;
  presets?: boolean;
  toYear?: number;
  type?: 'buttons' | 'dropdown' | 'dropdown-buttons';
  view?: 'single' | 'multiple';
};

/**
 * A reusable localized advanced-calendar component with advanced features.
 * @param presets
 * @param view
 * @param fromYear
 * @param toYear
 * @param type
 * @param props
 * @return {JSX.Element} The rendered advanced-calendar component.
 */
export default function AdvancedCalendar({
  presets,
  view = 'single',
  fromYear = new Date().getFullYear() - 5,
  toYear = new Date().getFullYear(),
  type = 'buttons',
  ...props
}: AdvancedCalendarProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const [month, setMonth] = React.useState<Date>(
    props.selected instanceof Date ? props.selected : new Date()
  );
  const locale = getLocale();

  function handleChange(value: string) {
    const _date = new Date();
    _date.setUTCHours(0, 0, 0, 0);
    if (value === 'yesterday') {
      _date.setUTCDate(_date.getUTCDate() - 1);
    } else if (value === 'this-week') {
      _date.setUTCDate(_date.getUTCDate() - _date.getUTCDay());
    } else if (value === 'last-week') {
      _date.setUTCDate(_date.getUTCDate() - _date.getUTCDay() - 7);
    } else if (value === 'this-month') {
      _date.setUTCDate(1);
    } else if (value === 'last-month') {
      _date.setUTCMonth(_date.getUTCMonth() - 1);
      _date.setUTCDate(1);
    } else if (value === 'this-year') {
      _date.setUTCMonth(0);
      _date.setUTCDate(1);
    }
    props.onSelect(_date);
    setMonth(_date);
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {presets && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between mx-auto"
            >
              {value
                ? dateOptions.find((date) => date.value === value)?.label
                : 'Select date...'}
              <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search date..." className="h-9" />
              <CommandList>
                <CommandEmpty>No date option found.</CommandEmpty>
                <CommandGroup>
                  {dateOptions.map((date) => (
                    <CommandItem
                      key={date.value}
                      value={date.value}
                      onSelect={(currentValue) => {
                        handleChange(currentValue);
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {date.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === date.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      <Calendar
        locale={locale}
        fromYear={fromYear}
        toYear={toYear}
        month={month}
        onMonthChange={setMonth}
        captionLayout={type}
        numberOfMonths={view === 'multiple' ? 2 : 1}
        classNames={classNames}
        {...props}
      />
    </div>
  );
}
