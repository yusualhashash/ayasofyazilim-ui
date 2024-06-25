'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import ScrollArea from '../../molecules/scroll-area';

export type mainLayoutProps = {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  childScrollArea?: boolean;
  children?: JSX.Element;
  mainClassName?: string;
  mainScrollArea?: boolean;
  wrapperClassName?: string;
};
export type ILayoutProps = {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  childScrollArea?: boolean;
  children?: JSX.Element;
  mainClassName?: string;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollThreshold = 200;

  useEffect(() => {
    const el = document.querySelector('#scroll-area > div');
    const handleScroll = () => {
      setIsScrolled((el?.scrollTop || 0) >= scrollThreshold);
    };

    if (el) {
      el.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (mainScrollArea) {
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

        {isScrolled && (
          <button
            type="button"
            aria-label="Scroll to Top"
            className="fixed bottom-5 z-50 right-5 p-2 bg-gray-600 hover:bg-gray-700 rounded-full cursor-pointer"
            onClick={() =>
              document
                ?.querySelector('#scroll-area > div')
                ?.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <ChevronUp className="w-6 h-6" color="white" />
          </button>
        )}
      </ScrollArea>
    );
  }

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

const Layout = ({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
  childScrollArea = true,
  wrapperClassName,
}: ILayoutProps) => (
  <div
    className={cn('h-dvh grid grid-rows-[max-content_1fr] ', wrapperClassName)}
  >
    {HeaderComponent}

    <div className="flex">
      {SidebarComponent}

      <main className={cn(mainClassName)}>
        {childScrollArea ? <ScrollArea>{children}</ScrollArea> : children}
      </main>
    </div>
  </div>
);
