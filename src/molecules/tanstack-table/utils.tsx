import { Column, ColumnDef, Row } from '@tanstack/react-table';
import { CSSProperties } from 'react';
import Link from 'next/link';
import { TanstackTableColumnHeader } from './tanstack-table-column-header';
import {
  TanstackTableColumnLink,
  TanstackTableFacetedFilterType,
} from './types';

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
  faceted?: Record<string, TanstackTableFacetedFilterType[]>;
  languageData?: Record<string, string>;
  links?: Record<string, TanstackTableColumnLink>;
  row: Record<string, string | number | boolean | Date | null>;
}) {
  function createCell(
    accessorKey: string,
    row: Row<T>,
    link?: TanstackTableColumnLink,
    faceted?: TanstackTableFacetedFilterType[]
  ) {
    let content: JSX.Element | string =
      row.getValue(accessorKey)?.toString() || '';
    if (faceted) {
      const facetedItem = faceted.find(
        (item) => item.value === row.getValue(accessorKey)
      );

      if (facetedItem) {
        content = (
          <div className="flex items-center">
            {facetedItem.icon && (
              <facetedItem.icon className="text-muted-foreground mr-2 h-4 w-4" />
            )}
            <span>{facetedItem.label}</span>
          </div>
        );
      }
    }
    if (!link) {
      return <div>{content}</div>;
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
      <Link href={url} className="font-medium underline">
        {content}
      </Link>
    );
  }

  const { row, languageData, links, faceted } = params;
  const columns: ColumnDef<T>[] = [];

  Object.keys(row).forEach((accessorKey) => {
    const title = languageData?.[accessorKey] || accessorKey;
    const link = links?.[accessorKey];

    const column: ColumnDef<T> = {
      accessorKey,
      meta: title,
      header: ({ column }) => (
        <TanstackTableColumnHeader column={column} title={title} />
      ),
      cell: ({ row }) =>
        createCell(accessorKey, row, link, faceted?.[accessorKey]),
    };
    if (faceted?.[accessorKey]) {
      column.filterFn = (row, id, value) => value.includes(row.getValue(id));
    }
    columns.push(column);
  });

  return columns;
}
