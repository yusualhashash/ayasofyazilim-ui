'use client';

import { Row, Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TanstackTableRowActionsType } from '../types';

interface TanstackTableRowActionsProps<TData> {
  actions: TanstackTableRowActionsType<TData>[];
  row: Row<TData>;
  setRowAction: (
    actions: TanstackTableRowActionsType<TData> & { row: TData }
  ) => void;
  table: Table<TData>;
}

export const TanstackTableRowActions = <TData,>({
  row,
  setRowAction,
  actions,
  table,
}: TanstackTableRowActionsProps<TData>) => {
  function handleOnActionClick(action: TanstackTableRowActionsType<TData>) {
    if (action.type === 'simple') {
      action.onClick(row.original);
      return;
    }
    if (action.type === 'delete-row') {
      table.options.meta?.removeRow(row.index, '', null);
    }
    setRowAction({ ...action, row: row.original });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex data-[state=open]:bg-muted">
          Actions
          <span className="sr-only">Open Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => (
          <DropdownMenuItem key={action.cta}>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              onClick={() => handleOnActionClick(action)}
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              <span className="ml-2">{action.cta}</span>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
