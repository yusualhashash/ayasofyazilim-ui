import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'ay-flex ay-h-9 ay-w-full ay-rounded-md ay-border ay-border-input ay-bg-transparent ay-px-3 ay-py-1 ay-text-sm ay-shadow-sm ay-transition-colors file:ay-border-0 file:ay-bg-transparent file:ay-text-sm file:ay-font-medium placeholder:ay-text-muted-foreground focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-cursor-not-allowed disabled:ay-opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
