import React from 'react';

import Navigation from '../../molecules/navigation-menu';
import { navigationLinkTypes } from '../../molecules/navigation-menu/types';
import AvatarWrapper from '../../molecules/avatar';
import { UserNav, userNavTypes } from '../profile-menu/index';
import BurgerMenu from '../burger-menu';

interface DashboardHeaderProps {
  children?: React.ReactNode;
  extraMenu?: React.ReactNode;
  logo?: string;
  navMenu: navigationLinkTypes[];
  title?: string;
  userNav?: userNavTypes;
}

export default function DashboardHeader({
  children,
  title,
  logo,
  userNav,
  navMenu,
  extraMenu,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center gap-4 h-12 px-2 w-100 shadow-sm">
      <BurgerMenu navigationLinks={navMenu} className="md:hidden" />
      <AvatarWrapper text="UR" url={logo} sideText={title} />
      <Navigation className="hidden md:flex" navigationLinks={navMenu} />
      {children && <div className="flex items-center gap-2">{children}</div>}
      <div className="flex items-center gap-2 ml-auto ">
        {extraMenu && <div>{extraMenu}</div>}
        <UserNav {...userNav} />
      </div>
    </div>
  );
}
