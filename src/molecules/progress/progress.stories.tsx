import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Progress, { progressProps } from '.';

export default {
  component: Progress,
  parameters: {},
  args: {},
} as Meta<typeof Progress>;

const Template: StoryFn<typeof Progress> = (args: progressProps) => (
  <Progress {...args} />
);

export const Default = Template.bind({});
