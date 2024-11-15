import { FormProps } from '@rjsf/core';
import { GenericObjectType } from '@rjsf/utils';

export interface SchemaFormProps<T> extends Omit<FormProps, 'validator'> {
  defaultSubmitClassName?: string;
  filter?: FilterType<T>;
  schema: GenericObjectType;
  submitText?: string;
  useDefaultSubmit?: boolean;
  usePhoneField?: boolean;
  withScrollArea?: boolean;
}

export type FilterType<T> = CommonFilterType<T> &
  (
    | SortableFilterType
    | {
        type: 'fullExclude';
      }
  );
export type CommonFilterType<T> = {
  keys: Array<keyof T>;
};
type SortableFilterType = {
  sort?: boolean;
  type: 'include' | 'exclude';
};

export type FilteredObject<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<any>
      ? T[K] // Keep arrays as they are
      : FilteredObject<T[K]>
    : T[K] extends undefined
      ? never
      : T[K];
};

export type { WidgetProps, FieldProps, TemplatesType } from '@rjsf/utils';
