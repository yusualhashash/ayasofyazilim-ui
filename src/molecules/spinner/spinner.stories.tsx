import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Spinner, { ISpinnerProps } from '.';

export default {
  component: Spinner,
  parameters: {},
  args: {},
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = (args: ISpinnerProps) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
