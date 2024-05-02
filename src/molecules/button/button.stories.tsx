import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Button, { IButtonProps } from '.';

export default {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: IButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});
