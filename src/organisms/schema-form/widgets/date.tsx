import { DatePicker } from '../../../molecules/date-picker';
import { WidgetProps } from '../types';

export const CustomDate = (props: WidgetProps) => {
  const { value, onChange, disabled } = props;
  const initialDate =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(value)
      : undefined;

  return (
    <DatePicker
      defaultValue={initialDate}
      disabled={disabled}
      onChange={(selectedDate) => {
        if (selectedDate) {
          onChange(selectedDate.toISOString());
        }
      }}
    />
  );
};
