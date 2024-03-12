import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'ay-flex ay-h-full ay-w-full data-[panel-group-direction=vertical]:ay-flex-col',
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'ay-relative ay-flex ay-w-px ay-items-center ay-justify-center ay-bg-border after:ay-absolute after:ay-inset-y-0 after:ay-left-1/2 after:ay-w-1 after:ay--translate-x-1/2 focus-visible:ay-outline-none focus-visible:ay-ring-1 focus-visible:ay-ring-ring focus-visible:ay-ring-offset-1 data-[panel-group-direction=vertical]:ay-h-px data-[panel-group-direction=vertical]:ay-w-full data-[panel-group-direction=vertical]:after:ay-left-0 data-[panel-group-direction=vertical]:after:ay-h-1 data-[panel-group-direction=vertical]:after:ay-w-full data-[panel-group-direction=vertical]:after:ay--translate-y-1/2 data-[panel-group-direction=vertical]:after:ay-translate-x-0 [&[data-panel-group-direction=vertical]>div]:ay-rotate-90',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="ay-z-10 ay-flex ay-h-4 ay-w-3 ay-items-center ay-justify-center ay-rounded-sm ay-border ay-bg-border">
        <DragHandleDots2Icon className="ay-h-2.5 ay-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
