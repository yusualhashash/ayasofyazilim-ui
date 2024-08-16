import { Meta, StoryObj } from '@storybook/react';

import { z } from 'zod';
import { useState } from 'react';
import CustomTableActionDialog from '.';
import { Button } from '@/components/ui/button';
import { TableAction } from '../tables';

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
  type: 'Dialog',
  cta: 'New Record',
  description: 'Ad New Record',
  componentType: 'Autoform',
  callback: () => {},
  autoFormArgs,
};

const actionSheet: TableAction = {
  type: 'Sheet',
  cta: 'New Record',
  description: 'Ad New Record',
  componentType: 'Autoform',
  callback: () => {},
  autoFormArgs,
};

const actionSheetCustomContent: TableAction = {
  type: 'Sheet',
  cta: 'New Record',
  description: 'Ad New Record',
  componentType: 'CustomComponent',
  isLoading: false,
  content: <div>Custom Content</div>,
};

export default { component: CustomTableActionDialog } as Meta<
  typeof CustomTableActionDialog
>;

export const Default: StoryObj<typeof CustomTableActionDialog> = {
  args: {
    action,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [open, onOpenChange] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            onOpenChange(true);
          }}
        >
          Open Dialog
        </Button>
        <CustomTableActionDialog
          action={args.action}
          open={open}
          onOpenChange={() => {
            onOpenChange(!open);
          }}
          type={args.type}
        />
      </>
    );
  },
};
export const Sheet: StoryObj<typeof CustomTableActionDialog> = {
  args: {
    action: actionSheet,
    type: 'Sheet',
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [open, onOpenChange] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            onOpenChange(true);
          }}
        >
          Open Dialog
        </Button>
        <CustomTableActionDialog
          action={args.action}
          open={open}
          onOpenChange={() => {
            onOpenChange(!open);
          }}
          type={args.type}
        />
      </>
    );
  },
};

export const SheetCustomContent: StoryObj<typeof CustomTableActionDialog> = {
  args: {
    action: actionSheetCustomContent,
    type: 'Sheet',
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [open, onOpenChange] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            onOpenChange(true);
          }}
        >
          Open Dialog
        </Button>
        <CustomTableActionDialog
          action={args.action}
          open={open}
          onOpenChange={() => {
            onOpenChange(!open);
          }}
          type={args.type}
        />
      </>
    );
  },
};

export const DialogCustomContent: StoryObj<typeof CustomTableActionDialog> = {
  args: {
    action: actionSheetCustomContent,
    type: 'Dialog',
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [open, onOpenChange] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            onOpenChange(true);
          }}
        >
          Open Dialog
        </Button>
        <CustomTableActionDialog
          action={args.action}
          open={open}
          onOpenChange={() => {
            onOpenChange(!open);
          }}
          type={args.type}
        />
      </>
    );
  },
};
