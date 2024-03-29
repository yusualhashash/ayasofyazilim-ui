import React, { JSXElementConstructor, ReactElement } from 'react';
import DashboardHeader from '../../organisms/header';
import Sidebar from '../../molecules/side-bar/index';

export type mainLayoutProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  logo?: string;
  title?: string;
};

export default function Mainlayout({ logo, title, children }: mainLayoutProps) {
  // porps: DashboardProps
  return (
    <>
      <DashboardHeader logo={logo} title={title} />
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-100 h-100">{children}</div>
      </div>
    </>
  );
}
