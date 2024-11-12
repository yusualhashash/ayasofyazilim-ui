import { ColumnDef } from '@tanstack/react-table';
import { ComponentType } from 'react';
import { ZodObjectOrWrapped } from 'src/organisms/auto-form';
import { z } from 'zod';

export type TanstackTableProps<TData, TValue> = {
  columnOrder?: (keyof TData)[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  excludeColumns?: string[];
  filters?: TanstackTableFiltersType;
  rowActions?: TanstackTableRowActionsType<TData>[];
  selectedRowAction?: TanstackTableSelectedRowActionType;
  tableActions?: TanstackTableTableActionsType[];
};

export type TanstackTableFacetedFilterType = {
  className?: string;
  icon?: ComponentType<{ className?: string }>;
  iconClassName?: string;
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
export type TanstackTableColumnBadge = {
  className?: string;
  hideColumnValue?: boolean;
  targetAccessorKey: string;
  values: { badgeClassName?: string; label: string; value: string }[];
};

export type TanstackTableRowActionsSimple<TData> = {
  onClick: (row: TData) => void;
  type: 'simple';
};

export type TanstackTableRowDialog<TData> = {
  cancelText?: string;
  confirmationText?: string;
  onCancel?: (row: TData) => void;
  onConfirm?: (row: TData) => void;
  title: string | ((row: TData) => string);
};
export type TanstackTableRowActionsCustomDialog<TData> =
  TanstackTableRowDialog<TData> & {
    cancelText?: string;
    confirmationText?: string;
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
  actionLocation: 'row';
  cta: string;
  icon?: ComponentType<{ className?: string }>;
} & (
  | TanstackTableRowActionsConfirmationDialog<TData>
  | TanstackTableRowActionsSimple<TData>
  | TanstackTableRowActionsCustomDialog<TData>
  | TanstackTableRowActionsAutoformDialog<TData>
);

export type TanstackTableActionsSimple = {
  actionLocation: 'table';
  onClick: () => void;
  type: 'simple';
};
export type TanstackTableActionsDialog = {
  cancelText?: string;
  confirmationText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  title: string;
};
export type TanstackTableActionsAutoformDialog = Omit<
  TanstackTableActionsDialog,
  'cancelText' | 'onCancel' | 'confirmationText' | 'onConfirm'
> & {
  className?: { autoform: string; submit: string };
  onSubmit: (values: Partial<z.infer<ZodObjectOrWrapped>>) => void;
  schema: ZodObjectOrWrapped;
  submitText: string;
  type: 'autoform-dialog';
  values?: Partial<z.infer<ZodObjectOrWrapped>>;
};
export type TanstackTableActionsCustomDialog = TanstackTableActionsDialog & {
  content: JSX.Element;
  type: 'custom-dialog';
};
export type TanstackTableTableActionsType = {
  actionLocation: 'table';
  cta: string;
  icon?: ComponentType<{ className?: string }>;
} & (
  | TanstackTableActionsSimple
  | TanstackTableActionsCustomDialog
  | TanstackTableActionsAutoformDialog
);
export type TanstackTableSelectedRowActionType = {
  actionLocation: 'table';
  cta: string;
  icon?: ComponentType<{ className?: string }>;
  onClick: (selectedIds: string[]) => void;
};
