import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/lib/utils';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'ay-z-50 ay-w-64 ay-rounded-md ay-border ay-bg-popover ay-p-4 ay-text-popover-foreground ay-shadow-md ay-outline-none data-[state=open]:ay-animate-in data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=open]:ay-fade-in-0 data-[state=closed]:ay-zoom-out-95 data-[state=open]:ay-zoom-in-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
