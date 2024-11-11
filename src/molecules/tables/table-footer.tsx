import { Trash2Icon } from 'lucide-react';
import React, { useCallback } from 'react';
import { Table, Row } from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { DataTableProps } from './types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function selectedRowsText<TData>({
  isLoading,
  table,
}: {
  isLoading: boolean | undefined;
  table: Table<TData>;
}): string | JSX.Element {
  if (isLoading) return <Skeleton className="w-28 h-4" />;
  return `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`;
}

export default function TableFooter<TData>({
  inputProps,
  table,
  selectedRows,
  setTableData,
  tableData,
}: {
  inputProps: DataTableProps<TData>;
  selectedRows: Row<TData>[];
  setTableData: React.Dispatch<React.SetStateAction<TData[]>>;
  table: Table<TData>;
  tableData: TData[];
}) {
  const { classNames, editable, isLoading, Headertable } = inputProps;
  const handleAddRow = () => {
    const newRow = Headertable;
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
    <div
      className={cn('flex items-center py-5', classNames?.footer?.container)}
    >
      {editable && (
        <div
          className={cn(
            'space-x-2 px-2',
            classNames?.footer?.editable?.container
          )}
        >
          {selectedRows?.length > 0 && (
            <Button
              className={cn(classNames?.footer?.editable?.remove)}
              variant="outline"
              onClick={handleRemoveSelected}
            >
              Remove Selected
              <Trash2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button
            className={cn(classNames?.footer?.editable?.add)}
            variant="outline"
            onClick={handleAddRow}
          >
            Add New +
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between px-2">
        <div
          className={cn(
            'flex-1 text-sm text-muted-foreground',
            classNames?.footer?.selectedRows
          )}
        >
          {selectedRowsText<TData>({
            isLoading,
            table,
          })}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
