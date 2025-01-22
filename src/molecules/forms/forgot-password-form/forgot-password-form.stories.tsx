import { Meta, StoryFn } from '@storybook/react';
import { z } from 'zod';
import ForgotPasswordForm from '.';
import locale from '../../../locale_tr.json';

export const defaultForgotPasswordFormSchema = z.object({
  email: z.string().email(),
  tenant: z.string(),
});
export default {
  component: ForgotPasswordForm,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ForgotPasswordForm>;

const template: StoryFn<typeof ForgotPasswordForm> = (args) => (
  <ForgotPasswordForm {...args} />
);
export const Default = template.bind({});
Default.args = {
  formSchema: defaultForgotPasswordFormSchema,
  resources: locale.resources,
};
