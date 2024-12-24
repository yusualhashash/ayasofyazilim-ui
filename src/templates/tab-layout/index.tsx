'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, ReactNode, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const defaultClassNames = {
  vertical: {
    tabs: 'flex h-full',
    tabList: 'flex flex-col h-full justify-start max-w-sm overflow-hidden',
    tabTrigger: 'justify-start max-w-lg overflow-hidden w-full',
    tabContent: 'mx-2 my-0 w-full h-full overflow-auto flex-1',
  },
  horizontal: {
    tabs: 'flex h-full overflow-hidden flex-col',
    tabList: 'w-full mx:w-max overflow-x-auto overflow-y-hidden min-h-max',
    tabTrigger: 'min-w-max',
    tabContent: 'h-full my-2 overflow-auto',
  },
};

export function TabLayout({
  tabList,
  children,
  orientation = 'horizontal',
  classNames,
}: {
  tabList: {
    label: string;
    href: string;
    icon?: ComponentType<{ className?: string }>;
    fallback?: ReactNode;
  }[];
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  classNames?: typeof defaultClassNames;
}) {
  const path = usePathname();
  const active =
    tabList.find((tab) => tab.href === path.split('/').at(-1))?.href ||
    tabList[0].href;

  return (
    <Tabs
      defaultValue={active}
      className={cn(
        defaultClassNames[orientation].tabs,
        classNames?.[orientation].tabs
      )}
    >
      <TabsList
        className={cn(
          defaultClassNames[orientation].tabList,
          classNames?.[orientation].tabList
        )}
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            asChild
            className={cn(
              defaultClassNames[orientation].tabTrigger,
              classNames?.[orientation].tabTrigger
            )}
          >
            <Link
              href={tab.href}
              className="w-full overflow-hidden text-elipsis data-[state=active]:sticky data-[state=active]:left-0 data-[state=active]:right-0"
            >
              {tab.icon && <tab.icon className="block md:hidden" />}
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        value={active}
        className={cn(
          defaultClassNames[orientation].tabContent,
          classNames?.[orientation].tabContent
        )}
      >
        <Suspense fallback={<Skeleton className="flex-1 size-full" />}>
          {children}
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
