import { Column, ColumnDef, Row } from '@tanstack/react-table';
import { CSSProperties } from 'react';
import { TanstackTableColumnHeader } from './tanstack-table-column-header';
import { TanstackTableColumnLink } from './types';

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
  languageData?: Record<string, string>;
  links?: Record<string, TanstackTableColumnLink>;
  row: Record<string, string | number | boolean | Date | null>;
}) {
  function createCell(
    accessorKey: string,
    row: Row<T>,
    link?: TanstackTableColumnLink
  ) {
    if (!link) {
      return <div>{row.getValue(accessorKey)?.toString()}</div>;
    }
    let url = link.prefix;
    if (link.targetAccessorKey) {
      url +=
        `/${row
          ._getAllCellsByColumnId()
          ?.[link.targetAccessorKey || ''].getValue()
          ?.toString()}` || '';
    }
    if (link.suffix) {
      url += `/${link.suffix}`;
    }
    return (
      <a href={url} className="font-medium underline">
        {row.getValue(accessorKey)?.toString()}
      </a>
    );
  }

  const { row, languageData, links } = params;
  const columns: ColumnDef<T>[] = [];

  Object.keys(row).forEach((accessorKey) => {
    const title = languageData?.[accessorKey] || accessorKey;
    const link = links?.[accessorKey];

    columns.push({
      accessorKey,
      meta: title,
      header: ({ column }) => (
        <TanstackTableColumnHeader column={column} title={title} />
      ),
      cell: ({ row }) => createCell(accessorKey, row, link),
    });
  });

  return columns;
}
