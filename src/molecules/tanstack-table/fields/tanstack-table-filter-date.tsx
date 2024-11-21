import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import AdvancedCalendar from '../../advanced-calendar';
import { TanstackTableDateFilterType } from '../types';

interface TanstackTableDateFilterProps<TData, TValue> {
  accessorKey: string;
  column?: Column<TData, TValue>;
  dateItem: TanstackTableDateFilterType;
  onFilter: (accessorKey: string, selectedValues: string) => void;
  params: URLSearchParams;
}

export function TanstackTableDateFilter<TData, TValue>({
  column,
  accessorKey,
  params,
  onFilter,
  dateItem,
}: TanstackTableDateFilterProps<TData, TValue>) {
  const title = column?.columnDef?.meta?.toString() || accessorKey;

  // If endAccessorKey is provided, then it is a date range. Otherwise it is a single date.
  const [date, setDate] = useState<Date | DateRange | undefined>(
    dateItem?.endAccessorKey
      ? {
          from: params?.get(dateItem.startAccessorKey)
            ? new Date(params?.get(dateItem.startAccessorKey) as string)
            : undefined,
          to: params?.get(dateItem?.endAccessorKey)
            ? new Date(params?.get(dateItem.endAccessorKey) as string)
            : undefined,
        }
      : params?.get(dateItem.startAccessorKey)
        ? new Date(params?.get(dateItem.startAccessorKey) as string)
        : undefined
  );

  useEffect(() => {
    if (!date) {
      if (params?.get(dateItem.startAccessorKey)) {
        onFilter(dateItem?.startAccessorKey, '');
      }
      if (dateItem?.endAccessorKey && params?.get(dateItem.endAccessorKey)) {
        onFilter(dateItem?.endAccessorKey, '');
      }
      return;
    }

    if (date instanceof Date) {
      if (params?.get(dateItem.startAccessorKey) !== date.toISOString()) {
        onFilter(dateItem?.startAccessorKey, date.toISOString());
      }
      return;
    }

    if (params?.get(dateItem.startAccessorKey) !== date.from?.toISOString()) {
      onFilter(dateItem?.startAccessorKey, date.from?.toISOString() || '');
    }
    if (!dateItem?.endAccessorKey) return;

    if (params?.get(dateItem.endAccessorKey) !== date.to?.toISOString()) {
      onFilter(dateItem?.endAccessorKey, date.to?.toISOString() || '');
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {date && 'from' in date && 'to' in date && date.from && (
            <div className="hidden space-x-1 md:flex">
              <Separator orientation="vertical" className="mx-2 h-4" />
              {new Date(date.from).toLocaleDateString()} -
              {date.to && new Date(date?.to).toLocaleDateString()}
            </div>
          )}
          {date instanceof Date && (
            <div className="hidden space-x-1 md:flex">
              <Separator orientation="vertical" className="mx-2 h-4" />
              {new Date(date).toLocaleDateString()}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        {dateItem?.endAccessorKey ? (
          <AdvancedCalendar
            type="dropdown"
            mode="range"
            onSelect={(date) => {
              setDate(date);
            }}
            selected={date as DateRange | undefined}
          />
        ) : (
          <AdvancedCalendar
            type="dropdown"
            mode="single"
            onSelect={(date) => {
              setDate(date);
            }}
            selected={date as Date | undefined}
          />
        )}
        <div className="p-1">
          <Button
            onClick={() => setDate(undefined)}
            variant="ghost"
            className="justify-center text-center w-full hover:bg-accent text-accent-foreground"
          >
            Clean Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
