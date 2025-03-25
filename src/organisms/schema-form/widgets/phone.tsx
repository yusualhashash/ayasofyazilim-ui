'use client';

import { ErrorSchema, WidgetProps } from '@rjsf/utils';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { cn } from '@/lib/utils';
import 'react-international-phone/style.css';
import { FormContext } from '../types';

const phoneUtil = PhoneNumberUtil.getInstance();

export const CustomPhoneField = function <T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { id, formContext } = props;
  const defaultCountryCode =
    (typeof window !== 'undefined' && localStorage.getItem('countryCode2')) ||
    'us';
  const { value = '', onChange, name, className } = props;
  const [inputValue, setInputValue] = useState(value || '');
  const handlePhoneChange = (val: string) => {
    setInputValue(val);
    let raiseError: ErrorSchema<T> | undefined;
    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(
        val,
        formContext?.locale || 'en'
      );
      if (!phoneUtil.isValidNumber(parsedNumber)) {
        raiseError = {
          __errors: [
            errorMessage[
              (formContext?.locale as keyof typeof errorMessage) || 'en'
            ],
          ],
        };
      } else {
        raiseError = undefined;
      }
    } catch (err) {
      raiseError = {
        __errors: [
          errorMessage[
            (formContext?.locale as keyof typeof errorMessage) || 'en'
          ],
        ],
      };
    }
    onChange(value, raiseError, id);
  };

  return (
    <PhoneInput
      name={name}
      defaultCountry={defaultCountryCode}
      value={inputValue}
      onChange={handlePhoneChange}
      inputClassName={cn('flex-1', className)}
      countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
    />
  );
};

const errorMessage = {
  tr: 'Lütfen geçerli bir telefon numarası giriniz.',
  en: 'Please enter a valid phone number.',
};
