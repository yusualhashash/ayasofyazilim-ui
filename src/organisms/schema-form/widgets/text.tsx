import { Input } from '@/components/ui/input';
import { fieldOptionsByDependency } from '../utils/dependency';
import { WidgetProps } from '../types';

export const CustomTextInput = (props: WidgetProps) => {
  const { uiSchema, required, className, id, disabled, onChange, value } =
    props;
  const uiOptions = uiSchema?.['ui:options'];
  const dependencyOptions = fieldOptionsByDependency(
    uiSchema,
    props.formContext
  );
  const fieldOptions = {
    disabled,
    required,
    ...dependencyOptions,
  };
  if (fieldOptions.hidden) {
    onChange(undefined);
    return null;
  }
  return (
    <Input
      type={uiOptions?.inputType || 'text'}
      id={id}
      className={className}
      required={fieldOptions.required}
      onChange={(event) => {
        if (event.target.value === '') {
          onChange(undefined);
        } else {
          onChange(event.target.value);
        }
      }}
      defaultValue={value ?? props.defaultValue}
      readOnly={props.readOnly}
      disabled={fieldOptions.disabled}
    />
  );
};
