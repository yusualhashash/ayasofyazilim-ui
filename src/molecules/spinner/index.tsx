'use client';

import { cva } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const spinnerContainerVariants = cva('flex justify-center items-center', {
  variants: {
    variant: {
      default: ' bg-black/30',
      transparent: ' ',
    },
    fullScreen: {
      true: ' h-screen h-dvh w-full absolute z-50',
      false: ' h-8 px-3 text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    fullScreen: true,
  },
});
const spinnerVariants = cva('animate-spin stroke-cyan-300 ', {
  variants: {
    size: {
      sm: ' w-3 h-3',
      md: ' w-6 h-6',
      lg: ' w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
export interface ISpinnerProps {
  className?: string;
  containerClassName?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'transparent';
}

export default function Spinner({
  variant,
  fullScreen,
  size,
  className,
  containerClassName,
}: ISpinnerProps) {
  return (
    <div
      className={cn(
        spinnerContainerVariants({ variant, fullScreen }),
        containerClassName
      )}
    >
      <LoaderCircle className={cn(spinnerVariants({ size }), className)} />
    </div>
  );
}
