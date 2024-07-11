'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  FolderIcon,
  FolderOpenIcon,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/ayasofyazilim-ui/molecules/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

type TreeViewElement = {
  children?: TreeViewElement[];
  id: string;
  isSelectable?: boolean;
  name: string;
};

const DropdownMenuTree = ({
  optionsDropdownContent,
  setSelectedId,
  selectedId,
}: {
  optionsDropdownContent: React.ReactNode;
  selectedId?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => (
  <DropdownMenu
    onOpenChange={(open) => {
      if (open) {
        setSelectedId(selectedId);
      }
    }}
  >
    <DropdownMenuTrigger asChild>
      <DotsHorizontalIcon className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer my-1" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {optionsDropdownContent}
    </DropdownMenuContent>
  </DropdownMenu>
);

type TreeContextProps = {
  closeIcon?: React.ReactNode;
  direction: 'rtl' | 'ltr';
  expendedItems: string[] | undefined;
  handleExpand: (id: string) => void;
  indicator: boolean;
  openIcon?: React.ReactNode;
  selectItem: (id: string) => void;
  selectedId: string | undefined;
  setExpendedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
};

const TreeContext = createContext<TreeContextProps | null>(null);

export const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
};

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type Direction = 'rtl' | 'ltr' | undefined;

type TreeViewProps = {
  closeIcon?: React.ReactNode;
  elements: TreeViewElement[];
  indicator?: boolean;
  initialExpendedItems?: string[];
  openIcon?: React.ReactNode;
  selectedId: string | undefined;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
} & TreeViewComponentProps;

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  ({
    className,
    selectedId,
    setSelectedId,
    initialExpendedItems,
    children,
    indicator = true,
    openIcon,
    closeIcon,
    dir,
    ...props
  }) => {
    const [expendedItems, setExpendedItems] = useState<string[] | undefined>(
      initialExpendedItems
    );

    const selectItem = useCallback((id: string) => {
      setSelectedId(id);
    }, []);

    const handleExpand = useCallback((id: string) => {
      setExpendedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...(prev ?? []), id];
      });
      setSelectedId(id);
    }, []);

    const direction = dir === 'rtl' ? 'rtl' : 'ltr';

    return (
      <TreeContext.Provider
        value={useMemo(
          () => ({
            selectedId,
            expendedItems,
            indicator,
            handleExpand,
            selectItem,
            setExpendedItems,
            openIcon,
            closeIcon,
            direction,
          }),
          [selectedId, expendedItems, indicator, handleExpand, selectItem]
        )}
      >
        <div className={cn('', className)}>
          <AccordionPrimitive.Root
            {...props}
            type="multiple"
            defaultValue={expendedItems}
            value={expendedItems}
            className="flex flex-col gap-1 h-full"
            onValueChange={(value) =>
              setExpendedItems((prev) => [...(prev ?? []), value[0]])
            }
            dir={dir as Direction}
          >
            {children}
          </AccordionPrimitive.Root>
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = 'Tree';

const TreeIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { direction } = useTree();

  return (
    <div
      dir={direction}
      ref={ref}
      className={cn(
        'h-full w-px bg-muted absolute left-1.5 rtl:right-1.5 py-3 rounded-md hover:bg-slate-300 duration-300 ease-in-out',
        className
      )}
      {...props}
    />
  );
});

TreeIndicator.displayName = 'TreeIndicator';

interface FolderComponentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
  element: string;
  expendedItems?: string[];
  isSelect?: boolean;
  isSelectable?: boolean;
  optionsDropdownContent?: React.ReactNode;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
} & FolderComponentProps;

const Folder = forwardRef<
  HTMLDivElement,
  FolderProps & React.HTMLAttributes<HTMLDivElement>
>(
  ({
    className,
    element,
    value,
    isSelectable = true,
    isSelect,
    children,
    optionsDropdownContent,
    setSelectedId,
    ...props
  }) => {
    const {
      direction,
      handleExpand,
      expendedItems,
      indicator,
      setExpendedItems,
      openIcon,
      closeIcon,
      selectedId,
    } = useTree();
    const isSelected = isSelect ?? selectedId === value;
    return (
      <AccordionPrimitive.Item
        {...props}
        value={value}
        className="relative overflow-hidden h-full "
      >
        <div
          className={`pl-2 pr-2 rounded-md flex flex-row justify-between w-full ${isSelected && isSelectable ? 'bg-blue-100' : ''}`}
        >
          <AccordionPrimitive.Trigger
            className={cn(
              `flex items-center gap-1 text-sm rounded-md`,
              className,

              {
                'bg-blue-100 rounded-md': isSelect && isSelectable,
                'cursor-pointer': isSelectable,
                'cursor-not-allowed opacity-50': !isSelectable,
              }
            )}
            disabled={!isSelectable}
            onClick={() => handleExpand(value)}
          >
            {expendedItems?.includes(value)
              ? openIcon ?? (
                  <>
                    <MinusCircle className="h-4 w-4" />
                    <FolderOpenIcon className="h-4 w-4" />
                  </>
                )
              : closeIcon ?? (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    <FolderIcon className="h-4 w-4" />
                  </>
                )}
            <span>{element}</span>
          </AccordionPrimitive.Trigger>
          {optionsDropdownContent && (
            <DropdownMenuTree
              optionsDropdownContent={optionsDropdownContent}
              setSelectedId={setSelectedId}
              selectedId={value}
            />
          )}
        </div>
        <AccordionPrimitive.Content className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden h-full">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="flex flex-col gap-1 py-1 ml-5 rtl:mr-5 "
            defaultValue={expendedItems}
            value={expendedItems}
            onValueChange={(_value) => {
              setExpendedItems?.((prev) => [...(prev ?? []), _value[0]]);
            }}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

Folder.displayName = 'Folder';

const File = forwardRef<
  HTMLButtonElement,
  {
    fileIcon?: React.ReactNode;
    isSelect?: boolean;
    isSelectable?: boolean;
    optionsDropdownContent?: React.ReactNode;
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
    value: string;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {
      value,
      className,
      optionsDropdownContent,
      setSelectedId,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, selectedId, selectItem } = useTree();
    const isSelected = isSelect ?? selectedId === value;
    return (
      <AccordionPrimitive.Item
        value={value}
        className="relative flex flex-row space-between"
      >
        <div
          className={`pl-2 pr-2 rounded-md flex flex-row justify-between w-full ${isSelected && isSelectable ? 'bg-blue-100' : ''}`}
        >
          <AccordionPrimitive.Trigger
            ref={ref}
            {...props}
            dir={direction}
            disabled={!isSelectable}
            aria-label="File"
            className={cn(
              'flex items-center gap-1 cursor-pointer text-sm pr-1 rtl:pl-1 rtl:pr-0 rounded-md  duration-200 ease-in-out',

              isSelectable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
              className
            )}
            onClick={() => selectItem(value)}
          >
            {fileIcon ?? <FolderIcon className="h-4 w-4" />}
            {children}
          </AccordionPrimitive.Trigger>
          {optionsDropdownContent && (
            <DropdownMenuTree
              optionsDropdownContent={optionsDropdownContent}
              setSelectedId={setSelectedId}
              selectedId={value}
            />
          )}
        </div>
      </AccordionPrimitive.Item>
    );
  }
);

File.displayName = 'File';

export { File, Folder, Tree, type TreeViewElement };
