import { FieldProps } from '@rjsf/utils';
import 'react-international-phone/style.css';

import { PhoneInput } from 'react-international-phone';
import { cn } from '@/lib/utils';
import { isPhoneValid, splitPhone } from '../utils';

export const CustomPhoneField = (props: FieldProps) => (
  <PhoneInput
    name={props.name}
    defaultCountry="tr"
    value={props.value}
    onChange={(val) => {
      const isValid = isPhoneValid(val);
      if (!isValid) return;
      props.onChange(splitPhone(val));
    }}
    inputClassName={cn('flex-1', props.className)}
    countrySelectorStyleProps={{ flagClassName: 'rounded-md pl-0.5' }}
  />
);

export function createValue(name: string, param: any) {
  const temp = name.split('.');
  if (!param) return undefined;
  if (temp.length === 1) {
    return param[temp[0]];
  }
  return createValue(temp.slice(1).join('.'), param[temp[0]]);
}
