import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'ay-peer ay-h-4 ay-w-4 ay-shrink-0 ay-rounded-sm ay-border ay-border-primary ay-shadow focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-cursor-not-allowed disabled:ay-opacity-50 data-[state=checked]:ay-bg-primary data-[state=checked]:ay-text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'ay-flex ay-items-center ay-justify-center ay-text-current'
      )}
    >
      <CheckIcon className="ay-h-4 ay-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
