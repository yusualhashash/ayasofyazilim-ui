import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'ay-flex ay-h-full ay-w-full ay-flex-col ay-overflow-hidden ay-rounded-md ay-bg-popover ay-text-popover-foreground',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="ay-overflow-hidden ay-p-0">
        <Command className="[&_[cmdk-group-heading]]:ay-px-2 [&_[cmdk-group-heading]]:ay-font-medium [&_[cmdk-group-heading]]:ay-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:ay-pt-0 [&_[cmdk-group]]:ay-px-2 [&_[cmdk-input-wrapper]_svg]:ay-h-5 [&_[cmdk-input-wrapper]_svg]:ay-w-5 [&_[cmdk-input]]:ay-h-12 [&_[cmdk-item]]:ay-px-2 [&_[cmdk-item]]:ay-py-3 [&_[cmdk-item]_svg]:ay-h-5 [&_[cmdk-item]_svg]:ay-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="ay-flex ay-items-center ay-border-b ay-px-3"
    cmdk-input-wrapper=""
  >
    <MagnifyingGlassIcon className="ay-mr-2 ay-h-4 ay-w-4 ay-shrink-0 ay-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'ay-flex ay-h-10 ay-w-full ay-rounded-md ay-bg-transparent ay-py-3 ay-text-sm ay-outline-none placeholder:ay-text-muted-foreground disabled:ay-cursor-not-allowed disabled:ay-opacity-50',
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'ay-max-h-[300px] ay-overflow-y-auto ay-overflow-x-hidden',
      className
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="ay-py-6 ay-text-center ay-text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'ay-overflow-hidden ay-p-1 ay-text-foreground [&_[cmdk-group-heading]]:ay-px-2 [&_[cmdk-group-heading]]:ay-py-1.5 [&_[cmdk-group-heading]]:ay-text-xs [&_[cmdk-group-heading]]:ay-font-medium [&_[cmdk-group-heading]]:ay-text-muted-foreground',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('ay--mx-1 ay-h-px ay-bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-cursor-default ay-select-none ay-items-center ay-rounded-sm ay-px-2 ay-py-1.5 ay-text-sm ay-outline-none aria-selected:ay-bg-accent aria-selected:ay-text-accent-foreground data-[disabled]:ay-pointer-events-none data-[disabled]:ay-opacity-50',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
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
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
