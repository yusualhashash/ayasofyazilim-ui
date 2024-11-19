import { Column, ColumnDef, Row } from '@tanstack/react-table';
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TanstackTableColumnHeader } from '../fields/tanstack-table-column-header';
import {
  TanstackTableCellCondition,
  TanstackTableColumnBadge,
  TanstackTableColumnClassNames,
  TanstackTableColumnIcon,
  TanstackTableColumnLink,
  TanstackTableConfig,
  TanstackTableFacetedFilterType,
  TanstackTableLanguageDataType,
  TanstackTableLanguageDataTypeWithConstantKey,
} from '../types';
import { tanstackTableCreateTitleWithLanguageData } from './columnNames';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export * from './columnNames';
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

function testConditions<T>(
  conditions: TanstackTableCellCondition[] | undefined,
  row: Row<T>
) {
  if (!conditions) return true;

  return (
    conditions
      .map((condition) =>
        condition.when(row.getValue(condition.conditionAccessorKey))
      )
      .filter((i) => !i).length === 0
  );
}

export function tanstackTableCreateColumnsByRowData<T>(params: {
  badges?: Record<string, TanstackTableColumnBadge>;
  classNames?: Record<string, TanstackTableColumnClassNames[]>;
  config?: TanstackTableConfig;
  excludeColumns?: Partial<keyof T>[];
  expandRowTrigger?: keyof T;
  faceted?: Record<string, { options: TanstackTableFacetedFilterType[] }>;
  icons?: Record<string, TanstackTableColumnIcon>;
  languageData?:
    | TanstackTableLanguageDataType
    | TanstackTableLanguageDataTypeWithConstantKey;
  links?: Record<string, TanstackTableColumnLink>;
  rows: Record<
    string,
    {
      format?: string;
      type: string;
    }
  >;
  selectableRows?: boolean;
}) {
  const { rows, config } = params;
  function createCell(
    accessorKey: string,
    row: Row<T>,
    link?: TanstackTableColumnLink,
    faceted?: TanstackTableFacetedFilterType[],
    badge?: TanstackTableColumnBadge,
    icon?: TanstackTableColumnIcon,
    className?: TanstackTableColumnClassNames[],
    expandRowTrigger?: boolean,
    format?: string
  ) {
    let content: JSX.Element | string =
      row.getValue(accessorKey)?.toString() || '';
    if (format) {
      if (format === 'date' || format === 'date-time')
        content = new Date(content).toLocaleDateString(
          config?.locale,
          config?.dateOptions || {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }
        );
    }

    if (icon) {
      const position = icon.position || 'before';
      content = (
        <>
          {icon.icon && position === 'before' && (
            <icon.icon className={cn('w-4 h-4', icon.iconClassName)} />
          )}
          {row.getValue(accessorKey)}
          {icon.icon && position === 'after' && (
            <icon.icon className={cn('w-4 h-4', icon.iconClassName)} />
          )}
        </>
      );
    }
    if (badge) {
      const badges = badge.values.map((item) =>
        item.conditions?.map((condition) => {
          if (condition.when(row.getValue(condition.conditionAccessorKey))) {
            return (
              <Badge variant="outline" className={item.badgeClassName}>
                {item.label}
              </Badge>
            );
          }
          return null;
        })
      );
      content = (
        <>
          {badges}
          {!badge.hideColumnValue && content}
        </>
      );
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
    const containerClassName = className
      ?.map((item) => {
        if (testConditions(item.conditions, row)) {
          return item.className;
        }
        return null;
      })
      .join(' ');

    if (!link || !testConditions(link.conditions, row)) {
      if (expandRowTrigger) {
        return (
          <button
            type="button"
            onClick={row.getToggleExpandedHandler()}
            className={cn(
              'font-medium text-blue-700 flex items-center gap-2 cursor-pointer',
              containerClassName
            )}
          >
            {content}
          </button>
        );
      }
      return (
        <div className={cn(' flex items-center gap-2', containerClassName)}>
          {content}
        </div>
      );
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
      <Link
        href={url}
        className={cn(
          'font-medium text-blue-700 flex items-center gap-2',
          containerClassName
        )}
      >
        {content}
      </Link>
    );
  }

  const {
    excludeColumns,
    languageData,
    links,
    faceted,
    badges,
    classNames,
    icons,
    expandRowTrigger,
  } = params;
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
  Object.keys(rows)
    .filter((key) => !excludeColumns?.includes(key as keyof T))
    .forEach((accessorKey) => {
      const title = tanstackTableCreateTitleWithLanguageData({
        languageData,
        accessorKey,
      });
      const link = links?.[accessorKey];
      const { format } = rows[accessorKey];
      const column: ColumnDef<T> = {
        id: accessorKey,
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
            faceted?.[accessorKey]?.options,
            badges?.[accessorKey],
            icons?.[accessorKey],
            classNames?.[accessorKey],
            expandRowTrigger === accessorKey,
            format
          ),
      };
      if (faceted?.[accessorKey]) {
        column.filterFn = (row, id, value) => value.includes(row.getValue(id));
      }
      columns.push(column);
    });

  return columns;
}

export function tanstackTableEditableColumnsByRowData<T>(params: {
  excludeColumns?: Partial<keyof T>[];
  languageData?:
    | TanstackTableLanguageDataType
    | TanstackTableLanguageDataTypeWithConstantKey;
  rows: Record<
    string,
    {
      enum?: readonly string[];
      format?: string;
      type: string;
    }
  >;
}) {
  const { rows, excludeColumns, languageData } = params;
  const columns: ColumnDef<T>[] = [];

  Object.keys(rows)
    .filter((key) => !excludeColumns?.includes(key as keyof T))
    .forEach((accessorKey) => {
      const title = tanstackTableCreateTitleWithLanguageData({
        languageData,
        accessorKey,
      });

      const column: ColumnDef<T> = {
        id: accessorKey,
        accessorKey,
        meta: title,
        header: ({ column }) => (
          <TanstackTableColumnHeader column={column} title={title} />
        ),
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
          const initialValue = getValue() as string;

          const [value, setValue] = useState(initialValue);
          const rowId = (table.options.data[index] as { id: string })?.id;
          const isRowSelected = rowId
            ? table.getRow(rowId)?.getIsSelected()
            : false;

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          function handleValueChange(newValue: string) {
            setValue(newValue);
            if (isRowSelected && newValue === initialValue) {
              table.setRowSelection((old) => ({
                ...old,
                [rowId]: false,
              }));
              return;
            }

            if (!isRowSelected && newValue !== initialValue) {
              table.setRowSelection((old) => ({
                ...old,
                [rowId]: true,
              }));
            }
          }

          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          if (rows[accessorKey]?.enum) {
            return (
              <Select
                defaultValue={value as string}
                onValueChange={(value) => {
                  handleValueChange(value);
                  table.options.meta?.updateData(index, id, value);
                }}
              >
                <SelectTrigger
                  className={cn(
                    'w-[180px] border-none rounded-none focus-visible:border-none focus-within:border-none ring-0 focus-visible:ring-0 focus-within:ring-0 ring-transparent shadow-none',
                    isRowSelected ? 'font-bold' : ''
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rows[accessorKey]?.enum?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }

          return (
            <Input
              value={value as string}
              className={cn(
                'w-full border-none rounded-none focus-visible:border-none focus-within:border-none ring-0 focus-visible:ring-0 focus-within:ring-0 ring-transparent shadow-none',
                isRowSelected ? 'font-bold' : ''
              )}
              onChange={(e) => {
                handleValueChange(e.target.value);
              }}
              onBlur={onBlur}
            />
          );
        },
      };
      columns.push(column);
    });
  return columns;
}
