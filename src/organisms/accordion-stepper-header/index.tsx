'use client';

import { Circle, CircleCheckBig, LucideIcon } from 'lucide-react';
import React from 'react';
import { AccordionTrigger } from '@/components/ui/accordion';

interface IAccordionStepperHeaderProps {
  checked: boolean;
  children: React.ReactNode;
  customCheckedIcon?: LucideIcon;
  customCheckedIconColor?: string;
  customUncheckedIcon?: LucideIcon;
  customUncheckedIconColor?: string;
}
export const AccordionStepperHeader = ({
  children,
  checked,
  customCheckedIcon,
  customUncheckedIcon,
  customCheckedIconColor,
  customUncheckedIconColor,
}: IAccordionStepperHeaderProps) => {
  const CheckedIcon = customCheckedIcon || CircleCheckBig;
  const UncheckedIcon = customUncheckedIcon || Circle;

  return (
    <div className="bg-muted/50 px-4">
      <AccordionTrigger>
        <div className="flex gap-4 items-center">
          {checked ? (
            <CheckedIcon
              className={customCheckedIconColor || 'text-emerald-600'}
            />
          ) : (
            <UncheckedIcon
              className={customUncheckedIconColor || 'text-muted-foreground'}
            />
          )}
          {children}
        </div>
      </AccordionTrigger>
    </div>
  );
};
