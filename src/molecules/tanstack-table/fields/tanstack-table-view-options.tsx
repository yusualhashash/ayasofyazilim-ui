'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  TanstackTableSelectedRowActionType,
  TanstackTableTableActionsType,
} from '../types';

interface TanstackTableViewOptionsProps<TData> {
  editable?: boolean;
  selectedRowAction?: TanstackTableSelectedRowActionType<TData>;
  setTableAction: (actions: TanstackTableTableActionsType) => void;
  table: Table<TData>;
  tableActions?: TanstackTableTableActionsType[];
  tableData: TData[];
}

function TablePrimaryActionButton<TData>({
  table,
  action,
  isMultipleActionProvided,
  setRowAction,
}: {
  action: TanstackTableTableActionsType;
  isMultipleActionProvided: boolean;
  setRowAction: (actions: TanstackTableTableActionsType) => void;
  table: Table<TData>;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      className={isMultipleActionProvided ? 'rounded-r-none ml-2' : 'ml-2'}
      onClick={() => handleActionOnClick(table, action, setRowAction)}
    >
      {action?.icon && <action.icon className="mr-2 h-4 w-4" />}
      {action.cta?.toString()}
    </Button>
  );
}
function handleActionOnClick<TData>(
  table: Table<TData>,
  action: TanstackTableTableActionsType,
  setRowAction: (actions: TanstackTableTableActionsType) => void
) {
  if (action.type === 'simple') {
    action.onClick();
    return;
  }
  if (action.type === 'create-row') {
    table.options.meta?.addRow(-1, '', null);
    action?.onClick?.();
    return;
  }
  setRowAction(action);
}

export function TanstackTableViewOptions<TData>(
  props: TanstackTableViewOptionsProps<TData>
) {
  const {
    table,
    tableActions,
    selectedRowAction,
    setTableAction: setRowAction,
    tableData,
    editable,
  } = props;
  const primaryAction = tableActions?.[0];
  const otherActions = tableActions?.slice(1);
  const selectedRowCount = table.getSelectedRowModel().rows.length;

  return (
    <>
      {selectedRowAction && selectedRowCount > 0 && (
        <div className="mr-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            className="ml-2"
            onClick={() => {
              const selectedRowIds = table
                .getSelectedRowModel()
                .rows.map((row) => row.index.toString());

              selectedRowAction.onClick(selectedRowIds, tableData);
            }}
          >
            {selectedRowAction?.icon && (
              <selectedRowAction.icon className="mr-2 h-4 w-4" />
            )}
            {`${selectedRowAction.cta?.toString()} (${selectedRowCount})`}
          </Button>
        </div>
      )}

      {!editable && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              type="button"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              See Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Edit Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide()
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {primaryAction && otherActions && (
        <>
          <TablePrimaryActionButton
            table={table}
            action={primaryAction}
            isMultipleActionProvided={otherActions?.length > 0}
            setRowAction={setRowAction}
          />
          {otherActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  className="rounded-l-none border-l-0 px-2"
                >
                  <ChevronDownIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {otherActions?.map((action) => (
                  <DropdownMenuItem key={action.cta}>
                    <Button
                      variant="ghost"
                      type="button"
                      size="sm"
                      className="justify-start w-full"
                      onClick={() =>
                        handleActionOnClick(table, action, setRowAction)
                      }
                    >
                      {action.icon && <action.icon className="w-4 h-4" />}
                      <span className="ml-2">{action.cta}</span>
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </>
  );
}
