export type mainLayoutProps = {
  HeaderComponent?: JSX.Element;
  SidebarComponent?: JSX.Element;
  children?: JSX.Element;
};

export default function MainLayout({
  HeaderComponent,
  SidebarComponent,
  children,
}: mainLayoutProps) {
  return (
    <div className="h-dvh grid grid-rows-[max-content_1fr] overflow-hidden">
      {HeaderComponent}

      <div className="flex overflow-hidden">
        {SidebarComponent}

        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
