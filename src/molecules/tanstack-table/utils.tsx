import { Column, ColumnDef, Row } from '@tanstack/react-table';
import { CSSProperties } from 'react';
import Link from 'next/link';
import { TanstackTableColumnHeader } from './tanstack-table-column-header';
import {
  TanstackTableColumnBadge,
  TanstackTableColumnLink,
  TanstackTableFacetedFilterType,
} from './types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
    width: column.getSize(),
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'hsl(var(--background))' : 'hsl(var(--background))',
    zIndex: isPinned ? 1 : 0,
  };
}

export function tanstackTableCreateColumnsByRowData<T>(params: {
  badges?: Record<string, TanstackTableColumnBadge>;
  classNames?: Record<string, string>;
  faceted?: Record<string, TanstackTableFacetedFilterType[]>;
  languageData?: Record<string, string>;
  links?: Record<string, TanstackTableColumnLink>;
  row: Record<string, string | number | boolean | Date | null>;

  selectableRows?: boolean;
}) {
  function createCell(
    accessorKey: string,
    row: Row<T>,
    link?: TanstackTableColumnLink,
    faceted?: TanstackTableFacetedFilterType[],
    badge?: TanstackTableColumnBadge,
    className?: string
  ) {
    let content: JSX.Element | string =
      row.getValue(accessorKey)?.toString() || '';

    if (badge) {
      const badgeItem = badge.values.find(
        (item) => item.value === row.getValue(badge.targetAccessorKey)
      );

      if (badgeItem) {
        content = (
          <>
            <Badge variant="outline" className={badgeItem.badgeClassName}>
              {badgeItem.label}
            </Badge>{' '}
            {!badge.hideColumnValue && content}
          </>
        );
      }
    }
    if (faceted) {
      const facetedItem = faceted.find(
        (item) => item.value === row.getValue(accessorKey)
      );

      if (facetedItem) {
        content = (
          <div className={cn('flex items-center', facetedItem.className)}>
            {facetedItem.icon && (
              <facetedItem.icon
                className={cn(
                  'text-muted-foreground mr-2 h-4 w-4',
                  facetedItem.iconClassName
                )}
              />
            )}
            <span>{facetedItem.label}</span>
          </div>
        );
      }
    }
    if (!link) {
      return <div className={cn(className)}>{content}</div>;
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
      <Link href={url} className={cn('font-medium underline', className)}>
        {content}
      </Link>
    );
  }

  const { row, languageData, links, faceted, badges, classNames } = params;
  const columns: ColumnDef<T>[] = [];
  if (params.selectableRows) {
    columns.push({
      size: 64,
      id: 'select',
      header: ({ table }) => (
        <div className="w-14">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }
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
        createCell(
          accessorKey,
          row,
          link,
          faceted?.[accessorKey],
          badges?.[accessorKey],
          classNames?.[accessorKey]
        ),
    };
    if (faceted?.[accessorKey]) {
      column.filterFn = (row, id, value) => value.includes(row.getValue(id));
    }
    columns.push(column);
  });

  return columns;
}
