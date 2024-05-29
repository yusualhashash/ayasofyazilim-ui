import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Toaster from '.';

export default {
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof Toaster>;

const Template: StoryFn<typeof Toaster> = () => <Toaster />;

export const Default = Template.bind({});
