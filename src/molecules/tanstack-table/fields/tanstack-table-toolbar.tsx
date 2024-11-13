'use client';

import { Table } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TanstackTableFacetedFilter } from './tanstack-table-filter-faceted';
import { TanstackTableTextFilter } from './tanstack-table-filter-text';
import { TanstackTableViewOptions } from './tanstack-table-view-options';
import {
  TanstackTableFiltersType,
  TanstackTableSelectedRowActionType,
  TanstackTableTableActionsType,
} from '../types';

interface TanstackTableToolbarProps<TData> {
  filters?: TanstackTableFiltersType;
  selectedRowAction?: TanstackTableSelectedRowActionType;
  setTableAction: (actions: TanstackTableTableActionsType) => void;
  table: Table<TData>;
  tableActions?: TanstackTableTableActionsType[];
}

export const TanstackTableToolbar = <TData,>({
  table,
  filters,
  selectedRowAction,
  tableActions,
  setTableAction,
}: TanstackTableToolbarProps<TData>) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function onFilter(accessorKey: string, selectedValues: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedValues) {
      params.set(accessorKey, selectedValues);
    } else {
      params.delete(accessorKey);
    }
    if (params.get(accessorKey) !== searchParams.get(accessorKey)) {
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filters?.textFilters &&
          filters.textFilters.map((accessorKey) => (
            <TanstackTableTextFilter
              key={accessorKey}
              column={table.getColumn(accessorKey)}
              accessorKey={accessorKey}
            />
          ))}

        {filters?.facetedFilters &&
          Object.keys(filters.facetedFilters)?.map((column) => (
            <TanstackTableFacetedFilter
              key={column}
              column={table.getColumn(column)}
              accessorKey={column}
              onFilter={(accessorKey, selectedValues) =>
                onFilter(accessorKey, selectedValues)
              }
              options={filters?.facetedFilters?.[column] ?? []}
            />
          ))}
      </div>
      <TanstackTableViewOptions
        table={table}
        selectedRowAction={selectedRowAction}
        tableActions={tableActions}
        setTableAction={setTableAction}
      />
    </div>
  );
};
