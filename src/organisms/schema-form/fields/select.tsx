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
    onValueChange={(value) => {
      props.onChange(JSON.parse(value));
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder={props.placeholder} />
    </SelectTrigger>
    <SelectContent>
      {props.options.enumOptions?.map((enumOption) => (
        <SelectItem
          key={JSON.stringify(enumOption.value)}
          value={JSON.stringify(enumOption.value)}
        >
          {enumOption.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
