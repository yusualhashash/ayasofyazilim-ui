'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { BlurFade } from './blur-fade';

export type GalleryItem = {
  id: string;
  imageUrl: string;
  alt: string;
  thumbnailContent?: React.ReactNode;
  dialogContent?: React.ReactNode;
};
export default function Gallery({ images }: { images: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const selectedImage = images?.[currentIndex];
  const [open, setOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const navigateToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const navigateToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigateToPrevious(e as unknown as React.MouseEvent);
    } else if (e.key === 'ArrowRight') {
      navigateToNext(e as unknown as React.MouseEvent);
    }
  };
  return (
    <section id="photos" className="p-5">
      <div className="columns-2 gap-4 sm:columns-3 md:columns-5">
        {images.map((image, index) => (
          <BlurFade key={image.imageUrl} delay={0.25 + index * 0.05} inView>
            <Button
              variant="link"
              onClick={() => openLightbox(index)}
              aria-label={`View image: ${image.alt}`}
              className="h-auto"
              asChild
            >
              <img
                className="mb-4 size-full rounded-lg object-contain cursor-pointer transition-transform hover:scale-[1.02]"
                src={image.imageUrl || '/placeholder.svg'}
                alt={image.alt}
                loading="lazy"
              />
            </Button>
            <div className="absolute top-1 right-1">
              {image?.thumbnailContent}
            </div>
          </BlurFade>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <DialogClose className="absolute right-4 top-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:text-white hover:bg-black/70 transition-colors"
            onClick={navigateToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:text-white hover:bg-black/70 transition-colors"
            onClick={navigateToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          {selectedImage && (
            <>
              <div className="flex items-center justify-center">
                <div className="relative max-w-full max-h-[85vh] ">
                  <img
                    src={selectedImage?.imageUrl || '/placeholder.svg'}
                    alt="Enlarged view"
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  />
                  <div className="absolute top-1 right-1">
                    {selectedImage?.thumbnailContent}
                  </div>
                </div>
              </div>
              <DialogFooter className="sm:justify-center">
                {selectedImage?.dialogContent}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
