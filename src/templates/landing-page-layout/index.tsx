'use client';

import { useEffect, useState } from 'react';

import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ILandingPageLayoutProps {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  children?: JSX.Element;
  mainClassName?: string;
  wrapperClassName?: string;
}

interface ILayoutProps {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  children?: JSX.Element;
  mainClassName?: string;
  wrapperClassName?: string;
}

export default function LandingPageLayout({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
  wrapperClassName,
}: ILandingPageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollThreshold = 200;

  useEffect(() => {
    function onScroll() {
      setIsScrolled((window.scrollY || 0) >= scrollThreshold);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Layout
        HeaderComponent={HeaderComponent}
        SidebarComponent={SidebarComponent}
        mainClassName={mainClassName}
        wrapperClassName={wrapperClassName}
      >
        {children}
      </Layout>

      {isScrolled && (
        <button
          type="button"
          aria-label="Scroll to Top"
          className="fixed bottom-5 z-50 right-5 p-2 bg-gray-600 hover:bg-gray-700 rounded-full cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="w-6 h-6" color="white" />
        </button>
      )}
    </>
  );
}

const Layout = ({
  HeaderComponent,
  SidebarComponent,
  children,
  mainClassName,
  wrapperClassName,
}: ILayoutProps) => (
  <div
    className={cn('h-dvh grid grid-rows-[max-content_1fr] ', wrapperClassName)}
  >
    {HeaderComponent}

    <div className="flex">
      {SidebarComponent}

      <main className={cn(mainClassName)}>{children}</main>
    </div>
  </div>
);
