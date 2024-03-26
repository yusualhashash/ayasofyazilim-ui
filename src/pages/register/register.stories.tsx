import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Register } from '../register';

export default {
  component: Register,
  argTypes: {},
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = (args) => <Register {...args} />;

export const RegisterPage = Template.bind({});

const onSubmit = (): Promise<string> => new Promise(() => {});
RegisterPage.args = {};
