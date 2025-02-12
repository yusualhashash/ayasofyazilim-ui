import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from '@tanstack/react-table';
import { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getCommonPinningStyles } from '../utils';

export function TanstackTablePlainTable<TData, TValue>({
  table,
  columns,
  fillerColumn,
  editable,
  expandedRowComponent,
}: {
  columns: ColumnDef<TData, TValue>[];
  editable?: boolean;
  expandedRowComponent?: (
    row: TData,
    toggleExpanded: () => void
  ) => JSX.Element;
  fillerColumn?: keyof TData;
  table: TableType<TData>;
}) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              if (header.id === 'actions') return null;
              return (
                <TableHead
                  key={header.id}
                  style={getCommonPinningStyles({
                    column: header.column,
                    withBorder: true,
                    fillerColumn,
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow
                data-state={row.getIsSelected() && 'selected'}
                className={cn(editable && '[&>td:last-child]:border-r-0')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      (editable || cell.column.id === 'actions') &&
                        'p-0 border border-b-0'
                    )}
                    style={getCommonPinningStyles({
                      column: cell.column,
                      withBorder: true,
                      fillerColumn,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && expandedRowComponent && (
                <TableRow>
                  <TableCell colSpan={row.getAllCells().length}>
                    {expandedRowComponent(
                      row.original,
                      row.getToggleExpandedHandler()
                    )}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-auto text-center">
              No data results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
