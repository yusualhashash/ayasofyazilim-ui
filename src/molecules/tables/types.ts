import { ColumnDef, RowData } from '@tanstack/react-table';
import { AutoFormProps } from '../../organisms/auto-form';
import { ColumnFilter } from './filter-column';

export type { ColumnFilter };
export type FilterColumnResult = { [key: string]: string | string[] };
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

export type TableAction<T = undefined> = TableActionCommon<
  undefined extends T ? any : T
> &
  (TableActionNewPage | TableActionDialog | TableActionAction);

export type TableActionCommon<T = undefined> = {
  cta: string | ((triggerData?: T) => string);
};

export type TableActionDialog = {
  description: string | ((triggerData?: unknown) => string);
  type: 'Dialog' | 'Sheet';
} & (TableActionAutoform | TableActionCustom | TableActionConfirmation);

export type TableActionNewPage = {
  href: string;
  type: 'NewPage';
};

export type TableActionAutoform = {
  autoFormArgs: {
    submit?: {
      className?: string;
      cta?: string;
    };
  } & AutoFormProps;
  callback: (values: any, triggerData?: unknown) => void;
  componentType: 'Autoform';
};
export type TableActionCustom = {
  callback?: (values?: any) => Promise<JSX.Element>;
  componentType: 'CustomComponent';
  content?: JSX.Element;
  loadingContent: JSX.Element;
};
export type TableActionConfirmation = {
  callback?: (values?: any) => void;
  cancelCTA?: string;
  componentType: 'ConfirmationDialog';
  content?: JSX.Element;
  variant: 'destructive' | 'default';
};

export type TableActionAction = {
  callback: (values: any) => void;
  type: 'Action';
};

export type AutoColumnGenerator<TData> = {
  actionList?: TableAction[];
  customCells?: Partial<Record<keyof TData, ColumnDef<TData>['cell']>>;
  excludeList: string[];
  positions?: string[];
  tableType: any;
} & (noSelectAbleColumns | selectableColumns);

export type selectableColumns = {
  onSelect: ({
    row,
    value,
    all,
  }: {
    all: boolean;
    row: unknown;
    value: boolean;
  }) => void;
  selectable: true;
};

type noSelectAbleColumns = {
  selectable?: false;
};

export type ColumnsType<TData> =
  | ColumnsCustomType<TData>
  | ColumnAutoType<TData>;
type ColumnsCustomType<TData> = {
  data: { actionList?: TableAction[]; columns: ColumnDef<TData>[] };
  type: 'Custom';
};

type ColumnAutoType<TData> = {
  data: AutoColumnGenerator<TData>;
  type: 'Auto';
};

export type DataTableClassNames = {
  actions?: {
    container?: string;
    wrapper?: string;
  };
  container?: string;
  filters?: {
    container?: string;
    items?: string;
    wrapper?: string;
  };
  footer?: {
    buttons?: {
      container?: string;
      next?: string;
      previous?: string;
    };
    container?: string;
    editable?: {
      add?: string;
      container?: string;
      remove?: string;
      wrapper?: string;
    };
    selectedRows?: string;
  };
  table?: {
    body?: string;
    container?: string;
    header?: string;
    wrapper?: string;
  };
  tableWrapper?: string;
};
export type DataTableProps<TData> = {
  Headertable?: any;
  action?: TableAction | TableAction[];
  classNames?: DataTableClassNames;
  columnsData: ColumnsType<TData>;
  data: TData[];
  detailedFilter?: ColumnFilter[];
  editable?: boolean;
  fetchRequest?: (page: number, filter: FilterColumnResult) => void;
  isLoading?: boolean;
  onDataUpdate?: (data: TData[]) => void;
  renderSubComponent?: (row: any) => JSX.Element;
  rowCount?: number;
  showView?: boolean;
};
