'use client';

import { Table } from '@tanstack/react-table';
import { TanstackTableViewOptions } from './tanstack-table-view-options';
import { TanstackTableFilters } from './types';
import { TanstackTableTextFilter } from './tanstack-table-filter-text';

interface TanstackTableToolbarProps<TData> {
  filters?: TanstackTableFilters;
  table: Table<TData>;
}

export const TanstackTableToolbar = <TData,>({
  table,
  filters,
}: TanstackTableToolbarProps<TData>) => (
  <div className="flex w-full items-center justify-between">
    <div className="flex flex-1 items-center space-x-2">
      {filters?.textFilters &&
        filters.textFilters.map((column) => (
          <TanstackTableTextFilter
            key={column}
            column={table.getColumn(column)}
            accessorKey={column}
          />
        ))}
    </div>
    <TanstackTableViewOptions table={table} />
  </div>
);
