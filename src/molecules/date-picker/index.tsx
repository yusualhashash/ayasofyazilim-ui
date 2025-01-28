'use client';

import { parseDate } from '@internationalized/date';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  DatePicker as DefaultDatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import { DateInput } from './datefield-rac';
import { Calendar } from './calendar-rac';

export function DatePicker({
  label,
  classNames,
  onChange,
  defaultValue,
}: {
  label?: string;
  classNames?: {
    dateInput?: string;
  };
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}) {
  const [value, setValue] = useState(
    defaultValue && parseDate(defaultValue.toJSON().split('T').at(0) || '')
  );
  return (
    <DefaultDatePicker
      aria-label="x"
      className="space-y-2"
      value={value}
      onChange={(date) => {
        if (date) {
          setValue(date);
          if (onChange) onChange(new Date(date.year, date.month - 1, date.day));
        }
      }}
    >
      {label && (
        <Label className="text-sm font-medium text-foreground">{label}</Label>
      )}
      <div className="flex">
        <Group className="w-full">
          <DateInput className={cn('pe-9', classNames?.dateInput)} />
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 border-none">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar />
        </Dialog>
      </Popover>
    </DefaultDatePicker>
  );
}
