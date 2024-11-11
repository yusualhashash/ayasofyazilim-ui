import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/components/ui/useMediaQuery';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type CustomComboboxProps<T> = {
  disabled?: boolean;
  emptyValue?: string;
  label?: string;
  list: Array<T> | null | undefined;
  onValueChange: Dispatch<SetStateAction<T | null | undefined>>;
  required?: boolean;
  searchPlaceholder?: string;
  searchResultLabel?: string;
  selectIdentifier: keyof T;
  selectLabel: keyof T;
  value?: T | null | undefined;
};

export function Combobox<T>(props: CustomComboboxProps<T>) {
  const { label, list, value, disabled, selectIdentifier, required } = props;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState(false);
  const fieldValue =
    (list?.find(
      (x: T) => x[props.selectIdentifier] === value?.[selectIdentifier]
    )?.[props.selectLabel] as string) ||
    `Please select an ${label?.toLocaleLowerCase()}` ||
    'Please select';
  const DesktopContent = (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          variant="outline"
          role="combobox"
          className={cn(
            'text-muted-foreground w-full justify-between font-normal',
            value && 'text-black'
          )}
        >
          {fieldValue}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full min-w-screen max-w-screen">
        <List {...props} setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );

  const MobileContent = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          variant="outline"
          className={cn(
            'text-muted-foreground w-full justify-between font-normal',
            value && 'text-black'
          )}
        >
          {fieldValue}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <List {...props} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );

  const Content = isDesktop ? DesktopContent : MobileContent;

  return (
    <div>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {Content}
    </div>
  );
}

function List<T>({
  setOpen,
  ...props
}: CustomComboboxProps<T> & {
  setOpen: (open: boolean) => void;
}) {
  const {
    list,
    selectIdentifier,
    selectLabel,
    searchPlaceholder,
    searchResultLabel,
    value,
    onValueChange,
  } = props;

  return (
    <Command
      filter={(value, search) => {
        const filterResult = list?.find(
          (i) =>
            (i[selectIdentifier] as string)?.toLocaleLowerCase() ===
            value.toLocaleLowerCase()
        )?.[selectLabel] as string;
        if (
          value.includes(search) ||
          filterResult?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
          return 1;
        return 0;
      }}
    >
      <CommandInput
        placeholder={searchPlaceholder || 'Search...'}
        className="h-9"
      />
      <CommandList className="w-full min-w-full max-w-full">
        <CommandEmpty>{searchResultLabel || '0 search result.'}</CommandEmpty>
        <CommandGroup>
          {list?.map((item: T) => (
            <CommandItem
              onSelect={(selectedValue) => {
                onValueChange(
                  list.find(
                    (item: T) =>
                      item[selectIdentifier]?.toString() === selectedValue
                  )
                );
                setOpen(false);
              }}
              key={JSON.stringify(item[selectIdentifier])}
              value={item[selectIdentifier] as string}
            >
              {item[selectLabel] as string}
              {item[selectIdentifier] === value && (
                <CheckIcon className={cn('ml-auto h-4 w-4')} />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
