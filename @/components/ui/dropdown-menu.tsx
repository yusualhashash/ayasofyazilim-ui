import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-2 ay-py-1.5 ay-text-sm ay-outline-none focus:ay-bg-accent data-[state=open]:ay-bg-accent',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ay-ml-auto ay-h-4 ay-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'ay-z-50 ay-min-w-[8rem] ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-p-1 ay-text-popover-foreground ay-shadow-lg data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'ay-z-50 ay-min-w-[8rem] ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-p-1 ay-text-popover-foreground ay-shadow-md',
        'data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-2 ay-py-1.5 ay-text-sm ay-outline-none ay-transition-colors focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-py-1.5 ay-pl-8 ay-pr-2 ay-text-sm ay-outline-none ay-transition-colors focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ay-absolute ay-left-2 ay-flex ay-h-3.5 ay-w-3.5 ay-items-center ay-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="ay-h-4 ay-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-py-1.5 ay-pl-8 ay-pr-2 ay-text-sm ay-outline-none ay-transition-colors focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    {...props}
  >
    <span className="ay-absolute ay-left-2 ay-flex ay-h-3.5 ay-w-3.5 ay-items-center ay-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="ay-h-4 ay-w-4 ay-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'ay-px-2 ay-py-1.5 ay-text-sm ay-font-semibold',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('ay--mx-1 ay-my-1 ay-h-px ay-bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ay-ml-auto ay-text-xs ay-tracking-widest ay-opacity-60',
        className
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
