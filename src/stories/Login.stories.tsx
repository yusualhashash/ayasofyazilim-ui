import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Login } from '..';

export default {
  title: 'Shadcn Components',
  component: Login,
  argTypes: {},
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => <Login {...args} />;

export const LoginComponent = Template.bind({});

const Company = (
  <div>
    <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
  </div>
);

LoginComponent.args = {
  company: Company,
  variant: 'ayasofyazilim',
};
