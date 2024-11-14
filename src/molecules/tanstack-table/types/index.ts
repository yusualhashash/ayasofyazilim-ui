import { ColumnDef } from '@tanstack/react-table';
import { ComponentType } from 'react';
import { z } from 'zod';
import { ZodObjectOrWrapped } from '../../../organisms/auto-form/utils';

export type TanstackTableProps<TData, TValue> = {
  columnOrder?: (keyof TData)[];
  columnVisibility?: {
    columns: (keyof TData)[];
    type: 'show' | 'hide';
  };
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  excludeColumns?: (keyof TData)[];
  filters?: TanstackTableFiltersType;
  pinColumns?: (keyof TData)[];
  rowActions?: TanstackTableRowActionsType<TData>[];
  selectedRowAction?: TanstackTableSelectedRowActionType;
  tableActions?: TanstackTableTableActionsType[];
};
export type TanstackTableCellCondition = {
  conditionAccessorKey: string;
  when: (value: string | boolean | number | Date) => boolean;
};
export type TanstackTableColumnClassNames = {
  className?: string;
  conditions: TanstackTableCellCondition[];
};
export type TanstackTableFacetedFilterType = {
  className?: string;
  icon?: ComponentType<{ className?: string }>;
  iconClassName?: string;
  label: string;
  value: string;
};
export type TanstackTableFiltersType = {
  facetedFilters?: Record<
    string,
    {
      defaultValue?: string[];
      options: TanstackTableFacetedFilterType[];
    }
  >;
  textFilters?: string[];
};

export type TanstackTableColumnLink = {
  conditions?: TanstackTableCellCondition[];
  prefix: string;
  suffix?: string;
  targetAccessorKey?: string;
};
export type TanstackTableColumnBadge = {
  className?: string;
  hideColumnValue?: boolean;
  values: {
    badgeClassName?: string;
    conditions?: TanstackTableCellCondition[];
    label: string;
  }[];
};
export type TanstackTableColumnDate = {
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
};
export type TanstackTableColumnIcon = {
  icon?: ComponentType<{ className?: string }>;
  iconClassName?: string;
  position?: 'before' | 'after';
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
    cancelText: string;
    confirmationText: string;
    description: string;
    onCancel?: (row: TData) => void;
    onConfirm: (row: TData) => void;
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
export type TanstackTableLanguageDataType = Record<string, string>;
export type TanstackTableLanguageDataTypeWithConstantKey = {
  constantKey: string;
  languageData: Record<string, string>;
};
