'use client';

import { Circle, CircleCheckBig } from 'lucide-react';
import React from 'react';
import { AccordionTrigger } from '@/components/ui/accordion';

interface IAccordionStepperHeaderProps {
  checked: boolean;
  children: React.ReactNode;
}
export const AccordionStepperHeader = ({
  children,
  checked,
}: IAccordionStepperHeaderProps) => (
  <div className="bg-muted/50 px-4">
    <AccordionTrigger>
      <div className="flex gap-4 items-center">
        {checked ? (
          <CircleCheckBig className="text-primary" />
        ) : (
          <Circle className="text-muted-foreground" />
        )}
        {children}
      </div>
    </AccordionTrigger>
  </div>
);
