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
  navMenuLocation?: 'left' | 'right' | 'center';
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
  navMenuLocation = 'center',
}: DashboardHeaderProps) {
  const navigationMenu = (
    <Navigation className="hidden md:flex" navigationLinks={navMenu} />
  );
  return (
    <div className="flex items-center justify-between px-2 w-100">
      <div className="flex items-center gap-2">
        <BurgerMenu navigationLinks={navMenu} className="md:hidden" />
        <AvatarWrapper text="UR" url={logo} sideText={title} />
        {navMenuLocation === 'left' && navigationMenu}
      </div>
      <div className="flex items-center gap-2">
        {navMenuLocation === 'center' && navigationMenu}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
      <div className="flex items-center gap-2">
        {navMenuLocation === 'right' && navigationMenu}
        {extraMenu && <div>{extraMenu}</div>}
        <UserNav {...userNav} />
      </div>
    </div>
  );
}
