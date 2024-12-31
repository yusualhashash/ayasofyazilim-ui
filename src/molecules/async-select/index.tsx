'use client';

import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Command as Cmd,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

type SearchItem = { id: string; name: string };

function CommandGroupItem({
  items,
  title,
  onChange,
  value,
}: {
  title: string;
  items: SearchItem[];
  value: SearchItem[];
  onChange: (value: SearchItem[]) => void;
}) {
  return (
    <CommandGroup heading={title}>
      {items?.map((currentItem) => (
        <CommandItem
          key={currentItem.id}
          onSelect={() => {
            if (value.find((i) => i.id === currentItem.id)) {
              return onChange(value.filter((i) => i.id !== currentItem.id));
            }
            return onChange([...value, currentItem]);
          }}
          value={currentItem.name}
        >
          {currentItem.name}
          {value.find((i) => i.id === currentItem.id) && (
            <CheckIcon className={cn('ml-auto h-4 w-4')} />
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

type AsyncSelectType = {
  suggestions?: SearchItem[];
  data?: SearchItem[];
  value: SearchItem[];
  onChange: (value: SearchItem[]) => void;
  fetchAction: (search: string) => Promise<SearchItem[]>;
  resultText?: string;
  searchText?: string;
  noResultText?: string;
  disabled?: boolean;
};

export default function AsyncSelect({
  suggestions = [],
  data,
  value,
  fetchAction,
  onChange,
  resultText = 'Result',
  searchText = 'Search',
  noResultText = 'No result',
  disabled = false,
}: AsyncSelectType) {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const [items, setItems] = useState<SearchItem[]>(data || []);
  const showableItems = items.filter(
    (item) => !value.find((i) => i.id === item.id)
  );
  const showableSuggestions = suggestions.filter(
    (item) => !value.find((i) => i.id === item.id)
  );

  function onSearch(search: string) {
    if (search.length === 0) {
      setSearchInput('');
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setItems([]);
    setSearchInput(search);
  }
  function handleOnChange(value: SearchItem[]) {
    if (disabled) return;

    onChange(value);
  }

  useEffect(() => {
    if (!searchValue || searchValue !== searchInput) return;

    fetchAction(searchValue).then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, [searchValue]);

  return (
    <Cmd className="border" aria-disabled={disabled}>
      <CommandInput
        placeholder={searchText}
        onValueChange={(search) => onSearch(search)}
        disabled={disabled}
      />

      <CommandList className="overflow-y-auto max-h-48">
        {loading && (
          <div className="p-1 text-sm">
            <Skeleton className="h-7 w-full mb-1" />
          </div>
        )}

        {!loading && items.length === 0 && searchValue.length > 0 && (
          <div className="text-sm p-2">{noResultText}</div>
        )}

        {value.length > 0 && (
          <CommandGroupItem
            items={value}
            value={value}
            title="Selected"
            onChange={(value) => handleOnChange(value)}
          />
        )}

        {!loading &&
          searchValue.length === 0 &&
          showableSuggestions?.length > 0 && (
            <CommandGroupItem
              items={showableSuggestions}
              value={value}
              title="Suggestions"
              onChange={(value) => handleOnChange(value)}
            />
          )}

        {!loading && showableItems.length > 0 && (
          <CommandGroupItem
            items={showableItems}
            value={value}
            title={resultText}
            onChange={(value) => handleOnChange(value)}
          />
        )}
      </CommandList>
    </Cmd>
  );
}
