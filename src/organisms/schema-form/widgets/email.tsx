import { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';
import { fieldOptionsByDependency } from '../utils/dependency';
import { cn } from '@/lib/utils';

export const EmailInputWidget = (props: WidgetProps) => {
  const {
    uiSchema,
    id,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
  } = props;
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
      type="email"
      id={id}
      className={cn('h-10', className)}
      required={required}
      onChange={(event) => {
        if (event.target.value === '') {
          onChange(undefined);
        } else {
          onChange(event.target.value);
        }
      }}
      defaultValue={value || defaultValue}
      readOnly={readOnly}
      disabled={fieldOptions.disabled}
    />
  );
};
