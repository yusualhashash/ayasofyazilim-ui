import { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';
import { fieldOptionsByDependency } from '../utils/dependency';

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
  if (fieldOptions.hidden) return null;
  return (
    <Input
      type="email"
      id={id}
      className={className}
      required={required}
      onChange={(event) => onChange(event.target.value)}
      defaultValue={value || defaultValue}
      readOnly={readOnly}
      disabled={fieldOptions.disabled}
    />
  );
};
