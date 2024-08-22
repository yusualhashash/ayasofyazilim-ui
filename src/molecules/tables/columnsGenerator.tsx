'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import CustomTableActionDialog from '@repo/ayasofyazilim-ui/molecules/dialog';
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
import { Separator } from '@/components/ui/separator';
import { AutoColumnGenerator } from '.';
import { normalizeName } from './utils';

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
  excludeList = [],
}: Partial<AutoColumnGenerator>) {
  const generatedTableColumns: any = [];
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
    selectable = false,
    // callback,
    autoFormArgs,
    tableType,
    onEdit,
    onDelete,
    actionList,
    excludeList,
    positions,
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
    ...generateColumns({ tableType, excludeList, positions }),
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const originalRow = row.original;
        const [open, setOpen] = useState(false);
        const [subContentDialogContent, setSubContentDialogContent] =
          useState<JSX.Element>(<div>Content</div>);
        const [subContentDialogDescription, setSubContentDialogDescription] =
          useState('');
        const [subContentDialogOpen, setSubContentDialogOpen] = useState(false);
        const [subContentDialogTitle, setSubContentDialogTitle] = useState('');
        const [
          subContentDialogLoadingContent,
          setSubContentDialogLoadingContent,
        ] = useState<JSX.Element>(<>Loading...</>);
        const [isSubContentDialogLoading, setIsSubContentDialogLoading] =
          useState(false);

        return (
          <>
            <Separator
              orientation="vertical"
              className="absolute left-0 top-0"
            />
            <CustomTableActionDialog
              open={open}
              onOpenChange={setOpen}
              action={{
                type: 'Dialog',
                autoFormArgs,
                componentType: 'Autoform',
                callback: onEdit,
                cta: data.dialogTitle ? data.dialogTitle : 'Edit',
                description: data.dialogDescription
                  ? data.dialogDescription
                  : '',
              }}
              triggerData={originalRow}
            />
            {isSubContentDialogLoading ? (
              <CustomTableActionDialog
                open={subContentDialogOpen}
                onOpenChange={setSubContentDialogOpen}
                action={{
                  type: 'Dialog',
                  componentType: 'CustomComponent',
                  cta: subContentDialogTitle,
                  description: subContentDialogDescription,
                  loadingContent: subContentDialogLoadingContent,
                  isLoading: true,
                }}
              />
            ) : (
              <CustomTableActionDialog
                open={subContentDialogOpen}
                onOpenChange={setSubContentDialogOpen}
                action={{
                  type: 'Dialog',
                  componentType: 'CustomComponent',
                  cta: subContentDialogTitle,
                  description: subContentDialogDescription,
                  content: subContentDialogContent,
                  isLoading: false,
                }}
              />
            )}

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
                  Delete
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
                    onClick={async (e) => {
                      if (
                        'type' in action &&
                        action.type === 'SubContentDialog'
                      ) {
                        setSubContentDialogTitle(action.cta);
                        setSubContentDialogLoadingContent(
                          action.loadingContent
                        );
                        setIsSubContentDialogLoading(true);
                        // @ts-ignore
                        setSubContentDialogDescription(originalRow.id);
                        setSubContentDialogOpen(true);
                        const subContent = await action.callback(
                          e,
                          originalRow
                        );
                        setIsSubContentDialogLoading(false);
                        setSubContentDialogContent(subContent);
                        return;
                      }
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
  if (!selectable) return columns.filter((column) => column.id !== 'select');
  return columns;
}
