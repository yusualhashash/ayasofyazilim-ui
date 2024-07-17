import { Meta, StoryFn } from '@storybook/react';

import MainLayout from './index';

export default {
  component: MainLayout,
  argTypes: {},
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (args) => <MainLayout {...args} />;

export const MainLayoutTemplate = Template.bind({});

MainLayoutTemplate.args = {
  children: <div className="bg-red-500 w-full">Main Layout</div>,
  HeaderComponent: <div className="bg-blue-500">Header</div>,
  SidebarComponent: <div className="bg-green-500">Sidebar</div>,
};
