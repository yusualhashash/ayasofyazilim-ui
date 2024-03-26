import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Login } from '../login';

export default {
  component: Login,
  argTypes: {},
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => <Login {...args} />;

export const LoginPage = Template.bind({});

const Company = (
  <div className="bg-zinc-800 flex flex-auto justify-center items-center">
    <div>
      <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
    </div>
  </div>
);
const onSubmit = (): Promise<string> => new Promise(() => {});
LoginPage.args = {
  children: Company,
  onSubmitFunction: onSubmit,
};
