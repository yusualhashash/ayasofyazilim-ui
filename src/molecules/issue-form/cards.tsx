import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import CustomButton from '../button';

type contentProps =
  | {
      icon?: string | React.ReactNode;
      info: string;
      title: string;
    }
  | undefined;

type CardProps = {
  cardParams?: React.HTMLAttributes<HTMLDivElement>;
  content: contentProps[];
  cta?: {
    icon?: string | React.ReactNode;
    onClick: () => void;
    title: string;
  };
  title: string;
};

export default function Cards(params: CardProps) {
  return (
    <Card className={`p-4 ${params.cardParams?.className}`}>
      <CardTitle className="grid grid-cols-2 items-center">
        {params.title}
        {params.cta && (
          <CustomButton
            size="sm"
            variant="outline"
            onClick={params.cta.onClick}
          >
            {params.cta.title}
          </CustomButton>
        )}
      </CardTitle>
      <div className="grid gap-2 pt-2">
        {params.content.map((item, index) => {
          if (!item) return null;
          const key = `${item.title} ${index}`;
          return (
            <div key={key} className="grid gap-2 items-start grid-cols-2">
              <span className="text-sm font-semibold flex gap-1">
                {item.icon}
                {item.title}:
              </span>
              <span className="text-sm text-gray-500 text-end">
                {item.info}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
