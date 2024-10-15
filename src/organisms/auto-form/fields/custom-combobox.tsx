import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { createItemName } from '..';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';

export function CustomCombobox<T>({
  childrenProps,
  addressList,
  selectLabel,
  selectIdentifier,
  emptyValue,
  placeholder,
  searchResultLabel,
}: {
  addressList: Array<T> | undefined;
  childrenProps: AutoFormInputComponentProps;
  emptyValue?: string;
  placeholder?: string;
  searchResultLabel?: string;
  selectIdentifier: keyof T;
  selectLabel: keyof T;
  // We can implement later
  // onValueChange?: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { showLabel: _showLabel } = childrenProps.fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const label =
    childrenProps.label ||
    createItemName({
      item: childrenProps.zodItem,
      name: childrenProps.field.name,
    });
  const [open, setOpen] = useState(false);
  const findValue = (id: string) =>
    addressList?.find((address: T) => address[selectIdentifier] === id)?.[
      selectLabel
    ] as string;
  return (
    <FormItem
      className={cn(
        'flex w-full flex-col justify-start',
        childrenProps.fieldProps.containerClassName
      )}
    >
      {showLabel && (
        <AutoFormLabel isRequired={childrenProps.isRequired} label={label} />
      )}
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="text-muted-foreground w-full justify-between"
            >
              {childrenProps.field.value
                ? findValue(childrenProps.field.value)
                : emptyValue || 'Please select'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput
              placeholder={placeholder || 'Search...'}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>
                {searchResultLabel || '0 search result.'}
              </CommandEmpty>
              <CommandGroup>
                {addressList?.map((address: T) => (
                  <CommandItem
                    key={address[selectIdentifier as keyof T] as string}
                    value={address[selectIdentifier as keyof T] as string}
                    onSelect={(currentValue) => {
                      childrenProps.field.onChange(
                        currentValue === childrenProps.field.value
                          ? undefined
                          : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {address[selectLabel] as string}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        childrenProps.field.value === address[selectIdentifier]
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <AutoFormTooltip fieldConfigItem={childrenProps.fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
