import React from 'react';
// @ts-ignore

import { Button } from '@/components/ui/button';
import { IAboutCardProps } from '../../molecules/about-card';
import { ICardTableProps } from '../../molecules/card-table';
import { ICardTagProps } from '../../molecules/card-tag';
import Progress from '../../molecules/progress';
import Compact from './compact';
import FullPage from './full-page';

export interface IDetailsCardProps {
  ActionComponent?: React.ReactNode;
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
export type DetailsProps = {
  cardProps: IDetailsCardProps;
  variant: 'compact' | 'full-page';
};
export const defaultCardProps: IDetailsCardProps = {
  IAboutCardProps: {
    link: 'https://google.com',
    avatar:
      'https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D',
    title: 'Clevetura Devices LLC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  link: 'https://google.com',
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
  ActionComponent: <Button>Yatırım yap</Button>,
};
export const defaultDetailsCardProps: DetailsProps = {
  variant: 'compact',
  cardProps: defaultCardProps,
};
export default function DetailsCard(infoCardProps: DetailsProps) {
  return infoCardProps.variant === 'full-page' ? (
    <FullPage {...infoCardProps.cardProps} />
  ) : (
    <Compact {...infoCardProps.cardProps} />
  );
}
