import { Meta, StoryObj } from '@storybook/react';

import { NumericInput } from '.';

export default { component: NumericInput } as Meta<typeof NumericInput>;

export const Default: StoryObj<typeof NumericInput> = {
  args: {},
};
