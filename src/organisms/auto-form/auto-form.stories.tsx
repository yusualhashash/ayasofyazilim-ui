import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

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
    // You can use zod's built-in validation as normal
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
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
        // Use "inputProps" to pass props to the input component
        // You can use any props that the component accepts
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
