import type { Meta, StoryObj } from '@storybook/react';

import { z } from 'zod';
import FormStepper, { Step } from './index';

const meta: Meta<typeof FormStepper> = {
  component: FormStepper,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const steps: Step[] = [
  {
    title: 'basic information 2',
    autoformArgs: {
      formSchema: z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        age: z.number().int(),
      }),
    },
  },
  {
    title: 'Complex information 1',
    autoformArgs: {
      formSchema: z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        age: z.number().int(),
        hello: z.string().nonempty(),
        list: z.array(z.string().nonempty()),
      }),
    },
  },
];

export const Default: StoryObj<typeof FormStepper> = {
  args: {
    steps,
  },
};
