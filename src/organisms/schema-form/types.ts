import { FormProps } from '@rjsf/core';
import { GenericObjectType } from '@rjsf/utils';

export interface SchemaFormProps extends Omit<FormProps, 'validator'> {
  filter: FilterType;
  schema: GenericObjectType;
  usePhoneField?: boolean;
}
export type FilterType = {
  keys?: string[];
  type: 'exclude' | 'include' | 'full';
};
