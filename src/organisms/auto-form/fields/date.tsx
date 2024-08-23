import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormDate({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const params = fieldProps;
  delete params.containerClassName;
  return (
    <FormItem className={fieldProps.containerClassName}>
      <AutoFormLabel label={label} isRequired={isRequired} />
      <FormControl>
        <DatePicker date={field.value} setDate={field.onChange} {...params} />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
