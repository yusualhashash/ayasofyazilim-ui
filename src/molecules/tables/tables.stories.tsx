/* eslint-disable no-alert */
import { Meta, StoryObj } from '@storybook/react';

import jsonToCsv from 'src/lib/json-to-csv';
import { z } from 'zod';
import Table, { TableAction } from '.';
import { createZodObject } from '../../lib/create-zod-object';
import {
  columns,
  columnsEditable,
  columnsSubContent,
  renderSubComponent,
} from './columns';
import { data } from './data';

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

const action: TableAction = {
  cta: 'New Record',
  type: 'Dialog',
  description: 'Add New Record',
  callback: () => alert('Added'),
  autoFormArgs,
};

/**
 * # Table stories
 * Awesome datatable that provides a lot of features.
 *
 * like: custom data tables, custom columsn, auto generated columns, etc
 */
export default { component: Table } as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data,
    columnsData: {
      type: 'Custom',
      data: columns,
    },
    action,
  },
  parameters: {
    layout: 'centered',
  },
};

// Status	Email	Amount
const jsonSchema: any = {
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

export const AutoColumns: StoryObj<typeof Table> = {
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
        actionList: [
          {
            cta: 'Test',
            callback: (e, row) => alert(`Test ${JSON.stringify(row)}`),
          },
          {
            cta: 'Hello world',
            callback: (e, row) => alert(`hello world ${JSON.stringify(row)}`),
          },
        ],
      },
    },
    action,
  },
  parameters: {
    layout: 'centered',
  },
};

export const NewPage: StoryObj<typeof Table> = {
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
    action: {
      cta: 'New Record',
      type: 'NewPage',
      href: '/new-page',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export const Sheet: StoryObj<typeof Table> = {
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
    action: {
      cta: 'New Record',
      description: 'Add New Record',
      callback: () => alert('Added'),
      autoFormArgs,
      type: 'Sheet',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export const MultipleActions: StoryObj<typeof Table> = {
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
    action: [
      {
        cta: 'New Record sheet',
        description: 'Add New Record',
        callback: () => alert('Added'),
        autoFormArgs,
        type: 'Sheet',
      },
      {
        cta: 'New Dialog',
        description: 'Add New Record',
        callback: () => alert('Added'),
        autoFormArgs,
        type: 'Dialog',
      },
      {
        cta: 'New New Page',
        type: 'NewPage',
        href: '/new-page',
      },
      {
        type: 'Action',
        cta: `Export CSV`,
        callback: () => {
          jsonToCsv(data, 'export_data');
        },
      },
    ],
  },
  parameters: {
    layout: 'centered',
  },
};
const filedstable = { name: '', price: '' };
export const Editable: StoryObj<typeof Table> = {
  args: {
    editable: true,
    data,
    columnsData: {
      type: 'Custom',
      data: columnsEditable,
    },
    showView: false,
    Headertable: filedstable,
  },
  parameters: {
    layout: 'centered',
  },
};

export const SubContent: StoryObj<typeof Table> = {
  args: {
    editable: false,
    data,
    columnsData: {
      type: 'Custom',
      data: columnsSubContent,
    },
    showView: false,
    renderSubComponent,
  },
  parameters: {
    layout: 'centered',
  },
};
export const DetailedFilter: StoryObj<typeof Table> = {
  args: {
    editable: false,
    data,
    columnsData: {
      type: 'Custom',
      data: columnsSubContent,
    },
    showView: false,
    detailedFilter: [
      {
        name: 'dbNameOfFilter',
        displayName: 'Display Name Of Filter',
        type: 'string',
        value: '',
      },
    ],
  },
  parameters: {
    layout: 'centered',
  },
};
