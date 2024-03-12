import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'ay-inline-flex ay-items-center ay-justify-center ay-whitespace-nowrap ay-rounded-md ay-text-sm ay-font-medium ay-transition-colors focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-pointer-events-none disabled:ay-opacity-50',
  {
    variants: {
      variant: {
        default:
          'ay-bg-primary ay-text-primary-foreground ay-shadow hover:ay-bg-primary/90',
        destructive:
          'ay-bg-destructive ay-text-destructive-foreground ay-shadow-sm hover:ay-bg-destructive/90',
        outline:
          'ay-border ay-border-input ay-bg-background ay-shadow-sm hover:ay-bg-accent hover:ay-text-accent-foreground',
        secondary:
          'ay-bg-secondary ay-text-secondary-foreground ay-shadow-sm hover:ay-bg-secondary/80',
        ghost: 'hover:ay-bg-accent hover:ay-text-accent-foreground',
        link: 'ay-text-primary ay-underline-offset-4 hover:ay-underline',
      },
      size: {
        default: 'ay-h-9 ay-px-4 ay-py-2',
        sm: 'ay-h-8 ay-rounded-md ay-px-3 ay-text-xs',
        lg: 'ay-h-10 ay-rounded-md ay-px-8',
        icon: 'ay-h-9 ay-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
