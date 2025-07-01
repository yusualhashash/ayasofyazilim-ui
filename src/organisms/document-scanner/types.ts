import { ReactNode } from 'react';

export interface Corner {
  x: number;
  y: number;
}

export interface DocumentCorners {
  topLeftCorner: Corner;
  topRightCorner: Corner;
  bottomRightCorner: Corner;
  bottomLeftCorner: Corner;
}

export type ScanningStatus =
  | 'scanning'
  | 'detected'
  | 'cropped'
  | 'idle'
  | 'error';

export interface DocumentScannerProps {
  // Core callbacks
  onDocumentCropped?: (croppedImageBase64: string) => void;
  onDocumentDetected?: (corners: DocumentCorners, image: string) => void;
  onCornersChanged?: (corners: DocumentCorners) => void;
  onError?: (error: string) => void;
  onStatusChange?: (status: ScanningStatus) => void;
  onCameraReady?: (dimensions: { width: number; height: number }) => void;
  onScanAttempt?: () => void;
  onImageCapture?: (imageBase64: string) => void;
  // Basic configuration
  className?: string;
  //   autoScan?: boolean;
  captureInterval?: number;
  // Feature toggles
  allowCrop?: boolean;
  allowCornerAdjustment?: boolean;
  allowCameraSwitch?: boolean;
  allowRetry?: boolean;
  // UI visibility
  showMagnifier?: boolean;
  showCornersLabels?: boolean;
  showBorders?: boolean;
  // Text customization
  cropButtonText?: string;
  retryButtonText?: string;
  // Corner adjustment
  cornerSmoothingFactor?: number;
  proximityThreshold?: number;
  cornerTouchAreaSize?: number;
  // Magnifier settings
  magnifierSize?: number;
  magnifierZoom?: number;
  magnifierColor?: string;
  // Visual styling
  borderColor?: string;
  cornerColor?: string;
  // Detection settings
  minDocumentSize?: number;
  maxDocumentSize?: number;
  detectionConfidence?: number;

  // Image processing
  imageQuality?: number;

  // Advanced settings
  customDetectionAlgorithm?: (
    imageBase64: string,
    dimensions: { width: number; height: number }
  ) => Promise<DocumentCorners | null>;

  // Custom components
  customControls?: ReactNode;
  customOverlay?: ReactNode;
}
