'use client';

import React, { useEffect, useRef, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsVisible } from '../../hooks/useIsVisible';

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
  activeSectionId: string;
  className?: string;
  sectionContent?: JSX.Element;
  sectionEnded: string;
  sectionId: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
  setSectionEnded: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISectionContent {
  activeSectionId: string;
  children?: JSX.Element;
  className?: string;
  sectionEnded: string;
  sectionId: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
  setSectionEnded: React.Dispatch<React.SetStateAction<string>>;
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
}: ISectionNavbarBase) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white pt-3 pb-3 border-b sticky top-20 z-10">
      <nav className="flex flex-row justify-center items-center">
        <div className="text-sm flex flex-col md:flex-row md:flex-wrap gap-5 items-center md:justify-center">
          {sections.map((section) => {
            const className = `
            hover:no-underline rounded-none items-center bg-white ${section.id === activeSectionId ? `font-semibold text-primary sticky left-0 right-0 flex flex-row` : showDropdown ? 'text-muted-foreground hover:text-black' : 'text-muted-foreground hover:text-black hidden md:block'} `;
            return (
              <a
                href={`#${section.id}`}
                className={className}
                key={section.id}
                onClick={() => setShowDropdown(false)}
              >
                {section.name}
                {showDropdown && section.id === activeSectionId && (
                  <ChevronDown
                    className="items-center md:hidden text-muted-foreground ml-2 cursor-pointer transition-all"
                    size={16}
                    onClick={() => setShowDropdown((pre) => !pre)}
                  />
                )}
              </a>
            );
          })}
        </div>
        {!showDropdown && (
          <ChevronDown
            className="items-center md:hidden text-muted-foreground ml-2 cursor-pointer transition-all"
            size={16}
            onClick={() => setShowDropdown((pre) => !pre)}
          />
        )}
      </nav>
    </div>
  );
};
const SectionContentBase = ({
  setActiveSectionId,
  sectionId,
  sectionContent,
  className,
  sectionEnded,
  setSectionEnded,
  activeSectionId,
}: ISectionContentBase) => {
  const divRef = useRef(null);
  const isVisible = useIsVisible(divRef, 0.05);
  useEffect(() => {
    if (!isVisible) {
      if (activeSectionId === sectionId) {
        setSectionEnded(() => '');
      }
    }
  }, [isVisible]);
  useEffect(() => {
    if (isVisible && sectionEnded === '') {
      setActiveSectionId(() => sectionId);
      setSectionEnded(() => sectionId);
    }
  }, [sectionEnded, isVisible]);
  return (
    <div
      id={`${sectionId}`}
      ref={divRef}
      className={cn('w-full scroll-mt-20 pt-10 min-h-full', className)}
    >
      {sectionContent}
    </div>
  );
};

export const SectionContent = ({
  children,
  className,
  sectionId,
  activeSectionId,
  setActiveSectionId,
  sectionEnded,
  setSectionEnded,
}: ISectionContent) => (
  <SectionContentBase
    key={sectionId}
    setActiveSectionId={setActiveSectionId}
    activeSectionId={activeSectionId}
    sectionId={sectionId}
    sectionContent={children}
    className={className}
    sectionEnded={sectionEnded}
    setSectionEnded={setSectionEnded}
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
  const [sectionEnded, setSectionEnded] = useState('');

  return (
    <div className={className}>
      <SectionNavbarBase
        sections={sections}
        activeSectionId={activeSectionId}
      />

      <div className="container">
        {sections.map((section) => (
          <SectionContent
            key={section.id}
            sectionId={section.id}
            setActiveSectionId={setActiveSectionId}
            className={contentClassName}
            sectionEnded={sectionEnded}
            activeSectionId={activeSectionId}
            setSectionEnded={setSectionEnded}
          >
            {section?.value}
          </SectionContent>
        ))}
      </div>
    </div>
  );
}
