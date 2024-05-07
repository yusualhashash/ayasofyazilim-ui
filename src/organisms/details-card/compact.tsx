// @ts-ignore
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
// @ts-ignore

import { Separator } from '@/components/ui/separator';
import { IDetailsCardProps } from '.';
import AboutCard from '../../molecules/about-card';
import CardImage from '../../molecules/card-image';
import CardTable from '../../molecules/card-table';
import CardTag from '../../molecules/card-tag';

export default function Compact(infoCard: IDetailsCardProps) {
  return (
    <Card className="border-gray-200 max-w-xs relative flex flex-col overflow-hidden">
      {infoCard.cardTagTitle && (
        <CardTag
          title={infoCard.cardTagTitle}
          variant={infoCard.cardTagVariant}
        />
      )}
      {infoCard.image && (
        <CardImage
          src={infoCard.image}
          alt={infoCard.title}
          ComponentAfterImage={
            infoCard.IAboutCardProps && (
              <AboutCard {...infoCard.IAboutCardProps} />
            )
          }
        />
      )}
      {infoCard.BeforeCardContentComponent}
      <CardContent className="gap-3 flex flex-col pt-4">
        <CardTitle className="hover:underline">
          <Link href={infoCard.link}>{infoCard?.title}</Link>
        </CardTitle>
        <CardDescription>{infoCard?.description}</CardDescription>
        <div>
          {infoCard?.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="mr-2 cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {infoCard?.tableProps?.map(({ title, value, column }) => (
        <CardTable
          key={title}
          title={title}
          value={value}
          column={column}
          separator
        />
      ))}

      {infoCard?.tableProps2Col?.map((table, indexLine) => (
        <div key={`d${indexLine.toString()}`}>
          <Separator className="h-[2px]" />
          <div className="flex flex-row justify-between items-center">
            {table.map(({ title, value }, indexRow) => (
              <CardTable
                key={value}
                title={title}
                containerClassName={
                  indexRow === 0 ? 'items-start' : 'items-end'
                }
                titleClassName="text-md text-left"
                value={value}
                column
                separator={indexRow === 0}
              />
            ))}
          </div>
        </div>
      ))}
      {infoCard.ActionComponent && infoCard.ActionComponent}
    </Card>
  );
}
