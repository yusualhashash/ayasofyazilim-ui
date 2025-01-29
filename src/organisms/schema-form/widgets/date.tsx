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
  if (fieldOptions.hidden) return null;
  const initialDate =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(value)
      : undefined;

  return (
    <DatePicker
      defaultValue={initialDate}
      disabled={fieldOptions.disabled}
      onChange={(selectedDate) => {
        if (selectedDate) {
          onChange(selectedDate.toISOString());
        }
      }}
    />
  );
};
