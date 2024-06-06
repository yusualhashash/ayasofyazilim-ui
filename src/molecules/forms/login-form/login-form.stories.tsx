import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { z } from 'zod';
import LoginForm from '.';
import locale from '../../../locale_tr.json';

export const defaultLoginFormSchema = z.object({
  userIdentifier: z.string().min(5),
  password: z.string().min(4).max(32),
  tenantId: z.string(),
});
export default {
  component: LoginForm,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof LoginForm>;

const template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;
export const Default = template.bind({});
Default.args = {
  formSchema: defaultLoginFormSchema,
  registerPath: 'asd',
  resources: locale.resources,
};
