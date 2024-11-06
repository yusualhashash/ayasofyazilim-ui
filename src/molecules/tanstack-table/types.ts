import { ColumnDef } from '@tanstack/react-table';

export type TanstackTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};
