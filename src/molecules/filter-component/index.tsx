'use client';

import { FilterIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import AsyncSelectField from './fields/async-select';
import DateField from './fields/date';
import MultiSelectField from './fields/multi-select';

export type FilterComponentSearchItem = { id: string; name: string };
export type DateSelectType = {
  title: string;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  options: string[];
  order?: number;
};

export type MultiSelectType = {
  title: string;
  value: string[];
  options: { label: string; value: string }[];
  onChange: Dispatch<SetStateAction<string[]>>;
  order?: number;
};
export type AsyncSelectType = {
  title: string;
  fetchAction: (search: string) => Promise<FilterComponentSearchItem[]>;
  onChange: Dispatch<SetStateAction<FilterComponentSearchItem[]>>;
  value: FilterComponentSearchItem[];
  multiple?: boolean;
  order?: number;
};
export type CustomFieldType = { order?: number; component: JSX.Element };

function isAsyncSelectType(
  filter: DateSelectType | MultiSelectType | AsyncSelectType | CustomFieldType
): filter is AsyncSelectType {
  return (filter as AsyncSelectType).fetchAction !== undefined;
}

function isMultiSelectType(
  filter: DateSelectType | MultiSelectType | AsyncSelectType | CustomFieldType
): filter is MultiSelectType {
  return (
    (filter as MultiSelectType).options !== undefined &&
    Array.isArray((filter as MultiSelectType).value)
  );
}

function isDateSelectType(
  filter: DateSelectType | MultiSelectType | AsyncSelectType | CustomFieldType
): filter is DateSelectType {
  return (
    (filter as DateSelectType).options !== undefined &&
    typeof (filter as DateSelectType).value === 'string'
  );
}

export default function FilterComponent({
  dateSelect,
  multiSelect,
  asyncSelect,
  onSubmit,
  filtersText = 'Filters',
  searchText = 'Search',
  applyFilterText = 'Apply',
  className,
  defaultOpen = true,
  customField,
  disabled = false,
  isCollapsible = true,
}: {
  dateSelect: DateSelectType[];
  multiSelect: MultiSelectType[];
  asyncSelect: AsyncSelectType[];
  onSubmit: () => void;
  filtersText?: string;
  applyFilterText?: string;
  searchText?: string;
  className?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  customField?: CustomFieldType[];
  isCollapsible?: boolean;
}) {
  const fields = [
    ...dateSelect,
    ...multiSelect,
    ...asyncSelect,
    ...(customField || []),
  ].sort((a, b) => (a.order || 0) - (b.order || 0));

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  function handleSubmit() {
    startTransition(() => {
      onSubmit();
    });
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('w-full space-y-2', className)}
    >
      {isCollapsible && !isOpen && (
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
            <span className="sr-only">Filters</span>
          </Button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent className="space-y-2">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row font-bold text-xl items-center justify-between">
            {filtersText}
            <CollapsibleTrigger asChild>
              <Button className="h-7 p-1" variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
                <span className="sr-only ">Filters</span>
              </Button>
            </CollapsibleTrigger>
          </CardHeader>

          <CardContent className="flex flex-col gap-2.5">
            {fields.map((filter) => {
              if (isAsyncSelectType(filter)) {
                return (
                  <AsyncSelectField
                    filter={filter}
                    isPending={isPending || disabled}
                    searchText={searchText}
                  />
                );
              }
              if (isMultiSelectType(filter)) {
                return (
                  <MultiSelectField
                    filter={filter}
                    isPending={isPending || disabled}
                  />
                );
              }
              if (isDateSelectType(filter)) {
                return (
                  <DateField
                    filter={filter}
                    isPending={isPending || disabled}
                  />
                );
              }
              return filter.component;
            })}

            <Button
              disabled={isPending || disabled}
              onClick={() => handleSubmit()}
              variant="default"
            >
              {applyFilterText}
            </Button>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
