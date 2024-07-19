'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ISection {
  id: string;
  link?: string;
  name: string;
}

export interface ISectionLayoutNavbarProps {
  activeSectionId: string;
  linkElement?: any;
  onSectionChange?: (sectionId: string) => void;
  sections: Array<ISection>;
  vertical?: boolean;
}

export function SectionLayoutNavbar({
  sections,
  activeSectionId,
  onSectionChange,
  linkElement,
  vertical,
}: ISectionLayoutNavbarProps) {
  const LinkElement = linkElement || Button;
  return (
    <nav
      className={cn(
        'flex gap-4 text-sm text-center md:text-left p-5',
        vertical
          ? 'flex-col border-r min-w-[240px]'
          : 'flex-col md:flex-row border-b'
      )}
    >
      {sections.map((section) => (
        <LinkElement
          className={
            activeSectionId === section.id
              ? 'font-semibold text-primary hover:no-underline m-0 p-0 h-auto'
              : 'font-normal text-muted-foreground hover:no-underline m-0 p-0 h-auto'
          }
          href={section.link || '#'}
          onClick={() => {
            if (!linkElement && onSectionChange) {
              onSectionChange(section.id);
            }
          }}
          key={section.id}
          variant="link"
        >
          {section.name}
        </LinkElement>
      ))}
    </nav>
  );
}

export interface ISectionContentProps {
  children: React.ReactNode;
  className?: string;
  sectionId: string;
}
export function SectionLayoutContent({
  sectionId,
  children,
  className,
}: ISectionContentProps) {
  const context = useContext(SectionLayoutContext);
  const { activeSectionId } = context;
  if (activeSectionId !== sectionId) return null;

  return (
    <div id={`section-${sectionId}`} className={cn('w-full p-5', className)}>
      {children}
    </div>
  );
}

const SectionLayoutContext = createContext({
  activeSectionId: '',
});
export interface ISectionLayoutProps {
  children: React.ReactNode;
  defaultActiveSectionId?: string;
  linkElement?: any;
  sections: Array<ISection>;
  vertical?: boolean;
}
export function SectionLayout({
  children,
  sections,
  defaultActiveSectionId,
  linkElement,
  vertical,
}: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultActiveSectionId || sections?.[0].id
  );
  useEffect(() => {
    if (linkElement && defaultActiveSectionId) {
      setActiveSectionId(defaultActiveSectionId);
    }
  }, [defaultActiveSectionId]);
  const contextValue = useMemo(() => ({ activeSectionId }), [activeSectionId]);
  return (
    <SectionLayoutContext.Provider value={contextValue}>
      <Card className={vertical ? 'flex rounded-lg' : 'rounded-lg'}>
        <SectionLayoutNavbar
          sections={sections}
          activeSectionId={activeSectionId}
          onSectionChange={setActiveSectionId}
          linkElement={linkElement}
          vertical={vertical}
        />
        {children}
      </Card>
    </SectionLayoutContext.Provider>
  );
}
