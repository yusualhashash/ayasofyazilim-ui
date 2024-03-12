import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'ay-peer ay-inline-flex ay-h-5 ay-w-9 ay-shrink-0 ay-cursor-pointer ay-items-center ay-rounded-full ay-border-2 ay-border-transparent ay-shadow-sm ay-transition-colors focus-visible:ay-outline-none focus-visible:ay-ring-2 focus-visible:ay-ring-ring focus-visible:ay-ring-offset-2 focus-visible:ay-ring-offset-background disabled:ay-cursor-not-allowed disabled:ay-opacity-50 data-[state=checked]:ay-bg-primary data-[state=unchecked]:ay-bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'ay-pointer-events-none ay-block ay-h-4 ay-w-4 ay-rounded-full ay-bg-background ay-shadow-lg ay-ring-0 ay-transition-transform data-[state=checked]:ay-translate-x-4 data-[state=unchecked]:ay-translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
