import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface avatarProps {
  containerClassName?: string;
  sideText?: string;
  text?: string;
  url?: string;
}

export default function AvatarWrapper({
  url,
  text,
  sideText,
  containerClassName,
}: avatarProps) {
  return (
    <div className="flex justify-center align-center items-center">
      <Avatar className={containerClassName}>
        <AvatarImage src={url} />
        <AvatarFallback>{text || sideText?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="ml-2"> {sideText} </span>
    </div>
  );
}
