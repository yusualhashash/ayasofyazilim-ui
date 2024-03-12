import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'ay-relative ay-flex ay-w-full ay-touch-none ay-select-none ay-items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="ay-relative ay-h-1.5 ay-w-full ay-grow ay-overflow-hidden ay-rounded-full ay-bg-primary/20">
      <SliderPrimitive.Range className="ay-absolute ay-h-full ay-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ay-block ay-h-4 ay-w-4 ay-rounded-full ay-border ay-border-primary/50 ay-bg-background ay-shadow ay-transition-colors focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring disabled:ay-pointer-events-none disabled:ay-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
