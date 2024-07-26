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
  sectionName: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
  setSectionEnded: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISectionContent {
  activeSectionId: string;
  children?: JSX.Element;
  className?: string;
  sectionEnded: string;
  sectionId: string;
  sectionName: string;
  setActiveSectionId: React.Dispatch<React.SetStateAction<string>>;
  setSectionEnded: React.Dispatch<React.SetStateAction<string>>;
}
export interface ISectionLayoutProps {
  defaultActiveSectionId: string;
  sections: Array<ISection>;
}

const SectionNavbarBase = ({
  sections,
  activeSectionId,
}: ISectionNavbarBase) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white pt-3 pb-3 border-b sticky top-16 z-10">
      <nav className="flex flex-row justify-center items-center">
        <div className="text-sm flex flex-col md:flex-row md:flex-wrap gap-5 items-center md:justify-center">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const className = `
            hover:no-underline rounded-none items-center bg-white ${isActive ? `font-semibold text-primary sticky left-0 right-0 flex flex-row` : showDropdown ? 'text-muted-foreground hover:text-black' : 'text-muted-foreground hover:text-black hidden md:block'} `;
            const classNameButtton = `
            hover:no-underline rounded-none items-center bg-white ${isActive ? `font-semibold text-primary sticky left-0 right-0 flex flex-row` : showDropdown ? 'text-muted-foreground hover:text-black' : 'text-muted-foreground hover:text-black hidden md:block'} `;
            if (!isActive) {
              return (
                <a
                  href={`#${section.id}`}
                  className={className}
                  key={section.id}
                  onClick={() => setShowDropdown(false)}
                >
                  {section.name}
                </a>
              );
            }

            return (
              <button
                type="button"
                className={classNameButtton}
                key={section.id}
                onClick={() => setShowDropdown((p) => !p)}
              >
                {section.name}
              </button>
            );
          })}
        </div>
        {!showDropdown && (
          <ChevronDown
            className="items-center md:hidden text-primary ml-2 cursor-pointer transition-all"
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
  sectionName,
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
      className={cn('w-full scroll-mt-24 pt-12 min-h-full', className)}
    >
      <h2 className="text-2xl text-center mb-10 font-bold">{sectionName}</h2>
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
  sectionName,
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
    sectionName={sectionName}
  />
);

export function TiptapLayout({
  sections,
  defaultActiveSectionId,
}: ISectionLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(
    defaultActiveSectionId
  );
  const [sectionEnded, setSectionEnded] = useState('');

  return (
    <div className="bg-accent pb-10">
      <SectionNavbarBase
        sections={sections}
        activeSectionId={activeSectionId}
      />

      <div className="max-w-4xl mx-auto">
        {sections.map((section) => (
          <SectionContent
            key={section.id}
            sectionId={section.id}
            setActiveSectionId={setActiveSectionId}
            sectionEnded={sectionEnded}
            activeSectionId={activeSectionId}
            setSectionEnded={setSectionEnded}
            sectionName={section.name}
          >
            {section?.value}
          </SectionContent>
        ))}
      </div>
    </div>
  );
}
