'use client';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TanstackTablePagination } from './tanstack-table-pagination';
import { TanstackTableRowActions } from './tanstack-table-row-actions';
import { TanstackTableConfirmationDialog } from './tanstack-table-row-actions-confirmation';
import { TanstackTableToolbar } from './tanstack-table-toolbar';
import { TanstackTableProps, TanstackTableRowActionsType } from './types';
import { getCommonPinningStyles } from './utils';

const CellWithActions = <TData,>(
  row: Row<TData>,
  actions: TanstackTableRowActionsType<TData>[],
  setRowAction: (
    actions: TanstackTableRowActionsType<TData> & { row: TData }
  ) => void
) => (
  <TanstackTableRowActions
    row={row.original}
    actions={actions}
    setRowAction={setRowAction}
  />
);

export default function TanstackTable<TData, TValue>({
  columns,
  data,
  filters,
  excludeColumns,
  actions,
}: TanstackTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      excludeColumns
        ? Object.fromEntries(excludeColumns?.map((item) => [item, false]))
        : {}
    );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowAction, setRowAction] = React.useState<
    (TanstackTableRowActionsType<TData> & { row: TData }) | null
  >(null);

  const tableColumns = useMemo(() => {
    const _columns = [...columns];
    if (actions) {
      if (actions) {
        _columns.push({
          id: 'actions',
          cell: ({ row }) => CellWithActions(row, actions, setRowAction),
        });
      }

      // _columns.push({
      //   id: 'actions',
      //   cell: ({ row }) => (
      //     <TanstackTableRowActions
      //       row={row.original}
      //       actions={actions}
      //       setRowAction={setRowAction}
      //     />
      //   ),
      // });
    }
    return _columns;
  }, [columns, actions]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    initialState: {
      columnPinning: {
        left: ['name'],
        right: ['actions'],
      },
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="space-y-4">
      <TanstackTableToolbar table={table} filters={filters} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={getCommonPinningStyles({
                      column: header.column,
                      withBorder: true,
                    })}
                  >
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={getCommonPinningStyles({
                        column: cell.column,
                        withBorder: true,
                      })}
                    >
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
                  No data results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TanstackTablePagination table={table} />
      {rowAction?.type === 'confirmation-dialog' && (
        <TanstackTableConfirmationDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          description={rowAction.description}
          confirmationText={rowAction.confirmationText}
          cancelText={rowAction.cancelText}
          onConfirm={rowAction.onConfirm}
          onCancel={rowAction.onCancel}
          type="confirmation-dialog"
        />
      )}
    </div>
  );
}
