import { memo } from 'react';
import { cn } from '@/lib/utils';
import { CornerHandleProps } from './types';

export const CornerHandle = memo<CornerHandleProps>(
  ({
    cornerKey,
    corner,
    videoDimensions,
    isDragging,
    cornerColor,
    cornerTouchAreaSize,
    onDragStart,
  }) => {
    const percentX = (corner.x / videoDimensions.width) * 100;
    const percentY = (corner.y / videoDimensions.height) * 100;

    return (
      <div
        className={cn(
          'block border rounded-full min-w-[20px] min-h-[20px] absolute cursor-grab active:cursor-grabbing select-none',
          isDragging ? 'bg-blue-500/80 scale-125' : cornerColor,
          isDragging ? 'z-20' : 'z-10'
        )}
        style={{
          left: `${percentX}%`,
          top: `${percentY}%`,
          transform: `translate(-50%, -50%)`,
          width: `${cornerTouchAreaSize}px`,
          height: `${cornerTouchAreaSize}px`,
          touchAction: 'none',
        }}
        onPointerDown={(e) => onDragStart(cornerKey, e)}
      />
    );
  }
);

CornerHandle.displayName = 'CornerHandle';
