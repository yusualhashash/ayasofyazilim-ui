import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'ay-fixed ay-inset-0 ay-z-50 ay-bg-black/80 ay- data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'ay-fixed ay-z-50 ay-gap-4 ay-bg-background ay-p-6 ay-shadow-lg ay-transition ay-ease-in-out data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-duration-300 data-[state=open]:ay-duration-500',
  {
    variants: {
      side: {
        top: 'ay-inset-x-0 ay-top-0 ay-border-b data-[state=closed]:ay-slide-out-to-top data-[state=open]:ay-slide-in-from-top',
        bottom:
          'ay-inset-x-0 ay-bottom-0 ay-border-t data-[state=closed]:ay-slide-out-to-bottom data-[state=open]:ay-slide-in-from-bottom',
        left: 'ay-inset-y-0 ay-left-0 ay-h-full ay-w-3/4 ay-border-r data-[state=closed]:ay-slide-out-to-left data-[state=open]:ay-slide-in-from-left sm:ay-max-w-sm',
        right:
          'ay-inset-y-0 ay-right-0 ay-h-full ay-w-3/4 ay-border-l data-[state=closed]:ay-slide-out-to-right data-[state=open]:ay-slide-in-from-right sm:ay-max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ay-absolute ay-right-4 ay-top-4 ay-rounded-sm ay-opacity-70 ay-ring-offset-background ay-transition-opacity hover:ay-opacity-100 focus:ay-outline-none focus:ay-ring-2 focus:ay-ring-ring focus:ay-ring-offset-2 disabled:ay-pointer-events-none data-[state=open]:ay-bg-secondary">
        <Cross2Icon className="ay-h-4 ay-w-4" />
        <span className="ay-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'ay-flex ay-flex-col ay-space-y-2 ay-text-center sm:ay-text-left',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
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
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('ay-text-lg ay-font-semibold ay-text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('ay-text-sm ay-text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
