import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'ay-z-50 ay-overflow-hidden ay-rounded-md ay-bg-primary ay-px-3 ay-py-1.5 ay-text-xs ay-text-primary-foreground ay-animate-in ay-fade-in-0 ay-zoom-in-95 data-[state=closed]:ay-animate-out data-[state=closed]:ay-fade-out-0 data-[state=closed]:ay-zoom-out-95 data-[side=bottom]:ay-slide-in-from-top-2 data-[side=left]:ay-slide-in-from-right-2 data-[side=right]:ay-slide-in-from-left-2 data-[side=top]:ay-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
