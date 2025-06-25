import { DatePicker } from '../../../molecules/date-picker';
import { WidgetProps } from '../types';
import { fieldOptionsByDependency } from '../utils/dependency';

export const CustomDate = (props: WidgetProps) => {
  const { value, onChange, disabled, uiSchema, required } = props;
  const dependencyOptions = fieldOptionsByDependency(
    uiSchema,
    props.formContext
  );
  const fieldOptions = {
    disabled,
    required,
    ...dependencyOptions,
  };
  if (fieldOptions.hidden) {
    onChange(undefined);
    return null;
  }
  const initialDate =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(new Date(value).toJSON())
      : undefined;
  return (
    <DatePicker
      defaultValue={initialDate}
      disabled={fieldOptions.disabled}
      classNames={{
        dateInput: 'h-10 shadow-sm date-input',
      }}
      onChange={(selectedDate) => {
        if (selectedDate) {
          if (props.schema.format === 'date') {
            onChange(selectedDate.toISOString().split('T').at(0));
          } else {
            onChange(selectedDate.toISOString());
          }
        }
      }}
    />
  );
};
