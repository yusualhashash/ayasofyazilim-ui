import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'ay-relative ay-w-full ay-rounded-lg ay-border ay-px-4 ay-py-3 ay-text-sm [&>svg+div]:ay-translate-y-[-3px] [&>svg]:ay-absolute [&>svg]:ay-left-4 [&>svg]:ay-top-4 [&>svg]:ay-text-foreground [&>svg~*]:ay-pl-7',
  {
    variants: {
      variant: {
        default: 'ay-bg-background ay-text-foreground',
        destructive:
          'ay-border-destructive/50 ay-text-destructive dark:ay-border-destructive [&>svg]:ay-text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'ay-mb-1 ay-font-medium ay-leading-none ay-tracking-tight',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('ay-text-sm [&_p]:ay-leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
