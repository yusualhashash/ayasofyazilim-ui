import React from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardTagVariants = cva(
  'absolute h-8 opacity-90 rounded-br-3xl rounded-tl-xl px-8 font-bold text-xs flex items-center justify-center z-10 -left-0.5 -top-0.5 ',
  {
    variants: {
      variant: {
        success: 'bg-emerald-500 text-white',
        primary: 'bg-cyan-500 text-white',
        secondary: 'bg-gray-300',
        error: 'bg-red-400 text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ICardTagProps {
  className?: string;
  title?: string;
  variant: 'success' | 'primary' | 'secondary' | 'error';
}
export default function CardTag({ title, variant, className }: ICardTagProps) {
  return (
    <div className={cn(cardTagVariants({ variant }), className)}>{title}</div>
  );
}
