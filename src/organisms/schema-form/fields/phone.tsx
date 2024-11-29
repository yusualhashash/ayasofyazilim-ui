import { ErrorSchema, FieldErrors, FieldProps } from '@rjsf/utils';
import 'react-international-phone/style.css';

import { PhoneInput } from 'react-international-phone';
import { cn } from '@/lib/utils';
import { isPhoneValid, splitPhone } from '../utils';

export const CustomPhoneField = function (props: FieldProps) {
  const value =
    props.formData.ituCountryCode +
    props.formData.areaCode +
    props.formData.localNumber;
  return (
    <PhoneInput
      name={props.name}
      defaultCountry="tr"
      value={value}
      onChange={(val) => {
        const isValid = isPhoneValid(val);

        let raiseError: FieldErrors | undefined;
        if (isValid) {
          const splitVal = splitPhone(val);
          props.onChange(splitVal);
        } else {
          raiseError = {
            __errors: ['Value must be "test"'],
          };
          props.onChange(val, raiseError as ErrorSchema, props.id);
        }
        // const x = splitPhone(val);
        // if (!isValid.isValid) {
        //   raiseError = {
        //     __errors: ['Value must be "test"'],
        //   };
        // } else {
        //   props.onChange(splitPhone(val));
        // }
      }}
      inputClassName={cn('flex-1', props.className)}
      countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
    />
  );
};
