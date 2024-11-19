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
import { CellWithLink } from './cells';
import { Badge } from '@/components/ui/badge';

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

function generateColumns<Tdata>({
  tableType,
  positions,
  customCells,
  excludeList,
  language = 'en-US',
  dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
}: AutoColumnGenerator<Tdata>): ColumnDef<Tdata>[] {
  const generatedTableColumns: ColumnDef<Tdata>[] = [];
  const tempProperties: Record<keyof Tdata, unknown> = tableType.properties;
  Object.keys(tempProperties).forEach((key) => {
    const accessorKey = key as string & keyof Tdata;
    const header = normalizeName(key);
    const value = tempProperties[accessorKey];
    if (positions && !positions.includes(accessorKey)) {
      return;
    }
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
        cell: (cell) => {
          const customCell = customCells[_key];
          const _cell = cell as unknown as CellContext<Tdata, unknown>;
          switch (typeof customCell) {
            case 'function':
              return customCell(_cell);
            case 'object':
              switch (customCell.Type) {
                case 'badge':
                  return <Badge>{cell.getValue() as string}</Badge>;
                case 'link':
                  return (
                    <CellWithLink<Tdata>
                      href={customCell.href}
                      cell={_cell}
                      cellValue={customCell.cellValue}
                    />
                  );
                default:
                  return `error in ${typeof customCell}`;
              }
            default:
              return typeof customCell;
          }
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
      (value.type === 'integer' || value.type === 'number')
    ) {
      generatedTableColumns.push({
        accessorKey,
        header,
      });
    }
    if (
      value &&
      typeof value === 'object' &&
      'type' in value &&
      value.type === 'string'
    ) {
      if ('format' in value && value.format === 'date-time') {
        generatedTableColumns.push({
          accessorKey,
          header,
          cell: ({ cell }) => {
            const _value = cell.getValue() as string;
            const date = new Date(_value);
            return date.toLocaleDateString(language, dateOptions);
          },
        });
      } else {
        generatedTableColumns.push({
          accessorKey,
          header: ({ column }) => createSortableHeader(column, header),
        });
      }
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
  setActiveAction?: Dispatch<SetStateAction<TableAction<Tdata> | undefined>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setTriggerData?: Dispatch<SetStateAction<any>>;
}) {
  let onSelect: selectableColumns['onSelect'] | undefined;
  const { selectable, hideAction } = data;
  if (selectable) {
    onSelect = data.onSelect;
  }

  const AutoColumns: ColumnDef<Tdata>[] = generateColumns<Tdata>(data);

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
