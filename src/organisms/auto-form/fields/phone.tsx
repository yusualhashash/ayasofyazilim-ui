import { PhoneNumberUtil } from 'google-libphonenumber';
import { useEffect, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import 'react-international-phone/style.css';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';

let timeout: any;
export default function AutoFormPhone({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const [phoneError, setPhoneError] = useState(false);

  const isPhoneValid = (phone: string) => {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      const result = phoneUtil.isValidNumber(
        phoneUtil.parseAndKeepRawInput(phone)
      );
      setPhoneError(!result);
      return result;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      isPhoneValid(field.value);
    }, 400);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [field.value]);

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
          />
        </FormControl>
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        {phoneError && (
          <span className="text-red-500 text-sm">
            Lütfen geçerli bir telefon numarası giriniz.
          </span>
        )}
        <FormMessage />
      </FormItem>
    </div>
  );
}
