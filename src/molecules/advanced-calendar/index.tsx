import { useState } from 'react';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const classNames = {
  caption_label: 'text-sm font-medium flex items-center gap-2',
  vhidden: 'hidden',
  dropdown_month: 'flex relative items-center',
  dropdown_year: 'flex relative items-center',
  dropdown: 'absolute left-0 top-0 right-0 bottom-0 z-2 opacity-0',
  caption_dropdowns: 'flex gap-4',
};

let allLocales: { [key: string]: any } = {};
import('date-fns/locale').then((locales) => {
  allLocales = locales;
});

const getLocale = () => {
  const locale = navigator.language.replace('-', '');
  const rootLocale = locale.substring(0, 2);

  return allLocales[locale] || allLocales[rootLocale];
};

export type AdvancedCalendarProps = CalendarProps & {
  hideSelect?: boolean;
  onSelect: (date: Date) => void;
};

/**
 * A reusable localized calendar component with advanced features.
 *
 * @param {AdvancedCalendarProps} props - The properties for the calendar component.
 * @return {JSX.Element} The rendered calendar component.
 */
export default function AdvancedCalendar({
  hideSelect,
  ...props
}: AdvancedCalendarProps) {
  const [month, setMonth] = useState<Date>(
    props.selected instanceof Date ? props.selected : new Date()
  );
  const locale = getLocale();
  function handleChange(value: string) {
    const _date = new Date();
    _date.setUTCHours(0, 0, 0, 0);
    if (value === 'yesterday') {
      _date.setUTCDate(_date.getUTCDate() - 1);
    } else if (value === 'thisMonth') {
      _date.setUTCDate(1);
    } else if (value === 'thisYear') {
      _date.setUTCMonth(0);
      _date.setUTCDate(1);
    }
    props.onSelect(_date);
    setMonth(_date);
  }

  return (
    <div>
      {!hideSelect && (
        <Select onValueChange={(value) => handleChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Tarih Seçin" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="today">Bugün</SelectItem>
            <SelectItem value="yesterday">Dün</SelectItem>
            <SelectItem value="thisMonth">Bu Ay</SelectItem>
            <SelectItem value="thisYear">Bu Yıl</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Calendar
        locale={locale}
        classNames={classNames}
        month={month}
        onMonthChange={setMonth}
        {...props}
      />
    </div>
  );
}
