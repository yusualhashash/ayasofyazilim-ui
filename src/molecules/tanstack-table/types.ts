import { ColumnDef } from '@tanstack/react-table';
import { ComponentType } from 'react';

export type TanstackTableProps<TData, TValue> = {
  actions?: TanstackTableRowActionsType<TData>[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  excludeColumns?: string[];
  filters?: TanstackTableFiltersType;
};

export type TanstackTableFacetedFilterType = {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: string;
};
export type TanstackTableFiltersType = {
  facetedFilters?: Record<string, TanstackTableFacetedFilterType[]>;
  textFilters?: string[];
};

export type TanstackTableColumnLink = {
  prefix: string;
  suffix?: string;
  targetAccessorKey?: string;
};

export type TanstackTableRowActionsConfirmationDialog<TData> = {
  cancelText: string;
  confirmationText: string;
  description: string;
  onCancel: (row: TData) => void;
  onConfirm: (row: TData) => void;
  title: string | ((row: TData) => string);
  type: 'confirmation-dialog';
};
export type TanstackTableRowActionsType<TData> = {
  cta: string;
  icon?: ComponentType<{ className?: string }>;
} & TanstackTableRowActionsConfirmationDialog<TData>;
