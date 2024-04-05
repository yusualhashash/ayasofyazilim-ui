import React from 'react';

import { cn } from '@/lib/utils';

export type CardTagProps = {
  className?: string;
  tag?: string;
};
export default function CardTag({ tag, className }: CardTagProps) {
  return (
    <div
      className={cn(
        'absolute h-8  opacity-90 rounded-br-3xl rounded-tl-xl px-8 font-bold text-xs flex items-center justify-center z-10 -left-0.5 -top-0.5 bg-green-300',
        className
      )}
    >
      {tag}
    </div>
  );
}
