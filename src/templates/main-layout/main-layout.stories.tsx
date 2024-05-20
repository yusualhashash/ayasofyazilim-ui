import { Meta, StoryFn } from '@storybook/react';

import MainLayout from './index';

export default {
  component: MainLayout,
  argTypes: {},
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const MainLayoutTemplate = Template.bind({});

MainLayoutTemplate.args = {};
