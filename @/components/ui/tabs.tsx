import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'ay-inline-flex ay-h-9 ay-items-center ay-justify-center ay-rounded-lg ay-bg-muted ay-p-1 ay-text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'ay-inline-flex ay-items-center ay-justify-center ay-whitespace-nowrap ay-rounded-md ay-px-3 ay-py-1 ay-text-sm ay-font-medium ay-ring-offset-background ay-transition-all focus-visible:ay-outline-none focus-visible:ay-ring-2 focus-visible:ay-ring-ring focus-visible:ay-ring-offset-2 disabled:ay-pointer-events-none disabled:ay-opacity-50 data-[state=active]:ay-bg-background data-[state=active]:ay-text-foreground data-[state=active]:ay-shadow',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ay-mt-2 ay-ring-offset-background focus-visible:ay-outline-none focus-visible:ay-ring-2 focus-visible:ay-ring-ring focus-visible:ay-ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
