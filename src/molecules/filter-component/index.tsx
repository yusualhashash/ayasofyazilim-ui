'use client';

import AsyncSelect from '@repo/ayasofyazilim-ui/molecules/async-select';
import { MultiSelect } from '@repo/ayasofyazilim-ui/molecules/multi-select';
import { Dispatch, SetStateAction, useTransition } from 'react';
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
  fetchAction: (search: string) => Promise<
    {
      id: string;
      name: string;
    }[]
  >;
  onChange: Dispatch<
    SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
  value: {
    id: string;
    name: string;
  }[];
};
export default function FilterComponent({
  dateSelect,
  multiSelect,
  asyncSelect,
  onSubmit,
}: {
  dateSelect: DateSelectType[];
  multiSelect: MultiSelectType[];
  asyncSelect: AsyncSelectType[];
  onSubmit: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(() => {
      onSubmit();
    });
  }

  return (
    <Card>
      <CardHeader>Filters</CardHeader>
      <CardContent className="flex flex-col gap-5">
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
            />
          </div>
        ))}

        <Button
          disabled={isPending}
          onClick={() => handleSubmit()}
          variant="default"
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
}
