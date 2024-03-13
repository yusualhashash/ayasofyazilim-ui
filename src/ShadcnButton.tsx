import React from 'react';
import { Button } from '@/components/ui/button';

export type ShadcnButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  text?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'orange'
    | 'purple'
    | 'blue'
    | 'green';
};

export const ShadcnButton = ({
  children,
  rounded,
  size,
  disabled,
  ...props
}: ShadcnButtonProps) => (
  <Button
    disabled={disabled}
    variant={props?.variant}
    size={size}
    rounded={rounded}
  >
    {children}
  </Button>
);
