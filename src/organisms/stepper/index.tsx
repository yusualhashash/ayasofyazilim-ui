'use client';

import React, { SetStateAction } from 'react';
import CustomButton from '../../molecules/button';

export interface ISeparatorProps {
  vertical?: boolean;
}
export const Separator = ({ vertical }: ISeparatorProps) => {
  const containerClass = `border-muted items-center justify-center flex ${
    vertical ? 'w-1' : 'h-8 w-full'
  }`;
  const innerClass = `bg-muted w-full ${vertical ? 'h-16' : 'h-1'}`;

  return (
    <div className={containerClass}>
      <div className={innerClass} />
    </div>
  );
};

export interface IStepperContentProps {
  canGoBack?: boolean;
  canGoNext?: boolean;
  children?: React.ReactNode;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
  onIndexChange?: (value: SetStateAction<number>) => void;
  title?: string;
}
export const StepperContent = ({
  children,
  title,
  canGoBack = true,
  canGoNext = true,
  isBackDisabled,
  isNextDisabled,
  onIndexChange,
}: IStepperContentProps) => (
  <div id={title}>
    {children}
    {onIndexChange && (
      <div className="mt-5">
        {canGoBack && (
          <CustomButton
            variant="outline"
            disabled={isBackDisabled}
            onClick={() => onIndexChange((prev) => prev - 1)}
          >
            Previous
          </CustomButton>
        )}
        {canGoNext && (
          <CustomButton
            className="float-right"
            disabled={isNextDisabled}
            onClick={() => onIndexChange((prev) => prev + 1)}
          >
            Next
          </CustomButton>
        )}
      </div>
    )}
  </div>
);

export interface IStepperHeaderProps {
  activeTabIndex: number;
  keysWithSeparator: string[];
  vertical?: boolean;
}

export const StepperHeader = ({
  keysWithSeparator,
  activeTabIndex,
  vertical,
}: IStepperHeaderProps) => {
  const containerClass = `flex gap-5 justify-between w-full relative mb-10 ${
    vertical ? 'flex-col items-center' : ''
  }`;
  const activeItemClass = 'bg-primary text-white';
  const inactiveItemClass = 'bg-muted text-black';

  return (
    <div className={containerClass}>
      {keysWithSeparator.map((item, index) => {
        if (item === 'SEPARATOR') {
          return (
            <Separator
              key={`separator-${index.toString()}`}
              vertical={vertical}
            />
          );
        }
        const active = activeTabIndex === index / 2;
        const innerClass = `rounded-full w-8 h-8 items-center justify-center flex text-xs ${
          active ? activeItemClass : inactiveItemClass
        }`;
        const titleContainerClass = `text-sm text-center ${
          active ? 'text-black' : 'text-muted-foreground'
        }`;
        return (
          <div key={item} className="flex flex-col items-center gap-2">
            <div className={innerClass}>{index / 2 + 1}</div>
            <div className={titleContainerClass}>{item}</div>
          </div>
        );
      })}
    </div>
  );
};
export interface IStepperProps {
  activeTabIndex: number;
  children?: React.ReactNode[];
  vertical?: boolean;
}
export default function Stepper({
  children,
  activeTabIndex,
  vertical,
}: IStepperProps) {
  const keys = children?.flatMap((child, index) => {
    if (index !== 0) {
      return [
        'SEPARATOR',
        (React.isValidElement(child) && child.props.title) || index + 1,
      ];
    }
    return [(React.isValidElement(child) && child.props.title) || index + 1];
  }) as string[];
  const filteredChildren = React.Children.toArray(children)?.[activeTabIndex];
  return (
    <div className={vertical ? 'flex flex-row gap-10' : ''}>
      <StepperHeader
        keysWithSeparator={keys}
        activeTabIndex={activeTabIndex}
        vertical={vertical}
      />
      {filteredChildren}
    </div>
  );
}
