import React from 'react';
import { Placement, Props } from 'tippy.js';

export interface TooltipProps {
  children?: string | JSX.Element;
  enabled?: boolean;
  title?: string;
  shortcut?: string[];
  tippyOptions?: Omit<Partial<Props>, 'content'>;
  content?: JSX.Element;
}

export interface TippyProps {
  'data-placement': Placement;
  'data-reference-hidden'?: string;
  'data-escaped'?: string;
}
