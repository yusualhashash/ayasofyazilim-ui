import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Register } from '../register';

export default {
  component: Register,
  argTypes: {},
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = (args) => <Register {...args} />;

export const RegisterPage = Template.bind({});

const children = (
  <div className="bg-zinc-800 flex flex-auto justify-center items-center">
    <div>
      <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
    </div>
  </div>
);
const onSubmit = (): Promise<string> => new Promise(() => {});
RegisterPage.args = { children: children };
