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
/**
 * CustomCombobox Component
 *
 * A customizable dropdown component for selecting items from a list,
 * featuring a search input to filter options and display the selected item.
 *
 * @param {Object} props - The props for the component.
 * @param {AutoFormInputComponentProps} props.childrenProps - Props for child components, including field props and configuration.
 * @param {string} [props.emptyValue='Please select'] - Placeholder text when no value is selected.
 * @param {Array<T> | null | undefined} props.list - List of items to display in the dropdown.
 * @param {Dispatch<SetStateAction<T | null | undefined>>} [props.onValueChange] - Callback for value changes.
 * @param {string} [props.searchPlaceholder='Search...'] - Placeholder text for the search input.
 * @param {string} [props.searchResultLabel='0 search result.'] - Text displayed when no search results are found.
 * @param {keyof T} props.selectIdentifier - The key used to identify items in the list.
 * @param {keyof T} props.selectLabel - The key used to display the item label in the dropdown.
 *
 * @template T
 * @returns {JSX.Element} The rendered CustomCombobox component.
 */
export function CustomCombobox<T>({
  childrenProps,
  list,
  selectLabel,
  selectIdentifier,
  emptyValue,
  searchPlaceholder,
  searchResultLabel,
  onValueChange,
}: {
  childrenProps: AutoFormInputComponentProps;
  emptyValue?: string;
  list: Array<T> | null | undefined;
  onValueChange?: Dispatch<SetStateAction<T | null | undefined>>;
  searchPlaceholder?: string;
  searchResultLabel?: string;
  selectIdentifier: keyof T;
  selectLabel: keyof T;
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
  const findValue = (id: string) => {
    const value = list?.find((item: T) => item[selectIdentifier] === id)?.[
      selectLabel
    ] as string;
    return value;
  };
  const fieldValue = findValue(childrenProps.field.value);
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
              className={cn(
                'text-muted-foreground w-full justify-between font-normal',
                fieldValue && 'text-black',
                childrenProps.fieldProps.className
              )}
            >
              {fieldValue || emptyValue || 'Please select'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command
            filter={(commandValue, search) => {
              const filterResult = list?.find(
                (i) =>
                  (i[selectIdentifier] as string)?.toLocaleLowerCase() ===
                  commandValue.toLocaleLowerCase()
              )?.[selectLabel] as string;
              if (
                commandValue.includes(search) ||
                filterResult
                  ?.toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
                return 1;
              return 0;
            }}
          >
            <CommandInput
              placeholder={searchPlaceholder || 'Search...'}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>
                {searchResultLabel || '0 search result.'}
              </CommandEmpty>
              <CommandGroup>
                {list?.map((item: T) => (
                  <CommandItem
                    key={item[selectIdentifier] as string}
                    value={item[selectIdentifier] as string}
                    onSelect={() => {
                      childrenProps.field.onChange(
                        item[selectIdentifier] === childrenProps.field.value
                          ? undefined
                          : item[selectIdentifier]
                      );
                      if (onValueChange)
                        onValueChange(
                          list.find(
                            (item: T) =>
                              item[selectIdentifier] ===
                              childrenProps.field.value
                          )
                        );
                      setOpen(false);
                    }}
                  >
                    {item[selectLabel] as string}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        childrenProps.field.value === item[selectIdentifier]
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
