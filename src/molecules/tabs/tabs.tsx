import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Tabs } from '.';

export default {
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = () => <Tabs />;

export const Default = Template.bind({});
