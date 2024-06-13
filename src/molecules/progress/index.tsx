'use client';

import * as ProgressDefault from '@radix-ui/react-progress';
import React, { useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressVariants = cva('h-full w-full', {
  variants: {
    variant: {
      success: 'bg-emerald-500',
      primary: 'bg-cyan-500 text-white',
      secondary: 'bg-gray-300',
      error: 'bg-red-400',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});
export interface IProgressProps {
  children?: JSX.Element;
  className?: string;
  containerClassName?: string;
  value: number;
  variant?: 'success' | 'primary' | 'secondary' | 'error';
}

export default function Progress({
  value = 0,
  className,
  containerClassName,
  variant = 'secondary',
  children,
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
        className={cn(progressVariants({ variant }), className)}
      >
        {children}
      </ProgressDefault.Indicator>
    </ProgressDefault.Root>
  );
}
