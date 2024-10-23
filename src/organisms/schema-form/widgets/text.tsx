import { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';

export const CustomTextInput = (props: WidgetProps) => (
  <Input
    type={props.uiSchema?.['ui:inputType'] || props.type}
    id={props.id}
    className={props.className}
    required={props.required}
    onChange={(event) => props.onChange(event.target.value)}
    defaultValue={props.value || props.defaultValue}
    readOnly={props.readOnly}
    disabled={props.disabled || props.readOnly}
  />
);
