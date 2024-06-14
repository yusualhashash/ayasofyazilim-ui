'use client';
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
          className={cn(
            'flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10 w-full',
            mainClassName
          )}
        >
          {childScrollArea ? <ScrollArea>{children}</ScrollArea> : children}
        </main>
      </div>
    </div>
  );
}
