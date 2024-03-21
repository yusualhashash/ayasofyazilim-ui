import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DashboardHeader from './header';

export default {
  title: 'Organism/Header',
  component: DashboardHeader,
  argTypes: {},
} as Meta<typeof DashboardHeader>;

const Template: StoryFn<typeof DashboardHeader> = (args) => (
  <DashboardHeader {...args} />
);

export const HeaderStory = Template.bind({});

HeaderStory.args = {
  // heading: 'header',
  // text: 'test',
};
