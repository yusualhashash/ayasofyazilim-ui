import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CardImage, { CardImageProps } from '.';

export default {
  component: CardImage,
  parameters: {
    layout: 'centered',
  },
  args: {
    src: 'https://i.kickstarter.com/assets/044/243/111/620ee2c08af65e9646d6cfd9dbe55868_original.png?anim=false&fit=crop&gravity=faces&height=315&origin=ugc&q=92&width=560&sig=EXsDXlcpA3rTqgOLDiduLcetM6QIEzSCQh19YMy8nl4%3D',
  },
} as Meta<typeof CardImage>;

const Template: StoryFn<typeof CardImage> = (args: CardImageProps) => (
  <CardImage {...args} />
);

export const Default = Template.bind({});
export const defaultProps = {
  id: 1,
  ownerId: 1,
  ownerName: 'Clevetura Devices LLC',
  ownerAbout: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  ownerAvatar:
    'https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D',
  image:
    'https://i.kickstarter.com/assets/044/243/111/620ee2c08af65e9646d6cfd9dbe55868_original.png?anim=false&fit=crop&gravity=faces&height=315&origin=ugc&q=92&width=560&sig=EXsDXlcpA3rTqgOLDiduLcetM6QIEzSCQh19YMy8nl4%3D',
  title: 'CLVX 1 – Keyboard Gives More',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  tags: ['Teknoloji', 'Yazılım'],
  current: 415469,
  target: 700000,
  startDate: new Date('01.02.2024'),
  endDate: new Date('01.03.2024'),
  projectType: 'Paya Dayalı',
  shareOfferRate: 8,
  status: 'success',
};
