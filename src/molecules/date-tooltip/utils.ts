import { Localization } from '.';

export function formatToLocalizedDate({
  localization,
  date,
  dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  timeZone,
}: {
  localization: Localization;
  date: string | Date;
  dateOptions?: Intl.DateTimeFormatOptions;
  timeZone?: string;
}) {
  const _date = typeof date === 'string' ? new Date(date) : date;
  const dateString = _date.toLocaleDateString(localization.lang, {
    ...dateOptions,
    timeZone,
  });
  return dateString;
}
