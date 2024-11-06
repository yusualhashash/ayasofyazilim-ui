'use client';

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { Fragment, useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { DropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { columnsGenerator } from './columnsGenerator';
import FilterColumn, { ColumnFilter } from './filter-column';
import { Badge } from '@/components/ui/badge';
import {
  AutoColumnGenerator,
  DataTableProps,
  FilterColumnResult,
  TableAction,
} from './types';
import TableFooter from './table-footer';
import {
  ActionComponent,
  FilterButton,
  getCTA,
  SkeletonCell,
} from './helper-components';
import CustomTableActionDialog from '../dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { normalizeName } from './utils';

/**
 * Renders a data table with customizable columns, sorting, filtering, and selection capabilities.
 * The table can display data in either a custom format defined by the user or automatically generate columns based on provided data.
 * It supports loading states, custom actions, and can be filtered by a specific field.
 *
 * @param {DataTableProps<TData>} props - The properties for configuring the DataTable component.
 * @param {ColumnsType} props.columnsData - Configuration for the table columns. Can be either custom-defined columns or automatically generated based on data.
 * @param {TData[]} props.data - The data to be displayed in the table.
 * @param {TableAction} [props.action] - Optional. Configuration for an action that can be performed on the table data, such as adding a new row.
 * @param {boolean} [props.isLoading] - Optional. Indicates whether the table is in a loading state. Defaults to false.
 *
 * @returns {ReactElement} The rendered data table component.
 *
 * @template TData - The type of the data objects that will be displayed in the table.
 * @template TValue - The type of the values within each data object. This is used when defining custom columns.
 *
 * @example
 * // Example usage of DataTable with auto-generated columns
 * const usersData = [{ id: 1, name: 'John Doe', role: 'Admin' }];
 * const columnsConfig = {
 *   type: 'Auto',
 *   data: {
 *     autoFormArgs: {},
 *     callback: () => {},
 *     excludeList: ['id'],
 *     onDelete: () => {},
 *     onEdit: () => {},
 *     tableType: 'UserTable',
 *   },
 * };
 *
 * <DataTable
 *   columnsData={columnsConfig}
 *   data={usersData}
 * />
 */
export default function DataTable<TData, TValue>(
  inputProps: DataTableProps<TData>
) {
  const {
    columnsData,
    data,
    action,
    isLoading,
    rowCount,
    fetchRequest,
    renderSubComponent,
    showView = true,
    onDataUpdate,
    detailedFilter,
    classNames,
  } = inputProps;
  const [tableData, setTableData] = useState<TData[]>(data || []);
  const isMultipleActionProvided = Array.isArray(action);
  const [isOpen, setIsOpen] = useState(false);
  let defaultAction: TableAction | undefined;
  if (action) {
    defaultAction = isMultipleActionProvided ? action[0] : action;
  }
  const [activeAction, setActiveAction] = React.useState<
    TableAction | undefined
  >(defaultAction);
  const [triggerData, setTriggerData] = useState<any>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filteredColumns, setFilteredColumns] = useState<ColumnFilter[]>(() => {
    if (detailedFilter) {
      return detailedFilter.filter((i) => i.value);
    }
    return [];
  });

  useEffect(() => {
    if (isLoading) {
      setTableData(Array(6).fill({}) as TData[]);
    } else {
      setTableData(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    onDataUpdate?.(tableData);
    setIsOpen(false);
  }, [tableData, onDataUpdate]);

  let columns: ColumnDef<any, any>[] = [];
  if (columnsData.type === 'Auto') {
    columns = columnsGenerator(columnsData.data as AutoColumnGenerator);
  } else {
    columns = columnsData.data.columns as ColumnDef<TData, TValue>[];
  }
  if (isLoading) {
    columns = columns.map((column) => ({
      ...column,
      cell: SkeletonCell,
    }));
  }
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: rowCount || tableData.length,
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: true,
    getRowCanExpand: () => !!renderSubComponent,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (row) => {
      if (isLoading) return;
      setRowSelection(row);
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    meta: {
      removeRow: (rowIndex) => {
        setTableData((old) => old.filter((_row, index) => index !== rowIndex));
        table.resetRowSelection();
      },
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const selectedRows = table?.getSelectedRowModel()?.rows || [];

  useEffect(() => {
    const filter: FilterColumnResult = {};
    filteredColumns.forEach((column: ColumnFilter) => {
      if (column.type === 'select-multiple' || column.type === 'select-async') {
        filter[column.name] = column.value.split(',').filter((i) => i);
      } else {
        filter[column.name] = column.value;
      }
    });

    fetchRequest?.(table.getState().pagination.pageIndex, filter);
  }, [table.getState().pagination.pageIndex, filteredColumns]);

  const getNonSelectedFilters = () =>
    detailedFilter?.filter(
      (column) =>
        filteredColumns?.findIndex((f) => f.name === column.name) === -1
    ) || [];

  return (
    <div className={cn('flex flex-col p-4', classNames?.container)}>
      {activeAction &&
        isOpen &&
        (activeAction.type === 'Dialog' || activeAction.type === 'Sheet') && (
          <CustomTableActionDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            action={activeAction}
            type={activeAction?.type}
            triggerData={triggerData}
          />
        )}
      {(showView || defaultAction) && (
        <div
          className={cn(
            'flex items-center gap-2',
            classNames?.actions?.container
          )}
        >
          {showView === true &&
            (isLoading ? (
              <Skeleton className="ml-auto h-9 w-32" />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="ml-auto"
                  >
                    View <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {normalizeName(column.id)}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

          <div className={cn('flex', classNames?.actions?.wrapper)}>
            {isLoading ? (
              <Skeleton className="w-36 h-9" />
            ) : (
              <ActionComponent
                action={defaultAction}
                callback={() => {
                  setTriggerData(null);
                  setActiveAction(defaultAction);
                  setIsOpen(true);
                }}
                className={isMultipleActionProvided ? 'rounded-r-none' : ''}
              />
            )}
            {isMultipleActionProvided && action.length > 1 && !isLoading && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="rounded-l-none border-l-0 px-2"
                  >
                    <ChevronDownIcon className="" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {action
                    .filter((i) => i !== action[0])
                    .map((actionItem) => (
                      <DropdownMenuItem
                        asChild
                        key={getCTA(actionItem.cta, triggerData)}
                        className="cursor-pointer"
                      >
                        <ActionComponent
                          action={actionItem}
                          callback={() => {
                            setTriggerData(null);
                            setActiveAction(actionItem);
                            if (actionItem.type === 'Action') {
                              actionItem.callback(null);
                              return;
                            }
                            setIsOpen(true);
                          }}
                          className="w-full border-none"
                        />
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      <div className={cn('my-3', classNames?.filters?.container)}>
        {detailedFilter && (
          <div className="flex gap-2">
            {filteredColumns && filteredColumns.length >= 2 && (
              <Badge
                variant="outline"
                className="rounded-full cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setFilteredColumns([])}
              >
                Clear All
              </Badge>
            )}
            <div className={cn('flex', classNames?.filters?.items)}>
              {filteredColumns &&
                filteredColumns.map((column) => (
                  <FilterColumn
                    key={column.name}
                    column={column}
                    setFilteredColumns={setFilteredColumns}
                  />
                ))}
              {getNonSelectedFilters().length > 0 && (
                <FilterButton
                  detailedFilter={detailedFilter}
                  filteredColumns={filteredColumns}
                  isLoading={isLoading || false}
                  setFilteredColumns={setFilteredColumns}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className={cn('overflow-auto', classNames?.table?.wrapper)}>
        <Table
          wrapperClassName={cn(
            'flex-1 border rounded-md',
            classNames?.table?.container
          )}
        >
          <TableHeader
            className={cn(
              'sticky top-0 bg-slate-100 z-10',
              classNames?.table?.header
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="whitespace-nowrap">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
                {!isLoading && (
                  <TableHead
                    key="actions"
                    className={cn(
                      'sticky right-0  bg-gray-100 text-transparent'
                    )}
                  >
                    actions
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={cn(classNames?.table?.body)}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className="whitespace-nowrap"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          ) as JSX.Element
                        }
                      </TableCell>
                    ))}
                    {!isLoading && (
                      <TableCell
                        key="actions"
                        className={cn(
                          'sticky right-0 p-0 m-0 max-w-max border-l-2 bg-white'
                        )}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="rounded-none outline-none"
                            >
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                navigator.clipboard.writeText(row.original.id)
                              }
                            >
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            {// @ts-ignore
                            columnsData.data?.actionList?.map((action) => (
                              <DropdownMenuItem
                                key={getCTA(action.cta, row.original)}
                                onClick={() => {
                                  if ('loadingContent' in action) {
                                    setActiveAction(action);
                                    if (action?.callback) {
                                      action
                                        ?.callback(row.original)
                                        .then((res: JSX.Element) => {
                                          setActiveAction({
                                            ...action,
                                            content: res,
                                          });
                                        });
                                    }
                                  } else if (action.type === 'Action') {
                                    action.callback(row.original);
                                    return;
                                  } else {
                                    setActiveAction(action);
                                  }
                                  setTriggerData(row.original);
                                  setIsOpen(true);
                                }}
                              >
                                {getCTA(action.cta, row.original)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableFooter
        inputProps={inputProps}
        table={table}
        selectedRows={selectedRows}
        setTableData={setTableData}
        tableData={tableData}
      />
    </div>
  );
}
