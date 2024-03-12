import * as React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'ay-relative ay-z-10 ay-flex ay-max-w-max ay-flex-1 ay-items-center ay-justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'ay-group ay-flex ay-flex-1 ay-list-none ay-items-center ay-justify-center ay-space-x-1',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'ay-group ay-inline-flex ay-h-9 ay-w-max ay-items-center ay-justify-center ay-rounded-md ay-bg-background ay-px-4 ay-py-2 ay-text-sm ay-font-medium ay-transition-colors hover:ay-bg-accent hover:ay-text-accent-foreground focus:ay-bg-accent focus:ay-text-accent-foreground focus:ay-outline-none disabled:ay-pointer-events-none disabled:ay-opacity-50 data-[active]:ay-bg-accent/50 data-[state=open]:ay-bg-accent/50'
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'ay-group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDownIcon
      className="ay-relative ay-top-[1px] ay-ml-1 ay-h-3 ay-w-3 ay-transition ay-duration-300 group-data-[state=open]:ay-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'ay-left-0 ay-top-0 ay-w-full data-[motion^=from-]:ay-animate-in data-[motion^=to-]:ay-animate-out data-[motion^=from-]:ay-fade-in data-[motion^=to-]:ay-fade-out data-[motion=from-end]:ay-slide-in-from-right-52 data-[motion=from-start]:ay-slide-in-from-left-52 data-[motion=to-end]:ay-slide-out-to-right-52 data-[motion=to-start]:ay-slide-out-to-left-52 md:ay-absolute md:ay-w-auto ay-',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'ay-absolute ay-left-0 ay-top-full ay-flex ay-justify-center'
    )}
  >
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'ay-origin-top-center ay-relative ay-mt-1.5 ay-h-[var(--radix-navigation-menu-viewport-height)] ay-w-full ay-overflow-hidden ay-rounded-md ay-border ay-bg-popover ay-text-popover-foreground ay-shadow data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-90 md:ay-w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'ay-top-full ay-z-[1] ay-flex ay-h-1.5 ay-items-end ay-justify-center ay-overflow-hidden data-[state=visible]:ay-animate-in data-[state=hidden]:ay-animate-out data-[state=hidden]:ay-fade-out data-[state=visible]:ay-fade-in',
      className
    )}
    {...props}
  >
    <div className="ay-relative ay-top-[60%] ay-h-2 ay-w-2 ay-rotate-45 ay-rounded-tl-sm ay-bg-border ay-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
