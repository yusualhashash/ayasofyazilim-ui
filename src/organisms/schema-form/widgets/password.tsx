import { WidgetProps } from '@rjsf/utils';
import { PasswordInput } from '../../../molecules/password-input';
import { fieldOptionsByDependency } from '../utils/dependency';

export const PasswordInputWidget = (props: WidgetProps) => {
  const {
    uiSchema,
    id,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    required,
    readOnly,
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
    <PasswordInput
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
