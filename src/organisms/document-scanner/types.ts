import { ReactNode, ComponentType } from 'react';

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
  onAutoCaptureStart?: () => void;
  onAutoCaptureStop?: () => void;

  // Basic configuration
  className?: string;
  //   autoScan?: boolean;
  captureInterval?: number;
  showPreview?: boolean;

  // Feature toggles
  allowCrop?: boolean;
  allowCornerAdjustment?: boolean;
  allowCameraSwitch?: boolean;
  allowRetry?: boolean;
  allowDownload?: boolean;
  allowManualCapture?: boolean;

  // UI visibility
  showMagnifier?: boolean;
  showCornersLabels?: boolean;
  showBorders?: boolean;
  showStatusMessages?: boolean;
  showControls?: boolean;
  showCaptureButton?: boolean;

  // Text customization
  cropButtonText?: string;
  retryButtonText?: string;
  downloadButtonText?: string;
  captureButtonText?: string;
  confirmButtonText?: string;
  scanningMessage?: string;
  detectedMessage?: string;
  croppedMessage?: string;
  errorMessage?: string;

  // Accessibility and UX
  enableSoundFeedback?: boolean;
  preventBodyScroll?: boolean;

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
  overlayOpacity?: number;
  cornerLabelColor?: string;

  // Detection settings
  minDocumentSize?: number;
  maxDocumentSize?: number;
  detectionConfidence?: number;

  // Image processing
  imageQuality?: number;
  imageFormat?: 'jpeg' | 'png' | 'webp';
  outputWidth?: number;
  outputHeight?: number;

  // Advanced settings
  enableDebugMode?: boolean;
  debugOverlayColor?: string;
  customDetectionAlgorithm?: (
    imageBase64: string,
    dimensions: { width: number; height: number }
  ) => Promise<DocumentCorners | null>;

  // Webcam configuration
  webcamFacingMode?: 'user' | 'environment';
  webcamResolution?: { width: number; height: number };

  // Custom components
  customControls?: ReactNode;
  customOverlay?: ReactNode;
  customErrorComponent?: ComponentType<{
    error: string;
    onRetry: () => void;
  }>;
  customLoadingComponent?: ComponentType;
}
