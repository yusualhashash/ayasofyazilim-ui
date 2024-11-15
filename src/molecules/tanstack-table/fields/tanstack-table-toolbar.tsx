'use client';

import { Table } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  TanstackTableFiltersType,
  TanstackTableSelectedRowActionType,
  TanstackTableTableActionsType,
} from '../types';
import { TanstackTableFacetedFilter } from './tanstack-table-filter-faceted';
import { TanstackTableTextFilter } from './tanstack-table-filter-text';
import { TanstackTableViewOptions } from './tanstack-table-view-options';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  function onFilter(accessorKey: string, selectedValues: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedValues) {
      newParams.set(accessorKey, selectedValues);
    } else {
      newParams.delete(accessorKey);
    }
    if (newParams.get(accessorKey) !== searchParams.get(accessorKey)) {
      router.replace(`${pathname}?${newParams.toString()}`);
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
              params={params}
              onFilter={(accessorKey, selectedValues) => {
                onFilter(accessorKey, selectedValues);
              }}
            />
          ))}

        {filters?.facetedFilters &&
          Object.keys(filters.facetedFilters)?.map((column) => (
            <TanstackTableFacetedFilter
              key={column}
              column={table.getColumn(column)}
              accessorKey={column}
              params={params}
              onFilter={(accessorKey, selectedValues) => {
                onFilter(accessorKey, selectedValues);
              }}
              options={filters?.facetedFilters?.[column]?.options ?? []}
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
