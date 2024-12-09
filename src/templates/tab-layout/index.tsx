'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, ReactNode, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export function TabLayout({
  tabList,
  children,
}: {
  tabList: {
    label: string;
    href: string;
    icon?: ComponentType<{ className?: string }>;
    fallback?: ReactNode;
  }[];
  children: ReactNode;
}) {
  const path = usePathname();
  const active =
    tabList.find((tab) => tab.href === path.split('/').at(-1))?.href ||
    tabList[0].href;

  return (
    <Tabs defaultValue={active} className="flex flex-col h-full">
      <TabsList className="w-full md:w-max">
        {tabList.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>
            <Link href={tab.href}>
              {tab.icon && <tab.icon className="block md:hidden" />}
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={active} className="h-full my-2">
        <Suspense fallback={<Skeleton className="flex-1 size-full" />}>
          {children}
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
