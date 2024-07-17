import { PhoneInput } from 'react-international-phone';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import 'react-international-phone/style.css';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormPhone({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
        <FormControl>
          <PhoneInput
            defaultCountry="tr"
            value={field.value}
            onChange={field.onChange}
            inputClassName="flex-1"
            countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
          />
        </FormControl>
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />

        <FormMessage />
      </FormItem>
    </div>
  );
}
