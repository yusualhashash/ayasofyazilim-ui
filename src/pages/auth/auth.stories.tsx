import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Auth } from '../auth';

export default {
  component: Auth,
  argTypes: {},
} as Meta<typeof Auth>;

const Template: StoryFn<typeof Auth> = (args) => <Auth {...args} />;

export const AuthPage = Template.bind({});

const children = (
  <div className="bg-zinc-800 flex flex-auto justify-center items-center">
    <div>
      <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
    </div>
  </div>
);
AuthPage.args = {
  children,
};
