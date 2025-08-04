import { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';
import { fieldOptionsByDependency } from '../utils/dependency';
import { cn } from '@/lib/utils';
import { EmailInput } from '../../../molecules/email-input/email';

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
    <EmailInput
      id={id}
      className={cn('', className)}
      required={required}
      onChange={(value) => {
        if (value === '') {
          onChange(undefined);
        } else {
          onChange(value);
        }
      }}
      defaultValue={value || defaultValue}
      value={value}
      baseList={uiSchema?.['ui:baseList'] ?? []}
      readOnly={readOnly}
      disabled={fieldOptions.disabled}
      autoComplete={uiSchema?.['ui:autocomplete'] ?? 'off'}
    />
  );
};

export const EmailInputWidgetOld = (props: WidgetProps) => {
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
