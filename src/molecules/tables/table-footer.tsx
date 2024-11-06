import { Trash2Icon } from 'lucide-react';
import React, { useCallback } from 'react';
import { Table, Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { DataTableProps } from './types';

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
      {editable ? (
        <div
          className={cn(
            'footer-buttons bg-white',
            classNames?.footer?.editable?.container
          )}
        >
          <div
            className={cn(
              'flex w-full justify-end items-end gap-5 py-3 px-3',
              classNames?.footer?.editable?.wrapper
            )}
          >
            {selectedRows?.length > 0 && (
              <Button
                className={cn(
                  'remove-button w-44 h-10 flex items-center justify-center',
                  classNames?.footer?.editable?.remove
                )}
                variant="outline"
                onClick={handleRemoveSelected}
              >
                Remove Selected
                <Trash2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
            <Button
              className={cn(
                'add-button w-44 h-10 flex items-center justify-center',
                classNames?.footer?.editable?.add
              )}
              variant="outline"
              onClick={handleAddRow}
            >
              Add New +
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn('space-x-2', classNames?.footer?.buttons?.container)}
        >
          {isLoading ? (
            <>
              <Skeleton className="inline-flex h-9 w-24" />
              <Skeleton className="inline-flex h-9 w-24" />
            </>
          ) : (
            <>
              <Button
                className={cn(classNames?.footer?.buttons?.previous)}
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                className={cn(classNames?.footer?.buttons?.next)}
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
