import { WidgetProps } from '@rjsf/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const AsyncSelect = (props: WidgetProps) => (
  <Select
    autoComplete="on"
    onValueChange={(data) => {
      if (props.uiSchema?.onChange) props.uiSchema.onChange(data);
      props.onChange(data);
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder={props.placeholder} />
    </SelectTrigger>
    <SelectContent>
      {props.uiSchema?.enum?.map((option: Record<string, string>) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
