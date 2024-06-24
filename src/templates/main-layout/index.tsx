'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type mainLayoutProps = {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  children?: JSX.Element;
  mainClassName?: string;
};

export default function MainLayout({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
}: mainLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const currentPosition = scrollRef.current.scrollTop;
      setIsScrolled(currentPosition > 0);
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-dvh grid grid-rows-[max-content_1fr] overflow-hidden">
      {HeaderComponent}

      <div className="flex overflow-hidden">
        {SidebarComponent}

        <main
          ref={scrollRef}
          className={cn(
            'flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10 w-full',
            mainClassName
          )}
        >
          {children}
          {isScrolled && (
            <button
              type="button"
              aria-label="Scroll to Top"
              className="fixed bottom-5 z-50 right-5 p-2 bg-gray-600 hover:bg-gray-700 rounded-full cursor-pointer"
              onClick={() =>
                scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
              }
            >
              <ChevronUp className="w-6 h-6" color="white" />
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
