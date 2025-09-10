import { WidgetProps } from '@rjsf/utils';
import { Textarea } from '@/components/ui/textarea';
import { fieldOptionsByDependency } from '../utils/dependency';
import { cn } from '@/lib/utils';

export const CustomTextareaInput = (props: WidgetProps) => {
  const { required, className, id, uiSchema, disabled, onChange, value } =
    props;
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
    <Textarea
      id={id}
      data-testid={id}
      className={cn('min-h-10', className)}
      required={required}
      onChange={(event) => {
        if (event.target.value === '') {
          onChange(undefined);
        } else {
          onChange(event.target.value);
        }
      }}
      defaultValue={value || props.defaultValue}
      readOnly={props.readOnly}
      disabled={fieldOptions.disabled}
    />
  );
};
