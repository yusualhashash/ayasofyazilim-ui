import { WidgetProps } from '@rjsf/utils';
import { Checkbox } from '@/components/ui/checkbox';

export const CustomCheckbox = (props: WidgetProps) => (
  <div className="flex items-center gap-2 h-9">
    <Checkbox
      id={props.id}
      className={props.className}
      onCheckedChange={() => {
        props.onChange(!props.value);
      }}
      checked={props.value}
      defaultValue={props.value || props.defaultValue}
      name={props.name}
    />
    <label htmlFor={props.id}>{props.label}</label>
  </div>
);
