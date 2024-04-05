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
