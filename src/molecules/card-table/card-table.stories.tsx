import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CardTable, { ICardTableProps } from '.';

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

const Template: StoryFn<typeof CardTable> = (args: ICardTableProps) => (
  <CardTable {...args} />
);

export const Default = Template.bind({});
