import { Meta, StoryFn } from '@storybook/react';

import GridLayout, { dummyExample } from './index';

export default {
  component: GridLayout,
  argTypes: {},
} as Meta<typeof GridLayout>;

const Template: StoryFn<typeof GridLayout> = (args) => <GridLayout {...args} />;

export const GridLayoutTemplate = Template.bind({});

GridLayoutTemplate.args = {
  children: dummyExample(),
  orientation: 'cols',
};
