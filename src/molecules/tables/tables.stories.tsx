import { Meta, StoryObj } from '@storybook/react';

import { z } from 'zod';
import Table, { tableAction } from '.';
import { data } from './data';
import { columns } from './columns';

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

const autoFormArgs = {
  formSchema,
  fieldConfig: {
    password: {
      inputProps: {
        type: 'password',
        placeholder: '••••••••',
      },
    },
  },
  children: <div>Extra data</div>,
};

const action: tableAction = {
  cta: 'New Record',
  description: 'Ad New Record',
  callback: () => alert('Added'),
  autoFormArgs,
};

export default { component: Table } as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data,
    // @ts-ignore
    columns,
    filterBy: 'email',
    action,
  },
  parameters: {
    layout: 'centered',
  },
};
