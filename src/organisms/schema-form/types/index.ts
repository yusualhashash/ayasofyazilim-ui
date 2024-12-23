import { FormProps } from '@rjsf/core';
import {
  UiSchema as BaseUiSchema,
  GenericObjectType,
  ErrorSchema as BaseErrorSchema,
  FormValidation as BaseFormValidation,
} from '@rjsf/utils';

import type {
  FieldProps as BaseFieldProps,
  TemplatesType as BaseTemplatesType,
  WidgetProps as BaseWidgetProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

export type FormContext = {
  locale?: string;
};
export type ErrorSchema = BaseErrorSchema;
export type FormValidation<T> = BaseFormValidation<T>;
export type UiSchema = BaseUiSchema & { 'ui:config'?: FormContext };
export interface SchemaFormProps<T>
  extends Omit<FormProps<T>, 'validator' | 'uiSchema'> {
  defaultSubmitClassName?: string;
  filter?: FilterType<T>;
  schema: GenericObjectType;
  submitText?: string;
  uiSchema?: UiSchema;
  useDefaultSubmit?: boolean;
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
  keys: Array<keyof Partial<T> | string>;
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
export type WidgetProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
> = BaseWidgetProps<T, S, FormContext>;

export type FieldProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
> = BaseFieldProps<T, S, FormContext>;

export type TemplatesType<
  T,
  S extends StrictRJSFSchema = RJSFSchema,
> = BaseTemplatesType<T, S, FormContext>;
