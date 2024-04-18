import React, { JSXElementConstructor, ReactElement } from 'react';
import { userNavTypes } from 'src/organisms/profile-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { navigationLinkTypes } from '../../molecules/navigation-menu/types';
import Sidebar, { MenuProps } from '../../molecules/side-bar/index';
import DashboardHeader from '../../organisms/header';

export type mainLayoutProps = {
  children?: ReactElement<any, string | JSXElementConstructor<any>> | String;
  extraMenu?: ReactElement | ReactElement;
  logo?: string;
  menus?: MenuProps[];
  navMenu: navigationLinkTypes[];
  navMenuLocation?: 'left' | 'right' | 'center';
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
  navMenuLocation,
}: mainLayoutProps) {
  // porps: DashboardProps
  return (
    <div className="h-dvh grid grid-rows-[max-content_1fr] overflow-hidden">
      <DashboardHeader
        logo={logo}
        title={title}
        userNav={userNav}
        navMenu={navMenu}
        extraMenu={extraMenu}
        navMenuLocation={navMenuLocation}
      />
      <div className="flex overflow-hidden">
        <Sidebar className="hidden md:flex shadow-md" menus={menus} />
        <ScrollArea className="flex-col w-full h-full overflow-auto">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
