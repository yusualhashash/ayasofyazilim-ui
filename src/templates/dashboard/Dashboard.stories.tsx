import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Dashboard from './Dashboard';

export default {
  title: 'Template/Dashboard',
  component: Dashboard,
  argTypes: {},
} as Meta<typeof Dashboard>;

const Template: StoryFn<typeof Dashboard> = (args) => <Dashboard {...args} />;

export const CardListStory = Template.bind({});
