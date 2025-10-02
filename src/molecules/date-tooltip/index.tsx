'use client';

import React from 'react';
import { ClockIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type Localization = { locale: string; timeZone: string; lang: string };
function DateTooltip({
  icon = <ClockIcon className="w-4 h-4" />,
  date,
  dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  localization,
}: {
  icon?: React.ReactNode;
  date: string | Date;
  dateOptions?: Intl.DateTimeFormatOptions;
  localization: Localization;
}) {
  const _date = new Date(date);
  const tenantDateString = _date.toLocaleDateString(localization.locale, {
    ...dateOptions,
    timeZone: localization.timeZone,
  });
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-1 underline decoration-dotted underline-offset-2">
        {icon} {tenantDateString}
      </TooltipTrigger>
      <TooltipContent className="bg-gray-100 text-gray-900 border border-gray-300 z-[100]">
        <p className="flex justify-between">
          <span className="font-semibold mr-2">UTC:</span>
          {_date.toLocaleDateString(localization.locale, {
            ...dateOptions,
            timeZone: 'UTC',
          })}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold mr-2">Tenant:</span>
          {tenantDateString}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold mr-2">You:</span>
          {_date.toLocaleDateString(localization.locale, dateOptions)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export default DateTooltip;
