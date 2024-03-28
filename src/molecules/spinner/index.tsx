import React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';

const spinnerContainerVariants = cva('flex justify-center items-center', {
  variants: {
    variant: {
      default: ' bg-black/30',
      transparent: ' ',
    },
    fullScreen: {
      true: ' h-screen h-dvh w-full absolute z-50',
      false: ' h-8 rounded-md px-3 text-xs',
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
export type spinnerProps = {
  variant?: 'default' | 'transparent';
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  className?: string;
};

export default function Spinner({
  variant,
  fullScreen,
  size,
  className,
  containerClassName,
}: spinnerProps) {
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
