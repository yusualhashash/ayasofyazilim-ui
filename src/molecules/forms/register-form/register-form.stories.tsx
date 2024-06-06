import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { z } from 'zod';
import RegisterForm from '.';

export const defaultRegisterFormSchema = z.object({
  userName: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(4).max(32),
  tenantId: z.string(),
});
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
