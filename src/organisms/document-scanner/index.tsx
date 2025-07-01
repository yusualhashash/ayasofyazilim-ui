import { useCallback, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Webcam } from '../webcam';
import { AdjustableCorners } from './adjustable-corners';
import {
  DEFAULT_CAPTURE_INTERVAL,
  DEFAULT_IMAGE_QUALITY,
  DEFAULT_MAX_DOCUMENT_SIZE,
  DEFAULT_MIN_DOCUMENT_SIZE,
  DEFAULT_VIDEO_DIMENSIONS,
} from './consts';
import { scanDocument } from './lib';
import { DocumentCorners, DocumentScannerProps } from './types';

export function DocumentScanner({
  // Core callbacks
  onDocumentCropped,
  onDocumentDetected,
  onCornersChanged,
  onError,
  onStatusChange,
  onCameraReady,
  onScanAttempt,
  onImageCapture,

  // Basic configuration
  className = '',
  captureInterval = DEFAULT_CAPTURE_INTERVAL,

  // Feature toggles
  allowCrop = true,
  allowRetry = true,
  allowCornerAdjustment = true,
  allowCameraSwitch = true,
  // UI visibility
  showMagnifier = true,
  showCornersLabels = true,
  showBorders = true,

  // Text customization
  cropButtonText = 'Crop',
  retryButtonText = 'Scan Again',
  // Accessibility and UX
  // Corner adjustment
  cornerSmoothingFactor = 0.3,
  proximityThreshold = 80,
  cornerTouchAreaSize = 70,

  // Magnifier settings
  magnifierSize = 180,
  magnifierZoom = 2.5,
  magnifierColor = 'border-blue-500',

  // Visual styling
  borderColor = 'border-green-500',
  cornerColor = 'bg-white/80',
  // Detection settings
  minDocumentSize = DEFAULT_MIN_DOCUMENT_SIZE,
  maxDocumentSize = DEFAULT_MAX_DOCUMENT_SIZE,
  detectionConfidence = 0.8,

  // Image processing
  imageQuality = DEFAULT_IMAGE_QUALITY,
  // Advanced settings
  customDetectionAlgorithm,

  customControls,
  customOverlay,
}: DocumentScannerProps) {
  // Webcam ref for programmatic control
  // Available methods: retryAutoCapture(), startAutoCapture(), stopAutoCapture()

  const [videoDimensions, setVideoDimensions] = useState(
    DEFAULT_VIDEO_DIMENSIONS
  );
  const [detectedCorners, setDetectedCorners] = useState<
    DocumentCorners | undefined
  >();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleVideoReady = useCallback(
    (dimensions: { width: number; height: number }) => {
      setVideoDimensions(dimensions);
      onStatusChange?.('scanning');
      onCameraReady?.(dimensions);
    },
    [onStatusChange, onCameraReady]
  );

  const handleCornersChange = (newCorners: DocumentCorners) => {
    setDetectedCorners(newCorners);
    onCornersChanged?.(newCorners);
  };

  const handleError = (error: string) => {
    onStatusChange?.('error');
    onError?.(error);
  };

  const handleImageCrop = (croppedImageBase64: string) => {
    onStatusChange?.('cropped');
    onDocumentCropped?.(croppedImageBase64);
  };

  const handleCapture = useCallback(
    (capturedImageBase64: string | null) => {
      if (!capturedImageBase64) return;

      setCapturedImage(capturedImageBase64);
      onImageCapture?.(capturedImageBase64);
      onScanAttempt?.();

      // Use custom detection algorithm if provided
      if (customDetectionAlgorithm) {
        customDetectionAlgorithm(capturedImageBase64, videoDimensions)
          .then((corners) => {
            if (corners) {
              setDetectedCorners(corners);
              onStatusChange?.('detected');
              onDocumentDetected?.(corners, capturedImageBase64);
            } else {
              handleError('Document not detected by custom algorithm');
            }
          })
          .catch((error) => {
            const errorMessage = error?.message || 'Custom detection failed';
            handleError(errorMessage);
          });
      } else {
        scanDocument(
          capturedImageBase64,
          videoDimensions,
          (corners) => {
            setDetectedCorners(corners);
            onStatusChange?.('detected');
            onDocumentDetected?.(corners, capturedImageBase64);
          },
          (error) => {
            handleError(error);
          },
          {
            minDocumentSize,
            maxDocumentSize,
            detectionConfidence,
          }
        );
      }
    },
    [
      onImageCapture,
      onScanAttempt,
      customDetectionAlgorithm,
      videoDimensions,
      onStatusChange,
      onDocumentDetected,
      handleError,
      minDocumentSize,
      maxDocumentSize,
      detectionConfidence,
    ]
  );

  const handleRetry = useCallback(() => {
    setDetectedCorners(undefined);
    setCapturedImage(null);
    onStatusChange?.('scanning');
  }, []);

  const webcamCallbacks = useMemo(
    () => ({
      onWebcamReady: handleVideoReady,
      onAutoPhotoCaptured: handleCapture,
    }),
    [handleVideoReady, handleCapture, onStatusChange]
  );

  const webcamClassNames = useMemo(
    () => ({
      placeholder: 'block',
    }),
    []
  );

  const webcamAutoCapture = useMemo(
    () => ({
      captureInterval,
      hasInterface: true,
      startOnReady: true,
      quality: imageQuality,
      stopOnCapture: true,
    }),
    [captureInterval, imageQuality]
  );

  const webcamPlaceholder = useMemo(() => {
    if (detectedCorners && allowCornerAdjustment) {
      return (
        <AdjustableCorners
          corners={detectedCorners}
          onCornersChange={handleCornersChange}
          onImageCrop={handleImageCrop}
          onRetry={handleRetry}
          videoDimensions={videoDimensions}
          image={capturedImage || undefined}
          allowCrop={allowCrop}
          allowRetry={allowRetry}
          allowCornerAdjustment={allowCornerAdjustment}
          showCornersLabels={showCornersLabels}
          showBorders={showBorders}
          cropButtonText={cropButtonText}
          retryButtonText={retryButtonText}
          cornerSmoothingFactor={cornerSmoothingFactor}
          proximityThreshold={proximityThreshold}
          cornerTouchAreaSize={cornerTouchAreaSize}
          borderColor={borderColor}
          customControls={customControls}
        />
      );
    }
    return undefined;
  }, [
    detectedCorners,
    allowCornerAdjustment,
    handleCornersChange,
    handleImageCrop,
    handleRetry,
    videoDimensions,
    capturedImage,
    allowCrop,
    allowRetry,
    showMagnifier,
    showCornersLabels,
    showBorders,
    cropButtonText,
    retryButtonText,
    cornerSmoothingFactor,
    proximityThreshold,
    magnifierSize,
    magnifierZoom,
    cornerTouchAreaSize,
    borderColor,
    cornerColor,
    magnifierColor,
    customControls,
  ]);

  return (
    <div
      className={cn(
        'container relative mx-auto max-w-3xl overflow-hidden p-4',
        className
      )}
    >
      {customOverlay}
      <Webcam
        classNames={webcamClassNames}
        callbacks={webcamCallbacks}
        defaultCamera="back"
        autoCapture={webcamAutoCapture}
        allowCameraSwitch={allowCameraSwitch}
        placeholder={webcamPlaceholder}
      />
      {customControls && <div className="mt-4">{customControls}</div>}
    </div>
  );
}
