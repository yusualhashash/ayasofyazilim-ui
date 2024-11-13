'use client';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCommonPinningStyles } from './utils';
import {
  TanstackTableRowActions,
  TanstackTableToolbar,
  TanstackTablePagination,
  TanstackTableConfirmationDialog,
  TanstackTableCustomDialog,
  TanstackTableAutoformDialog,
  TanstackTableTableAutoformDialog,
  TanstackTableTableCustomDialog,
} from './fields';
import {
  TanstackTableRowActionsType,
  TanstackTableProps,
  TanstackTableTableActionsType,
} from './types';

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
  columnOrder,
  data,
  filters,
  columnVisibility,
  pinColumns,
  rowActions,
  tableActions,
  selectedRowAction,
}: TanstackTableProps<TData, TValue>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [colVisibility, setColumnVisibility] = useState<VisibilityState>(
    columnVisibility
      ? Object.fromEntries(
          columns.map((col) => [
            col.id || '',
            columnVisibility?.columns.includes(
              (col.id || '') as keyof TData
            ) ===
              (columnVisibility.type === 'show'),
          ])
        )
      : {}
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowAction, setRowAction] = React.useState<
    (TanstackTableRowActionsType<TData> & { row: TData }) | null
  >(null);
  const [tableAction, setTableAction] =
    React.useState<TanstackTableTableActionsType | null>(null);

  const tableColumns = useMemo(() => {
    const _columns = [...columns];

    if (rowActions) {
      _columns.push({
        id: 'actions',
        cell: ({ row }) => CellWithActions(row, rowActions, setRowAction),
      });
    }
    return _columns;
  }, [columns, rowActions]);

  const [pagination, setPagination] = useState(() => {
    const currentPagination = { pageIndex: 0, pageSize: 10 };
    if (searchParams?.get('maxResultCount')) {
      currentPagination.pageSize =
        Number(searchParams?.get('maxResultCount')) || 10;
    }
    if (searchParams?.get('skipCount')) {
      currentPagination.pageIndex =
        Number(searchParams?.get('skipCount')) / currentPagination.pageSize ||
        0;
    }
    return currentPagination;
  });

  useEffect(() => {
    if (rowAction?.type === 'simple') {
      rowAction.onClick(rowAction.row);
      setRowAction(null);
    }
  }, [rowAction]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility: colVisibility,
      columnFilters,
      pagination,
    },
    initialState: {
      columnOrder: columnOrder as string[],
      columnPinning: {
        left: ['select', 'name', ...((pinColumns as string[]) ?? [])],
        right: ['actions'],
      },
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    rowCount: 30,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (Number(searchParams?.get('maxResultCount')) !== pagination.pageSize) {
      params.set('maxResultCount', pagination.pageSize.toString());
    }
    if (
      Number(searchParams?.get('skipCount')) !==
      pagination.pageIndex * pagination.pageSize
    ) {
      params.set(
        'skipCount',
        (pagination.pageIndex * pagination.pageSize).toString()
      );
    }
    if (Number(params?.get('maxResultCount')) === 10) {
      params.delete('maxResultCount');
    }
    if (Number(params?.get('skipCount')) === 0) {
      params.delete('skipCount');
    }

    replace(`${pathname}?${params.toString()}`);
  }, [pagination]);
  return (
    <div className="space-y-4 flex flex-col h-full">
      <TanstackTableToolbar<TData>
        table={table}
        filters={filters}
        selectedRowAction={selectedRowAction}
        tableActions={tableActions}
        setTableAction={setTableAction}
      />
      <div className="rounded-md border overflow-auto">
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
      {rowAction?.type === 'custom-dialog' && (
        <TanstackTableCustomDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          content={rowAction.content}
          confirmationText={rowAction.confirmationText}
          cancelText={rowAction.cancelText}
          onConfirm={rowAction.onConfirm}
          onCancel={rowAction.onCancel}
          type="custom-dialog"
        />
      )}
      {rowAction?.type === 'autoform-dialog' && (
        <TanstackTableAutoformDialog<TData>
          setDialogOpen={() => setRowAction(null)}
          row={rowAction.row}
          title={rowAction.title}
          schema={rowAction.schema}
          submitText={rowAction.submitText}
          onSubmit={rowAction.onSubmit}
          values={rowAction.values}
          type="autoform-dialog"
        />
      )}
      {tableAction?.type === 'autoform-dialog' && (
        <TanstackTableTableAutoformDialog
          setDialogOpen={() => setTableAction(null)}
          title={tableAction.title}
          schema={tableAction.schema}
          submitText={tableAction.submitText}
          onSubmit={tableAction.onSubmit}
          values={tableAction.values}
          type="autoform-dialog"
        />
      )}
      {tableAction?.type === 'custom-dialog' && (
        <TanstackTableTableCustomDialog
          setDialogOpen={() => setTableAction(null)}
          title={tableAction.title}
          type="custom-dialog"
          content={tableAction.content}
          confirmationText={tableAction.confirmationText}
          cancelText={tableAction.cancelText}
          onConfirm={tableAction.onConfirm}
          onCancel={tableAction.onCancel}
        />
      )}
    </div>
  );
}
