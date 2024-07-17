import { Meta, StoryObj } from '@storybook/react';

import { z } from 'zod';
import { useState } from 'react';
import AutoformDialog, { tableAction } from '.';
import { Button } from '@/components/ui/button';

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
  callback: () => {
    console.log('callback');
  },
  autoFormArgs,
};

export default { component: AutoformDialog } as Meta<typeof AutoformDialog>;

export const Default: StoryObj<typeof AutoformDialog> = {
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
        <AutoformDialog
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
