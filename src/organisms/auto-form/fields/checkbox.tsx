import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem } from '@/components/ui/form';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';
import AutoFormLabel from '../common/label';
import { cn } from '@/lib/utils';

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const params = fieldProps;
  delete params.containerClassName;
  return (
    <>
      <FormItem>
        <div
          className={cn(
            'mb-3 flex items-center gap-3',
            fieldConfigItem.containerClassName
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...params}
            />
          </FormControl>
          <AutoFormLabel label={label} isRequired={isRequired} />
        </div>
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </>
  );
}
