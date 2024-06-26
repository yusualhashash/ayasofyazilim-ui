'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface ISection {
  id: string;
  link?: string;
  name: string;
  value?: JSX.Element;
}
export interface ISectionNavbarBase {
  activeSectionId: string;
  sections: Array<ISection>;
}
export interface ISectionContentBase {
  className?: string;
  sectionContent?: JSX.Element;
  sectionId: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
}
export interface ISectionContent {
  children?: JSX.Element;
  className?: string;
  sectionId: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
}
export interface ISectionLayoutProps {
  className?: string;
  contentClassName?: string;
  defaultActiveSectionId: string;
  sections: Array<ISection>;
}

const SectionNavbarBase = ({
  sections,
  activeSectionId,
}: ISectionNavbarBase) => (
  <div className="bg-white pt-3 pb-3 border-b sticky top-20 z-10">
    <nav className="text-sm flex flex-row gap-5 justify-center">
      {sections.map((section) => {
        const className = `
            hover:no-underline rounded-none bg-white ${section.id === activeSectionId ? `font-semibold text-primary sticky left-0 right-0` : 'text-muted-foreground hover:text-black'}`;
        return (
          <a href={`#${section.id}`} className={className} key={section.id}>
            {section.name}
          </a>
        );
      })}
    </nav>
  </div>
);
const SectionContentBase = ({
  setActiveSectionId,
  sectionId,
  sectionContent,
  className,
}: ISectionContentBase) => {
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSectionId(sectionId);
        }
      },
      { threshold: 0.5 }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div
      id={`${sectionId}`}
      ref={divRef}
      className={cn('w-full scroll-mt-20 pt-10', className)}
    >
      {sectionContent}
    </div>
  );
};

export const SectionContent = ({
  children,
  className,
  sectionId,
  setActiveSectionId,
}: ISectionContent) => (
  <SectionContentBase
    key={sectionId}
    setActiveSectionId={setActiveSectionId}
    sectionId={sectionId}
    sectionContent={children}
    className={className}
  />
);

export function TiptapLayout({
  className,
  sections,
  contentClassName,
  defaultActiveSectionId,
}: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultActiveSectionId
  );

  return (
    <div className={className}>
      <SectionNavbarBase
        sections={sections}
        activeSectionId={activeSectionId}
      />

      {sections.map((section) => (
        <SectionContent
          key={section.id}
          sectionId={section.id}
          setActiveSectionId={setActiveSectionId}
          className={contentClassName}
        >
          {section?.value}
        </SectionContent>
      ))}
    </div>
  );
}
