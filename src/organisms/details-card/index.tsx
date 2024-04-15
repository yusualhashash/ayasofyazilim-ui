import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import AboutCard, { IAboutCardProps } from '../../molecules/about-card';
import CardImage from '../../molecules/card-image';
import CardTable, { ICardTableProps } from '../../molecules/card-table';
import CardTag, { ICardTagProps } from '../../molecules/card-tag';
import Progress from '../../molecules/progress';

export interface IDetailsCardProps {
  BeforeCardContentComponent?: React.ReactNode;
  ContainerClassName?: string;
  IAboutCardProps: IAboutCardProps;
  cardTagClassname?: string;
  cardTagTitle?: string;
  cardTagVariant: ICardTagProps['variant'];
  description: string;
  image: string;
  link: string;
  locale?: string;
  tableProps?: Array<ICardTableProps>;
  tableProps2Col?: Array<[ICardTableProps, ICardTableProps]>;
  tags: Array<string>;
  title: string;
}
const currencyFormatter = new Intl.NumberFormat('tr', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
});

export const defaultProps: IDetailsCardProps = {
  IAboutCardProps: {
    link: '#',
    avatar:
      'https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D',
    title: 'Clevetura Devices LLC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  link: '#',
  title: 'CLVX 1 - Keyboard Gives More',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  tags: ['Teknoloji', 'Yazılım'],
  image:
    'https://i.kickstarter.com/assets/044/243/111/620ee2c08af65e9646d6cfd9dbe55868_original.png?anim=false&fit=crop&gravity=faces&height=315&origin=ugc&q=92&width=560&sig=EXsDXlcpA3rTqgOLDiduLcetM6QIEzSCQh19YMy8nl4%3D',
  locale: 'tr',
  tableProps: [
    { title: 'Proje Tipi', value: 'Paya Dayalı' },
    { title: 'Pay Arz Oranı', value: '%8' },
    {
      title: 'Başlangıç Tarihi',
      value: new Date('01.02.2024').toLocaleDateString(),
    },
    {
      title: 'Bitiş Tarihi',
      value: new Date('01.03.2024').toLocaleDateString(),
    },
  ],
  tableProps2Col: [
    [
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, ' '),
        value: 'Gerçekleşen Yatırım',
      },
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, ' '),
        value: 'Hedeflenen Yatırım',
      },
    ],
  ],
  cardTagTitle: 'Başarılı',
  cardTagVariant: 'success',
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" className="bg-green-300" />
  ),
};

export default function DetailsCard(infoCard: IDetailsCardProps) {
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
          <a href={infoCard.link}>{infoCard?.title}</a>
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

      {infoCard?.tableProps2Col?.map((table) => (
        <>
          <Separator />
          <Separator />
          <div className="flex flex-row justify-between items-center">
            {table.map(({ title, value }, index) => (
              <CardTable
                key={title}
                title={title}
                containerClassName={index === 0 ? 'items-start' : 'items-end'}
                titleClassName="text-md text-left"
                value={value}
                column
                separator={index === 0}
              />
            ))}
          </div>
        </>
      ))}
    </Card>
  );
}
