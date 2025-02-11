'use client';

import AsyncSelect from '@repo/ayasofyazilim-ui/molecules/async-select';
import { MultiSelect } from '@repo/ayasofyazilim-ui/molecules/multi-select';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export type FilterComponentSearchItem = { id: string; name: string };
type DateSelectType = {
  title: string;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  options: string[];
};

type MultiSelectType = {
  title: string;
  value: string[];
  options: { label: string; value: string }[];
  onChange: Dispatch<SetStateAction<string[]>>;
};
type AsyncSelectType = {
  title: string;
  fetchAction: (search: string) => Promise<FilterComponentSearchItem[]>;
  onChange: Dispatch<SetStateAction<FilterComponentSearchItem[]>>;
  value: FilterComponentSearchItem[];
};
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
}) {
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
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
          <span className="sr-only">Filters</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <Card className="shadow-none">
          <CardHeader>{filtersText}</CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {dateSelect.map((filter) => (
              <div className="grid items-center gap-1.5" key={filter.title}>
                <Label htmlFor="refund-point">{filter.title}</Label>
                <Select
                  onValueChange={filter.onChange}
                  value={filter.value}
                  disabled={isPending}
                >
                  <SelectTrigger className="min-h-10">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{filter.title}</SelectLabel>
                      {filter.options.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <Button
                      className="w-full px-2"
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        filter.onChange('');
                      }}
                    >
                      Clear
                    </Button>
                  </SelectContent>
                </Select>
              </div>
            ))}

            {multiSelect.map((filter) => (
              <div className="grid items-center gap-1.5" key={filter.title}>
                <Label htmlFor="refund-point">{filter.title}</Label>
                <MultiSelect
                  onValueChange={filter.onChange}
                  options={filter.options}
                  defaultValue={filter.value}
                  disabled={isPending}
                />
              </div>
            ))}

            {asyncSelect.map((filter) => (
              <div className="grid items-center gap-1.5" key={filter.title}>
                <Label htmlFor="refund-point">{filter.title}</Label>
                <AsyncSelect
                  fetchAction={filter.fetchAction}
                  onChange={filter.onChange}
                  value={filter.value}
                  disabled={isPending}
                  searchText={searchText}
                />
              </div>
            ))}

            <Button
              disabled={isPending}
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
