import React, { forwardRef } from 'react';
import { Input as DefaultInput } from '../../../@/components/ui/input';
import { cn } from '../../../@/lib/utils';

export type Props = {};

export type LoginProps = {
  company: React.ReactNode;
  onSubmitFunction: (email: string) => Promise<string>;
  variant: 'ayasofyazilim' | 'abc1';
};

const Input = forwardRef(({ error, className, ...props }: any, ref) => {
  if (error) {
    return (
      <DefaultInput
        className={cn(
          'border-destructive placeholder:text-destructive/60 dark:placeholder:text-destructive/70 focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
  return <DefaultInput {...props} ref={ref} />;
});
export { Input };
