import { Meta, StoryFn } from '@storybook/react';
import { Trash2 } from 'lucide-react';
import TanstackTable from '.';
import { actions, col, tableAct, users } from './tanstack-table.stories.data';

export default {
  component: TanstackTable,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TanstackTable>;

const template: StoryFn<typeof TanstackTable> = (args) => (
  <TanstackTable
    {...args}
    rowActions={actions}
    data={users}
    columns={col}
    selectedRowAction={{
      icon: Trash2,
      actionLocation: 'table',
      cta: `Delete`,
      onClick: (selectedIds) => {
        alert(`deleted rows:\n${selectedIds}`);
      },
    }}
    tableActions={tableAct}
  />
);

export const Default = template.bind({});
Default.args = {
  filters: {
    textFilters: ['userName'],
    facetedFilters: {
      status: [
        {
          value: 'inactive',
          label: 'Inactive',
        },
        {
          value: 'active',
          label: 'Active',
        },
      ],
    },
  },
  excludeColumns: ['rtn'],
};
