'use client';

import { WidgetProps } from '@rjsf/utils';
import { PhoneInput as RIP } from 'react-international-phone';
import { cn } from '@/lib/utils';
import 'react-international-phone/style.css';
import { PhoneInput } from '../../../molecules/phone-input';
import { FormContext } from '../types';

export const CustomPhoneField = function CustomPhoneField<T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { value, onChange, name, className, formContext } = props;
  const defaultCountryCode =
    formContext?.locale ||
    (typeof window !== 'undefined' && localStorage.getItem('countryCode2')) ||
    'en';

  return (
    <RIP
      name={name}
      defaultCountry={defaultCountryCode}
      value={value || ''}
      onChange={onChange}
      inputClassName={cn('flex-1 h-10', className)}
      countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
    />
  );
};

export const CustomPhoneFieldWithParse = function CustomPhoneFieldWithParse<T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const required = props.required || props.uiSchema?.['ui:required'];
  return <PhoneInput {...props} required={required} defaultValue={undefined} />;
};

export const CustomPhoneFieldWithValue = function CustomPhoneFieldWithValue<T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { onChange, uiSchema } = props;
  const required = uiSchema?.['ui:required'] || props.required;
  return (
    <PhoneInput
      {...props}
      required={required}
      defaultValue={undefined}
      onChange={(values) => {
        onChange(values.value);
      }}
    />
  );
};
