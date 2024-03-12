import * as React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'ay-flex ay-h-9 ay-w-full ay-items-center ay-justify-between ay-whitespace-nowrap ay-rounded-md ay-border ay-border-input ay-bg-transparent ay-px-3 ay-py-2 ay-text-sm ay-shadow-sm ay-ring-offset-background placeholder:ay-text-muted-foreground focus:ay-outline-none focus:ay-ring-1 focus:ay-ring-ring disabled:ay-cursor-not-allowed disabled:ay-opacity-50 [&>span]:ay-line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="ay-h-4 ay-w-4 ay-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'ay-flex ay-cursor-default ay-items-center ay-justify-center ay-py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'ay-flex ay-cursor-default ay-items-center ay-justify-center ay-py-1',
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'ay-relative ay-z-50 ay-max-h-96 ay-min-w-[8rem] ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-text-popover-foreground ay-shadow-md data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:ay-translate-y-1 data-[side=left]:ay--translate-x-1 data-[side=right]:ay-translate-x-1 data-[side=top]:ay--translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'ay-p-1',
          position === 'popper' &&
            'ay-h-[var(--radix-select-trigger-height)] ay-w-full ay-min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('ay-px-2 ay-py-1.5 ay-text-sm ay-font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-w-full ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-py-1.5 ay-pl-2 ay-pr-8 ay-text-sm ay-outline-none focus:ay-bg-accent focus:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    {...props}
  >
    <span className="ay-absolute ay-right-2 ay-flex ay-h-3.5 ay-w-3.5 ay-items-center ay-justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="ay-h-4 ay-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('ay--mx-1 ay-my-1 ay-h-px ay-bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
