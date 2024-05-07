'use client';

import * as ProgressDefault from '@radix-ui/react-progress';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface IProgressProps {
  className?: string;
  containerClassName?: string;
  value: number;
}

export default function Progress({
  value = 0,
  className,
  containerClassName,
}: IProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transition = 'transform 1.4s ease';
      barRef.current.style.transform = 'translateX(-100%)';
    }
    setTimeout(() => {
      animateProgressBar();
    }, 400);
  }, [value]);

  function animateProgressBar() {
    if (barRef.current) {
      barRef.current.style.transform = `translateX(-${100 - value}%)`;
    }
  }

  return (
    <ProgressDefault.Root
      className={cn(
        'relative overflow-hidden bg-blackA6 rounded-none w-full h-[6px] bg-gray-200 m-auto',
        containerClassName
      )}
      style={{ transform: 'translateZ(0)' }}
    >
      <ProgressDefault.Indicator
        ref={barRef}
        className={cn('bg-green-400 w-full h-full', className)}
      />
    </ProgressDefault.Root>
  );
}
