import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Register } from '../..';

export default {
  component: Register,
  argTypes: {},
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = (args) => <Register {...args} />;

export const RegisterPage = Template.bind({});

const Company = (
  <div>
    <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
  </div>
);
const onSubmit = (): Promise<string> => new Promise(() => {});
RegisterPage.args = {
  company: Company,
  variant: 'ayasofyazilim',
  onSubmitFunction: onSubmit,
};
