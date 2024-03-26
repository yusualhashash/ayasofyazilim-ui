import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import LoginForm from '.';

export default {
  component: LoginForm,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof LoginForm>;

const template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;
export const Default = template.bind({});
