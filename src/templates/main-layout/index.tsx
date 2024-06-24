'use client';


import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import ScrollArea from '../../molecules/scroll-area';

export type mainLayoutProps = {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  children?: JSX.Element;
  mainClassName?: string;
  mainScrollArea?: boolean;
  childScrollArea?: boolean;
  wrapperClassName?: string;
};

export default function MainLayout({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
  mainScrollArea = true,
  childScrollArea = true,
  wrapperClassName,
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
  if (mainScrollArea)
    return (
      <ScrollArea id="scroll-area" className="h-screen">
        <Layout
          HeaderComponent={HeaderComponent}
          SidebarComponent={SidebarComponent}
          mainClassName={mainClassName}
          childScrollArea={childScrollArea}
          wrapperClassName={wrapperClassName}
        >
          {children}
        </Layout>
      </ScrollArea>
    );

  return (
    <Layout
      HeaderComponent={HeaderComponent}
      SidebarComponent={SidebarComponent}
      mainClassName={mainClassName}
      childScrollArea={childScrollArea}
      wrapperClassName={wrapperClassName}
    >
      {children}
    </Layout>
  );
}

function Layout({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
  childScrollArea = true,
  wrapperClassName,
}: mainLayoutProps) {
  return (
    <div
      className={cn(
        'h-dvh grid grid-rows-[max-content_1fr] overflow-hidden',
        wrapperClassName
      )}
    >
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
          {childScrollArea ? <ScrollArea>{children}</ScrollArea> : children}
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
