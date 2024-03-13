import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ShadcnButton } from '..';

export default {
  title: 'Shadcn Components',
  component: ShadcnButton,
  argTypes: {},
} as Meta<typeof ShadcnButton>;

const Template: StoryFn<typeof ShadcnButton> = (args) => (
  <ShadcnButton {...args} />
);

export const Button = Template.bind({});

Button.args = {
  children: 'Clicked this many times:',
};
