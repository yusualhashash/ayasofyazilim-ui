import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker';
import { format, setMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  locale,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    locale={locale}
    className={cn('p-3', className)}
    classNames={{
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      nav: 'space-x-1 flex items-center',
      nav_button: cn(
        buttonVariants({ variant: 'outline' }),
        'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
      ),
      nav_button_previous: 'absolute left-1',
      nav_button_next: 'absolute right-1',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell:
        'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
      row: 'flex w-full mt-2',
      cell: cn(
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        props.mode === 'range'
          ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
          : '[&:has([aria-selected])]:rounded-md'
      ),
      day: cn(
        buttonVariants({ variant: 'ghost' }),
        'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
      ),
      day_range_start: 'day-range-start',
      day_range_end: 'day-range-end',
      day_selected:
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day_today: 'bg-accent text-accent-foreground',
      day_outside:
        'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
      day_disabled: 'text-muted-foreground opacity-50',
      day_range_middle:
        'aria-selected:bg-accent aria-selected:text-accent-foreground',
      day_hidden: 'invisible',
      ...classNames,
    }}
    components={{
      // eslint-disable-next-line consistent-return,react/no-unstable-nested-components
      Dropdown: (props) => {
        const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
          useDayPicker();
        const { goToMonth, currentMonth } = useNavigation();

        if (props.name === 'months') {
          const selectedItems = Array.from({ length: 12 }, (_, i) => ({
            value: i.toString(),
            label: format(setMonth(new Date(), i), 'MMMM', { locale }),
          }));

          return (
            <Select
              onValueChange={(newValue) => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(parseInt(newValue, 10));
                goToMonth(newDate);
              }}
            >
              <SelectTrigger className="p-0 m-0 border-0 shadow-none outline-0">
                {format(currentMonth, 'MMMM', { locale })}
              </SelectTrigger>
              <SelectContent>
                {selectedItems.map((selectItem) => (
                  <SelectItem value={selectItem.value}>
                    {selectItem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        if (props.name === 'years') {
          const earliestYear =
            fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
          const latestYear =
            toYear || toMonth?.getFullYear() || toDate?.getFullYear();

          if (earliestYear && latestYear) {
            const yearsLength = latestYear - earliestYear + 1;

            const selectedItems = Array.from(
              { length: yearsLength },
              (_, i) => ({
                value: (earliestYear + i).toString(),
                label: (earliestYear + i).toString(),
              })
            );

            return (
              <Select
                onValueChange={(newValue) => {
                  const newDate = new Date(currentMonth);
                  newDate.setFullYear(parseInt(newValue, 10));
                  goToMonth(newDate);
                }}
                value={props.value?.toString()}
              >
                <SelectTrigger className="p-0 m-0 border-0 shadow-none outline-0">
                  {currentMonth.getFullYear()}
                </SelectTrigger>
                <SelectContent>
                  {selectedItems.map((selectItem) => (
                    <SelectItem value={selectItem.value}>
                      {selectItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
        }
        return null;
      },
      // eslint-disable-next-line react/no-unstable-nested-components
      IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
      // eslint-disable-next-line react/no-unstable-nested-components
      IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
    }}
    {...props}
  />
);
Calendar.displayName = 'Calendar';

export { Calendar };
