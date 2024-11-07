'use client';

import { CaretSortIcon } from '@radix-ui/react-icons';
import { Column, ColumnDef, Row } from '@tanstack/react-table';
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
  ColumnsType,
  selectableColumns,
  TableAction,
} from './types';
import { normalizeName } from './utils';

function createSortableHeader<TData>(column: Column<TData>, name: string) {
  return (
    <Button
      className="p-0"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {name}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
const readOnlyCheckbox = (row: Row<AutoColumnGenerator>, value: string) => (
  <Checkbox checked={row.getValue(value)} disabled />
);

const sortColumns = (positions: string[], obj: Object) =>
  Object.assign(
    {},
    ...positions.map((position) => ({
      [position]: obj[position as keyof typeof obj],
    }))
  ) || obj;

function generateColumns({
  tableType,
  positions,
  customCells,
  excludeList = [],
}: Partial<AutoColumnGenerator>) {
  const generatedTableColumns: ColumnDef<AutoColumnGenerator>[] = [];
  let tempProperties = tableType.properties;
  if (positions) {
    tempProperties = sortColumns(positions, tableType.properties);
  }
  Object.keys(tempProperties).forEach((key) => {
    const accessorKey = key;
    const header = normalizeName(key);
    const value = tempProperties[key];
    if (excludeList.includes(key)) {
      return;
    }
    if (customCells && customCells[key]) {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: (row) => {
          if (typeof customCells[key] === "string") {
            return customCells[key];
          }
          if (typeof customCells[key] === "function") {
            return customCells[key](row);
          }
        },
      });
      return;
    }
    if (value.type === 'boolean') {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: ({ row }) => readOnlyCheckbox(row, key),
      });
    }
    if (value.type === 'string') {
      generatedTableColumns.push({
        accessorKey,
        header: ({ column }) =>
          createSortableHeader(column, header),
      });
    }
    if (value.type === 'integer' || value.type === 'number') {
      generatedTableColumns.push({
        accessorKey,
        header,
      });
    }
  });
  return generatedTableColumns;
}

export function columnsGenerator({
  columnsData,
  data,
  setActiveAction,
  setTriggerData,
  setIsOpen,
}: {
  columnsData: ColumnsType;
  data: AutoColumnGenerator;
  setActiveAction: Dispatch<SetStateAction<TableAction | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTriggerData: Dispatch<SetStateAction<any>>;
}) {
  let onSelect: selectableColumns['onSelect'] | undefined;
  const { selectable, tableType, excludeList, positions, customCells } = data;
  if (selectable) {
    onSelect = data.onSelect;
  }

  const columns: ColumnDef<typeof data>[] = [
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
    ...generateColumns({ tableType, excludeList, positions, customCells }),
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

            {columnsData.data?.actionList?.map((action) => (
              <DropdownMenuItem
                key={getCTA(action.cta, row.original)}
                onClick={() => {
                  if ('loadingContent' in action) {
                    setActiveAction(action);
                    if (action?.callback) {
                      action
                        ?.callback(row.original)
                        .then((res: JSX.Element) => {
                          setActiveAction({
                            ...action,
                            content: res,
                          });
                        });
                    }
                  } else if (action.type === 'Action') {
                    action.callback(row.original);
                    return;
                  } else {
                    setActiveAction(action);
                  }
                  setTriggerData(row.original);
                  setIsOpen(true);
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
  if (!selectable) return columns.filter((column) => column.id !== 'select');
  return columns;
}
