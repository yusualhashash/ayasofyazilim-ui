import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'ay-inline-flex ay-items-center ay-rounded-md ay-border ay-px-2.5 ay-py-0.5 ay-text-xs ay-font-semibold ay-transition-colors focus:ay-outline-none focus:ay-ring-2 focus:ay-ring-ring focus:ay-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'ay-border-transparent ay-bg-primary ay-text-primary-foreground ay-shadow hover:ay-bg-primary/80',
        secondary:
          'ay-border-transparent ay-bg-secondary ay-text-secondary-foreground hover:ay-bg-secondary/80',
        destructive:
          'ay-border-transparent ay-bg-destructive ay-text-destructive-foreground ay-shadow hover:ay-bg-destructive/80',
        outline: 'ay-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
