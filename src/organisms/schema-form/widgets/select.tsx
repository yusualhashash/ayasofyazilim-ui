import { WidgetProps } from '@rjsf/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const CustomSelect = (props: WidgetProps) => {
  const { label, options, onChange, value, defaultValue, disabled } = props;
  const _value = value?.toString() || defaultValue?.toString();
  const hasValue = !!_value;
  return (
    <Select
      defaultValue={_value}
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <SelectTrigger
        className={hasValue ? 'text-black ' : 'text-muted-foreground'}
        disabled={disabled}
      >
        <SelectValue
          placeholder={
            _value ||
            props?.uiSchema?.['ui:placeholder'] ||
            `Please select an ${label.toLocaleLowerCase()}`
          }
        />
      </SelectTrigger>
      <SelectContent>
        {options.enumOptions?.map((enumOption) => (
          <SelectItem
            key={JSON.stringify(enumOption.value)}
            value={enumOption.value.toString()}
          >
            {enumOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
