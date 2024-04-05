import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CardTable, { CardTableProps } from '.';

export default {
  component: CardTable,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Proje Tipi',
    value: 'Paya Dayalı',
  },
} as Meta<typeof CardTable>;

const Template: StoryFn<typeof CardTable> = (args: CardTableProps) => (
  <CardTable {...args} />
);

export const Default = Template.bind({});
