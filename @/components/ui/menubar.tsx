import * as React from 'react';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

import { cn } from '@/lib/utils';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'ay-flex ay-h-9 ay-items-center ay-space-x-1 ay-rounded-md ay-border ay-bg-background ay-p-1 ay-shadow-sm',
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-3 ay-py-1 ay-text-sm ay-font-medium ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[state=open]:ay-bg-accent data-[state=open]:ay-text-accent-foreground',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-2 ay-py-1.5 ay-text-sm ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[state=open]:ay-bg-accent data-[state=open]:ay-text-accent-foreground',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ay-ml-auto ay-h-4 ay-w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'ay-z-50 ay-min-w-[8rem] ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-p-1 ay-text-popover-foreground ay-shadow-lg data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'ay-z-50 ay-min-w-[12rem] ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-p-1 ay-text-popover-foreground ay-shadow-md data-[state=open]:ay-animate-in data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-2 ay-py-1.5 ay-text-sm ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-py-1.5 ay-pl-8 ay-pr-2 ay-text-sm ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="ay-absolute ay-left-2 ay-flex ay-h-3.5 ay-w-3.5 ay-items-center ay-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="ay-h-4 ay-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-py-1.5 ay-pl-8 ay-pr-2 ay-text-sm ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    {...props}
  >
    <span className="ay-absolute ay-left-2 ay-flex ay-h-3.5 ay-w-3.5 ay-items-center ay-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <DotFilledIcon className="ay-h-4 ay-w-4 ay-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'ay-px-2 ay-py-1.5 ay-text-sm ay-font-semibold',
      inset && 'ay-pl-8',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('ay--mx-1 ay-my-1 ay-h-px ay-bg-muted', className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ay-ml-auto ay-text-xs ay-tracking-widest ay-text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayname = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
