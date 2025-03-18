import React from 'react';
import { Meta, type StoryFn } from '@storybook/react';
import ListView, { ListViewItem } from '.';

export default {
  title: 'Molecules/ListView',
  component: ListView,
} as Meta;

const Template: StoryFn<ListViewItem> = () => (
  <ListView
    title="Yatırım Bilgileri"
    list={[
      {
        label: 'Nominal Fon Miktarı',
        value: 12,
        info: 'The name of the project.',
      },
      {
        label: 'Nominal Fon Miktarı',
        value: 12,
        info: 'The name of the project.',
      },
      {
        label: 'Nominal Fon Miktarı',
        value: 12,
        info: 'The name of the project.',
      },
      {
        label: 'Nominal Fon Miktarı',
        value: 12,
        info: 'The name of the project.',
      },
      {
        label: 'Nominal Fon Miktarı',
        value: 12,
        info: 'The name of the project.',
      },
    ]}
  />
);

export const Default = Template.bind({});
