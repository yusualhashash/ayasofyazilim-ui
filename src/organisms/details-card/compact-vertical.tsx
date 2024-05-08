// @ts-ignore
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import { IDetailsCardProps } from '.';
import AboutCard from '../../molecules/about-card';
import CardImage from '../../molecules/card-image';
import CardTable from '../../molecules/card-table';
import CardTag from '../../molecules/card-tag';

export default function CompactVertical(infoCard: IDetailsCardProps) {
  return (
    <Card className="border-gray-200 max-w-full w-full relative flex flex-row overflow-hidden">
      <div className="w-full">
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
            containerClassName="rounded-none"
            ComponentAfterImage={
              infoCard.IAboutCardProps && (
                <AboutCard {...infoCard.IAboutCardProps} />
              )
            }
          />
        )}
      </div>
      <div className="w-full flex flex-col">
        {infoCard.BeforeCardContentComponent}
        <CardContent className="gap-3 flex flex-col px-6 py-4  mb-auto flex-1">
          <CardTitle className="hover:underline">
            <Link href={infoCard.link}>{infoCard?.title}</Link>
          </CardTitle>
          <CardDescription>{infoCard?.description}</CardDescription>
          <div>
            {infoCard?.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="mr-2 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        {infoCard?.tableProps?.map(({ title, value, column }) => (
          <CardTable key={title} title={title} value={value} column={column} />
        ))}
        <div className="h-2" />
        {infoCard?.tableProps2Col?.map((table, indexLine) => (
          <div key={`d${indexLine.toString()}`}>
            <div className="flex flex-row justify-between items-center bg-gray-100">
              {table.map(({ title, value }, indexRow) => (
                <CardTable
                  key={value}
                  title={title}
                  containerClassName={
                    indexRow === 0 ? 'items-start' : 'items-end'
                  }
                  titleClassName="text-md m-auto"
                  value={value}
                  column
                />
              ))}
            </div>
          </div>
        ))}
        {infoCard.ActionComponent && infoCard.ActionComponent}
      </div>
    </Card>
  );
}
