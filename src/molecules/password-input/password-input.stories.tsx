import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { PasswordInput } from '.';

export default {
  component: PasswordInput,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof PasswordInput>;

const template: StoryFn<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);
export const Default = template.bind({});
Default.args = {
  placeholder: 'Password',
  name: 'password',
  disabled: false,
};
