import { Meta, StoryObj } from '@storybook/react';

import Table from '.';
import { data } from './data';
import { columns } from './columns';

export default { component: Table } as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data,
    // @ts-ignore
    columns,
  },
  parameters: {
    layout: 'centered',
  },
};
