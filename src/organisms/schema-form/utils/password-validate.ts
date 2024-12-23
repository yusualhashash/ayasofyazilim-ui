import { FormValidation } from '../types';

export function customPasswordValidate<T>({
  formData,
  keyOne,
  keyTwo,
  errorMessage,
  errors,
}: {
  formData: T | undefined;
  keyOne: keyof T;
  keyTwo: keyof T;
  errorMessage: string;
  errors: FormValidation<T>;
}): FormValidation<T> {
  if (!formData) {
    return errors; // or throw an error, depending on your requirements
  }
  if (formData[keyOne] !== formData[keyTwo] && errors && errors[keyTwo]) {
    errors[keyTwo].addError(errorMessage);
  }
  return errors;
}
