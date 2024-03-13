import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'ay-inline-flex ay-items-center ay-justify-center ay-whitespace-nowrap ay-text-sm ay-font-medium ay-transition-colors focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-pointer-events-none disabled:ay-opacity-50',
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
        orange: 'ay-bg-orange-700 hover:ay-bg-orange-600 ay-text-white',
        purple: 'ay-bg-indigo-500 hover:ay-bg-indigo-600 ay-text-white',
        blue: 'ay-bg-blue-500 hover:ay-bg-blue-600 ay-text-white',
        green: 'ay-bg-emerald-700 hover:ay-bg-emerald-600 ay-text-white',
      },
      size: {
        default: 'ay-h-9 ay-px-4 ay-py-2',
        sm: 'ay-h-8 ay-px-3 ay-text-xs',
        lg: 'ay-h-10 ay-px-8',
        icon: 'ay-h-9 ay-w-9',
      },
      rounded: {
        default: 'ay-rounded-md',
        none: 'ay-rounded-none',
        sm: 'ay-rounded-sm',
        md: 'ay-rounded-md',
        lg: 'ay-rounded-lg',
        full: 'ay-rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
