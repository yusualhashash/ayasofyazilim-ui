'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
} from '@tanstack/react-table';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { Trash2Icon } from 'lucide-react';
import { ReactNode } from 'node_modules/react-resizable-panels/dist/declarations/src/vendor/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
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

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown | TData
    ) => void;
  }
}

export type tableAction = tableActionCommon &
  (tableActionNewPage | tableActionDialog | tableActionAction);

export type tableActionCommon = {
  cta: string;
};

export type tableActionNewPage = {
  href: string;
  type: 'NewPage';
};

export type tableActionDialog = {
  autoFormArgs: any;
  callback: (values: any, triggerData?: unknown) => void;
  description: string;
  type: 'Dialog' | 'Sheet';
};

export type tableActionAction = {
  callback: (values: any) => void;
  type: 'Action';
};

export type MenuAction = {
  callback: (e: any, originalRow: any) => void;
  cta: string;
};

export type autoColumnGnerator = {
  actionList?: MenuAction[];
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
  action?: tableAction | tableAction[];
  columnsData: columnsType;
  data: TData[];
  editable?: boolean;
  fetchRequest?: any;
  filterBy?: string;
  isLoading?: boolean;
  rowCount?: number;
  showView?: boolean;
};
const SkeletonCell = () => <Skeleton className="w-20 h-3" />;

const ActionComponent = ({
  action,
  callback,
  className,
}: {
  action?: tableAction;
  callback?: Function;
  className?: string;
}) => {
  if (!action) return null;
  if (action.type === 'NewPage') {
    return (
      <Link href={action.href || 'add'}>
        <Button variant="outline" className={className}>
          {action.cta}
        </Button>
      </Link>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (callback) callback();
      }}
      className={className}
    >
      {action.cta}
    </Button>
  );
};

export default function DataTable<TData, TValue>({
  columnsData,
  data,
  filterBy,
  action,
  isLoading = false,
  rowCount,
  fetchRequest,
  showView = true,
  editable = false,
}: DataTableProps<TData>) {
  const [tableData, setTableData] = useState<TData[]>(data || []);
  const isMultipleActionProvided = Array.isArray(action);
  const [isOpen, setIsOpen] = useState(false);
  let defaultAction: tableAction | undefined;
  if (action) {
    defaultAction = isMultipleActionProvided ? action[0] : action;
  }
  const [activeAction, setActiveAction] = React.useState<
    tableAction | undefined
  >(defaultAction);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (isLoading) {
      setTableData(Array(6).fill({}) as TData[]);
    } else {
      setTableData(data);
    }
  }, [isLoading, data]);

  let columns: ColumnDef<any, any>[] = [];
  if (columnsData.type === 'Auto') {
    columns = columnsGenerator(columnsData.data as autoColumnGnerator);
  } else {
    columns = columnsData.data as ColumnDef<TData, TValue>[];
  }

  if (isLoading) {
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
    manualPagination: true,
    rowCount: rowCount || tableData.length,
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
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const selectedRows = table?.getSelectedRowModel()?.rows || [];

  useEffect(() => {
    fetchRequest?.(table.getState().pagination.pageIndex);
  }, [table.getState().pagination.pageIndex]);

  function selectedRowsText() {
    if (isLoading) return 'Loading...';
    return `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`;
  }

  const handleAddRow = () => {
    const newRow = {} as TData;
    setTableData((prevData) => [...prevData, newRow]);
  };

  const handleRemoveSelected = useCallback(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row: any) => row.index);
    setTableData((old) =>
      old.filter((_row, index) => !selectedRows.includes(index))
    );
    table.resetRowSelection();
  }, [tableData]);

  return (
    <div className="w-full">
      {activeAction && 'autoFormArgs' in activeAction && (
        <AutoformDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          action={activeAction}
          type={activeAction?.type}
        />
      )}
      <div className="flex items-center py-4 gap-2">
        {filterBy && (
          <Input
            disabled={isLoading}
            placeholder={`Filter ${filterBy}s...`}
            value={
              (table.getColumn(filterBy)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(filterBy)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {showView === true && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                className="ml-auto"
              >
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {normalizeName(column.id)}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex">
          <ActionComponent
            action={defaultAction}
            callback={() => {
              setActiveAction(defaultAction);
              setIsOpen(true);
            }}
            className={isMultipleActionProvided ? 'rounded-r-none' : ''}
          />
          {isMultipleActionProvided && action.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={isLoading}
                  variant="outline"
                  className="rounded-l-none border-l-0 px-2"
                >
                  <ChevronDownIcon className="" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {action
                  .filter((i) => i !== action[0])
                  .map((actionItem) => (
                    <DropdownMenuItem
                      asChild
                      key={actionItem.cta}
                      className="cursor-pointer"
                    >
                      <ActionComponent
                        action={actionItem}
                        callback={() => {
                          setActiveAction(actionItem);
                          if (actionItem.type === 'Action') {
                            actionItem.callback(null);
                            return;
                          }
                          setIsOpen(true);
                        }}
                        className="w-full border-none"
                      />
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="rounded-md border relative w-full">
        <Table wrapperClassName="h-[500px] overflow-y-auto">
          <TableHeader className="sticky top-0 bg-slate-100 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
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
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="whitespace-nowrap"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) as ReactNode
                      }
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
        {editable ? (
          <div className="footer-buttons bg-white">
            <div className="flex w-full justify-end items-end gap-5 py-3 px-3">
              {selectedRows?.length > 0 && (
                <Button
                  className="remove-button w-44 h-10 flex items-center justify-center"
                  variant="outline"
                  onClick={handleRemoveSelected}
                >
                  Remove Selected
                  <Trash2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button
                className="add-button w-44 h-10 flex items-center justify-center"
                variant="outline"
                onClick={handleAddRow}
              >
                Add New +
              </Button>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
