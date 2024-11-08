'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TanstackTableRowActionsType } from './types';

interface TanstackTableRowActionsProps<TData> {
  actions: TanstackTableRowActionsType<TData>[];
  row: TData;
  setRowAction: (
    actions: TanstackTableRowActionsType<TData> & { row: TData }
  ) => void;
}

export const TanstackTableRowActions = <TData,>({
  row,
  setRowAction,
  actions,
}: TanstackTableRowActionsProps<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon className="h-4 w-4" />
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
            onClick={() => setRowAction({ ...action, row })}
          >
            {action.icon && <action.icon className="w-4 h-4" />}
            <span className="ml-2">{action.cta}</span>
          </Button>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
