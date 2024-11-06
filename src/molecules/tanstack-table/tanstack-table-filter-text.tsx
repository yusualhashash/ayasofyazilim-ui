import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface TanstackTableTextFilterProps<TData, TValue> {
  accessorKey: string;
  column?: Column<TData, TValue>;
}

export function TanstackTableTextFilter<TData, TValue>({
  column,
  accessorKey,
}: TanstackTableTextFilterProps<TData, TValue>) {
  const title = column?.columnDef?.meta?.toString() || accessorKey;
  const filterValue = (column?.getFilterValue() as string) ?? '';
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {filterValue?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="hidden space-x-1 lg:flex">{filterValue}</div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={title}
            value={filterValue}
            onValueChange={(value) => column?.setFilterValue(value)}
          />
          <CommandList>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => column?.setFilterValue(undefined)}
                className="justify-center text-center"
              >
                Clean Filters
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
