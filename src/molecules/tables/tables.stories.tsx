import { Meta, StoryObj } from '@storybook/react';

import Table, { tableAction } from '.';
import { data } from './data';
import { columns } from './columns';

const action: tableAction = {
  cta: 'New Record',
  description: 'Ad New Record',
  callback: () => alert('Added'),
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
