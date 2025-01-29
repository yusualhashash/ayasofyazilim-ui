import { WidgetProps } from '@rjsf/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldLabel } from '../custom/label';
import { fieldOptionsByDependency } from '../utils/dependency';

export const CustomCheckbox = (props: WidgetProps) => {
  const {
    uiSchema,
    id,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    name,
    label,
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
    <div className="flex items-center gap-2 h-9">
      <Checkbox
        id={id}
        className={className}
        onCheckedChange={() => {
          onChange(!value);
        }}
        checked={value}
        defaultValue={value || defaultValue}
        name={name}
        disabled={fieldOptions.disabled}
      />
      <FieldLabel id={id} label={label} required={fieldOptions.required} />
    </div>
  );
};
