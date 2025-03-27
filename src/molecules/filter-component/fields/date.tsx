'use client';

import { Button } from '@/components/ui/button';
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
import type { DateSelectType } from '..';

function DateField({
  filter,
  isPending,
}: {
  filter: DateSelectType;
  isPending: boolean;
}) {
  return (
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
  );
}

export default DateField;
