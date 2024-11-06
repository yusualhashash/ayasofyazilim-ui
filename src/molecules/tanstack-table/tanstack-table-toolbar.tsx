'use client';

import { Table } from '@tanstack/react-table';
import { TanstackTableViewOptions } from './tanstack-table-view-options';
import { TanstackTableFiltersType } from './types';
import { TanstackTableTextFilter } from './tanstack-table-filter-text';
import { TanstackTableFacetedFilter } from './tanstack-table-filter-faceted';

interface TanstackTableToolbarProps<TData> {
  filters?: TanstackTableFiltersType;
  table: Table<TData>;
}

export const TanstackTableToolbar = <TData,>({
  table,
  filters,
}: TanstackTableToolbarProps<TData>) => (
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
            options={filters?.facetedFilters?.[column] ?? []}
          />
        ))}
    </div>
    <TanstackTableViewOptions table={table} />
  </div>
);
