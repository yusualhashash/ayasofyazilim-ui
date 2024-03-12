import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'ay-flex ay-min-h-[60px] ay-w-full ay-rounded-md ay-border ay-border-input ay-bg-transparent ay-px-3 ay-py-2 ay-text-sm ay-shadow-sm placeholder:ay-text-muted-foreground focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-cursor-not-allowed disabled:ay-opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
