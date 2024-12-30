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
import { cn } from '@/lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

function CommandGroupItem({
  items,
  title,
  onSelectionChange,
  selectedItems,
}: {
  title: string;
  items: { id: string; name: string }[];
  selectedItems: { id: string; name: string }[];
  onSelectionChange: (
    value: {
      id: string;
      name: string;
    }[]
  ) => void;
}) {
  return (
    <CommandGroup heading={title}>
      {items?.map((currentItem) => (
        <CommandItem
          key={currentItem.id}
          onSelect={() => {
            if (selectedItems.find((i) => i.id === currentItem.id)) {
              return onSelectionChange(
                selectedItems.filter((i) => i.id !== currentItem.id)
              );
            }
            return onSelectionChange([...selectedItems, currentItem]);
          }}
          value={currentItem.name}
        >
          {currentItem.name}
          {selectedItems.find((i) => i.id === currentItem.id) && (
            <CheckIcon className={cn('ml-auto h-4 w-4')} />
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

type SearchableCommand = {
  suggestions?: { id: string; name: string }[];
  data?: { id: string; name: string }[];
  fetchAction: (search: string) => Promise<{ id: string; name: string }[]>;
  resultText?: string;
  fetchText?: string;
  searchText?: string;
  noResultText?: string;
  onSelectedItemsChange: (value: string[]) => void;
};

export default function AsyncCommand({
  data,
  fetchAction,
  suggestions = [],
  resultText = 'Results',
  fetchText = 'Fetching...',
  searchText = 'Search...',
  noResultText = 'No results found.',
  onSelectedItemsChange,
}: SearchableCommand) {
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<{ id: string; name: string }[]>(
    data || []
  );

  const showableItems = items.filter(
    (item) => !selectedItems.find((i) => i.id === item.id)
  );
  const showableSuggestions = suggestions.filter(
    (item) => !selectedItems.find((i) => i.id === item.id)
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

  function onSelectionChange(items: { id: string; name: string }[]) {
    setSelectedItems(items);
    onSelectedItemsChange(items.map((i) => i.id));
  }
  useEffect(() => {
    if (searchInput.length && searchInput === searchValue) {
      fetchAction(searchValue).then((res) => {
        setItems(res);
        setLoading(false);
      });
    }
  }, [searchValue]);

  return (
    <Cmd className="border">
      <CommandInput
        placeholder={searchText}
        onValueChange={(search) => onSearch(search)}
      />

      <CommandList className="overflow-y-auto max-h-48">
        {loading && <div className="p-2 text-sm">{fetchText}</div>}

        {!loading && items.length === 0 && searchValue.length > 0 && (
          <div className="text-sm p-2">{noResultText}</div>
        )}

        {selectedItems.length > 0 && (
          <CommandGroupItem
            items={selectedItems}
            selectedItems={selectedItems}
            title="Selected"
            onSelectionChange={(value) => onSelectionChange(value)}
          />
        )}

        {!loading &&
          searchValue.length === 0 &&
          showableSuggestions?.length > 0 && (
            <CommandGroupItem
              items={showableSuggestions}
              selectedItems={selectedItems}
              title="Suggestions"
              onSelectionChange={(value) => onSelectionChange(value)}
            />
          )}

        {!loading && showableItems.length > 0 && (
          <CommandGroupItem
            items={showableItems}
            selectedItems={selectedItems}
            title={resultText}
            onSelectionChange={(value) => onSelectionChange(value)}
          />
        )}
      </CommandList>
    </Cmd>
  );
}
