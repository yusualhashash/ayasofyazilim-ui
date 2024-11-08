import React from 'react';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TablePaginationProps<TData> {
  className?: string;
  table: Table<TData>;
}

export function TablePagination<TData>({
  table,
  className,
}: TablePaginationProps<TData>): JSX.Element {
  const totalRows = table.getCoreRowModel().rows.length;
  const { pageSize, pageIndex } = table.getState().pagination;
  const pageCount = Math.ceil(totalRows / pageSize);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-normal">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={`${pageSize}`} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {pageIndex + 1} of {pageCount}
      </div>
    </div>
  );
}
