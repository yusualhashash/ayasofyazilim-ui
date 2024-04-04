import React, { JSXElementConstructor, ReactElement } from 'react';
import { userNavTypes } from 'src/organisms/profile-menu';
import DashboardHeader from '../../organisms/header';
import Sidebar, { MenuProps } from '../../molecules/side-bar/index';
import { navigationLinkTypes } from '../../molecules/navigation-menu/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export type mainLayoutProps = {
  children?: ReactElement<any, string | JSXElementConstructor<any>> | String;
  extraMenu?: ReactElement | ReactElement;
  logo?: string;
  menus?: MenuProps[];
  navMenu: navigationLinkTypes[];
  title?: string;
  userNav?: userNavTypes;
};

export default function Mainlayout({
  logo,
  title,
  children,
  menus,
  userNav,
  navMenu,
  extraMenu,
}: mainLayoutProps) {
  // porps: DashboardProps
  return (
    <div className="h-dvh grid grid-rows-[max-content_1fr]  overflow-hidden">
      <DashboardHeader
        logo={logo}
        title={title}
        userNav={userNav}
        navMenu={navMenu}
        extraMenu={extraMenu}
      />
      <div className="flex overflow-hidden">
        <Sidebar className="hidden md:flex shadow-md" menus={menus} />
        <ScrollArea className="flex-col w-full h-full overflow-auto bg-transparent p-2">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
