import * as React from 'react';
import { DashIcon } from '@radix-ui/react-icons';
import { OTPInput, SlotProps } from 'input-otp';

import { cn } from '@/lib/utils';

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn('flex items-center gap-2', className)}
    {...props}
  />
));
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('ay-flex ay-items-center', className)}
    {...props}
  />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  SlotProps & React.ComponentPropsWithoutRef<'div'>
>(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'ay-relative ay-flex ay-h-9 ay-w-9 ay-items-center ay-justify-center ay-border-y ay-border-r ay-border-input ay-text-sm ay-shadow-sm ay-transition-all first:ay-rounded-l-md first:ay-border-l last:ay-rounded-r-md',
        isActive && 'ay-z-10 ay-ring-1 ay-ring-ring',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="ay-pointer-events-none ay-absolute ay-inset-0 ay-flex ay-items-center ay-justify-center">
          <div className="ay-animate-caret-blink ay-h-4 ay-w-px ay-bg-foreground ay-duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
