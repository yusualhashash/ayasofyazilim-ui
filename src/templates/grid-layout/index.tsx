import { CalendarDays, Grid2X2, Rows3 } from 'lucide-react';
import React, { ReactElement } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type GridLayoutProps = {
  children?: ReactElement[];
  orientation?: 'cols' | 'rows';
};
export function dummyExample() {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const childs: React.ReactElement[] = testArray.map((key) => (
    <div
      className="flex justify-between space-x-4 border shadow-sm rounded-lg p-2 group"
      key={key}
    >
      <Avatar className="group-hover:scale-105">
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  ));
  return childs;
}
export default function GridLayout({
  orientation = 'cols',
  children,
}: GridLayoutProps) {
  return (
    <div>
      <div>
        <Tabs
          defaultValue={orientation}
          className="h-full bg-green-500 grow w-full p-4 items-end justify-end"
        >
          <div className="w-full flex items-center justify-end">
            <TabsList>
              <TabsTrigger value="cols">
                <Grid2X2 className="w-4" />
              </TabsTrigger>
              <TabsTrigger value="rows">
                <Rows3 className="w-4" />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="cols">
            <Container oriantation="cols">{children}</Container>
          </TabsContent>
          <TabsContent value="rows">
            <Container oriantation="rows">{children}</Container>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const Container = ({
  children,
  oriantation,
}: {
  children: React.ReactNode;
  oriantation: 'cols' | 'rows';
}) => (
  <div
    className={`bg-red-500 grow border p-4 rounded grid gap-4 ${oriantation === 'cols' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}`}
  >
    {children}
  </div>
);
