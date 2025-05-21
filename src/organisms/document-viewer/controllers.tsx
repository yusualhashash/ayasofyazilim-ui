import {
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Controllers({
  documentUri,
  zoom,
  setZoom,
  showThumbnail,
  setShowThumbnail,
}: {
  documentUri: string;
  zoom: number;
  setZoom: (zoom: number) => void;
  showThumbnail?: boolean;
  setShowThumbnail?: (show: boolean) => void;
}) {
  return (
    <div className="absolute top-4 right-6 flex gap-2 z-10 flex-col">
      {setShowThumbnail && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowThumbnail(!showThumbnail)}
        >
          {showThumbnail ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeOffIcon className="size-4" />
          )}
        </Button>
      )}
      <Button variant="outline" size="icon" onClick={() => setZoom(zoom - 0.1)}>
        <ZoomOut className="size-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setZoom(zoom + 0.1)}>
        <ZoomIn className="size-4" />
      </Button>
      <Button asChild variant="outline" size="icon">
        <Link href={documentUri} download target="_blank">
          <DownloadIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
