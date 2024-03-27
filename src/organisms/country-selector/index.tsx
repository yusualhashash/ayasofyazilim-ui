'use client';

import * as React from 'react';

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

type CountryItem = {
  concurrencyStamp?: string;
  creationTime?: string;
  creatorId?: string | null;
  cultureName?: string | null;
  direction?: 'rtl' | 'ltr' | null;
  displayName?: string | null;
  extraProperties?: object | null;
  flagIcon?: string | null;
  id?: string | null;
  isDefaultLanguage?: boolean;
  isEnabled?: boolean;
  twoLetterISOLanguageName?: string | null;
  uiCultureName?: string | null;
};

type CountrySelectorProps = {
  countries?: Array<CountryItem>;
  defaultValue?: string;
  menuAlign?: 'start' | 'center' | 'end';
  onValueChange?: (value: string) => void;
  searchEmptyValue?: string;
  searchText?: string;
  showLabel?: boolean;
  tooltipText?: string;
};

function CountrySelector({
  searchText,
  searchEmptyValue,
  defaultValue,
  menuAlign = 'end',
  showLabel = false,
  countries = [],
  onValueChange,
}: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>('');

  function onSelect(currentValue: string) {
    setValue(currentValue);
    setOpen(false);
    if (onValueChange) onValueChange(currentValue);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          asChild
          role="combobox"
          variant="ghost"
          aria-expanded={open}
          className="justify-between border-none bg-transparent px-2 gap-2 rtl:flex-row-reverse min-h-8 bg-red-300"
        >
          {value ? (
            <SelectedCountry
              {...countries.find(
                (country) => country.cultureName?.toLowerCase() === value
              )}
              showLabel={showLabel}
            />
          ) : (
            <SelectedCountry
              {...countries.find(
                (country) => country.cultureName?.toLowerCase() === defaultValue
              )}
              showLabel={showLabel}
            />
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
                  key={country.cultureName}
                  value={country.cultureName || ''}
                  onSelect={(currentValue: string) => onSelect(currentValue)}
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

type SelectedCountryProps = Partial<CountryItem> & {
  showLabel?: boolean;
};
const SelectedCountry = ({
  displayName,
  flagIcon = '',
  direction,
  showLabel = true,
}: SelectedCountryProps) => (
  <div
    className={`${direction === 'rtl' ?? 'flex-row-reverse'} rtl:flex-row-reverse flex w-full justify-between gap-2 overflow-hidden items-center`}
  >
    {showLabel && <span className="text-xs text-black">{displayName}</span>}
    <div className="border rounded-sm overflow-hidden w-[24px] min-h-[18.5px] block">
      <img
        className="w-6"
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${flagIcon}.svg`}
        alt={displayName || ''}
      />
    </div>
  </div>
);

export { CountryItem, CountrySelector };
