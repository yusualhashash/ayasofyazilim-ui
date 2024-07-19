'use client';

import React, {
  Children,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
} from 'react';
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
  title?: string;
}
export const StepperContent = ({
  children,
  title,
  canGoBack = true,
  canGoNext = true,
  isBackDisabled,
  isNextDisabled,
}: IStepperContentProps) => {
  const { previousButtonText, nextButtonText, onIndexChange, vertical } =
    useContext(StepperContext);
  return (
    <div id={title} className={vertical ? 'w-10/12' : 'w-full'}>
      {children}
      {onIndexChange && (
        <div className="mt-5 flex justify-between">
          <div>
            {canGoBack && (
              <CustomButton
                variant="outline"
                disabled={isBackDisabled}
                onClick={() =>
                  onIndexChange((prev) => {
                    if (prev > 0) {
                      return prev - 1;
                    }
                    return prev;
                  })
                }
              >
                {previousButtonText}
              </CustomButton>
            )}
          </div>
          <div>
            {canGoNext && (
              <CustomButton
                disabled={isNextDisabled}
                onClick={() =>
                  onIndexChange((prev) => {
                    if (prev <= Children.count(children) - 1) {
                      return prev + 1;
                    }
                    return prev;
                  })
                }
              >
                {nextButtonText}
              </CustomButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export interface IStepperHeaderProps {
  activeTabIndex: number;
  keysWithSeparator:
    | (string | { icon: any; index: number; title: any })[]
    | undefined;
  vertical?: boolean;
}

export const StepperHeader = ({
  keysWithSeparator,
  activeTabIndex,
  vertical,
}: IStepperHeaderProps) => {
  const containerClass = `flex gap-5 justify-between relative mb-10 ${
    vertical ? 'flex-col items-center w-2/12' : 'w-full'
  }`;
  const activeItemClass = 'bg-primary text-white';
  const inactiveItemClass = 'bg-zinc-200 text-black';

  return (
    <div className={containerClass}>
      {keysWithSeparator?.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <Separator
              key={`separator-${index.toString()}`}
              vertical={vertical}
            />
          );
        }

        const active = activeTabIndex === item.index;
        const innerClass = `rounded-full w-8 h-8 items-center justify-center flex text-xs ${
          active ? activeItemClass : inactiveItemClass
        }`;
        const titleContainerClass = `text-sm text-center ${
          active ? 'text-black' : 'text-muted-foreground'
        }`;
        return (
          <div key={item.index} className="flex flex-col items-center gap-2">
            <div className={innerClass}>{item.icon || item.index + 1}</div>
            <div className={titleContainerClass}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

const StepperContext = createContext({
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  // eslint-disable-next-line
  onIndexChange: (value: SetStateAction<number>) => {},
  vertical: false,
});
export interface IStepperProps {
  activeTabIndex: number;
  children?: React.ReactNode[];
  nextButtonText?: string;
  onIndexChange: Dispatch<SetStateAction<number>>;
  previousButtonText?: string;
  vertical?: boolean;
}

export default function Stepper({
  children,
  activeTabIndex,
  vertical = false,
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  onIndexChange,
}: IStepperProps) {
  const keys = children?.flatMap((child, index) => {
    const item = React.isValidElement(child)
      ? { title: child.props.title || '', icon: child.props.icon, index }
      : { title: '', icon: '', index };
    if (index === 0) {
      return [item];
    }
    return ['SEPARATOR', item];
  });
  const providerProps = useMemo(
    () => ({
      nextButtonText,
      previousButtonText,
      onIndexChange,
      vertical,
    }),
    [nextButtonText, previousButtonText, onIndexChange, vertical]
  );
  const filteredChildren = React.Children.toArray(children)?.[activeTabIndex];
  return (
    <StepperContext.Provider value={providerProps}>
      <div className={vertical ? 'flex flex-row gap-10' : ''}>
        <StepperHeader
          keysWithSeparator={keys}
          activeTabIndex={activeTabIndex}
          vertical={vertical}
        />
        {filteredChildren}
      </div>
    </StepperContext.Provider>
  );
}
