'use client';

import { ErrorSchema, WidgetProps } from '@rjsf/utils';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput as RIP } from 'react-international-phone';
import { PhoneInput } from '../../../molecules/phone-input';
import { cn } from '@/lib/utils';
import 'react-international-phone/style.css';
import { FormContext } from '../types';

const phoneUtil = PhoneNumberUtil.getInstance();

export const CustomPhoneField = function <T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { value, onChange, name, className, id, formContext } = props;
  const defaultCountryCode =
    formContext?.locale ||
    (typeof window !== 'undefined' && localStorage.getItem('countryCode2')) ||
    'en';

  const handlePhoneChange = (val: string) => {
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
    } finally {
      onChange(val, raiseError, id);
    }
  };

  return (
    <RIP
      name={name}
      defaultCountry={defaultCountryCode}
      value={value || ''}
      onChange={handlePhoneChange}
      inputClassName={cn('flex-1 h-10', className)}
      countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
    />
  );
};

const errorMessage = {
  tr: 'Lütfen geçerli bir telefon numarası giriniz.',
  en: 'Please enter a valid phone number.',
};

export const CustomPhoneFieldWithParse = function <T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { value, onChange, placeholder, name, className, id } = props;
  return (
    <PhoneInput
      id={id}
      name={name}
      value={value || ''}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  );
};

export const CustomPhoneFieldWithValue = function <T>(
  props: WidgetProps<T, any, FormContext<T>>
) {
  const { value, onChange, placeholder, name, className, id } = props;
  return (
    <PhoneInput
      id={id}
      name={name}
      value={value || ''}
      placeholder={placeholder}
      className={className}
      onChange={(values) => {
        onChange(values.value);
      }}
    />
  );
};
