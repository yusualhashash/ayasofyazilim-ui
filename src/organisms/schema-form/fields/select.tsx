import { WidgetProps } from '@rjsf/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const CustomSelect = (props: WidgetProps) => (
  <Select
    defaultValue={props.value || props.defaultValue}
    value={props.value || props.defaultValue}
    onValueChange={(value) => {
      props.onChange(value);
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="aaaaa" />
    </SelectTrigger>
    <SelectContent>
      {props.options.enumOptions?.map((enumOption) => (
        <SelectItem
          key={JSON.stringify(enumOption.value)}
          value={enumOption.value}
        >
          {enumOption.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
