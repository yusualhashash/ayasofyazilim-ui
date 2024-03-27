import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import RegisterForm, { defaultRegisterFormSchema } from '.';

export default {
  component: RegisterForm,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof RegisterForm>;

const template: StoryFn<typeof RegisterForm> = (args) => (
  <RegisterForm {...args} />
);
export const Default = template.bind({});
Default.args = {
  formSchema: defaultRegisterFormSchema,
  loginPath: 'asd',
};
