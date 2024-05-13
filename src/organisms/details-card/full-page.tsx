// @ts-ignore
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
// @ts-ignore

import { IDetailsCardProps } from '.';
import AboutCard from '../../molecules/about-card';
import CardImage from '../../molecules/card-image';
import CardTable from '../../molecules/card-table';
import CardTag from '../../molecules/card-tag';
import { cn } from '@/lib/utils';

export default function FullPage(infoCard: IDetailsCardProps) {
  return (
    <Card
      className={cn(
        ' max-w-full w-full grid grid-cols-3 gap-x-12 gap-y-6 overflow-hidden rounded-none border-none shadow-none',
        infoCard.ContainerClassName
      )}
    >
      <div className="flex gap-3 col-span-3">
        {infoCard.IAboutCardProps && (
          <AboutCard {...infoCard.IAboutCardProps} />
        )}
        <CardContent className="gap-3 flex flex-col pt-4">
          <CardDescription>{infoCard?.description}</CardDescription>
          <div className="flex items-center">
            {infoCard.cardTagTitle && (
              <CardTag
                className="relative rounded-md px-2.5 py-0.5 h-[unset] inline-flex inset-0 mr-2"
                title={infoCard.cardTagTitle}
                variant={infoCard.cardTagVariant}
              />
            )}
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
      </div>

      <div className="flex flex-col-reverse col-span-2">
        {infoCard.image && (
          <CardImage
            src={infoCard.image}
            alt={infoCard.title}
            containerClassName="w-full rounded-none"
          />
        )}
      </div>
      <div className="flex flex-col my-auto">
        {infoCard.BeforeCardContentComponent}
        {infoCard?.tableProps?.map(({ title, value, column }) => (
          <CardTable
            key={title}
            title={title}
            value={value}
            column={column}
            containerClassName="px-0"
          />
        ))}

        {infoCard?.tableProps2Col?.map((table, indexLine) => (
          <div key={`d${indexLine.toString()}`} className="mb-auto">
            <div className="flex flex-row justify-between items-center">
              {table.map(({ title, value }, indexRow) => (
                <CardTable
                  key={title + indexRow.toString()}
                  title={title}
                  containerClassName={
                    indexRow === 0 ? 'items-start px-0' : 'items-end px-0'
                  }
                  titleClassName="text-md text-left"
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
