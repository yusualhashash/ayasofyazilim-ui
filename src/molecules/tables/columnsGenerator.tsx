'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import AutoformDialog from '@repo/ayasofyazilim-ui/molecules/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AutoColumnGenerator } from '.';
import { normalizeName } from './utils';
import { Separator } from '@/components/ui/separator';

const createSortableHeader = (column: any, name: string) => (
  <Button
    className="p-0"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {name}
    <CaretSortIcon className="ml-2 h-4 w-4" />
  </Button>
);
const readOnlyCheckbox = (row: any, value: string) => (
  <Checkbox checked={row.getValue(value)} disabled />
);

function generateColumns(tableType: any, excludeList: string[] = []) {
  const generatedTableColumns: any = [];
  Object.keys(tableType.properties).forEach((key) => {
    const accessorKey = key;
    const header = normalizeName(key);
    const value = tableType.properties[key];
    if (excludeList.includes(key)) {
      return;
    }
    if (value.type === 'boolean') {
      generatedTableColumns.push({
        accessorKey,
        header,
        cell: ({ row }: { row: any }) => readOnlyCheckbox(row, key),
      });
    }
    if (value.type === 'string') {
      generatedTableColumns.push({
        accessorKey,
        header: ({ column }: { column: any }) =>
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

export function columnsGenerator(data: AutoColumnGenerator) {
  const {
    // callback,
    autoFormArgs,
    tableType,
    onEdit,
    onDelete,
    actionList,
    excludeList,
  } = data;

  const columns: ColumnDef<typeof data>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...generateColumns(tableType, excludeList),
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const originalRow = row.original;
        const [open, setOpen] = useState(false);

        return (
          <>
            <Separator
              orientation="vertical"
              className="absolute left-0 top-0"
            />
            <AutoformDialog
              open={open}
              onOpenChange={setOpen}
              action={{
                type: 'Dialog',
                autoFormArgs,
                callback: onEdit,
                cta: data.dialogTitle ? data.dialogTitle : 'Edit',
                description: data.dialogDescription
                  ? data.dialogDescription
                  : '',
              }}
              triggerData={originalRow}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" key={originalRow.dialogTitle}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  // @ts-ignore
                  onClick={() => navigator.clipboard.writeText(originalRow.id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    onDelete(e, originalRow);
                  }}
                >
                  Delete role
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // get data
                    setOpen(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                {actionList?.map((action) => (
                  <DropdownMenuItem
                    onClick={(e) => {
                      action.callback(e, originalRow);
                    }}
                  >
                    {action.cta}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  return columns;
}
