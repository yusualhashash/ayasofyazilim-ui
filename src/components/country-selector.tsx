'use client';

import { CaretSortIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import Flag from 'react-world-flags';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type CountrySelectItem = {
  label?: string;
  rtl?: boolean;
  value?: string;
};
const countries = [
  {
    value: 'tur',
    label: 'Türkçe',
  },
  {
    value: 'ita',
    label: 'Italiano',
  },
  {
    value: 'jpn',
    label: '日本語',
  },
  {
    value: 'sau',
    label: 'عربي',
    rtl: true,
  },
];

export type CountrySelectorProps = {
  defaultValue: CountrySelectItem;
  direction: 'ltr' | 'rtl';
  menuAlign: 'start' | 'center' | 'end';
  onValueChange: () => {};
  searchEmptyValue: string;
  searchText: string;
};
export default function CountrySelector({
  searchText,
  searchEmptyValue,
  defaultValue,
  menuAlign,
  direction,
  onValueChange,
}: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between px-2 gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
        >
          {value ? (
            <SelectedCountry
              {...countries.find((country) => country.value === value)}
            />
          ) : (
            <SelectedCountry {...defaultValue} />
          )}
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0" align={menuAlign}>
        <Command>
          <CommandList>
            <CommandInput placeholder={searchText} className="h-9 text-xs" />
            <CommandEmpty>{searchEmptyValue}</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    onValueChange();
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

const SelectedCountry = ({ value, label, rtl }: CountrySelectItem) => (
  <div className={`${rtl ? 'flex-row-reverse' : ''} flex w-full gap-2`}>
    <Flag code={value} className="w-4" />
    <span className="text-xs">{label}</span>
  </div>
);
