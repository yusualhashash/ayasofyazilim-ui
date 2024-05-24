'use client';

import React from 'react';

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
  children?: React.ReactNode;
  title?: string;
}
export const StepperContent = ({ children, title }: IStepperContentProps) => (
  <div id={title}>{children}</div>
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
  const containerClass = `flex gap-5 justify-between w-full relative mb-10${
    vertical ? ' flex-col items-center' : ''
  }`;
  const activeItemClass = 'bg-blue-500 text-white';
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
