'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { cn } from '@/lib/utils';
// @ts-ignore

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
  sectionId?: string;
  setActiveSectionId?: React.Dispatch<React.SetStateAction<string>>;
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
  <div className="bg-white pt-3 pb-3 border-b sticky top-0 z-10">
    <nav className="text-sm flex flex-row gap-5 justify-center">
      {sections.map((section) => {
        const className = `
            hover:no-underline rounded-none bg-white ${section.id === activeSectionId ? `font-semibold text-primary sticky left-0 right-0` : 'text-muted-foreground hover:text-black'}`;
        return (
          <Link href={`#${section.id}`} className={className} key={section.id}>
            {section.name}
          </Link>
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
      id={`${sectionId}testTable`}
      ref={divRef}
      className={cn('w-full ', className)}
    >
      {sectionContent}
    </div>
  );
};

export function SectionContent({
  children,
  className,
  sectionId,
  setActiveSectionId,
}: ISectionContent) {
  if (setActiveSectionId && sectionId) {
    return (
      <SectionContentBase
        key={sectionId}
        setActiveSectionId={setActiveSectionId}
        sectionId={sectionId}
        sectionContent={children}
        className={className}
      />
    );
  }
  return (
    <div className={cn('flex flex-1 justify-center', className)}>
      {children}
    </div>
  );
}

export function TiptapLayout({
  className,
  sections,
  contentClassName,
  defaultActiveSectionId,
  // onSectionChange,
}: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultActiveSectionId
  );
  // const activeSection = sections.find(
  //   (section) => section.id === activeSectionId
  // );

  // function onChange(e: string) {
  //   if (onSectionChange) {
  //     onSectionChange(e);
  //   }
  // }

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
