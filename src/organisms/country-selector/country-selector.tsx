'use client';

import * as React from 'react';

import { Button } from '../../../@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../@/components/ui/popover';

type CountrySelectItem = {
  label?: string;
  rtl?: boolean;
  showLabel?: boolean;
  value?: string;
};
const countries = [
  {
    value: 'tr',
    label: 'Türkçe',
  },
  {
    value: 'it',
    label: 'Italiano',
  },
  {
    value: 'jp',
    label: '日本語',
  },
  {
    value: 'sa',
    label: 'عربي',
    rtl: true,
  },
];

type CountrySelectorProps = {
  defaultValue?: CountrySelectItem;
  direction: 'ltr' | 'rtl';
  menuAlign: 'start' | 'center' | 'end';
  onValueChange?: () => {};
  searchEmptyValue?: string;
  searchText?: string;
};
function CountrySelector({
  searchText,
  searchEmptyValue,
  defaultValue,
  menuAlign,
  direction,
  onValueChange,
}: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="ghost"
          aria-expanded={open}
          className={`justify-between border-none bg-transparent px-2 gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
        >
          {value ? (
            <SelectedCountry
              {...countries.find((country) => country.value === value)}
              showLabel={false}
            />
          ) : (
            <SelectedCountry {...defaultValue} showLabel={false} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0" align={menuAlign}>
        <Command>
          <CommandList>
            <CommandInput placeholder={searchText} className="h-9 text-xs" />
            <CommandEmpty>{searchEmptyValue}</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue);
                    setOpen(false);
                    if (onValueChange) onValueChange();
                  }}
                >
                  <SelectedCountry {...country} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const SelectedCountry = ({
  value = '',
  label,
  rtl,
  showLabel = true,
}: CountrySelectItem) => (
  <div
    className={`${rtl ? 'flex-row-reverse' : ''}  flex w-full justify-between gap-2 overflow-hidden`}
  >
    {showLabel && <span className="text-xs">{label}</span>}
    <div className="border  rounded-sm overflow-hidden">
      <img
        className="w-6"
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${value}.svg`}
        alt={label}
      />
    </div>
  </div>
);

export { CountrySelectItem, CountrySelector };
