import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'ay-inline-flex ay-items-center ay-justify-center ay-rounded-md ay-text-sm ay-font-medium ay-transition-colors hover:ay-bg-muted hover:ay-text-muted-foreground focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-pointer-events-none disabled:ay-opacity-50 data-[state=on]:ay-bg-accent data-[state=on]:ay-text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'ay-bg-transparent',
        outline:
          'ay-border ay-border-input ay-bg-transparent ay-shadow-sm hover:ay-bg-accent hover:ay-text-accent-foreground',
      },
      size: {
        default: 'ay-h-9 ay-px-3',
        sm: 'ay-h-8 ay-px-2',
        lg: 'ay-h-10 ay-px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
