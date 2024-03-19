import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Auth } from '..';

export default {
  title: 'Auth Template',
  component: Auth,
  argTypes: {},
} as Meta<typeof Auth>;

const Template: StoryFn<typeof Auth> = (args) => <Auth {...args} />;

export const AuthTemplate = Template.bind({});

const Company = (
  <div>
    <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
  </div>
);

AuthTemplate.args = {
  company: Company,
  variant: 'ayasofyazilim',
};
