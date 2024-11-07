import { Meta, StoryFn } from '@storybook/react';
import TanstackTable from '.';
import { users } from './tanstack-table.stories.data';
import { tanstackTableCreateColumnsByRowData } from './utils';

export default {
  component: TanstackTable,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TanstackTable>;

const template: StoryFn<typeof TanstackTable> = (args) => (
  <TanstackTable {...args} />
);
export const Default = template.bind({});
Default.args = {
  columns: tanstackTableCreateColumnsByRowData({
    row: users[0],
    languageData: { userName: 'Kullanıcı Adı' },
    links: {
      userName: {
        targetAccessorKey: 'id',
        prefix: 'http://192.168.1.105:1453/tr/app/admin',
        suffix: '/edit',
      },
      email: {
        prefix: 'http://192.168.1.105:1453/tr/app/',
      },
    },
  }),
  data: users,
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
