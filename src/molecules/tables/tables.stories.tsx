import { Meta, StoryObj } from '@storybook/react';

import { z } from 'zod';
import Table, { tableAction } from '.';
import { data } from './data';
import { columns } from './columns';
import { createZodObject } from '../../lib/create-zod-object';

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
  description: 'Add New Record',
  callback: () => alert('Added'),
  autoFormArgs,
};

export default { component: Table } as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data,
    // @ts-ignore
    columnsData: {
      type: 'Custom',
      data: columns,
    },
    filterBy: 'email',
    action,
  },
  parameters: {
    layout: 'centered',
  },
};

// Status	Email	Amount
const jsonSchema = {
  type: 'object',
  required: ['status', 'email', 'amount'],
  properties: {
    status: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    amount: {
      type: 'number',
    },
  },
};

export const autoColumns: StoryObj<typeof Table> = {
  args: {
    data,
    columnsData: {
      type: 'Auto',
      data: {
        callback: () => alert('Added Callback'),
        autoFormArgs: {
          formSchema: createZodObject(jsonSchema, [
            'status',
            'email',
            'amount',
          ]),
        },
        tableType: jsonSchema,
        excludeList: ['id'],
        onEdit: (values, row) => {
          alert(
            `OnEdit \ndata:\n${JSON.stringify(values)} \nRow:\n${JSON.stringify(row)}`
          );
        },
        onDelete: (e, row) => {
          alert(
            `OnDelete \ndata:\n${JSON.stringify(e)} \nRow:\n${JSON.stringify(row)}`
          );
        },
      },
    },
    filterBy: 'email',
    action,
  },
  parameters: {
    layout: 'centered',
  },
};

export const newPage: StoryObj<typeof Table> = {
  args: {
    data,
    columnsData: {
      type: 'Auto',
      data: {
        callback: () => alert('Added Callback'),
        autoFormArgs: {
          formSchema: createZodObject(jsonSchema, [
            'status',
            'email',
            'amount',
          ]),
        },
        tableType: jsonSchema,
        excludeList: ['id'],
        onEdit: (values, row) => {
          alert(
            `OnEdit \ndata:\n${JSON.stringify(values)} \nRow:\n${JSON.stringify(row)}`
          );
        },
        onDelete: (e, row) => {
          alert(
            `OnDelete \ndata:\n${JSON.stringify(e)} \nRow:\n${JSON.stringify(row)}`
          );
        },
      },
    },
    filterBy: 'email',
    action: {
      cta: 'New Record',
      description: 'Add New Record',
      callback: () => alert('Added'),
      autoFormArgs,
      type: 'NewPage',
      href: '/new-page',
    },
  },
  parameters: {
    layout: 'centered',
  },
};
