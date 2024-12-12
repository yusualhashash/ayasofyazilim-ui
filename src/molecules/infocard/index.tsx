import React from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type infoCardProps = {
  className?: string;
  content: string;
  cta?: {
    href: string;
    text: string;
  };
  description?: string;
  footer?: string;
  icon?: string | React.ReactNode;
  loading?: boolean;
  onDelete?: () => void;
  onEdit?: string;
  title: string;
} & React.HTMLProps<HTMLDivElement>;

export default function InfoCard(infoCard: infoCardProps) {
  const checkIsLoading = (
    loading: boolean | undefined,
    value: string,
    width: string | number = '24',
    height: string | number = '5'
  ) => (loading ? <Skeleton className={`w-${width} h-${height}`} /> : value);
  let tempCta = infoCard?.cta;
  if (infoCard.onEdit) {
    tempCta = {
      text: 'Edit',
      href: infoCard.onEdit,
    };
  }

  return (
    <Card className={cn('min-w-60', infoCard.className)}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex flex-row items-center justify-between ">
          <CardTitle className="text-sm font-medium">
            {checkIsLoading(infoCard.loading, infoCard.title, 12)}
          </CardTitle>
          {infoCard.icon && infoCard.icon}
        </div>
        {infoCard.description && (
          <CardDescription>
            {checkIsLoading(infoCard.loading, infoCard.description, 30)}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="order-first text-2xl font-bold">
        <p>{checkIsLoading(infoCard.loading, infoCard.content, 30, 24)}</p>
        {infoCard.footer && (
          <div className="font-normal text-xs">
            <p>{checkIsLoading(infoCard.loading, infoCard.footer, 24)}</p>
            {tempCta && (
              <Button className="w-full m-4" asChild>
                <Link className="w-full m-4" href={tempCta.href}>
                  {tempCta.text}
                </Link>
              </Button>
            )}
            {infoCard.onDelete && (
              <Button className="w-full m-4" onClick={infoCard.onDelete}>
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
