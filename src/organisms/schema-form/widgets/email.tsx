import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { fieldOptionsByDependency } from '../utils/dependency';
import { cn } from '@/lib/utils';
import { EmailInput } from '../../../molecules/email-input/email';

export const EmailInputWidget = (props: WidgetProps) => {
  const {
    uiSchema,
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
  const [email, setEmail] = useState(value || '');
  return (
    <EmailInput
      id="validation-email"
      value={email}
      onValueChange={(val) => {
        setEmail(val);
        onChange(val);
      }}
      defaultValue={defaultValue}
      readOnly={readOnly}
      placeholder="Try typing 'john@gmail.com'"
      className={cn('w-full', className)}
      suggestions={uiSchema?.['ui:baseList'] ?? []}
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
