import { WidgetProps } from '@rjsf/utils';
import { Textarea } from '@/components/ui/textarea';

export const CustomTextareaInput = (props: WidgetProps) => {
  const { required, className, id, schema, disabled, onChange, value } = props;
  const disabledByDependency = schema.disabled;
  return (
    <Textarea
      id={id}
      className={className}
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
      disabled={disabled || disabledByDependency}
    />
  );
};
