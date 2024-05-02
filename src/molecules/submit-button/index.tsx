import React from 'react';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, ButtonProps } from '@/components/ui/button';

export interface ISubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
  onSubmitFunction?: () => Promise<any> | void;
}

export default function SubmitButton({
  title = '',
  variant,
  className,
  isLoading,
  disabled,
  onSubmitFunction,
}: ISubmitButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || isLoading}
      className={className}
      type="submit"
      onClick={onSubmitFunction}
    >
      {isLoading ? (
        <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
      ) : (
        title
      )}
    </Button>
  );
}
