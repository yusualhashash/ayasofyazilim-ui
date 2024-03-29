import React, { JSXElementConstructor, ReactElement } from 'react';
import DashboardHeader from '../../organisms/header';
import Sidebar, { MenuProps } from '../../molecules/side-bar/index';

export type mainLayoutProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  logo?: string;
  menus?: MenuProps[];
  title?: string;
};

export default function Mainlayout({
  logo,
  title,
  children,
  menus,
}: mainLayoutProps) {
  // porps: DashboardProps
  return (
    <>
      <DashboardHeader logo={logo} title={title} />
      <div className="flex">
        <Sidebar menus={menus} />
        <div className="flex-col w-full h-full">{children}</div>
      </div>
    </>
  );
}
