import { WidgetProps } from '@rjsf/utils';
import { Switch } from '@/components/ui/switch';
import { FieldLabel } from '../custom/label';
import { fieldOptionsByDependency } from '../utils/dependency';

export const CustomSwitch = (props: WidgetProps) => {
  const {
    id,
    className,
    name,
    label,
    onChange,
    value,
    defaultValue,
    disabled,
    uiSchema,
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
      <Switch
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
      <FieldLabel id={id} required={fieldOptions.required} label={label} />
    </div>
  );
};
