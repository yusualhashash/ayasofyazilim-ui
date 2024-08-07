'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import React, { forwardRef, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { File, Folder, Tree, TreeViewElement } from './tree-view-api';

// TODO: Add the ability to add custom icons

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type TreeViewProps = {
  elements: TreeViewElement[];
  optionsDropdownContent?: React.ReactNode;
  selectedId?: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
} & (
  | {
      expandAll?: false;
      initialExpendedItems?: string[];
    }
  | {
      expandAll: true;
      initialExpendedItems?: undefined;
    }
) &
  TreeViewComponentProps;

export const TreeView = ({
  elements,
  className,
  selectedId,
  setSelectedId,
  initialExpendedItems,
  optionsDropdownContent,
}: TreeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { getVirtualItems } = useVirtualizer({
    count: elements.length,
    getScrollElement: () => containerRef.current,
    estimateSize: useCallback(() => 40, []),
    overscan: 5,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full rounded-md overflow-hidden py-1 relative',
        className
      )}
    >
      <Tree
        initialExpendedItems={initialExpendedItems}
        elements={elements}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        className="w-full h-full overflow-y-auto"
      >
        {getVirtualItems().map((element: any) => (
          <TreeItem
            aria-label="Root"
            key={element.key}
            elements={[elements[element.index]]}
            setSelectedId={setSelectedId}
            optionsDropdownContent={optionsDropdownContent}
          />
        ))}
      </Tree>
    </div>
  );
};

TreeView.displayName = 'TreeView';

export const TreeItem = forwardRef<
  HTMLUListElement,
  {
    elements?: TreeViewElement[];
    optionsDropdownContent?: React.ReactNode;
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  } & React.HTMLAttributes<HTMLUListElement>
>(({ optionsDropdownContent, elements, setSelectedId, ...props }, ref) => (
  <ul ref={ref} className="w-full space-y-1 " {...props}>
    {elements &&
      elements.map((element) => (
        <li key={element.id} className="w-full">
          {element.children && element.children?.length > 0 ? (
            <Folder
              element={element.name}
              value={element.id}
              isSelectable={element.isSelectable}
              optionsDropdownContent={optionsDropdownContent}
              setSelectedId={setSelectedId}
            >
              <TreeItem
                key={element.id}
                aria-label={`folder ${element.name}`}
                elements={element.children}
                optionsDropdownContent={optionsDropdownContent}
                setSelectedId={setSelectedId}
              />
            </Folder>
          ) : (
            <File
              value={element.id}
              aria-label={`File ${element.name}`}
              key={element.id}
              isSelectable={element.isSelectable}
              optionsDropdownContent={optionsDropdownContent}
              setSelectedId={setSelectedId}
            >
              <span>{element?.name}</span>
            </File>
          )}
        </li>
      ))}
  </ul>
));

TreeItem.displayName = 'TreeItem';
