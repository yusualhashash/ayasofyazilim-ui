import { ColumnDef } from '@tanstack/react-table';
import { ComponentType } from 'react';
import { ZodObjectOrWrapped } from 'src/organisms/auto-form';
import { z } from 'zod';

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

export type TanstackTableRowActionsLink<TData> = {
  onClick: (row: TData) => void;
  type: 'link';
};

export type TanstackTableRowDialog<TData> = {
  cancelText: string;
  confirmationText: string;
  onCancel: (row: TData) => void;
  onConfirm: (row: TData) => void;
  title: string | ((row: TData) => string);
};
export type TanstackTableRowActionsCustomDialog<TData> =
  TanstackTableRowDialog<TData> & {
    content: JSX.Element | ((row: TData) => JSX.Element);
    type: 'custom-dialog';
  };
export type TanstackTableRowActionsConfirmationDialog<TData> =
  TanstackTableRowDialog<TData> & {
    description: string;
    type: 'confirmation-dialog';
  };
export type TanstackTableRowActionsAutoformDialog<TData> = Omit<
  TanstackTableRowDialog<TData>,
  'cancelText' | 'onCancel' | 'confirmationText' | 'onConfirm'
> & {
  className?: { autoform: string; submit: string };
  onSubmit: (row: TData, values: Partial<z.infer<ZodObjectOrWrapped>>) => void;
  schema: ZodObjectOrWrapped;
  submitText: string;
  type: 'autoform-dialog';
  values?: (row: TData) => Partial<z.infer<ZodObjectOrWrapped>>;
};
export type TanstackTableRowActionsType<TData> = {
  cta: string;
  icon?: ComponentType<{ className?: string }>;
} & (
  | TanstackTableRowActionsConfirmationDialog<TData>
  | TanstackTableRowActionsLink<TData>
  | TanstackTableRowActionsCustomDialog<TData>
  | TanstackTableRowActionsAutoformDialog<TData>
);
