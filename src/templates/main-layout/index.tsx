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
  return (
    <div className="h-dvh grid grid-rows-[max-content_1fr] overflow-hidden">
      {HeaderComponent}

      <div className="flex overflow-hidden">
        {SidebarComponent}

        <main
          className={cn(
            'flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10 w-full',
            mainClassName
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
