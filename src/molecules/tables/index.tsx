'use client';

import * as React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AutoformDialog from '../dialog';
import { columnsGenerator } from './columnsGenerator';
import { normalizeName } from './utils';
import { Skeleton } from '@/components/ui/skeleton';

export type tableAction = {
  autoFormArgs: any;
  callback: (values: any) => void;
  cta: string;
  description: string;
  href?: string;
  type?: 'Dialog' | 'NewPage' | 'Sheet';
};

type autoColumnGnerator = {
  autoFormArgs: any;
  callback: any;
  excludeList: string[];
  onDelete: (e: any, originalRow: any) => void;
  onEdit: (e: any, originalRow: any) => void;
  tableType: any;
};

export type columnsType = {
  data: ColumnDef<any>[] | autoColumnGnerator;
  type: 'Custom' | 'Auto';
};

export type DataTableProps<TData> = {
  action?: tableAction;
  columnsData: columnsType;
  data: TData[];
  filterBy: string;
  isLoading?: boolean;
};
const SkeletonCell = () => <Skeleton className="w-20 h-3" />;

const ActionComponent = ({
  action,
  callback,
}: {
  action?: tableAction;
  callback?: Function;
}) => {
  if (!action) return null;
  if (action.type === 'NewPage') {
    return (
      <Link href={action.href || 'add'}>
        <Button variant="outline">{action.cta}</Button>
      </Link>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (callback) callback();
      }}
    >
      {action.cta}
    </Button>
  );
};
/**
 * Renders a data table with customizable columns, sorting, filtering, and selection capabilities.
 * The table can display data in either a custom format defined by the user or automatically generate columns based on provided data.
 * It supports loading states, custom actions, and can be filtered by a specific field.
 *
 * @param {DataTableProps<TData>} props - The properties for configuring the DataTable component.
 * @param {columnsType} props.columnsData - Configuration for the table columns. Can be either custom-defined columns or automatically generated based on data.
 * @param {TData[]} props.data - The data to be displayed in the table.
 * @param {string} props.filterBy - The field name to filter the table data by.
 * @param {tableAction} [props.action] - Optional. Configuration for an action that can be performed on the table data, such as adding a new row.
 * @param {boolean} [props.isLoading] - Optional. Indicates whether the table is in a loading state. Defaults to false.
 *
 * @returns {React.ReactElement} The rendered data table component.
 *
 * @template TData - The type of the data objects that will be displayed in the table.
 * @template TValue - The type of the values within each data object. This is used when defining custom columns.
 *
 * @example
 * // Example usage of DataTable with auto-generated columns
 * const usersData = [{ id: 1, name: 'John Doe', role: 'Admin' }];
 * const columnsConfig = {
 *   type: 'Auto',
 *   data: {
 *     autoFormArgs: {},
 *     callback: () => {},
 *     excludeList: ['id'],
 *     onDelete: () => {},
 *     onEdit: () => {},
 *     tableType: 'UserTable',
 *   },
 * };
 *
 * <DataTable
 *   columnsData={columnsConfig}
 *   data={usersData}
 *   filterBy="name"
 * />
 */
export default function DataTable<TData, TValue>({
  columnsData,
  data,
  filterBy,
  action,
  isLoading,
}: DataTableProps<TData>) {
  let tableData = data;

  function selectedRowsText() {
    if (isLoading) return 'Loading...';
    return `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`;
  }

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  let columns: ColumnDef<any, any>[] = [];
  if (columnsData.type === 'Auto') {
    const tempData = columnsData.data as autoColumnGnerator;
    columns = columnsGenerator(
      tempData.callback,
      tempData.autoFormArgs,
      tempData.tableType,
      tempData.onEdit,
      tempData.onDelete,
      tempData.excludeList
    );
  } else {
    columns = columnsData.data as ColumnDef<TData, TValue>[];
  }
  if (isLoading) {
    tableData = Array(6).fill({});
    columns = columns.map((column) => ({
      ...column,
      cell: SkeletonCell,
    }));
  }
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: (filters) => {
      if (isLoading) return;
      setColumnFilters(filters);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (row) => {
      if (isLoading) return;
      setRowSelection(row);
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full">
      {action?.type === 'NewPage' ? null : (
        <AutoformDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          action={action}
          type={action?.type}
        />
      )}
      <div className="flex items-center py-4 gap-2">
        <Input
          disabled={isLoading}
          placeholder={`Filter ${filterBy}s...`}
          value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(filterBy)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={isLoading} variant="outline" className="ml-auto">
              View <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {normalizeName(column.id)}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ActionComponent action={action} callback={() => setIsOpen(true)} />
      </div>
      <div className="rounded-md border relative w-full">
        <Table wrapperClassName="h-[500px] overflow-y-auto">
          <TableHeader className="sticky top-0 bg-slate-100 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="whitespace-nowrap"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedRowsText()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
