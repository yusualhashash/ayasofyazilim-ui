'use client';

import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ISection {
  id: string;
  link?: string;
  name: string;
  value?: JSX.Element;
}
export interface ISectionNavbarBase {
  activeSectionId: string;
  navClassName?: string;
  navAlignment?: 'start' | 'center' | 'end';
  openOnNewPage?: boolean;
  sections: Array<ISection>;
  vertical?: boolean;
  onSectionChange?: (sectionId: string) => void;
  showContentInSamePage?: boolean;
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
  content?: JSX.Element;
  contentClassName?: string;
  defaultActiveSectionId: string;
  openOnNewPage?: boolean;
  sections: Array<ISection>;
  vertical?: boolean;
  navAlignment?: 'start' | 'center' | 'end';
  navClassName?: string;
  onSectionChange?: (sectionId: string) => void;
  showContentInSamePage?: boolean;
}

const SectionNavbarBase = ({
  sections,
  activeSectionId,
  openOnNewPage,
  vertical,
  navAlignment,
  navClassName,
  onSectionChange,
  showContentInSamePage,
}: ISectionNavbarBase) => {
  function onClick(e: string) {
    if (onSectionChange) onSectionChange(e);
  }
  return (
    <div
      className={`sticky z-10 ${
        vertical
          ? 'top-5 basis-1/4 md:basis-2/12'
          : 'top-0 w-full bg-white shadow-sm'
      }`}
    >
      <nav
        className={cn(
          `gap-4 text-sm text-muted-foreground border-b md:border-0 text-center md:text-left ${
            vertical ? 'grid' : `flex flex-row justify-${navAlignment} p-5`
          }`,
          navClassName
        )}
      >
        {sections.map((section) => {
          if (!openOnNewPage && showContentInSamePage && onSectionChange) {
            return (
              <Button
                key={section.id}
                variant={'link'}
                onClick={() => onClick(section.id)}
                className={`${section.id === activeSectionId ? 'font-semibold text-primary' : ''} `}
              >
                {section.name}
              </Button>
            );
          }
          return (
            <Link
              href={
                openOnNewPage ? section?.link ?? section.id : `#${section.id}`
              }
              className={
                section.id === activeSectionId
                  ? 'font-semibold text-primary'
                  : ''
              }
              key={section.id}
            >
              {section.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
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
    <div id={sectionId} ref={divRef} className={cn('w-full ', className)}>
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

export function SectionLayout({
  className,
  sections,
  content,
  contentClassName,
  openOnNewPage,
  vertical,
  defaultActiveSectionId,
  navAlignment = 'start',
  navClassName,
  onSectionChange,
  showContentInSamePage,
}: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultActiveSectionId
  );
  const activeSection = sections.find(
    (section) => section.id === activeSectionId
  );
  useEffect(() => {
    if (openOnNewPage || showContentInSamePage) {
      setActiveSectionId(defaultActiveSectionId);
      if (onSectionChange) onSectionChange(defaultActiveSectionId);
    }
  }, [defaultActiveSectionId]);

  function onChange(e: string) {
    if (!openOnNewPage && showContentInSamePage && onSectionChange) {
      onSectionChange(e);
    }
  }

  return (
    <div
      className={cn(
        `mx-auto w-full flex flex-col items-center gap-6 md:gap-3 ${
          vertical ? 'md:flex-row md:items-start' : ''
        }`,
        className
      )}
    >
      <SectionNavbarBase
        sections={sections}
        activeSectionId={activeSectionId}
        openOnNewPage={openOnNewPage}
        onSectionChange={onChange}
        showContentInSamePage={showContentInSamePage}
        vertical={vertical}
        navAlignment={navAlignment}
        navClassName={navClassName}
      />
      <div className={vertical ? 'basis-3/4 ' : 'w-full'}>
        {openOnNewPage || showContentInSamePage ? (
          <SectionContent
            key={activeSection?.id}
            sectionId={activeSection?.id}
            setActiveSectionId={setActiveSectionId}
            className={contentClassName}
          >
            {openOnNewPage || showContentInSamePage
              ? content
              : activeSection?.value}
          </SectionContent>
        ) : (
          sections.map((section) => (
            <SectionContent
              key={section.id}
              sectionId={section.id}
              setActiveSectionId={setActiveSectionId}
              className={contentClassName}
            >
              {section?.value}
            </SectionContent>
          ))
        )}
      </div>
    </div>
  );
}
