import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'ay-fixed ay-inset-0 ay-z-50 ay-bg-black/80 ay- data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'ay-fixed ay-left-[50%] ay-top-[50%] ay-z-50 ay-grid ay-w-full ay-max-w-lg ay-translate-x-[-50%] ay-translate-y-[-50%] ay-gap-4 ay-border ay-bg-background ay-p-6 ay-shadow-lg ay-duration-200 data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[state=closed]:ay-slide-out-to-left-1/2 data-[state=closed]:ay-slide-out-to-top-[48%] data-[state=open]:ay-slide-in-from-left-1/2 data-[state=open]:ay-slide-in-from-top-[48%] sm:ay-rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ay-absolute ay-right-4 ay-top-4 ay-rounded-sm ay-opacity-70 ay-ring-offset-background ay-transition-opacity hover:ay-opacity-100 focus:ay-outline-none focus:ay-ring-2 focus:ay-ring-ring focus:ay-ring-offset-2 disabled:ay-pointer-events-none data-[state=open]:ay-bg-accent data-[state=open]:ay-text-muted-foreground">
        <Cross2Icon className="ay-h-4 ay-w-4" />
        <span className="ay-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ay-flex ay-flex-col ay-space-y-1.5 ay-text-center sm:ay-text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ay-flex ay-flex-col-reverse sm:ay-flex-row sm:ay-justify-end sm:ay-space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'ay-text-lg ay-font-semibold ay-leading-none ay-tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('ay-text-sm ay-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
