import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('ay-border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="ay-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'ay-flex ay-flex-1 ay-items-center ay-justify-between ay-py-4 ay-text-sm ay-font-medium ay-transition-all hover:ay-underline [&[data-state=open]>svg]:ay-rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="ay-h-4 ay-w-4 ay-shrink-0 ay-text-muted-foreground ay-transition-transform ay-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="ay-overflow-hidden ay-text-sm data-[state=closed]:ay-animate-accordion-up data-[state=open]:ay-animate-accordion-down"
    {...props}
  >
    <div className={cn('ay-pb-4 ay-pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
