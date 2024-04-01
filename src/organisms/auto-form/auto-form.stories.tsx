import { Meta, StoryFn } from '@storybook/react';

import { z } from 'zod';
import AutoForm, { AutoFormSubmit } from '.';

export default {
  component: AutoForm,
  argTypes: {},
} as Meta<typeof AutoForm>;

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    .describe('Your secure password')
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
});

const Template: StoryFn<typeof AutoForm> = () => (
  <AutoForm
    formSchema={formSchema}
    fieldConfig={{
      password: {
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
    }}
  >
    <AutoFormSubmit>Send now</AutoFormSubmit>
  </AutoForm>
);

export const AutoFormStory = Template.bind({});
