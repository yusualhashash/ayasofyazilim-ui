'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ColumnFilter } from './filter-column';
import { TableAction, TableActionCommon } from './types';

export const SkeletonCell = () => <Skeleton className="w-20 h-3" />;

export const ActionComponent = ({
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
          {action.cta?.toString()}
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
      {action.cta?.toString()}
    </Button>
  );
};

export function getCTA<T>(
  cta: TableActionCommon<T>['cta'],
  triggerData: T
): string {
  if (typeof cta === 'function') {
    return cta(triggerData);
  }
  return cta || '';
}

export const FilterButton = ({
  detailedFilter,
  isLoading,
  setFilteredColumns,
  filteredColumns,
}: {
  detailedFilter: ColumnFilter[];
  filteredColumns: ColumnFilter[];
  isLoading: boolean;
  setFilteredColumns: Dispatch<SetStateAction<ColumnFilter[]>>;
}) => (
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
            filteredColumns.findIndex((f) => f.name === column.name) === -1
        )
        .map((column) => (
          <DropdownMenuItem
            key={column.name}
            className="capitalize"
            onClick={() => setFilteredColumns((old) => [...old, column])}
          >
            {column.displayName}
          </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
