import React from 'react';

import { cn } from '@/lib/utils';

export interface ICardImageProps {
  ComponentAfterImage?: JSX.Element;
  alt?: string;
  className?: string;
  containerClassName?: string;
  src: string;
}
export default function CardImage({
  src,
  alt,
  ComponentAfterImage,
  containerClassName,
  className,
}: ICardImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-t-xl flex flex-col',
        containerClassName
      )}
    >
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full hover:scale-105 hover:ease-in transition duration-150 object-cover h-full lg:max-h-[350px]',
            className
          )}
        />
      </div>
      {ComponentAfterImage}
    </div>
  );
}
