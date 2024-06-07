'use client';

import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area';

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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
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
    <ScrollArea
      className={`bg-white w-full shadow-sm ${vertical ? 'h-16 max-w-full md:h-full md:max-w-72' : 'h-16 max-w-full'}`}
    >
      <ScrollBar
        orientation={
          vertical && useWindowSize().width > 768 ? 'vertical' : 'horizontal'
        }
        className="z-10"
      />
      <div>
        <nav
          className={cn(
            `flex gap-4 text-sm text-muted-foreground md:border-0 border-b text-center md:text-left ${
              vertical
                ? `flex-row justify-start p-0 h-16 items-center md:items-start md:flex-col md:gap-0 md:h-full`
                : `flex-row justify-${navAlignment} p-0 h-16 items-center`
            }     `,
            navClassName
          )}
        >
          {sections.map((section, key) => {
            if (!openOnNewPage && showContentInSamePage && onSectionChange) {
              return (
                <Button
                  key={section.id}
                  variant={'link'}
                  onClick={() => onClick(section.id)}
                  className={`
                    hover:no-underline rounded-none bg-white ${section.id === activeSectionId ? `font-semibold text-primary sticky left-0 right-0` : 'text-muted-foreground hover:text-black'} ${
                      vertical
                        ? 'block overflow-hidden text-ellipsis text-left max-w-72 h-10 px-4 py-0'
                        : 'flex text-left h-16 px-4 py-0'
                    } `}
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
    </ScrollArea>
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
        `flex overflow-hidden h-full ${vertical ? 'flex-col md:flex-row' : 'flex-col'}`,
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
      <ScrollArea className="w-full flex">
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
      </ScrollArea>
    </div>
  );
}
