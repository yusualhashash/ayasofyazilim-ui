import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
// @ts-ignore

export interface IAboutCardProps {
  avatar: string;
  className?: string;
  containerClassName?: string;
  description: string;
  link?: string;
  title: string;
}
export default function AboutCard({
  avatar,
  title,
  description,
  link,
  containerClassName,
  className,
}: IAboutCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'opacity-80 rounded-tl-md flex bg-gray-50 items-center justify-center px-2  gap-2',
            containerClassName
          )}
        >
          <Link href={link}>
            <Avatar className="items-center w-6">
              <AvatarImage src={avatar} className="w-6 h-6 rounded-full" />
              <AvatarFallback>{title}</AvatarFallback>
            </Avatar>
          </Link>
          <CardTitle className="m-0 hover:underline">
            <Link href={link}>{title}</Link>
          </CardTitle>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          'w-80 bg-gray-50 border-gray-200 border-2 border-solid',
          className
        )}
      >
        <div className="flex justify-between space-x-4">
          <Link href={link}>
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{title}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold hover:underline">
              <Link href={link}>{title}</Link>
            </h4>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
