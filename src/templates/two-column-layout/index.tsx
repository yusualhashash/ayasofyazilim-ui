'use client';

import React from 'react';

export type TwoColumnLayoutProps = {
  LeftNode: JSX.Element;
  RightNode: JSX.Element;
};

export const TwoColumnLayout = ({
  LeftNode,
  RightNode,
}: TwoColumnLayoutProps) => (
  <div className="flex flex-col md:flex-row h-screen">
    {LeftNode}

    {RightNode}
  </div>
);
