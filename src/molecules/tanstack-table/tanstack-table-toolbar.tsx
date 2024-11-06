'use client';

import { Table } from '@tanstack/react-table';
import { TanstackTableViewOptions } from './tanstack-table-view-options';

interface TanstackTableToolbarProps<TData> {
  table: Table<TData>;
}

export const TanstackTableToolbar = <TData,>({
  table,
}: TanstackTableToolbarProps<TData>) => (
  <div className="flex w-full items-center justify-between">
    <TanstackTableViewOptions table={table} />
  </div>
);
