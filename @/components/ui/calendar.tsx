import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('ay-p-3', className)}
      classNames={{
        months:
          'ay-flex ay-flex-col sm:ay-flex-row ay-space-y-4 sm:ay-space-x-4 sm:ay-space-y-0',
        month: 'ay-space-y-4',
        caption:
          'ay-flex ay-justify-center ay-pt-1 ay-relative ay-items-center',
        caption_label: 'ay-text-sm ay-font-medium',
        nav: 'ay-space-x-1 ay-flex ay-items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'ay-h-7 ay-w-7 ay-bg-transparent ay-p-0 ay-opacity-50 hover:ay-opacity-100'
        ),
        nav_button_previous: 'ay-absolute ay-left-1',
        nav_button_next: 'ay-absolute ay-right-1',
        table: 'ay-w-full ay-border-collapse ay-space-y-1',
        head_row: 'ay-flex',
        head_cell:
          'ay-text-muted-foreground ay-rounded-md ay-w-8 ay-font-normal ay-text-[0.8rem]',
        row: 'ay-flex ay-w-full ay-mt-2',
        cell: cn(
          'ay-relative ay-p-0 ay-text-center ay-text-sm focus-within:ay-relative focus-within:ay-z-20 [&:has([aria-selected])]:ay-bg-accent [&:has([aria-selected].day-outside)]:ay-bg-accent/50 [&:has([aria-selected].day-range-end)]:ay-rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:ay-rounded-r-md [&:has(>.day-range-start)]:ay-rounded-l-md first:[&:has([aria-selected])]:ay-rounded-l-md last:[&:has([aria-selected])]:ay-rounded-r-md'
            : '[&:has([aria-selected])]:ay-rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'ay-h-8 ay-w-8 ay-p-0 ay-font-normal aria-selected:ay-opacity-100'
        ),
        day_range_start: 'ay-day-range-start',
        day_range_end: 'ay-day-range-end',
        day_selected:
          'ay-bg-primary ay-text-primary-foreground hover:ay-bg-primary hover:ay-text-primary-foreground focus:ay-bg-primary focus:ay-text-primary-foreground',
        day_today: 'ay-bg-accent ay-text-accent-foreground',
        day_outside:
          'ay-day-outside ay-text-muted-foreground ay-opacity-50 ay- aria-selected:ay-bg-accent/50 aria-selected:ay-text-muted-foreground aria-selected:ay-opacity-30',
        day_disabled: 'ay-text-muted-foreground ay-opacity-50',
        day_range_middle:
          'aria-selected:ay-bg-accent aria-selected:ay-text-accent-foreground',
        day_hidden: 'ay-invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className="ay-h-4 ay-w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className="ay-h-4 ay-w-4" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
