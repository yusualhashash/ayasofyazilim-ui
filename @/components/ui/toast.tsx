import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'ay-fixed ay-top-0 ay-z-[100] ay-flex ay-max-h-screen ay-w-full ay-flex-col-reverse ay-p-4 sm:ay-bottom-0 sm:ay-right-0 sm:ay-top-auto sm:ay-flex-col md:ay-max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'ay-group ay-pointer-events-auto ay-relative ay-flex ay-w-full ay-items-center ay-justify-between ay-space-x-2 ay-overflow-hidden ay-rounded-md ay-border ay-p-4 ay-pr-6 ay-shadow-lg ay-transition-all data-[swipe=cancel]:ay-translate-x-0 data-[swipe=end]:ay-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ay-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ay-transition-none data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[swipe=end]:ay-animate-out data-[state=closed]:ay-fade-out-80 data-[state=closed]:ay-slide-out-to-right-full data-[state=open]:ay-slide-in-from-top-full data-[state=open]:sm:ay-slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'ay-border ay-bg-background ay-text-foreground',
        destructive:
          'ay-destructive ay-group ay-border-destructive ay-bg-destructive ay-text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'ay-inline-flex ay-h-8 ay-shrink-0 ay-items-center ay-justify-center ay-rounded-md ay-border ay-bg-transparent ay-px-3 ay-text-sm ay-font-medium ay-transition-colors hover:ay-bg-secondary focus:ay-outline-none focus:ay-ring-1 focus:ay-ring-ring disabled:ay-pointer-events-none disabled:ay-opacity-50 group-[.destructive]:ay-border-muted/40 group-[.destructive]:hover:ay-border-destructive/30 group-[.destructive]:hover:ay-bg-destructive group-[.destructive]:hover:ay-text-destructive-foreground group-[.destructive]:focus:ay-ring-destructive',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'ay-absolute ay-right-1 ay-top-1 ay-rounded-md ay-p-1 ay-text-foreground/50 ay-opacity-0 ay-transition-opacity hover:ay-text-foreground focus:ay-opacity-100 focus:ay-outline-none focus:ay-ring-1 group-hover:ay-opacity-100 group-[.destructive]:ay-text-red-300 group-[.destructive]:hover:ay-text-red-50 group-[.destructive]:focus:ay-ring-red-400 group-[.destructive]:focus:ay-ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="ay-h-4 ay-w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('ay-text-sm ay-font-semibold [&+div]:ay-text-xs', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('ay-text-sm ay-opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
