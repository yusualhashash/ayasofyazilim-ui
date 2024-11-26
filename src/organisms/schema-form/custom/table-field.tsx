import { FieldProps } from '@rjsf/utils';
import { useMemo } from 'react';
import TanstackTable from '../../../molecules/tanstack-table';
import { TanstackTableProps } from '../../../molecules/tanstack-table/types';
import { ErrorSchemaTemplate } from '../fields';
import { Label } from '@/components/ui/label';

type TableFieldProps<TData> = Omit<
  TanstackTableProps<TData, TData>,
  'onTableDataChange'
>;

export function TableField<TData>({ ...tableProps }: TableFieldProps<TData>) {
  const Field = (props: FieldProps) => {
    const { uiSchema } = props;
    const title = uiSchema?.['ui:title'];
    const memory = useMemo(
      () => (
        <div className="flex flex-col border rounded-md p-4">
          {title && <Label>{title}</Label>}
          <TanstackTable
            {...tableProps}
            onTableDataChange={(data) => {
              props.onChange(data);
            }}
          />
          <ErrorSchemaTemplate errorSchema={props.errorSchema} />
        </div>
      ),
      [props.errorSchema]
    );
    return memory;
  };
  return Field;
}
