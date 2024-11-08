import { Meta, StoryFn } from '@storybook/react';
import TanstackTable from '.';
import { actions, col, users } from './tanstack-table.stories.data';

export default {
  component: TanstackTable,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TanstackTable>;

const template: StoryFn<typeof TanstackTable> = (args) => (
  <TanstackTable {...args} actions={actions} data={users} columns={col} />
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
