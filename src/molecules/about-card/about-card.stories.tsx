import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import AboutCard, { IAboutCardProps } from '.';

export default {
  component: AboutCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    avatar:
      'https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D',
    title: 'Clevetura Devices LLC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    link: 'http://localhost:3000/profile',
    // containerClassName: 'absolute bottom-0 right-0 z-10 ',
  },
} as Meta<typeof AboutCard>;

const Template: StoryFn<typeof AboutCard> = (args: IAboutCardProps) => (
  <AboutCard {...args} />
);

export const Default = Template.bind({});
