import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import ScrollArea from '.';

export default {
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof ScrollArea>;

const Template: StoryFn<typeof ScrollArea> = () => <ScrollArea />;

export const Default = Template.bind({});
