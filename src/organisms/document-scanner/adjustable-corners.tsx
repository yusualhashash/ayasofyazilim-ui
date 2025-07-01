import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  TouchEvent,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { cn } from '@/lib/utils';
import { DEFAULT_VIDEO_DIMENSIONS } from './consts';
import { DocumentCorners } from './types';
import { Button } from '@/components/ui/button';

export function AdjustableCorners({
  corners,
  onCornersChange,
  onImageCrop,
  onRetry,
  image,
  videoDimensions = DEFAULT_VIDEO_DIMENSIONS,
  allowCrop = true,
  allowRetry = true,
  allowCornerAdjustment = true,
  showCornersLabels = true,
  showBorders = true,
  cropButtonText = 'Crop',
  retryButtonText = 'Retry',
  cornerSmoothingFactor = 0.8,
  proximityThreshold = 80,
  cornerTouchAreaSize = 70,
  borderColor = 'border-green-500',
  customControls,
}: {
  corners: DocumentCorners;
  onCornersChange: (newCorners: DocumentCorners) => void;
  onRetry?: () => void;
  onImageCrop?: (croppedImage: string) => void;
  image?: string;
  videoDimensions?: { width: number; height: number };
  allowCrop?: boolean;
  allowRetry?: boolean;
  allowCornerAdjustment?: boolean;
  showCornersLabels?: boolean;
  showBorders?: boolean;
  cropButtonText?: string;
  retryButtonText?: string;
  cornerSmoothingFactor?: number;
  proximityThreshold?: number;
  cornerTouchAreaSize?: number;
  borderColor?: string;
  customControls?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeCorner, setActiveCorner] = useState<
    keyof DocumentCorners | null
  >(null);
  const [adjustedCorners, setAdjustedCorners] = useState(corners);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setAdjustedCorners(corners);
  }, [corners]);

  useEffect(() => {
    document.body.style.cursor = activeCorner ? 'none' : '';
    return () => {
      document.body.style.cursor = '';
    };
  }, [activeCorner]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    const cleanup = () => {
      resizeObserver.disconnect();
    };
    return cleanup;
  }, []);

  const handleEnd = () => setActiveCorner(null);

  // Standardized coordinate scaling function - matches exactly with event handling
  const getScaledCorners = useCallback(() => {
    // Instead of early return with a value, use a variable
    let result = {
      topLeftCorner: { x: 0, y: 0 },
      topRightCorner: { x: 0, y: 0 },
      bottomRightCorner: { x: 0, y: 0 },
      bottomLeftCorner: { x: 0, y: 0 },
    };

    if (containerRef.current) {
      // Use the exact same rect calculation as in event handling
      const rect = containerRef.current.getBoundingClientRect();

      result = {
        topLeftCorner: {
          x:
            (adjustedCorners.topLeftCorner.x / videoDimensions.width) *
            rect.width,
          y:
            (adjustedCorners.topLeftCorner.y / videoDimensions.height) *
            rect.height,
        },
        topRightCorner: {
          x:
            (adjustedCorners.topRightCorner.x / videoDimensions.width) *
            rect.width,
          y:
            (adjustedCorners.topRightCorner.y / videoDimensions.height) *
            rect.height,
        },
        bottomRightCorner: {
          x:
            (adjustedCorners.bottomRightCorner.x / videoDimensions.width) *
            rect.width,
          y:
            (adjustedCorners.bottomRightCorner.y / videoDimensions.height) *
            rect.height,
        },
        bottomLeftCorner: {
          x:
            (adjustedCorners.bottomLeftCorner.x / videoDimensions.width) *
            rect.width,
          y:
            (adjustedCorners.bottomLeftCorner.y / videoDimensions.height) *
            rect.height,
        },
      };
    }

    return result;
  }, [adjustedCorners, videoDimensions]);

  // Use the same scaling function for all coordinate calculations
  const scaledCorners = getScaledCorners();

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current || !allowCornerAdjustment) return;

      // Prevent scrolling and default touch behavior on mobile
      e.preventDefault();
      e.stopPropagation();

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

      if (!clientX || !clientY) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Clamp coordinates to container bounds
      const clampedX = Math.max(0, Math.min(x, rect.width));
      const clampedY = Math.max(0, Math.min(y, rect.height));

      setMousePosition({ x: clampedX, y: clampedY });

      if (activeCorner) {
        // Convert display coordinates directly to video dimensions using actual container rect
        const newX = (clampedX / rect.width) * videoDimensions.width;
        const newY = (clampedY / rect.height) * videoDimensions.height;

        const currentCorner = adjustedCorners[activeCorner];
        const smoothedX =
          currentCorner.x * (1 - cornerSmoothingFactor) +
          newX * cornerSmoothingFactor;
        const smoothedY =
          currentCorner.y * (1 - cornerSmoothingFactor) +
          newY * cornerSmoothingFactor;

        const newCorners = {
          ...adjustedCorners,
          [activeCorner]: {
            x: smoothedX,
            y: smoothedY,
          },
        };
        setAdjustedCorners(newCorners);
        onCornersChange(newCorners);
      } else {
        // Check if we're near any corner for visual feedback using standardized coordinates
        let nearCorner = false;
        const scaledCornersForProximity = getScaledCorners();

        Object.entries(scaledCornersForProximity).forEach(([, corner]) => {
          const distance = Math.sqrt(
            (clampedX - corner.x) ** 2 + (clampedY - corner.y) ** 2
          );
          if (distance < proximityThreshold) {
            nearCorner = true;
          }
        });

        // Change cursor based on proximity
        if (containerRef.current) {
          containerRef.current.style.cursor = nearCorner ? 'grab' : 'default';
        }
      }
    },
    [
      activeCorner,
      adjustedCorners,
      videoDimensions,
      onCornersChange,
      allowCornerAdjustment,
      cornerSmoothingFactor,
      proximityThreshold,
      getScaledCorners,
    ]
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    return () => {
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, []);

  const cropImage = useCallback(() => {
    if (!image || !onImageCrop) return;

    const img = new Image();
    img.onload = () => {
      try {
        if (!(window as any).cv) {
          return;
        }

        const { cv } = window as any;

        // Create canvas and load image
        const inputCanvas = document.createElement('canvas');
        const ctx = inputCanvas.getContext('2d');
        if (!ctx) return;

        inputCanvas.width = img.naturalWidth;
        inputCanvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // Read image into OpenCV Mat
        const src = cv.imread(inputCanvas);

        // Use original image dimensions for better quality
        const imageScaleX = img.naturalWidth / dimensions.width;
        const imageScaleY = img.naturalHeight / dimensions.height;

        // Convert display coordinates to original image coordinates
        const originalCorners = {
          topLeftCorner: {
            x: scaledCorners.topLeftCorner.x * imageScaleX,
            y: scaledCorners.topLeftCorner.y * imageScaleY,
          },
          topRightCorner: {
            x: scaledCorners.topRightCorner.x * imageScaleX,
            y: scaledCorners.topRightCorner.y * imageScaleY,
          },
          bottomRightCorner: {
            x: scaledCorners.bottomRightCorner.x * imageScaleX,
            y: scaledCorners.bottomRightCorner.y * imageScaleY,
          },
          bottomLeftCorner: {
            x: scaledCorners.bottomLeftCorner.x * imageScaleX,
            y: scaledCorners.bottomLeftCorner.y * imageScaleY,
          },
        };

        // Calculate the dimensions of the output document
        const topWidth = Math.sqrt(
          (originalCorners.topRightCorner.x -
            originalCorners.topLeftCorner.x) **
            2 +
            (originalCorners.topRightCorner.y -
              originalCorners.topLeftCorner.y) **
              2
        );
        const bottomWidth = Math.sqrt(
          (originalCorners.bottomRightCorner.x -
            originalCorners.bottomLeftCorner.x) **
            2 +
            (originalCorners.bottomRightCorner.y -
              originalCorners.bottomLeftCorner.y) **
              2
        );
        const leftHeight = Math.sqrt(
          (originalCorners.bottomLeftCorner.x -
            originalCorners.topLeftCorner.x) **
            2 +
            (originalCorners.bottomLeftCorner.y -
              originalCorners.topLeftCorner.y) **
              2
        );
        const rightHeight = Math.sqrt(
          (originalCorners.bottomRightCorner.x -
            originalCorners.topRightCorner.x) **
            2 +
            (originalCorners.bottomRightCorner.y -
              originalCorners.topRightCorner.y) **
              2
        );

        // Use maximum dimensions for best quality
        const outputWidth = Math.max(topWidth, bottomWidth);
        const outputHeight = Math.max(leftHeight, rightHeight);

        // Define source points (the detected corners)
        const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
          originalCorners.topLeftCorner.x,
          originalCorners.topLeftCorner.y,
          originalCorners.topRightCorner.x,
          originalCorners.topRightCorner.y,
          originalCorners.bottomRightCorner.x,
          originalCorners.bottomRightCorner.y,
          originalCorners.bottomLeftCorner.x,
          originalCorners.bottomLeftCorner.y,
        ]);

        // Define destination points (perfect rectangle)
        const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
          0,
          0, // top-left
          outputWidth,
          0, // top-right
          outputWidth,
          outputHeight, // bottom-right
          0,
          outputHeight, // bottom-left
        ]);

        // Calculate perspective transformation matrix
        const transformMatrix = cv.getPerspectiveTransform(
          srcPoints,
          dstPoints
        );

        // Create output mat
        const dst = new cv.Mat();

        // Apply perspective transformation
        cv.warpPerspective(
          src,
          dst,
          transformMatrix,
          new cv.Size(outputWidth, outputHeight),
          cv.INTER_LINEAR,
          cv.BORDER_CONSTANT,
          new cv.Scalar(255, 255, 255, 255)
        );

        // Create output canvas
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = outputWidth;
        outputCanvas.height = outputHeight;

        // Draw the result
        cv.imshow(outputCanvas, dst);

        // Get high-quality result
        const croppedImageUrl = outputCanvas.toDataURL('image/jpeg', 0.95);
        onImageCrop(croppedImageUrl);

        // Cleanup OpenCV resources
        src.delete();
        dst.delete();
        srcPoints.delete();
        dstPoints.delete();
        transformMatrix.delete();
      } catch (error) {
        // OpenCV cropping failed, use fallback method
        // Fallback cropping method
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageScaleX = img.naturalWidth / dimensions.width;
        const imageScaleY = img.naturalHeight / dimensions.height;

        const originalCorners = {
          topLeftCorner: {
            x: scaledCorners.topLeftCorner.x * imageScaleX,
            y: scaledCorners.topLeftCorner.y * imageScaleY,
          },
          topRightCorner: {
            x: scaledCorners.topRightCorner.x * imageScaleX,
            y: scaledCorners.topRightCorner.y * imageScaleY,
          },
          bottomRightCorner: {
            x: scaledCorners.bottomRightCorner.x * imageScaleX,
            y: scaledCorners.bottomRightCorner.y * imageScaleY,
          },
          bottomLeftCorner: {
            x: scaledCorners.bottomLeftCorner.x * imageScaleX,
            y: scaledCorners.bottomLeftCorner.y * imageScaleY,
          },
        };

        const minX = Math.min(
          originalCorners.topLeftCorner.x,
          originalCorners.topRightCorner.x,
          originalCorners.bottomLeftCorner.x,
          originalCorners.bottomRightCorner.x
        );
        const maxX = Math.max(
          originalCorners.topLeftCorner.x,
          originalCorners.topRightCorner.x,
          originalCorners.bottomLeftCorner.x,
          originalCorners.bottomRightCorner.x
        );
        const minY = Math.min(
          originalCorners.topLeftCorner.y,
          originalCorners.topRightCorner.y,
          originalCorners.bottomLeftCorner.y,
          originalCorners.bottomRightCorner.y
        );
        const maxY = Math.max(
          originalCorners.topLeftCorner.y,
          originalCorners.topRightCorner.y,
          originalCorners.bottomLeftCorner.y,
          originalCorners.bottomRightCorner.y
        );

        const cropWidth = maxX - minX;
        const cropHeight = maxY - minY;

        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.beginPath();
        ctx.moveTo(
          originalCorners.topLeftCorner.x - minX,
          originalCorners.topLeftCorner.y - minY
        );
        ctx.lineTo(
          originalCorners.topRightCorner.x - minX,
          originalCorners.topRightCorner.y - minY
        );
        ctx.lineTo(
          originalCorners.bottomRightCorner.x - minX,
          originalCorners.bottomRightCorner.y - minY
        );
        ctx.lineTo(
          originalCorners.bottomLeftCorner.x - minX,
          originalCorners.bottomLeftCorner.y - minY
        );
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          img,
          minX,
          minY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
        const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.95);
        onImageCrop(croppedImageUrl);
      }
    };
    img.src = image;
  }, [image, scaledCorners, dimensions, onImageCrop]);

  const renderCorner = (cornerKey: keyof DocumentCorners, color: string) => {
    if (!allowCornerAdjustment) return null;

    // Use standardized coordinates for accurate positioning
    const currentScaledCorners = getScaledCorners();
    const corner = currentScaledCorners[cornerKey];

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setActiveCorner(cornerKey);
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveCorner(cornerKey);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveCorner(cornerKey);
      }
    };

    const touchAreaOffset = cornerTouchAreaSize / 2;

    return (
      <div
        key={cornerKey}
        className="absolute z-20 transition-opacity duration-300 ease-in-out"
        style={{
          left: `${corner.x - touchAreaOffset}px`,
          top: `${corner.y - touchAreaOffset}px`,
          opacity: activeCorner === cornerKey ? 0.8 : 1,
          width: `${cornerTouchAreaSize}px`,
          height: `${cornerTouchAreaSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        role="button"
        aria-label={`Adjust ${cornerKey.replace('Corner', '')}`}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
      >
        {/* Outer touch area */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor:
              activeCorner === cornerKey
                ? 'rgba(59, 130, 246, 0.1)'
                : 'transparent',
            border:
              activeCorner === cornerKey
                ? '1px solid rgba(59, 130, 246, 0.3)'
                : 'none',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
        {/* Visual corner handle */}
        <div
          className={cn(
            `size-6 cursor-move rounded-full border-2 border-white shadow-lg`,
            color,
            activeCorner && 'cursor-none'
          )}
          style={{
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            pointerEvents: 'auto',
            transform: activeCorner === cornerKey ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
          }}
        />
        {/* Corner label for better visibility */}
        {showCornersLabels && (
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white shadow-lg"
            style={{
              display: activeCorner === cornerKey ? 'block' : 'none',
              pointerEvents: 'none',
              fontSize: '11px',
              fontWeight: '500',
            }}
          >
            {cornerKey
              .replace('Corner', '')
              .replace(/([A-Z])/g, ' $1')
              .trim()}
          </div>
        )}
      </div>
    );
  };

  const createBorderLine = (
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    if (!showBorders) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    return (
      <div
        className={`absolute h-px w-full origin-left border border-dashed ${borderColor}`}
        style={{
          left: from.x,
          top: from.y,
          width: length,
          transform: `rotate(${angle}rad)`,
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
        }}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative size-full"
      role="region"
      aria-label="Document corner adjustment area"
    >
      {image && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: `${dimensions.width}px ${dimensions.height}px`,
            backgroundPosition: `center`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      <div
        className="absolute inset-0"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      />

      {/* Debug touch point - shows where user is touching */}
      {activeCorner && process.env.NODE_ENV === 'development' && (
        <div
          className="pointer-events-none absolute z-[150] h-2 w-2 rounded-full border border-white bg-red-500"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
          }}
        />
      )}
      {activeCorner && (
        <div
          className="pointer-events-none absolute z-[100] h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-white bg-gray-200"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            boxShadow:
              '0 0 20px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.2)',
          }}
        >
          {image && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `${dimensions.width * 2}px ${dimensions.height * 2}px`,
                backgroundPosition: `${-(mousePosition.x * 2 - 100)}px ${-(mousePosition.y * 2 - 100)}px`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 bg-red-500 shadow-lg" />
            <div className="absolute left-1/2 top-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-red-500 shadow-lg" />
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-10">
        {(() => {
          const currentScaledCorners = getScaledCorners();
          return (
            <>
              {createBorderLine(
                currentScaledCorners.topLeftCorner,
                currentScaledCorners.topRightCorner
              )}
              {createBorderLine(
                currentScaledCorners.topRightCorner,
                currentScaledCorners.bottomRightCorner
              )}
              {createBorderLine(
                currentScaledCorners.bottomRightCorner,
                currentScaledCorners.bottomLeftCorner
              )}
              {createBorderLine(
                currentScaledCorners.bottomLeftCorner,
                currentScaledCorners.topLeftCorner
              )}
            </>
          );
        })()}
      </div>
      {renderCorner('topLeftCorner', 'bg-white/80')}
      {renderCorner('topRightCorner', 'bg-white/80')}
      {renderCorner('bottomRightCorner', 'bg-white/80')}
      {renderCorner('bottomLeftCorner', 'bg-white/80')}

      <div className="absolute bottom-4 right-4 z-30 flex gap-2">
        {customControls}
        {allowCrop && onImageCrop && image && (
          <Button className="rounded-md px-4 py-2" onClick={cropImage}>
            {cropButtonText}
          </Button>
        )}
        {allowRetry && onRetry && image && (
          <Button className="rounded-md px-4 py-2" onClick={onRetry}>
            {retryButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
