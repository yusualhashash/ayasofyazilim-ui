'use client';

import { Table } from '@tanstack/react-table';
import { TanstackTableFacetedFilter } from './tanstack-table-filter-faceted';
import { TanstackTableTextFilter } from './tanstack-table-filter-text';
import { TanstackTableViewOptions } from './tanstack-table-view-options';
import {
  TanstackTableFiltersType,
  TanstackTableSelectedRowActionType,
  TanstackTableTableActionsType,
} from './types';

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
    <TanstackTableViewOptions
      table={table}
      selectedRowAction={selectedRowAction}
      tableActions={tableActions}
      setTableAction={setTableAction}
    />
  </div>
);
