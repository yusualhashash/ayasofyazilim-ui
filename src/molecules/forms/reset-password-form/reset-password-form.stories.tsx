import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ResetPasswordForm from '.';
import locale from '../../../locale_tr.json';

export default {
  component: ResetPasswordForm,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ResetPasswordForm>;

const template: StoryFn<typeof ResetPasswordForm> = (args) => (
  <ResetPasswordForm {...args} />
);
export const Default = template.bind({});
Default.args = {
  passwordRequirements: {
    passwordRequiresDigit: true,
    passwordRequiresLower: true,
    passwordRequiresNonAlphanumeric: true,
    passwordRequiresUpper: true,
    passwordRequiresUniqueChars: true,
    passwordRequiredUniqueCharsLength: 8,
    passwordRequiredLength: 8,
  },
  resources: locale.resources,
};
