import React from 'react';

import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ICardTableProps {
  column?: boolean;
  containerClassName?: string;
  separator?: boolean;
  title: string;
  titleClassName?: string;
  value: string;
  valueClassName?: string;
}
export default function CardTable({
  title,
  value,
  column,
  separator,
  containerClassName,
  titleClassName,
  valueClassName,
}: ICardTableProps) {
  return (
    <>
      {separator && !column && <Separator />}
      <CardFooter
        className={cn(
          `flex justify-between py-2 text-center ${
            column ? 'flex-col' : 'flex-row'
          }`,
          containerClassName
        )}
      >
        <div className={cn('text-xs flex gap-0 font-semibold', titleClassName)}>
          {title}
        </div>
        <div className={cn('text-xs flex gap-0 ', valueClassName)}>{value}</div>
      </CardFooter>
      {separator && column && (
        <Separator orientation="vertical" className="h-8 w-[2px]" />
      )}
    </>
  );
}
