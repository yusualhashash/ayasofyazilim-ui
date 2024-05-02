import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import SubmitButton, { ISubmitButtonProps } from '.';

export default {
  component: SubmitButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: ' w-full text-white',
  },
} as Meta<typeof SubmitButton>;

const Template: StoryFn<typeof SubmitButton> = (args: ISubmitButtonProps) => (
  <SubmitButton {...args} />
);

export const Default = Template.bind({});
