import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Login } from '../..';

export default {
  component: Login,
  argTypes: {},
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => <Login {...args} />;

export const LoginPage = Template.bind({});

const Company = (
  <div>
    <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
  </div>
);
const onSubmit = (): Promise<string> => new Promise(() => {});
LoginPage.args = {
  company: Company,
  variant: 'ayasofyazilim',
  onSubmitFunction: onSubmit,
};
