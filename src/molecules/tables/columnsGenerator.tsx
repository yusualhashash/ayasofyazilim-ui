'use client';

import { CaretSortIcon } from '@radix-ui/react-icons';
import { CellContext, Column, ColumnDef, Row } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getCTA } from './helper-components';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AutoColumnGenerator,
  ColumnAutoType,
  selectableColumns,
  TableAction,
} from './types';
import { normalizeName } from './utils';

const createSortableHeader = <TData,>(
  column: Column<TData, unknown>,
  name: string
) => (
  <Button
    className="p-0"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {name}
    <CaretSortIcon className="ml-2 h-4 w-4" />
  </Button>
);
const readOnlyCheckbox = <Tdata,>(row: Row<Tdata>, value: string) => (
  <Checkbox checked={row.getValue(value)} disabled />
);

const sortColumns = <TData,>(
  positions: AutoColumnGenerator<TData>['positions'],
  obj: Object
) => {
  if (!positions) {
    return obj;
  }
  return Object.assign(
    {},
    ...positions.map((position) => ({
      [position]: obj[position as keyof typeof obj],
    }))
  );
};

function generateColumns<Tdata>({
  tableType,
  positions,
  customCells,
  excludeList,
}: AutoColumnGenerator<Tdata>): ColumnDef<Tdata>[] {
  const generatedTableColumns: ColumnDef<Tdata>[] = [];
  let tempProperties: Record<keyof Tdata, unknown> = tableType.properties;
  if (positions) {
    tempProperties = sortColumns<Tdata>(positions, tableType.properties);
  }
  Object.keys(tempProperties).forEach((key) => {
    const accessorKey = key as string & keyof Tdata;
    const header = normalizeName(key);
    const value = tempProperties[accessorKey];
    if (excludeList && excludeList.includes(accessorKey)) {
      return;
    }
    const _key = key as keyof Tdata;
    if (
      typeof customCells === 'object' &&
      key in customCells &&
      customCells[_key]
    ) {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: (row) => {
          const customCell = customCells[_key];
          if (typeof customCell === 'string') {
            return customCell;
          }
          if (typeof customCell === 'function') {
            return customCell(row as unknown as CellContext<Tdata, unknown>);
          }
          return null; // Handle the case where customCell is neither a string nor a function
        },
      });
      return;
    }
    if (
      value &&
      typeof value === 'object' &&
      'type' in value &&
      value.type === 'boolean'
    ) {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: ({ row }) => readOnlyCheckbox(row, key),
      });
    }
    if (
      value &&
      typeof value === 'object' &&
      'type' in value &&
      value.type === 'string'
    ) {
      generatedTableColumns.push({
        accessorKey,
        header: ({ column }) => createSortableHeader(column, header),
      });
    }
    if (
      value &&
      typeof value === 'object' &&
      'type' in value &&
      (value.type === 'integer' || value.type === 'number')
    ) {
      generatedTableColumns.push({
        accessorKey,
        header,
      });
    }
  });
  return generatedTableColumns;
}

export function columnsGenerator<Tdata>({
  columnsData,
  data,
  setActiveAction,
  setTriggerData,
  setIsOpen,
}: {
  columnsData?: ColumnAutoType<Tdata>;
  data: AutoColumnGenerator<Tdata>;
  setActiveAction?: Dispatch<SetStateAction<TableAction | undefined>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setTriggerData?: Dispatch<SetStateAction<any>>;
}) {
  let onSelect: selectableColumns['onSelect'] | undefined;
  const {
    selectable,
    tableType,
    excludeList,
    positions,
    hideAction,
    customCells,
  } = data;
  if (selectable) {
    onSelect = data.onSelect;
  }

  const autoColumnData: AutoColumnGenerator<Tdata> = {
    tableType,
    excludeList,
    positions,
    customCells,
  };

  const AutoColumns: ColumnDef<Tdata>[] =
    generateColumns<Tdata>(autoColumnData);

  const columns: ColumnDef<Tdata>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (typeof onSelect === 'function') {
              onSelect({
                row: table.getRowModel().rows.map((row) => row.original),
                value: Boolean(value),
                all: true,
              });
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (typeof onSelect === 'function') {
              onSelect({
                row: row.original,
                value: Boolean(value),
                all: false,
              });
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...AutoColumns,
    {
      id: 'table-actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-none outline-none m-0 w-full h-full"
            >
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (
                  row &&
                  typeof row === 'object' &&
                  typeof row.original === 'object' &&
                  row.original &&
                  'id' in row.original &&
                  typeof row.original.id === 'string'
                ) {
                  navigator.clipboard.writeText(row.original.id);
                }
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {columnsData?.data?.actionList?.map((action) => (
              <DropdownMenuItem
                key={getCTA(action.cta, row.original)}
                onClick={() => {
                  if ('loadingContent' in action) {
                    if (typeof setActiveAction === 'function')
                      setActiveAction(action);
                    if (action?.callback) {
                      action
                        ?.callback(row.original)
                        .then((res: JSX.Element) => {
                          if (typeof setActiveAction === 'function')
                            setActiveAction({
                              ...action,
                              content: res,
                            });
                        });
                    }
                  } else if (action.type === 'Action') {
                    action.callback(row.original);
                    return;
                  } else if (typeof setActiveAction === 'function')
                    setActiveAction(action);
                  if (typeof setTriggerData === 'function')
                    setTriggerData(row.original);
                  if (typeof setIsOpen === 'function') setIsOpen(true);
                }}
              >
                {getCTA(action.cta, row.original)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  let finalColumns = columns;
  if (!selectable) {
    finalColumns = finalColumns.filter((column) => column.id !== 'select');
  }
  if (hideAction) {
    finalColumns = finalColumns.filter(
      (column) => column.id !== 'table-actions'
    );
  }
  return finalColumns;
}
