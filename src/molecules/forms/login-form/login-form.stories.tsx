import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import LoginForm, { defaultLoginFormSchema } from '.';
import locale from '../../../locale_tr.json';

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
