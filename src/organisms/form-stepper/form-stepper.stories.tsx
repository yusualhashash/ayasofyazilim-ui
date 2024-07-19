import type { Meta, StoryObj } from '@storybook/react';

import FormStepper from './index';

const meta: Meta<typeof FormStepper> = {
  component: FormStepper,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Default: StoryObj<typeof FormStepper> = {};
