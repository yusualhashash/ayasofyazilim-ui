'use client';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import {
  TanstackTableActionDialogs,
  TanstackTablePagination,
  TanstackTablePlainTable,
  TanstackTableToolbar,
} from './fields';

import TanstackEditableTable from './index copy';
import {
  TanstackTableProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from './types';
import { CellWithActions } from './utils/cell-with-actions';

export const TanstackEditableTablee = TanstackEditableTable;
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    addRow: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow: (rowIndex: number, columnId: string, value: unknown) => void;
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function TanstackTable<TData, TValue>({
  columns,
  columnOrder,
  data,
  rowCount = 0,
  filters,
  columnVisibility,
  pinColumns,
  rowActions,
  tableActions,
  selectedRowAction,
  expandedRowComponent,
  fillerColumn,
  editable = false,
  showPagination = true,
}: TanstackTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowAction, setRowAction] = useState<
    (TanstackTableRowActionsType<TData> & { row: TData }) | null
  >(null);
  const [tableAction, setTableAction] =
    useState<TanstackTableTableActionsType | null>(null);

  const tableColumns = useMemo(() => {
    const _columns = [...columns];

    if (rowActions) {
      _columns.push({
        id: 'actions',
        cell: ({ row }) =>
          CellWithActions(table, row, rowActions, setRowAction),
      });
    }
    return _columns;
  }, [columns, rowActions]);

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  const getRowId = useCallback(
    (row: TData) => (row as TData & { id: string }).id,
    []
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getRowId,
    state: {
      sorting,
      columnVisibility: colVisibility,
      columnFilters,
      pagination,
    },
    initialState: {
      columnOrder: columnOrder as string[],
      columnPinning: {
        left: [
          'expanded-content',
          'select',
          ...((pinColumns as string[]) ?? []),
        ],
        right: ['actions'],
      },
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    manualPagination: true,
    getRowCanExpand: () => !!expandedRowComponent,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    rowCount,
  });

  return (
    <div className="space-y-4 flex flex-col h-full">
      <TanstackTableToolbar<TData>
        table={table}
        filters={filters}
        selectedRowAction={selectedRowAction}
        tableActions={tableActions}
        tableData={data}
        setTableAction={setTableAction}
      />
      <div className="rounded-md border overflow-auto">
        <TanstackTablePlainTable
          table={table}
          columns={tableColumns}
          fillerColumn={fillerColumn}
          editable={editable}
          expandedRowComponent={expandedRowComponent}
        />
      </div>
      {showPagination && (
        <TanstackTablePagination table={table} pagination={pagination} />
      )}
      <TanstackTableActionDialogs
        tableAction={tableAction}
        setTableAction={setTableAction}
        rowAction={rowAction}
        setRowAction={setRowAction}
      />
    </div>
  );
}
