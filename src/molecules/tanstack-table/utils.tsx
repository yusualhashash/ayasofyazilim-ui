import { Column, ColumnDef } from '@tanstack/react-table';
import { CSSProperties } from 'react';

export function getCommonPinningStyles<TData>({
  column,
  withBorder = false,
}: {
  column: Column<TData>;
  /**
   * Show box shadow between pinned and scrollable columns.
   * @default false
   */
  withBorder?: boolean;
}): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px hsl(var(--border)) inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px hsl(var(--border)) inset'
          : undefined
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'hsl(var(--background))' : 'hsl(var(--background))',
    zIndex: isPinned ? 1 : 0,
  };
}

export function tanstackTableCreateColumnsByRowData<T>(params: {
  row: Record<string, string | number | boolean | Date | null>;
}) {
  const { row } = params;
  const columns: ColumnDef<T>[] = [];

  Object.keys(row).forEach((accessorKey) => {
    const title = accessorKey;

    columns.push({
      accessorKey,
      meta: title,
    });
  });

  return columns;
}
