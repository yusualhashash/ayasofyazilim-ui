import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Pagination } from '.';

export default {
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = () => <Pagination />;

export const Default = Template.bind({});
