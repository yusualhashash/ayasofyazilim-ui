import { WidgetProps } from '@rjsf/utils';
import { Input } from '@/components/ui/input';

export const EmailInputWidget = (props: WidgetProps) => (
  <Input
    type="email"
    id={props.id}
    className={props.className}
    required={props.required}
    onChange={(event) => props.onChange(event.target.value)}
    defaultValue={props.value || props.defaultValue}
    readOnly={props.readOnly}
    disabled={props.disabled}
  />
);
