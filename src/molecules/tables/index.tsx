'use client';

import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AutoFormProps } from '../../organisms/auto-form';
import CustomTableActionDialog from '../dialog';
import { columnsGenerator } from './columnsGenerator';
import FilterColumn, { ColumnFilter } from './filter-colum';
import { normalizeName } from './utils';

export type { ColumnFilter };

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    removeRow: (
      rowIndex: number,
      columnId: string,
      value: unknown | TData
    ) => void;
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown | TData
    ) => void;
  }
}

export type TableAction = TableActionCommon &
  (TableActionNewPage | TableActionDialog | TableActionAction);

export type TableActionCommon = {
  cta: string;
};

export type TableActionNewPage = {
  href: string;
  type: 'NewPage';
};

export type TableActionAutoform = {
  autoFormArgs: AutoFormProps;
  callback: (values: any, triggerData?: unknown) => void;
  componentType: 'Autoform';
};
export type TableActionCustom = {
  componentType: 'CustomComponent';
} & tableActionContent;

export type tableActionContent = {
  callback?: (values?: any) => Promise<JSX.Element>;
  content?: JSX.Element;
  loadingContent: JSX.Element;
};

export type TableActionDialog = {
  description: string;
  type: 'Dialog' | 'Sheet';
} & (TableActionAutoform | TableActionCustom);
export type TableActionAction = {
  callback: (values: any) => void;
  type: 'Action';
};

export type AutoColumnGenerator = {
  actionList?: TableAction[];
  autoFormArgs: any;
  callback: any;
  dialogDescription?: any;
  dialogTitle?: any;
  excludeList: string[];
  onDelete: (e: any, originalRow: any) => void;
  onEdit: (e: any, originalRow: any) => void;
  positions?: string[];
  selectable?: boolean;
  tableType: any;
};

export type ColumnsType = ColumnsCustomType | ColumntAuotType;
type ColumnsCustomType = {
  data: ColumnDef<any>[];
  type: 'Custom';
};

type ColumntAuotType = {
  data: AutoColumnGenerator;
  type: 'Auto';
};

export type DataTableProps<TData> = {
  Headertable?: any;
  action?: TableAction | TableAction[];
  columnsData: ColumnsType;
  data: TData[];
  detailedFilter?: ColumnFilter[];
  editable?: boolean;
  fetchRequest?: any;
  isLoading?: boolean;
  onDataUpdate?: (data: TData[]) => void;
  renderSubComponent?: (row: any) => JSX.Element;
  rowCount?: number;
  showView?: boolean;
};
const SkeletonCell = () => <Skeleton className="w-20 h-3" />;

const ActionComponent = ({
  action,
  callback,
  className,
}: {
  action?: TableAction;
  callback?: Function;
  className?: string;
}) => {
  if (!action) return null;
  if (action.type === 'NewPage') {
    return (
      <Link href={action.href || 'add'}>
        <Button variant="outline" className={className}>
          {action.cta}
        </Button>
      </Link>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (callback) callback();
      }}
      className={className}
    >
      {action.cta}
    </Button>
  );
};

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

export default function DataTable<TData, TValue>({
  columnsData,
  data,
  action,
  isLoading,
  rowCount,
  fetchRequest,
  renderSubComponent,
  showView = true,
  editable = false,
  Headertable,
  onDataUpdate,
  detailedFilter,
}: DataTableProps<TData>) {
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
  const [filteredColumns, setFilteredColumns] = useState<ColumnFilter[]>([]);

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
    columns = columnsData.data as ColumnDef<TData, TValue>[];
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
    const filter: { [key: string]: string } = {};
    filteredColumns.forEach((column: ColumnFilter) => {
      filter[column.name] = column.value;
    });
    const filterString = JSON.stringify(filter);

    fetchRequest?.(table.getState().pagination.pageIndex, filterString);
  }, [table.getState().pagination.pageIndex, filteredColumns]);

  function selectedRowsText() {
    if (isLoading) return 'Loading...';
    return `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`;
  }

  const handleAddRow = () => {
    const newRow = Headertable;
    setTableData((prevData) => [...prevData, newRow]);
  };

  const handleRemoveSelected = useCallback(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row: any) => row.index);
    setTableData((old) =>
      old.filter((_row, index) => !selectedRows.includes(index))
    );
    table.resetRowSelection();
  }, [tableData]);

  return (
    <div className="w-full">
      {activeAction &&
        isOpen &&
        ('autoFormArgs' in activeAction || 'content' in activeAction) && (
          <CustomTableActionDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            action={activeAction}
            type={activeAction?.type}
            triggerData={triggerData}
          />
        )}

      <div className="flex items-center py-4 gap-2">
        {showView === true && (
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
        )}

        <div className="flex">
          <ActionComponent
            action={defaultAction}
            callback={() => {
              setTriggerData(null);
              setActiveAction(defaultAction);
              setIsOpen(true);
            }}
            className={isMultipleActionProvided ? 'rounded-r-none' : ''}
          />
          {isMultipleActionProvided && action.length > 1 && (
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
                      key={actionItem.cta}
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
      <div className="mb-2">
        {filteredColumns &&
          filteredColumns.map((column) => (
            <FilterColumn
              key={column.name}
              column={column}
              setFilteredColumns={setFilteredColumns}
            />
          ))}
        {detailedFilter &&
          detailedFilter?.filter(
            (column) =>
              filteredColumns?.findIndex((f) => f.name === column.name) === -1
          )?.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={isLoading}
                  variant="outline"
                  className="border px-3 py-1 border-gray-300 rounded-full text-xs mr-2 h-auto"
                >
                  Filter <PlusIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {detailedFilter
                  .filter(
                    (column) =>
                      filteredColumns.findIndex(
                        (f) => f.name === column.name
                      ) === -1
                  )
                  .map((column) => (
                    <DropdownMenuItem
                      key={column.name}
                      className="capitalize"
                      onClick={() =>
                        setFilteredColumns((old) => [...old, column])
                      }
                    >
                      {column.displayName}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
      </div>
      <div className="rounded-md border relative w-full">
        <Table wrapperClassName="h-[500px] overflow-y-auto">
          <TableHeader className="sticky top-0 bg-slate-100 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                <TableHead key="actions" />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
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
                    <TableCell className={cn('sticky right-0 bg-white')}>
                      <Separator
                        orientation="vertical"
                        className="absolute left-0 top-0"
                      />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            // @ts-ignore
                            onClick={() =>
                              navigator.clipboard.writeText(row.original.id)
                            }
                          >
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => {
                              // @ts-ignore
                              columnsData.data?.onDelete(e, row.original);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>

                          {// @ts-ignore
                          columnsData.data?.actionList?.map((action) => (
                            <DropdownMenuItem
                              key={action.cta}
                              onClick={() => {
                                if (action.loadingContent) {
                                  setActiveAction({
                                    ...action,
                                    content: action.loadingContent,
                                  });
                                  action
                                    .callback(row.original)
                                    .then((res: JSX.Element) => {
                                      setActiveAction({
                                        ...action,
                                        content: res,
                                      });
                                    });
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
                              {action.cta}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedRowsText()}
        </div>
        {editable ? (
          <div className="footer-buttons bg-white">
            <div className="flex w-full justify-end items-end gap-5 py-3 px-3">
              {selectedRows?.length > 0 && (
                <Button
                  className="remove-button w-44 h-10 flex items-center justify-center"
                  variant="outline"
                  onClick={handleRemoveSelected}
                >
                  Remove Selected
                  <Trash2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button
                className="add-button w-44 h-10 flex items-center justify-center"
                variant="outline"
                onClick={handleAddRow}
              >
                Add New +
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
